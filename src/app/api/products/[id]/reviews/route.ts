import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as ProductService from '@/lib/services/products';

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const review = await ProductService.addProductReview(context.params.id, data);

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    );
  }
}