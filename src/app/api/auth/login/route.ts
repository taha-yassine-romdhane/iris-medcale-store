import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Vérifier si l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (!utilisateur) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, utilisateur.motDePasse);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier si le compte est actif
    if (!utilisateur.actif) {
      return NextResponse.json(
        { error: 'Ce compte a été désactivé' },
        { status: 403 }
      );
    }

    // Verify user role
    if (!utilisateur.role || !['ADMIN', 'EMPLOYE', 'CLIENT'].includes(utilisateur.role)) {
      return NextResponse.json(
        { error: 'Role utilisateur invalide' },
        { status: 403 }
      );
    }

    // Create payload and sign token
    const payload = {
      id: utilisateur.id,
      email: utilisateur.email,
      role: utilisateur.role,
    };

    // Sign token using our utility function
    const token = signToken(payload);

    // Retourner le token et les informations de l'utilisateur
    const userWithoutPassword = { ...utilisateur, motDePasse: undefined };
    delete userWithoutPassword.motDePasse;

    // Simply return the token and user data
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
}