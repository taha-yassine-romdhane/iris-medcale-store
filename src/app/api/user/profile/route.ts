import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    console.log('Profile GET request received');
    
    const authHeader = request.headers.get('authorization');
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header found');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted from header');
    
    let decoded;
    try {
      console.log('Attempting to verify token');
      decoded = verifyToken(token);
      console.log('Token verified, decoded payload:', decoded);
      
      if (!decoded || !decoded.id) {
        console.log('Decoded token missing required fields');
        return NextResponse.json(
          { error: 'Token invalide ou expiré' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    console.log('Fetching user from database with ID:', decoded.id);
    try {
      const user = await prisma.utilisateur.findUnique({
        where: {
          id: decoded.id
        }
      });

      if (!user) {
        console.log('No user found with ID:', decoded.id);
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        );
      }

      // Convert dates to ISO strings and handle optional fields
      const sanitizedUser = {
        id: user.id,
        email: user.email,
        nom: user.nom || '',
        prenom: user.prenom || '',
        telephone: user.telephone || '',
        adresse: user.adresse || '',
        ville: user.ville || '',
        codePostal: user.codePostal || '',
        role: user.role,
        createdAt: user.dateCreation.toISOString(),
        updatedAt: user.dateMiseAJour.toISOString()
      };

      console.log('User found, returning data:', sanitizedUser);
      return NextResponse.json(sanitizedUser);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'accès à la base de données' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in profile endpoint:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération du profil' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('Profile PUT request received');
    
    const authHeader = request.headers.get('authorization');
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header found');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted from header');
    
    let decoded;
    try {
      console.log('Attempting to verify token');
      decoded = verifyToken(token);
      console.log('Token verified, decoded payload:', decoded);
      
      if (!decoded || !decoded.id) {
        console.log('Decoded token missing required fields');
        return NextResponse.json(
          { error: 'Token invalide ou expiré' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const data = await request.json();
    console.log('Update data received:', data);
    
    try {
      const updatedUser = await prisma.utilisateur.update({
        where: {
          id: decoded.id
        },
        data: {
          email: data.email,
          nom: data.nom || null,
          prenom: data.prenom || null,
          telephone: data.telephone || null,
          adresse: data.adresse || null,
          ville: data.ville || null,
          codePostal: data.codePostal || null,
        }
      });

      // Convert dates to ISO strings and handle optional fields
      const sanitizedUser = {
        id: updatedUser.id,
        email: updatedUser.email,
        nom: updatedUser.nom || '',
        prenom: updatedUser.prenom || '',
        telephone: updatedUser.telephone || '',
        adresse: updatedUser.adresse || '',
        ville: updatedUser.ville || '',
        codePostal: updatedUser.codePostal || '',
        role: updatedUser.role,
        createdAt: updatedUser.dateCreation.toISOString(),
        updatedAt: updatedUser.dateMiseAJour.toISOString()
      };

      console.log('User updated successfully:', sanitizedUser);
      return NextResponse.json(sanitizedUser);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la base de données' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in profile update:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
}
