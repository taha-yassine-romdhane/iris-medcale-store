import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { CartItem } from '@/types/cart';
import { Prisma, StatusCommande } from '@prisma/client';

// Ensure JWT_SECRET is available
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  throw new Error('JWT_SECRET is not defined');
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body first
    const data = await req.json();
    const { items, guestInfo } = data;

    if (!items?.length) {
      return NextResponse.json(
        { success: false, message: 'No items provided' },
        { status: 400 }
      );
    }

    // Validate items
    const validItems = items.every((item: CartItem) => 
      item && 
      typeof item.id === 'string' && 
      typeof item.quantity === 'number' && 
      item.quantity > 0
    );

    if (!validItems) {
      return NextResponse.json(
        { success: false, message: 'Invalid items format' },
        { status: 400 }
      );
    }

    // Validate product IDs
    const productIds = items.map((item: CartItem) => item.id);
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true
      }
    });

    if (existingProducts.length !== items.length) {
      return NextResponse.json(
        { success: false, message: 'Some products do not exist in the database' },
        { status: 400 }
      );
    }

    let user;
    // Check if it's an authenticated request
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = verifyToken(token);
        if (decoded?.id) {
          user = await prisma.utilisateur.findUnique({
            where: { id: decoded.id },
            select: {
              id: true,
              email: true,
              nom: true,
              prenom: true,
              adresse: true,
              ville: true,
              codePostal: true,
              telephone: true,
            },
          });
        }
      } catch (error) {
        console.log('Token verification failed:', error);
      }
    }

    // Handle guest order if no valid authenticated user
    if (!user) {
      if (!guestInfo) {
        return NextResponse.json(
          { success: false, message: 'Guest information is required for non-authenticated users' },
          { status: 400 }
        );
      }

      // Validate guest info
      if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
        return NextResponse.json(
          { success: false, message: 'All guest information fields (name, email, phone) are required' },
          { status: 400 }
        );
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
        return NextResponse.json(
          { success: false, message: 'Invalid email format' },
          { status: 400 }
        );
      }

      try {
        // Check if a user with this email already exists
        const existingUser = await prisma.utilisateur.findUnique({
          where: { email: guestInfo.email },
        });

        if (existingUser) {
          user = existingUser;
        } else {
          // Create a temporary user for the guest
          user = await prisma.utilisateur.create({
            data: {
              email: guestInfo.email,
              motDePasse: '', // Empty password since it's a guest account
              nom: guestInfo.name.split(' ').slice(1).join(' ') || '',
              prenom: guestInfo.name.split(' ')[0] || guestInfo.name,
              telephone: guestInfo.phone,
              role: 'CLIENT',
            },
          });
        }
      } catch (userError) {
        console.log('Error creating/finding user:', userError);
        return NextResponse.json(
          { success: false, message: 'Error processing user information' },
          { status: 500 }
        );
      }
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unable to process user information' },
        { status: 400 }
      );
    }

    // Ensure optional fields are not undefined
    if (!user.adresse) user.adresse = null;
    if (!user.ville) user.ville = null;
    if (!user.codePostal) user.codePostal = null;
    if (!user.telephone) user.telephone = null;

    // Create order
    const order = await prisma.commande.create({
      data: {
        status: StatusCommande.DEVIS,
        utilisateur: {
          connect: { id: user.id }
        },
        adresse: user.adresse,
        ville: user.ville,
        codePostal: user.codePostal,
        telephone: user.telephone,
        items: {
          create: items.map((item: CartItem) => ({
            quantity: item.quantity,
            product: {
              connect: { id: item.id }
            }
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                brand: true,
                type: true
              }
            }
          }
        },
        utilisateur: {
          select: {
            email: true,
            nom: true,
            prenom: true,
            telephone: true,
          }
        }
      }
    });

    return NextResponse.json(
      { success: true, data: order },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    // Create a safe error message without using console.error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode = error instanceof Prisma.PrismaClientKnownRequestError ? error.code : 'UNKNOWN';
    
    // Log error details to console.log instead of console.error
    console.log('Error details:', {
      message: errorMessage,
      code: errorCode,
      type: error?.constructor?.name
    });

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database operation failed',
          code: error.code 
        },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}