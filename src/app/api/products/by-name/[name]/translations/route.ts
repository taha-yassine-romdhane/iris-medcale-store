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
    // First, find the product with the matching slugified name
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true
      }
    });

    // Filter products where the slugified name matches the requested slug
    const matchingProducts = products.filter(product => 
      slugify(product.name) === name
    );

    // If no product found
    if (matchingProducts.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // If multiple products found, use the first one but log a warning
    if (matchingProducts.length > 1) {
      console.warn(`Multiple products found with name slug: ${name}`, 
        matchingProducts.map(p => ({ id: p.id, name: p.name })));
    }

    const productId = matchingProducts[0].id;

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
    console.error('Error fetching product translations by name:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
