import { NextResponse } from 'next/server';
import * as ProductService from '@/lib/services/products';

export async function POST(request: Request) {
  try {
    let data;
    try {
      data = await request.json(); 
    } catch (error) {
      console.error('Failed to parse request body:', { error: error instanceof Error ? error.message : 'Unknown error' });
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

    const product = await ProductService.createProduct({
      ...data,
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true, 
      features: Array.isArray(data.features) ? data.features : [], 
      media: data.media || [], 
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', { error: error instanceof Error ? error.message : 'Unknown error' });
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
    const subcategory = searchParams.get('subcategory');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const filters = {
      ...(category && { category }),
      ...(type && { type }),
      ...(subcategory && { subcategory }),
      ...(brand && { brand }),
      ...(search && { search }),
    };

    const pagination = {
      ...(limit && { limit }),
      ...(page && { page }),
    };

    const { products, total } = await ProductService.getAllProducts(
      filters.category,
      filters.type,
      filters.subcategory,
      filters.brand,
      pagination.page - 1,
      pagination.limit,
      filters.search
    );

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

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}