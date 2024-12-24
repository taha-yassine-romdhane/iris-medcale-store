import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET() {
  try {
    console.log('Attempting to fetch Yuwell products...');
    
    const products = await prisma.product.findMany({
      where: {
        brand: {
          equals: 'Yuwell',
          mode: 'insensitive'
        },
          category: {
            equals: 'cpap',
            mode: 'insensitive'
          },
      },
    });

    
    console.log('Raw products from database:', products);

    if (!products) {
      console.log('No products found - returning empty array');
      return NextResponse.json([], { status: 200 });
    }

    // Convert products to a safe format for JSON serialization
    const safeProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      type: product.type,
      description: product.description,
      price: product.price.toString(),
      features: product.features,
      category: product.category,
    }));

    console.log('Serialized products:', safeProducts);

    // Get media for these products
    const productsWithMedia = await Promise.all(
      safeProducts.map(async (product) => {
        const media = await prisma.media.findMany({
          where: { productId: product.id },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            url: true,
            type: true,
            alt: true,
            order: true,
          },
        });

        return {
          ...product,
          media,
        };
      })
    );

    console.log('Final response:', productsWithMedia);

    return new NextResponse(JSON.stringify(productsWithMedia), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Detailed error:', error);
    
    const errorResponse = {
      error: 'Failed to fetch Yuwell products',
      details: error instanceof Error ? error.message : 'Unknown error',
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
