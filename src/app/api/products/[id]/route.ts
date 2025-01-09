import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';
import prisma from '@/lib/prisma';
import { Media } from '@/types/product';
import { UTApi } from 'uploadthing/server';

// Initialize UploadThing with the API key from .env
const utapi = new UTApi();

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch the existing product and its associated media
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { media: true }, // Include related media
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Extract old media URLs
    const oldMediaUrls = existingProduct.media.map((media) => media.url);

    // Delete old media files from UploadThing
    if (oldMediaUrls.length > 0) {
      const deleteResults = await utapi.deleteFiles(oldMediaUrls);

      // Log delete results for debugging
      console.log('UploadThing delete results:', deleteResults);

      if (!deleteResults.success) {
        throw new Error('Failed to delete old media files from UploadThing');
      }
    }

    // Parse the request body
    const data = await request.json();

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        brand: data.brand,
        type: data.type,
        description: data.description,
        features: Array.isArray(data.features) ? data.features : [],
        category: data.category,
        subCategory: data.subCategory,
        inStock: data.inStock,
        media: data.media
          ? {
              deleteMany: {}, // Delete all existing media
              create: data.media.map((media: Media, index: number) => ({
                url: media.url,
                type: media.type,
                alt: media.alt || `Media ${index + 1}`,
                order: index,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(updatedProduct);
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch the existing product and its associated media
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { media: true }, // Include related media
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Extract old media URLs
    const oldMediaUrls = existingProduct.media.map((media) => media.url);

    // Delete old media files from UploadThing
    if (oldMediaUrls.length > 0) {
      const deleteResults = await utapi.deleteFiles(oldMediaUrls);

      // Log delete results for debugging
      console.log('UploadThing delete results:', deleteResults);

      if (!deleteResults.success) {
        throw new Error('Failed to delete old media files from UploadThing');
      }
    }

    // Parse the request body
    const data = await request.json();

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        media: data.media
          ? {
              deleteMany: {}, // Delete all existing media
              create: data.media.map((media: any, index: number) => ({
                url: media.url,
                type: media.type,
                alt: media.alt || `Media ${index + 1}`,
                order: index,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(updatedProduct);
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch the product and its associated media
    const product = await prisma.product.findUnique({
      where: { id },
      include: { media: true }, // Include related media
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Extract media URLs
    const mediaUrls = product.media.map((media) => media.url);

    // Log media URLs for debugging
    console.log('Media URLs to delete:', mediaUrls);

    // Extract file keys from URLs
    const fileKeys = mediaUrls.map((url) => {
      const parts = url.split('/');
      return parts[parts.length - 1]; // Extract the file key
    });

    // Log file keys for debugging
    console.log('File keys to delete:', fileKeys);

    // Delete the product from the database
    await prisma.product.delete({
      where: { id },
    });

    // Delete associated images from UploadThing
    if (fileKeys.length > 0) {
      const deleteResults = await utapi.deleteFiles(fileKeys);

      // Log delete results for debugging
      console.log('UploadThing delete results:', deleteResults);

      if (!deleteResults.success) {
        throw new Error('Failed to delete files from UploadThing');
      }
    }

    return NextResponse.json({
      message: 'Product and associated media deleted successfully',
    });
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