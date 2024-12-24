import { prisma } from '../db';

export async function getAllProducts(category?: string, type?: string) {
  return prisma.product.findMany({
    where: {
      AND: [
        category ? { category: category } : {},
        type ? { type: type } : {}
      ]
    },
    include: {
      reviews: true,
      media: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
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
}

export async function createProduct(data: {
  name: string;
  brand: string;
  type: string;
  image: string;
  description: string;
  price: number;
  features: string[];
  category: string;
  media?: {
    url: string;
    type: string;
    alt?: string;
    order: number;
  }[];
}) {
  return prisma.product.create({
    data: {
      ...data,
      price: data.price,
      media: data.media ? {
        create: data.media
      } : undefined
    },
    include: {
      media: true,
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
  price?: number;
  features?: string[];
  category?: string;
  inStock?: boolean;
}) {
  return prisma.product.update({
    where: { id },
    data,
    include: {
      media: true,
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
