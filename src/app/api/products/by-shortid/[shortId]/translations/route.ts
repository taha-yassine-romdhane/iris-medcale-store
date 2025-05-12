import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  // Await the params object before destructuring
  const { shortId } = await params;
  
  try {
    // First, find the product with the matching shortId
    const products = await prisma.product.findMany({
      where: {
        id: {
          startsWith: shortId
        }
      },
      select: {
        id: true
      },
      take: 1
    });

    // If no product found
    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productId = products[0].id;

    // Now fetch the translations for this product
    const translations = await prisma.productTranslation.findMany({
      where: {
        productId: productId
      }
    });

    return NextResponse.json(translations);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching product translations by shortId:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
