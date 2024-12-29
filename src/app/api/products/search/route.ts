import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        media: true,
      },
      take: 10, // Limit results to 10 items
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
