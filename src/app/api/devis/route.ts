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
    console.log('=== Starting devis creation process ===');

    // Get token from cookie
    const token = req.cookies.get('token')?.value;
    console.log('Token from cookie:', token ? 'Present' : 'Missing');

    if (!token) {
      console.error('No token found in cookies');
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      console.error('Invalid token payload:', decoded);
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const data = await req.json();
    const { items } = data;

    if (!items?.length) {
      console.error('Invalid items data:', items);
      return NextResponse.json(
        { success: false, message: 'No items provided' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
      console.error('Invalid item structure in request');
      return NextResponse.json(
        { success: false, message: 'Invalid items format' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Creating order for user:', decoded.id);
    console.log('Items:', items);

    // Fetch user information
    console.log('Fetching user information...');
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        adresse: true,
        ville: true,
        codePostal: true,
        telephone: true,
      },
    });

    if (!user) {
      console.error('User not found:', decoded.id);
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('User found:', user);

    // Validate product IDs
    const productIds = items.map((item: CartItem) => item.id);
    console.log('Checking if products exist in the database...');
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true
      }
    });

    if (existingProducts.length !== items.length) {
      console.log('Some products do not exist in the database');
      return NextResponse.json(
        { success: false, message: 'Some products do not exist in the database' },
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
          connect: { id: decoded.id }
        },
        adresse: user.adresse ?? null,
        ville: user.ville ?? null,
        codePostal: user.codePostal ?? null,
        telephone: user.telephone ?? null,
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

    console.log('Order created successfully:', order.id);

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