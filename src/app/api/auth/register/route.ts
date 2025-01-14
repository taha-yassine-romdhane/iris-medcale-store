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
    console.log('Registration attempt - Request body:', body);
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
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
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
        telephone: telephone || null,
        adresse: adresse || null,
        ville: ville || null,
        codePostal: codePostal || null,
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
      // Continue with registration but inform the user about email issue
    }

    // Generate JWT token
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      message: emailSent 
        ? 'Registration successful. Please check your email to verify your account.'
        : 'Registration successful but we could not send the verification email. Please contact support.',
      token,
      emailSent,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}