import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';
import prisma from '@/lib/prisma';



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = await params.id;
  try {
    const product = await ProductService.getProductById(id);
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
  const id = await params.id;
  try {
    const data = await req.json();
    
    // Ensure features is properly formatted for JSON storage
    let features = data.features;
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features);
      } catch {
        features = [];
      }
    }
    if (!Array.isArray(features)) {
      features = [];
    }

    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        brand: data.brand,
        type: data.type,
        description: data.description,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        features: features,
        category: data.category,
        subCategory: data.subCategory,
        inStock: data.inStock,
        media: data.media ? {
          deleteMany: {},
          create: data.media.map((m: any) => ({
            url: m.url,
            type: m.type,
            alt: m.alt,
            order: m.order
          }))
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
      { error: 'Failed to update product', details: error },
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
    const {...updateData } = data;
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
