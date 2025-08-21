import Image from "next/image";
import Link from "next/link";
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useRef } from 'react';
import { createProductSlug } from '@/utils/slugify';

interface MobileProductGridProps {
  products: Product[];
  title: string;
}

export default function MobileProductGrid({ products, title }: MobileProductGridProps) {
  const { t, language } = useTranslation();
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement | null>(null);

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

  const handleScroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;

    const cardWidth = 180;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t(`productsSection.${title}`)}
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t('productsSection.scrollLeft')}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t('productsSection.scrollRight')}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Products Container */}
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar"
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
                className="flex-none w-[160px] min-w-[160px] snap-start"
              >
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow flex flex-col h-full">
                  {/* Product Image */}
                  <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden bg-white">
                      {product.media && product.media[0] && (
                        <Image
                          src={product.media[0].url}
                          alt={getTranslatedContent(product, 'name')}
                          sizes="160px"
                          fill
                          className="object-contain p-3"
                        />
                      )}
                      
                      {/* Stock Badge */}
                      <div className="absolute top-1 right-1">
                        <div className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
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
                            : t('productsSection.products.outOfStock')}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-3 flex-1 flex flex-col">
                    <Link href={`/product/${createProductSlug(product.name)}`} className="block flex-1 mb-2">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
                        {getTranslatedContent(product, 'name')}
                      </h3>
                    </Link>
                  </div>
                  
                  {/* Add to Cart Button - Outside content div */}
                  <div className="p-3 pt-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER') {
                          addToCart(product);
                        }
                      }}
                      disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                      className={`w-full py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                          ? 'bg-gray-900 hover:bg-emerald-800 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span className="truncate">
                        {product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK'
                          ? t('productsSection.products.addToCart')
                          : product.stock === 'PRE_ORDER'
                          ? t('productsSection.products.preOrder')
                          : product.stock === 'COMING_SOON'
                          ? t('productsSection.products.comingSoon')
                          : t('productsSection.products.outOfStock')}
                      </span>
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
}