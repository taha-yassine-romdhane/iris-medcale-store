'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const { t, language } = useTranslation(); // Use the translation hook

  const getTranslatedContent = (product: Product, field: keyof Product) => {
    if (!product.translations?.length) return product[field];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translation : any = product.translations.find(
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

    const cardWidth = Math.min(window.innerWidth * 0.75, 300); // Match the card width from CSS
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
      <div className="mb-12 last:mb-0 overflow-hidden">
        {/* Title */}
        <div className="flex justify-between items-center mb-6 px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-green-900">{t(`productsSection.${title}`)}</h2> {/* Translate the title */}
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop arrows - above the slider */}
          <div className="hidden sm:flex gap-3 absolute -top-12 right-6">
            <button
              onClick={() => handleScroll('left', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 border border-green-200 shadow-sm hover:bg-green-100 hover:border-green-300 transition-all duration-200"
              aria-label={t('productsSection.scrollLeft')}
            >
              <ChevronLeft className="w-5 h-5 text-green-900" />
            </button>
            <button
              onClick={() => handleScroll('right', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 border border-green-200 shadow-sm hover:bg-green-100 hover:border-green-300 transition-all duration-200"
              aria-label={t('productsSection.scrollRight')}
            >
              <ChevronRight className="w-5 h-5 text-green-900" />
            </button>
          </div>

          {/* Product Slider */}
          <div className="w-full overflow-hidden px-4">
            <div
              ref={sliderRefs[refKey]}
              className="flex w-full gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-5 px-2"
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
                  className="flex-none w-[calc(50%-8px)] sm:w-[240px] min-w-[150px] bg-gradient-to-r from-green-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group snap-start"
                >
                  <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                      {product.media && product.media[0] && (
                        <Image
                          src={product.media[0].url}
                          alt={product.name}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          product.stock === 'IN_STOCK'
                            ? 'bg-green-100 text-green-800'
                            : product.stock === 'LOW_STOCK'
                            ? 'bg-yellow-100 text-yellow-800'
                            : product.stock === 'PRE_ORDER'
                            ? 'bg-orange-100 text-orange-800'
                            : product.stock === 'COMING_SOON'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                            product.stock === 'IN_STOCK'
                            ? "bg-green-500"
                            : product.stock === 'LOW_STOCK'
                            ? "bg-yellow-500"
                            : product.stock === 'PRE_ORDER'
                            ? "bg-orange-500"
                            : product.stock === 'COMING_SOON'
                            ? "bg-blue-500"
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
                            : t('productsSection.products.outOfStock')}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 sm:p-5">
                    <Link href={`/product/${createProductSlug(product.name)}`} className="block group-hover:text-green-700 transition-colors duration-200">
                      <h3 className="font-semibold text-base sm:text-lg mb-2 text-green-900">{getTranslatedContent(product, 'name')}</h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-green-800/70 mb-4 line-clamp-2">
                      {getTranslatedContent(product, 'description')}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/product/${product.id}`}
                        className="text-green-700 hover:text-green-800 font-medium text-xs sm:text-sm transition-colors duration-200"
                      >
                        {t('productsSection.viewDetails')}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          product.stock === 'IN_STOCK'
                            ? "bg-green-800 hover:bg-green-900 text-white"
                            : product.stock === 'LOW_STOCK'
                            ? "bg-green-800 hover:bg-green-900 text-white"
                            : product.stock === 'PRE_ORDER'
                            ? "bg-green-800 hover:bg-green-900 text-white"
                            : product.stock === 'COMING_SOON'
                            ? "bg-green-500 text-white cursor-not-allowed opacity-60"
                            : "bg-green-500 text-white cursor-not-allowed opacity-60"
                        }`}
                      >
                        {product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK'
                          ? t('productsSection.products.addToCart')
                          : product.stock === 'PRE_ORDER'
                          ? t('productsSection.products.preOrder')
                          : product.stock === 'COMING_SOON'
                          ? t('productsSection.products.comingSoon')
                          : t('productsSection.products.outOfStock')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto bg-white rounded-2xl p-4 sm:p-8 my-8 sm:my-12 w-full">
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <>
          <ProductSlider title="cpap" products={products.cpap} refKey="cpap" />
          <ProductSlider title="masks" products={products.masks} refKey="masks" />
          <ProductSlider title="oxygen" products={products.oxygen} refKey="oxygen" />
          <ProductSlider title="lits" products={products.lits} refKey="lits" />
        </>
      )}
    </div>
  );
}