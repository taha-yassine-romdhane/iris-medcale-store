import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify } from '@/utils/slugify';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  // Await the params object before destructuring
  const { name } = await params;
  
  try {
    // The name parameter will be the slugified name, so we need to find products
    // whose slugified name matches this parameter
    const products = await prisma.product.findMany({
      include: {
        media: {
          orderBy: {
            order: 'asc',
          },
        },
        translations: true,
      },
    });

    // Filter products where the slugified name matches the requested slug
    const matchingProducts = products.filter(product => 
      slugify(product.name) === name
    );

    // If no products found with this name
    if (matchingProducts.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // If multiple products found with the same slugified name, return the first one
    // In a production environment, you might want to handle this differently
    if (matchingProducts.length > 1) {
      console.warn(`Multiple products found with name slug: ${name}`, 
        matchingProducts.map(p => ({ id: p.id, name: p.name })));
    }

    return NextResponse.json(matchingProducts[0]);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching product by name:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
