import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';
import prisma from '@/lib/prisma';
import { Media } from '@/types/product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  // Await the params object before destructuring
  const { id } = await params;
  try {
    const product = await ProductService.getProductById(id);

    if (!product) {
      console.warn('Product not found for ID:', id); // Log a warning if product is not found
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching product:', error); // Log the error
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  // Await the params object before destructuring
  const { id } = await params;

  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        brand: data.brand,
        type: data.type,
        description: data.description,
        price: parseFloat(data.price),
        features: Array.isArray(data.features) ? data.features : [],
        category: data.category,
        subCategory: data.subCategory,
        inStock: data.inStock,
        media: data.media
          ? {
              deleteMany: {},
              create: data.media.map((media: Media) => ({
                url: media.url,
                type: media.type,
                alt: media.alt,
                order: media.order,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update product';
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  // Await the params object before destructuring
  const { id } = await params;

  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(product);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error updating product';
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  // Await the params object before destructuring
  const { id } = await params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error deleting product';
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}