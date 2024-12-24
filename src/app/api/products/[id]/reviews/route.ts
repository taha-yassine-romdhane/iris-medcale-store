import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { rating, comment } = data;

    const review = await ProductService.addProductReview(params.id, {
      rating,
      comment,
      userName: 'Anonymous', // You can add user authentication later
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
