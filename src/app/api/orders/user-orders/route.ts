import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // Fetch the user's orders with their items and products
    const orders = await prisma.commande.findMany({
      where: {
        utilisateurId: decoded.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                brand: true,
                price: true,
                media: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la récupération des commandes';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}