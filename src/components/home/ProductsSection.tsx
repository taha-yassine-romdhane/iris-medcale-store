'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Product } from '@/types/product';
import { createProductSlug } from '@/utils/slugify';
import MobileProductGrid from './MobileProductGrid';

interface CategoryProducts {
  cpap: Product[];
  masks: Product[];
  oxygen: Product[];
}

const orderedProducts = {
  cpap: ['YH-680', 'YH-450', 'YH-550', 'AirSense 10 Elite', 'Prisma Smart Basic'],
  masks: ['YF-02', 'YN-03', 'YP-01', 'AirFit F20', 'AirFit F30'],
  oxygen: ['8F-5', '8F-10', 'Spirit 6', 'Spirit 3'],
};

export default function ProductsSection() {
  const [products, setProducts] = useState<CategoryProducts>({
    cpap: [],
    masks: [],
    oxygen: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const sliderRefs = {
    cpap: useRef<HTMLDivElement | null>(null),
    masks: useRef<HTMLDivElement | null>(null),
    oxygen: useRef<HTMLDivElement | null>(null)
  };

  const { t, language } = useTranslation();

  const getTranslatedContent = (product: Product, field: keyof Product) => {
    if (!product.translations?.length) return product[field];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translation: any = product.translations.find(
      (t) => t.language.toLowerCase() === language.toLowerCase()
    );

    if (field === 'features') {
      return translation?.features || product?.features || {};
    }

    return translation?.[field] || product[field];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?limit=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data || !data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid data format received from API');
        }

        const categorizedProducts = {
          cpap: orderedProducts.cpap
            .map(name => data.products.find((p: Product) =>
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.type?.toLowerCase() === 'fixe' || p.type?.toLowerCase()?.includes('auto-pilote'))
            ))
            .filter((p): p is Product => p !== undefined),

          masks: orderedProducts.masks
            .map(name => data.products.find((p: Product) =>
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.category?.toLowerCase() === 'masques' || p.type?.toLowerCase()?.includes('masque'))
            ))
            .filter((p): p is Product => p !== undefined),

          oxygen: orderedProducts.oxygen
            .map(name => data.products.find((p: Product) =>
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.category?.toLowerCase() === 'concentrateur d\'oxygene' || p.type == '5 LITRES' || p.type == '10 LITRES' || p.type?.toLowerCase()?.includes('portable'))
            ))
            .filter((p): p is Product => p !== undefined)
        };

        setProducts(categorizedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = (direction: 'left' | 'right', refKey: keyof typeof sliderRefs) => {
    const container = sliderRefs[refKey].current;
    if (!container) return;

    const cardWidth = Math.min(window.innerWidth * 0.75, 300);
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const ProductSlider = ({ title, products, refKey }: { title: string, products: Product[], refKey: keyof CategoryProducts }) => {
    const { addToCart } = useCart();

    if (isMobile) {
      return <MobileProductGrid products={products} title={title} />;
    }

    return (
      <div className="mb-12 last:mb-0">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t(`productsSection.${title}`)}
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => handleScroll('left', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t('productsSection.scrollLeft')}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleScroll('right', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t('productsSection.scrollRight')}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Slider */}
        <div className="px-4">
          <div
            ref={sliderRefs[refKey]}
            className="flex w-full gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[260px] min-w-[260px] snap-start"
              >
                {/* Product Card */}
                <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-emerald-200 transition-all duration-200 overflow-hidden h-full flex flex-col">
                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock === 'IN_STOCK'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : product.stock === 'LOW_STOCK'
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          : product.stock === 'PRE_ORDER'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : product.stock === 'COMING_SOON'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                      {product.stock === 'IN_STOCK'
                        ? t('productsSection.products.inStock')
                        : product.stock === 'LOW_STOCK'
                          ? t('productsSection.products.lowStock')
                          : product.stock === 'PRE_ORDER'
                            ? t('productsSection.products.preOrder')
                            : product.stock === 'COMING_SOON'
                              ? t('productsSection.products.comingSoon')
                              : t('productsSection.products.outOfStock')
                      }
                    </div>
                  </div>

                  {/* Product Image */}
                  <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                      {product.media && product.media[0] && (
                        <Image
                          src={product.media[0].url}
                          alt={product.name}
                          sizes="260px"
                          fill
                          className="object-contain p-6 hover:scale-105 transition-transform duration-200"
                        />
                      )}
                    </div>
                  </Link>

                  {/* Content - Flex grow to fill space */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Title - Fixed height */}
                    <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                      <div className="h-12 mb-3">
                        <h3 className="font-semibold text-gray-900 hover:text-emerald-700 transition-colors line-clamp-2 leading-tight text-sm">
                          {getTranslatedContent(product, 'name')}
                        </h3>
                      </div>
                    </Link>

                    {/* Description - Fixed height */}
                    <div className="h-10 mb-4">
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {getTranslatedContent(product, 'description')}
                      </p>
                    </div>

                    {/* Add to Cart Button - Pushed to bottom */}
                    <div className="mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                        className={`w-full font-medium text-sm px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                          product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                            ? "bg-gray-900 hover:bg-emerald-800 text-white shadow-sm hover:shadow-md"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK'
                          ? t('productsSection.products.addToCart')
                          : product.stock === 'PRE_ORDER'
                            ? t('productsSection.products.preOrder')
                            : product.stock === 'COMING_SOON'
                              ? t('productsSection.products.comingSoon')
                              : t('productsSection.products.outOfStock')
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="px-4">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-16 bg-red-50 rounded-lg border border-red-200">
            <div className="text-lg font-medium">{error}</div>
          </div>
        ) : (
          <>
            <ProductSlider title="cpap" products={products.cpap} refKey="cpap" />
            <ProductSlider title="masks" products={products.masks} refKey="masks" />
            <ProductSlider title="oxygen" products={products.oxygen} refKey="oxygen" />
          </>
        )}
      </div>
    </div>
  );
}