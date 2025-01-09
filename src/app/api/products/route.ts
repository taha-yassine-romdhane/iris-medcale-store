import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';

export async function POST(request: Request) {
  try {
    let data;
    try {
      data = await request.json(); 
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    if (data.media && !Array.isArray(data.media)) {
      return NextResponse.json(
        { error: 'Media must be an array of objects with `url` and `type` properties' },
        { status: 400 }
      );
    }

    // Create the product in the database
    const product = await ProductService.createProduct({
      ...data,
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true, 
      features: Array.isArray(data.features) ? data.features : [], 
      media: data.media || [], 
    });

    // Return the created product
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    // Calculate offset
    const offset = (page - 1) * limit;

    // Fetch products with pagination
    const { products, total } = await ProductService.getAllProducts(
      category || undefined,
      type || undefined,
      brand || undefined,
      offset,
      limit,
      search || undefined
    );

    // Format the products
    const formattedProducts = products.map((product) => ({
      ...product,
      media: Array.isArray(product.media)
        ? product.media.map((media) => ({
            url: media.url,
            type: media.type || 'image',
            alt: media.alt || product.name,
            order: media.order || 0,
          }))
        : [],
      features: (() => {
        try {
          if (typeof product.features === 'string') {
            return JSON.parse(product.features);
          }
          return Array.isArray(product.features) ? product.features : [];
        } catch {
          return [];
        }
      })(),
    }));

    // Return products with pagination metadata
    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}