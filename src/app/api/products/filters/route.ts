import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get all products to extract unique values
    const products = await prisma.product.findMany({
      select: {
        category: true,
        type: true,
        brand: true,
      },
    });

    // Extract unique values
    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    const types = Array.from(new Set(products.map(p => p.type).filter(Boolean)));
    const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));

    return NextResponse.json({
      categories: categories.sort(),
      types: types.sort(),
      brands: brands.sort(),
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
