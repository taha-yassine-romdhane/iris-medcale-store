import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { RoleUtilisateur } from '@prisma/client';

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

    // Create user with optional fields
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
        codePostal: codePostal || null
      },
    });

    // Generate JWT token using the same structure as login
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Remove password from response
    const { motDePasse: _, ...userWithoutPassword } = user; // `_` is intentionally unused

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error details:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}