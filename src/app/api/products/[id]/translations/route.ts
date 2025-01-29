import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Language } from '@/types/product';
import { URL } from 'url'; // Node.js native module for parsing URLs

// Type for translation data
interface TranslationData {
  name: string;
  description: string;
  features?: Record<string, any>;
}

interface TranslationsBody {
  translations: {
    [key in Language]?: TranslationData;
  };
}

export async function POST(request: Request) {
  try {
    // Parse the URL to extract the `id` parameter
    const url = new URL(request.url); // Use Node.js URL module
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const id = pathSegments[pathSegments.length - 2]; // Extract the second last segment as the ID

    console.log(`Extracted product ID: ${id}`);

    if (!id) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    // Parse the request body
    const body = await request.json();
    const { translations } = body as TranslationsBody;
    console.log(`Parsed translations:`, translations);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      console.log(`Product not found for ID: ${id}`);
      return new NextResponse('Product not found', { status: 404 });
    }

    // Create new translations
    const translationPromises = Object.entries(translations).map(([lang, data]) => {
      if (!data?.name && !data?.description) return null; // Skip empty translations

      return prisma.product.update({
        where: { id },
        data: {
          translations: {
            upsert: {
              where: {
                productId_language: {
                  productId: id,
                  language: lang as Language
                }
              },
              create: {
                language: lang as Language,
                name: data.name,
                description: data.description,
                features: data.features || {}
              },
              update: {
                name: data.name,
                description: data.description,
                features: data.features || {}
              }
            }
          }
        }
      });
    });

    await Promise.all(translationPromises.filter(Boolean));

    return new NextResponse('Translations updated', { status: 200 });
  } catch (error) {
    console.error('[TRANSLATIONS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}