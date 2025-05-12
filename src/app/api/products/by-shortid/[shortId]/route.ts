import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  // Await the params object before destructuring
  const { shortId } = await params;
  
  try {
    // Find products where the ID starts with the shortId
    const products = await prisma.product.findMany({
      where: {
        id: {
          startsWith: shortId
        }
      },
      include: {
        media: {
          orderBy: {
            order: 'asc',
          },
        },
        translations: true,
      },
      take: 2, // We expect only one match, but take 2 to check for potential conflicts
    });

    // If no products found with this shortId
    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // If multiple products found (potential conflict), return the first one
    // In a production environment, you might want to handle this differently
    if (products.length > 1) {
      console.warn(`Multiple products found with shortId: ${shortId}`, 
        products.map(p => p.id));
    }

    return NextResponse.json(products[0]);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching product by shortId:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
