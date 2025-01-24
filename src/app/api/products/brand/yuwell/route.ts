import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET() {
  try {

    // Fetch all CPAP products (regardless of brand)
    const cpapProducts = await prisma.product.findMany({
      where: {
        category: {
          equals: 'CPAP',
          mode: 'insensitive',
        },
      },
      include: {
        media: true,
      },
    });

    // Fetch Yuwell-branded masks and oxygen products
    const yuwellProducts = await prisma.product.findMany({
      where: {
        brand: {
          equals: 'Yuwell',
          mode: 'insensitive',
        },
        category: {
          in: ['MASKS', 'OXYGEN'], // Adjust categories as needed
        },
      },
      include: {
        media: true,
      },
    });


    // Combine the results
    const products = [...cpapProducts, ...yuwellProducts];

    if (!products.length) {
      return NextResponse.json([], { status: 200 });
    }

    // Convert products to a safe format for JSON serialization
    const safeProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      media: product.media,
    }));

    return NextResponse.json(safeProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}