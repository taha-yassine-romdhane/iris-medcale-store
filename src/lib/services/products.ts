import { prisma } from '../db';

type ProductWhereInput = {
  category?: {
    equals: string;
    mode: 'insensitive';
  };
  type?: {
    equals: string;
    mode: 'insensitive';
  };
  brand?: {
    equals: string;
    mode: 'insensitive';
  };
};

export async function getAllProducts(category?: string, type?: string, brand?: string) {
  const where: ProductWhereInput = {};

  if (category) {
    where.category = {
      equals: category,
      mode: 'insensitive'
    };
  }
  
  if (type) {
    where.type = {
      equals: type,
      mode: 'insensitive'
    };
  }

  if (brand) {
    where.brand = {
      equals: brand,
      mode: 'insensitive'
    };
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      reviews: true,
      media: {
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return products.map((product) => ({
    ...product,
    features: (() => {
      try {
        if (typeof product.features === 'string') {
          return JSON.parse(product.features);
        }
        return Array.isArray(product.features) ? product.features : [];
      } catch {
        console.error('Error parsing features for product:', product.id);
        return [];
      }
    })()
  }));
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
  price: number;
  category: string;
  subCategory?: string;
  inStock?: boolean;
  features?: string[] | string;
  media?: {
    url: string;
    type: string;
    alt?: string;
    order: number;
  }[];
}) {
  // Ensure features is stored as JSON
  const features = Array.isArray(data.features) ? data.features : 
                  typeof data.features === 'string' ? 
                    (data.features.startsWith('[') ? JSON.parse(data.features) : [data.features]) :
                  [];

  return prisma.product.create({
    data: {
      name: data.name,
      brand: data.brand,
      type: data.type,
      description: data.description,
      price: data.price,
      category: data.category,
      subCategory: data.subCategory,
      inStock: data.inStock ?? true,
      features: features,
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
      features: features,
      price: data.price ? Number(data.price) : undefined
    },
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