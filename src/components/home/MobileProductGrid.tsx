import Image from "next/image";
import Link from "next/link";
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
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

    const cardWidth = Math.min(window.innerWidth * 0.75, 300);
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // Dynamic color schemes for different categories
  const getColorScheme = (categoryTitle: string) => {
    const schemes = {
      cpap: {
        gradient: 'from-green-500/20 via-green-500/10 to-green-500/20',
        accent: 'green',
        textGradient: 'from-green-600 to-green-700',
        button: 'from-green-600 to-green-700',
        border: 'green'
      },
      masks: {
        gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
        accent: 'cyan',
        textGradient: 'from-cyan-600 to-blue-700',
        button: 'from-cyan-600 to-blue-700',
        border: 'blue'
      },
      oxygen: {
        gradient: 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
        accent: 'emerald',
        textGradient: 'from-emerald-600 to-teal-700',
        button: 'from-emerald-600 to-teal-700',
        border: 'green'
      },
      lits: {
        gradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
        accent: 'orange',
        textGradient: 'from-orange-600 to-amber-700',
        button: 'from-orange-600 to-amber-700',
        border: 'orange'
      }
    };
    return schemes[categoryTitle as keyof typeof schemes] || schemes.cpap;
  };

  const colorScheme = getColorScheme(title);

  return (
    <div className="mb-8 relative">
      {/* Dynamic Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} rounded-3xl opacity-50`}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3),transparent_40%)] rounded-3xl"></div>
      
      <div className={`relative backdrop-blur-sm bg-white/30 rounded-3xl border border-${colorScheme.border}-400 shadow-xl p-4`}>
        {/* Modern Header with Floating Elements */}
        <div className="flex justify-between items-center mb-6 relative">
          <div className="flex items-center gap-3">
            {/* Animated Icon */}
         
            
            {/* Gradient Title */}
            <h2 className={`text-xl font-black bg-gradient-to-r ${colorScheme.textGradient} bg-clip-text text-transparent`}>
              {t(`productsSection.${title}`)}
            </h2>
          </div>

          {/* Floating Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              className={`w-10 h-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-${colorScheme.border}-600 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300`}
              aria-label={t('productsSection.scrollLeft')}
            >
              <ChevronLeft className={`w-4 h-4 text-${colorScheme.accent}-700`} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className={`w-10 h-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-${colorScheme.border}-600 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300`}
              aria-label={t('productsSection.scrollRight')}
            >
              <ChevronRight className={`w-4 h-4 text-${colorScheme.accent}-700`} />
            </button>
          </div>
        </div>

        {/* Redesigned Cards Container */}
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1"
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
                className="group flex-none w-[160px] min-w-[160px] snap-start"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Neo-morphism Style Card */}
                <div className={`relative bg-white/60 backdrop-blur-xl rounded-3xl border border-${colorScheme.border}-400  transition-all duration-500 overflow-hidden group-hover:scale-105`}>
                  {/* Glowing Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.button} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
                  
                  {/* Product Image Section */}
                  <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden rounded-t-3xl">
                      {product.media && product.media[0] && (
                        <Image
                          src={product.media[0].url}
                          alt={getTranslatedContent(product, 'name')}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          fill
                          className="object-contain p-4 group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                        />
                      )}
                      
                      {/* Floating Stock Badge */}
                      <div className="absolute top-2 right-2">
                        <div className={`backdrop-blur-md rounded-2xl px-2 py-1 text-[10px] font-bold shadow-lg ${
                          product.stock === 'IN_STOCK'
                            ? `bg-${colorScheme.border}-500/30 text-${colorScheme.border}-900 border border-${colorScheme.border}-400/40`
                            : product.stock === 'LOW_STOCK'
                            ? `bg-${colorScheme.border}-500/30 text-${colorScheme.border}-900 border border-${colorScheme.border}-400/40`
                            : product.stock === 'PRE_ORDER'
                            ? `bg-${colorScheme.border}-500/30 text-${colorScheme.border}-900 border border-${colorScheme.border}-400/40`
                            : product.stock === 'COMING_SOON'
                            ? `bg-${colorScheme.border}-500/30 text-${colorScheme.border}-900 border border-${colorScheme.border}-400/40`
                            : `bg-${colorScheme.border}-500/30 text-${colorScheme.border}-900 border border-${colorScheme.border}-400/40`
                        }`}>
                          <div className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              product.stock === 'IN_STOCK' ? `bg-${colorScheme.border}-600`
                              : product.stock === 'LOW_STOCK' ? `bg-${colorScheme.border}-600`
                              : product.stock === 'PRE_ORDER' ? `bg-${colorScheme.border}-600`
                              : product.stock === 'COMING_SOON' ? `bg-${colorScheme.border}-600`
                              : `bg-${colorScheme.border}-600`
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
                          </div>
                        </div>
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Content Section with Floating Design */}
                  <div className="relative p-3 space-y-3">
                    <Link href={`/product/${createProductSlug(product.name)}`} className="block">
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
                        {getTranslatedContent(product, 'name')}
                      </h3>
                      <p className="text-xs text-gray-600/80 line-clamp-2 mt-1 leading-relaxed">
                        {getTranslatedContent(product, 'description')}
                      </p>
                    </Link>
                    
                    {/* Modern CTA Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                      className={`group/btn w-full py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-300 relative overflow-hidden ${
                        product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                          ? `bg-gradient-to-r ${colorScheme.button} text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`
                          : "bg-gray-300/60 text-gray-500 cursor-not-allowed backdrop-blur-sm"
                      }`}
                    >
                      {/* Button Shine Effect */}
                      {(product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER') && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      )}
                      
                      <div className="relative flex items-center justify-center gap-1.5">
                        <Plus className={`w-3 h-3 ${
                          product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                            ? "group-hover/btn:rotate-90"
                            : ""
                        } transition-transform duration-300`} />
                        {product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK'
                          ? t('productsSection.products.addToCart')
                          : product.stock === 'PRE_ORDER'
                          ? t('productsSection.products.preOrder')
                          : product.stock === 'COMING_SOON'
                          ? t('productsSection.products.comingSoon')
                          : t('productsSection.products.outOfStock')}
                      </div>
                    </button>
                  </div>

                  {/* Floating Accent Dots */}
                  <div className="absolute top-1/2 left-1 w-1 h-8 flex flex-col gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
                    <div className={`w-1 h-1 rounded-full bg-${colorScheme.accent}-500 animate-pulse`}></div>
                    <div className={`w-1 h-1 rounded-full bg-${colorScheme.accent}-400 animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`w-1 h-1 rounded-full bg-${colorScheme.accent}-300 animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
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