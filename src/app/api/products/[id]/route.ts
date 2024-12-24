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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<Product> = await request.json();
    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        brand: body.brand,
        type: body.type,
        description: body.description,
        price: body.price,
        category: body.category,
        subCategory: body.subCategory,
        inStock: body.inStock,
        media: body.media ? {
          deleteMany: {},
          create: body.media.map((media: any) => ({
            url: media.url,
            type: media.type,
            alt: media.alt,
            order: media.order
          }))
        } : undefined
      },
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    // Remove media from the data if it exists as we'll handle it separately
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
