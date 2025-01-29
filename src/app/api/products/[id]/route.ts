import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {  StockStatus } from '@/types/product';
import { UTApi } from 'uploadthing/server';
import { z } from 'zod';

const utapi = new UTApi();

// Validation schema for media
const mediaSchema = z.object({
  url: z.string().url(),
  type: z.enum(['image', 'video']),
  alt: z.string().optional(),
  order: z.number().int().nonnegative()
});

// Validation schema for product updates
const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  category: z.string().min(1).optional(),
  subCategory: z.string().nullish(), // Allow null or undefined
  stock: z.nativeEnum(StockStatus).optional(),
  media: z.array(mediaSchema).optional()
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  // Await the params object before destructuring
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        media: {
          orderBy: {
            order: 'asc',
          },
        },
        translations: true,
      },
    });

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
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params object before destructuring
  const { id } = await params;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { media: true }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const data = await request.json();

    // Validate input data
    const validatedData = productUpdateSchema.parse(data);

    // Handle media updates if present
    if (validatedData.media && existingProduct.media.length > 0) {
      const oldMediaUrls = existingProduct.media.map((media) => media.url);
      try {
        await utapi.deleteFiles(oldMediaUrls);
      } catch (error) {
        console.error('Failed to delete old media files:', error);
        // Continue with update even if media deletion fails
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...validatedData,
        media: validatedData.media ? {
          deleteMany: {},
          create: validatedData.media.map((media) => ({
            url: media.url,
            type: media.type,
            alt: media.alt || '',
            order: media.order
          }))
        } : undefined,
        updatedAt: new Date()
      },
      include: {
        media: true
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params object before destructuring
  const { id } = await params;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { media: true }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete media files from UploadThing
    if (existingProduct.media.length > 0) {
      const mediaUrls = existingProduct.media.map((media) => media.url);
      try {
        await utapi.deleteFiles(mediaUrls);
      } catch (error) {
        console.error('Failed to delete media files:', error);
        // Continue with deletion even if media deletion fails
      }
    }

    // Delete the product and all related data
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}