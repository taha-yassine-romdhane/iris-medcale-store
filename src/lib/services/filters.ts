import { prisma } from '@/lib/db';

export async function getFilters() {
  try {
    // Get unique categories, brands, types, and subcategories in parallel
    const [categories, brands, types, subcategories] = await Promise.all([
      prisma.product.findMany({
        distinct: ['category'],
        select: { category: true },
        orderBy: { category: 'asc' },
      }),
      prisma.product.findMany({
        distinct: ['brand'],
        select: { brand: true },
        orderBy: { brand: 'asc' },
      }),
      prisma.product.findMany({
        distinct: ['type'],
        select: { type: true },
        orderBy: { type: 'asc' },
      }),
      prisma.product.findMany({
        distinct: ['subCategory'],
        select: { subCategory: true },
        where: { subCategory: { not: null } },
        orderBy: { subCategory: 'asc' },
      }),
    ]);

    return {
      categories: categories.map((c) => c.category),
      brands: brands.map((b) => b.brand),
      types: types.map((t) => t.type),
      subcategories: subcategories
        .map((s) => s.subCategory)
        .filter((s): s is string => s !== null),
    };
  } catch (error) {
    console.error('Error in getFilters:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return {
      categories: [],
      brands: [],
      types: [],
      subcategories: [],
    };
  }
}

export async function getCategoryTypeRelations() {
  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      orderBy: {
        category: 'asc',
      },
    });

    const relations = await Promise.all(
      categories.map(async (cat) => {
        const [types, subcategories] = await Promise.all([
          prisma.product.findMany({
            where: { category: cat.category },
            select: { type: true },
            distinct: ['type'],
            orderBy: { type: 'asc' },
          }),
          prisma.product.findMany({
            where: { 
              category: cat.category,
              subCategory: { not: null }
            },
            select: { subCategory: true },
            distinct: ['subCategory'],
            orderBy: { subCategory: 'asc' },
          })
        ]);

        return {
          category: cat.category,
          types: types.map(t => t.type),
          subcategories: subcategories
            .map(s => s.subCategory)
            .filter((s): s is string => s !== null)
        };
      })
    );

    return relations;
  } catch (error) {
    console.error('Error in getCategoryTypeRelations:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return [];
  }
}
