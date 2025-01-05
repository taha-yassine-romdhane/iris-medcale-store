import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as ProductService from '@/lib/services/products';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { id } = params;

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
