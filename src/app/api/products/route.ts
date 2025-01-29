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
          create: data.translations?.map((translation: { language: Language; name: string; description: string; features?: string[] | string }) => ({
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
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');

    const products = await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } },
            { type: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
            { subCategory: { contains: search, mode: 'insensitive' } },
          ],
        }),
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

    return NextResponse.json({ products });
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}