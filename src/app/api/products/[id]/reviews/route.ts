import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as ProductService from '@/lib/services/products';

interface Context {
  params: { id: string };
}

export async function POST(
  request: NextRequest,
  context: Context
) {
  try {
    const data = await request.json();
    const { id } = context.params;

    const review = await ProductService.addProductReview(id, data);

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    );
  }
}