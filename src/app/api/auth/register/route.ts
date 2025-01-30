import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { RoleUtilisateur }  from '@prisma/client';
import { sendVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      email, 
      motDePasse, 
      nom, 
      prenom,
      telephone,
      adresse,
      ville,
      codePostal
    } = body;

    // Validate required fields
    if (!email || !motDePasse || !nom || !prenom) {
      return NextResponse.json(
        { error: 'Email, mot de passe, nom et prénom sont requis' },
        { status: 400 }
      );
    }

    // Prevent registration with @elite.com email
    if (email.toLowerCase().endsWith('@elite.com')) {
      return NextResponse.json(
        { error: 'Les adresses email @elite.com ne sont pas autorisées pour l\'inscription' },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Return a specific status code (409 Conflict) for existing email
      return NextResponse.json(
        { 
          error: 'EMAIL_EXISTS',
          message: 'Cette adresse email est déjà utilisée'
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Create user with verification token
    const user = await prisma.utilisateur.create({
      data: {
        email,
        motDePasse: hashedPassword,
        nom,
        prenom,
        role: RoleUtilisateur.CLIENT,
        telephone: telephone,
        adresse: adresse,
        ville: ville,
        codePostal: codePostal,
        emailVerified: false,
        verificationToken: {
          create: {
            token: verificationToken,
            expires: tokenExpiry,
          },
        },
      },
    });

    // Send verification email
    let emailSent = false;
    try {
      await sendVerificationEmail(email, verificationToken);
      emailSent = true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
    }

    // Generate JWT token
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      message: emailSent 
        ? 'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.'
        : 'Inscription réussie mais l\'envoi de l\'email a échoué. Veuillez contacter le support.',
      token,
      emailSent,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        error: 'REGISTRATION_FAILED',
        message: 'Une erreur est survenue lors de l\'inscription'
      },
      { status: 500 }
    );
  }
}