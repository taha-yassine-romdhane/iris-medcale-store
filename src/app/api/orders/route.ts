import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user role
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.id },
      select: { role: true }
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'EMPLOYE')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Fetch all orders with user information
    const orders = await prisma.commande.findMany({
      select: {
        id: true,
        dateCreation: true,
        status: true,
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                brand: true,
                type: true,
                description: true,
                features: true,
                category: true,
                subCategory: true,
                media: {
                  select: {
                    url: true,
                    type: true,
                  },
                  where: {
                    type: 'image'
                  },
                  take: 1
                }
              }
            }
          }
        },
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
