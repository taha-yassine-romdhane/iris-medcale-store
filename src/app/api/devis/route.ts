import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.get('authorization');
    console.log('Auth header:', authHeader); // Debug log

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No authorization header or invalid format');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Received token:', token); // Debug log

    let decoded;
    try {
      decoded = verifyToken(token);
      console.log('Token decoded successfully:', { id: decoded.id, email: decoded.email, role: decoded.role });
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    if (!decoded.id) {
      console.error('No user id in decoded token');
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { items } = data;

    if (!items || !Array.isArray(items)) {
      console.error('Invalid items format:', items);
      return NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      );
    }

    // Create the order with status "DEVIS"
    const order = await prisma.commande.create({
      data: {
        status: 'DEVIS',
        utilisateurId: decoded.id,
        total: 0,
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            productId: item.id,
            price: 0
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating devis:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la création du devis';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
