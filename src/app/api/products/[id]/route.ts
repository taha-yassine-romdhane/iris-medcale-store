import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';
import prisma from '@/lib/prisma';
import { Product } from '@/types/product';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await ProductService.getProductById(params.id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    
    // Ensure features is properly formatted for JSON storage
    const features = Array.isArray(data.features) ? data.features : [];

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
        features: features,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        media: data.media ? {
          deleteMany: {},
          create: data.media
        } : undefined
      },
      include: {
        media: true,
        reviews: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { media, ...updateData } = data;
    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: updateData,
      include: {
        media: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
}
