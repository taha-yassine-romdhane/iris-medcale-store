import { StockStatus } from '@/types/product';
import { prisma } from '../db';
import { Prisma } from '@prisma/client';


const buildSearchFilter = (search: string): Prisma.ProductWhereInput => ({
  OR: [
    { name: { contains: search, mode: 'insensitive' } },
    { description: { contains: search, mode: 'insensitive' } },
    { brand: { contains: search, mode: 'insensitive' } },
    { type: { contains: search, mode: 'insensitive' } },
    { category: { contains: search, mode: 'insensitive' } }
  ]
});

export async function getAllProducts(
  category?: string,
  type?: string,
  subcategory?: string,
  brand?: string,
  offset: number = 0,
  limit: number = 12,
  search?: string
) {
  // Build where clause
  const where: Prisma.ProductWhereInput = {
    AND: [
      ...(category ? [{ category }] : []),
      ...(type ? [{ type }] : []),
      ...(subcategory ? [{ subCategory: subcategory }] : []),
      ...(brand ? [{ brand }] : []),
      ...(search ? [buildSearchFilter(search)] : [])
    ]
  };

  // Get products with pagination
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        reviews: true,
        media: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    }),
    prisma.product.count({ where })
  ]);

  // Format products
  const formattedProducts = products.map(product => ({
    ...product,
    media: product.media.map(media => ({
      ...media,
      type: media.type || 'image',
      alt: media.alt || product.name,
    }))
  }));

  return {
    products: formattedProducts,
    total
  };
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: true,
      media: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  });

  if (!product) return null;

  // Parse features
  return {
    ...product,
    features: typeof product.features === 'string'
      ? JSON.parse(product.features)
      : Array.isArray(product.features)
        ? product.features
        : []
  };
}

export async function createProduct(data: {
  name: string;
  brand: string;
  type: string;
  description: string;
  category: string;
  subCategory?: string;
  stock?: StockStatus;
  features?: string[] | string;
  media?: {
    url: string;
    type: string;
    alt?: string;
    order: number;
  }[];
}) {
  // Handle features array
  const features = Array.isArray(data.features) 
    ? data.features 
    : typeof data.features === 'string'
      ? data.features.startsWith('[') 
        ? JSON.parse(data.features)
        : [data.features]
      : [];

  return prisma.product.create({
    data: {
      name: data.name,
      brand: data.brand,
      type: data.type,
      description: data.description,
      category: data.category,
      subCategory: data.subCategory,
      stock: data.stock || StockStatus.IN_STOCK,
      features,
      media: data.media ? {
        create: data.media.map(m => ({
          url: m.url,
          type: m.type,
          alt: m.alt,
          order: m.order
        }))
      } : undefined,
    },
    include: {
      media: {
        orderBy: {
          order: 'asc'
        }
      },
      reviews: true
    }
  });
}

export async function updateProduct(id: string, data: {
  name?: string;
  brand?: string;
  type?: string;
  image?: string;
  description?: string;
  features?: string[] | string;
  category?: string;
  inStock?: boolean;
}) {
  // Ensure features is stored as JSON if provided
  const features = data.features ? 
    (Array.isArray(data.features) ? data.features : 
     typeof data.features === 'string' ? 
       (data.features.startsWith('[') ? JSON.parse(data.features) : [data.features]) :
     []) 
    : undefined;

  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      features: features
    },
    include: {
      media: {
        orderBy: {
          order: 'asc'
        }
      },
      reviews: true
    }
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id }
  });
}

export async function addProductReview(productId: string, data: {
  rating: number;
  comment?: string;
  userName: string;
}) {
  return prisma.review.create({
    data: {
      ...data,
      product: {
        connect: { id: productId }
      }
    }
  });
}