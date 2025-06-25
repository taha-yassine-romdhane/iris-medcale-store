'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Product } from '@/types/product';
import { createProductSlug } from '@/utils/slugify';
import MobileProductGrid from './MobileProductGrid';

interface CategoryProducts {
  cpap: Product[];
  masks: Product[];
  oxygen: Product[];
  lits: Product[];
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
    oxygen: [],
    lits: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const sliderRefs = {
    cpap: useRef<HTMLDivElement | null>(null),
    masks: useRef<HTMLDivElement | null>(null),
    oxygen: useRef<HTMLDivElement | null>(null),
    lits: useRef<HTMLDivElement | null>(null)
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
            .filter((p): p is Product => p !== undefined),

          lits: data.products.filter((p: Product) =>
            p.category?.toLowerCase() === 'lit medicalise' ||
            p.type?.toLowerCase()?.includes('LIT MEDICALISE')
          ),
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
      <div className="mb-16 last:mb-0 relative">
        {/* Modern Header with Gradient Background */}
        <div className="relative mb-8 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent rounded-2xl"></div>
          <div className="relative flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 bg-clip-text text-transparent">
                {t(`productsSection.${title}`)}
              </h2>
            </div>

            {/* Modern Navigation Buttons */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => handleScroll('left', refKey)}
                className="group w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
                aria-label={t('productsSection.scrollLeft')}
              >
                <ChevronLeft className="w-5 h-5 text-emerald-700 group-hover:text-emerald-800 transition-colors" />
              </button>
              <button
                onClick={() => handleScroll('right', refKey)}
                className="group w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
                aria-label={t('productsSection.scrollRight')}
              >
                <ChevronRight className="w-5 h-5 text-emerald-700 group-hover:text-emerald-800 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Slider with Glass Morphism Cards */}
        <div className="relative px-6">
          <div
            ref={sliderRefs[refKey]}
            className="flex w-full gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group flex-none w-[280px] min-w-[280px] snap-start"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glass Morphism Card */}
                <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-emerald-700/50  transition-all duration-500 overflow-hidden group-hover:scale-[1.02] group-hover:rotate-1">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Stock Badge - Floating */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`backdrop-blur-md rounded-full px-3 py-2 text-xs font-semibold shadow-lg border ${product.stock === 'IN_STOCK'
                        ? 'bg-emerald-500/20 text-emerald-800 border-emerald-300/30'
                        : product.stock === 'LOW_STOCK'
                          ? 'bg-amber-500/20 text-amber-800 border-amber-300/30'
                          : product.stock === 'PRE_ORDER'
                            ? 'bg-orange-500/20 text-orange-800 border-orange-300/30'
                            : product.stock === 'COMING_SOON'
                              ? 'bg-blue-500/20 text-blue-800 border-blue-300/30'
                              : 'bg-red-500/20 text-red-800 border-red-300/30'
                      }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${product.stock === 'IN_STOCK' ? "bg-emerald-500"
                            : product.stock === 'LOW_STOCK' ? "bg-amber-500"
                              : product.stock === 'PRE_ORDER' ? "bg-orange-500"
                                : product.stock === 'COMING_SOON' ? "bg-blue-500"
                                  : "bg-red-500"
                          }`} />
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
                  </div>

                  {/* Product Image with Hover Effects */}
                  <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden rounded-t-3xl">
                      {product.media && product.media[0] && (
                        <Image
                          src={product.media[0].url}
                          alt={product.name}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          fill
                          className="object-contain p-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700"
                        />
                      )}
                      {/* Floating Action Buttons */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                          <Eye className="w-5 h-5 text-emerald-700" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="relative p-6 space-y-4">
                    <Link href={`/product/${createProductSlug(product.name)}`} className="block group/title">
                      <h3 className="font-bold text-lg text-gray-900 group-hover/title:text-emerald-700 transition-colors duration-200 line-clamp-2">
                        {getTranslatedContent(product, 'name')}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {getTranslatedContent(product, 'description')}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                        className={`flex-1 group/cart font-semibold text-sm px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        <ShoppingCart className={`w-4 h-4 ${product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                            ? "group-hover/cart:scale-110"
                            : ""
                          } transition-transform`} />
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
    <div className="max-w-[1400px] mx-auto relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 "></div>

      <div className="relative p-8 my-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-16 bg-red-50/50 rounded-2xl border border-red-200/50">
            <div className="text-lg font-semibold">{error}</div>
          </div>
        ) : (
          <>
            <ProductSlider title="cpap" products={products.cpap} refKey="cpap" />
            <ProductSlider title="masks" products={products.masks} refKey="masks" />
            <ProductSlider title="oxygen" products={products.oxygen} refKey="oxygen" />
            <ProductSlider title="lits" products={products.lits} refKey="lits" />
          </>
        )}
      </div>
    </div>
  );
}