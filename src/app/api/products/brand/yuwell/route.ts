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
        }
      },
      include: {
        media: true
      }
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
      description: product.description,
      brand: product.brand,
      category: product.category,
      price: product.price,
      media: product.media
    }));

    console.log('Returning products:', safeProducts);
    return NextResponse.json(safeProducts);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
