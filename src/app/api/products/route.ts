import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Language } from '@/types/product';

export async function POST(request: Request) {
  try {

    const data = await request.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: data.brand,
        type: data.type,
        description: data.description,
        features: data.features || {},
        category: data.category,
        subCategory: data.subCategory,
        stock: data.stock,
        translations: {
          create: data.translations?.map((translation: any) => ({
            language: translation.language as Language,
            name: translation.name,
            description: translation.description,
            features: translation.features || {}
          }))
        }
      },
      include: {
        translations: true,
        media: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const products = await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            {
              translations: {
                some: {
                  OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                  ]
                }
              }
            }
          ]
        })
      },
      include: {
        translations: true,
        media: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}