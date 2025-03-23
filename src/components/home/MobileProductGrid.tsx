import Image from "next/image";
import Link from "next/link";
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

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
    const translation : any = product.translations.find(
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

    const cardWidth = Math.min(window.innerWidth * 0.75, 300);
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mb-3">
      {/* Title and Navigation */}
      <div className="flex justify-between items-center mb-1 px-4">
        <h2 className="text-xl font-bold text-blue-900">{t(`productsSection.${title}`)}</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
            aria-label={t('productsSection.scrollLeft')}
          >
            <ChevronLeft className="w-4 h-4 text-blue-900" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
            aria-label={t('productsSection.scrollRight')}
          >
            <ChevronRight className="w-4 h-4 text-blue-900" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-1 px-4"
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
              className="flex-none w-[calc(50%-8px)] min-w-[150px] bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group snap-start"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {product.media && product.media[0] && (
                    <Image
                      src={product.media[0].url}
                      alt={getTranslatedContent(product, 'name')}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-1 right-1">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
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

              <div className="p-1.5">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-medium text-blue-900 text-sm line-clamp-1 mb-0.5">
                    {getTranslatedContent(product, 'name')}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1 mb-1">
                    {getTranslatedContent(product, 'description')}
                  </p>
                </Link>
                <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                        className={`w-full px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                          product.stock === 'IN_STOCK'
                            ? "bg-blue-800 hover:bg-blue-900 text-white"
                            : product.stock === 'LOW_STOCK'
                            ? "bg-blue-800 hover:bg-blue-900 text-white"
                            : product.stock === 'PRE_ORDER'
                            ? "bg-blue-800 hover:bg-blue-900 text-white"
                            : product.stock === 'COMING_SOON'
                            ? "bg-blue-500 text-white cursor-not-allowed opacity-60"
                            : "bg-blue-500 text-white cursor-not-allowed opacity-60"
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
          ))}
        </div>
      </div>
    </div>
  );
}
