'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { useTranslation } from '@/contexts/TranslationContext';
import { ProductTranslation } from '@/types/product';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ProductClient() {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [translations, setTranslations] = useState<ProductTranslation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { language } = useTranslation();

  useEffect(() => {
    // Track if the component is mounted to prevent state updates after unmount
    let isMounted = true;
    
    async function fetchProduct() {
      if (!slug) return;
      
      // Set loading state when fetching starts
      setLoading(true);

      try {
        // Use AbortController to cancel fetch requests if component unmounts
        const controller = new AbortController();
        const signal = controller.signal;
        
        const [productRes, translationsRes] = await Promise.all([
          fetch(`/api/products/by-name/${slug}`, { signal }),
          fetch(`/api/products/by-name/${slug}/translations`, { signal })
        ]);

        if (!productRes.ok) throw new Error('Failed to fetch product');
        if (!translationsRes.ok) throw new Error('Failed to fetch translations');

        const [productData, translationsData] = await Promise.all([
          productRes.json(),
          translationsRes.json()
        ]);

        // Only update state if component is still mounted
        if (isMounted) {
          setProduct(productData);
          setTranslations(translationsData);
          setLoading(false);
        }
        
        return () => controller.abort();
      } catch (error: unknown) {
        // Check if the error is due to an aborted request
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching product:', error);
          // Only update state if component is still mounted
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    }

    fetchProduct();
    
    // Cleanup function to prevent memory leaks and state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [slug]); // Only depend on slug, not product
 
//eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTranslatedContent = (field: keyof Product): any => {
    if (!product) return '';
  
    // Define which fields are translatable
    const translatableFields = ['name', 'description', 'features'] as const;
    type TranslatableField = typeof translatableFields[number];
  
    // Check if the field is translatable
    const isTranslatableField = (field: keyof Product): field is TranslatableField => {
      return translatableFields.includes(field as TranslatableField);
    };
  
    // If field is not translatable, return directly from product
    if (!isTranslatableField(field)) {
      return product[field];
    }
  
    // Handle translatable fields
    if (!translations) return product[field];
  
    const translation = translations.find((t: ProductTranslation) => 
      t.language.toLowerCase() === language.toLowerCase()
    );
  
    // Special handling for features
    if (field === 'features') {
      return translation?.features || product.features || {};
    }
  
    // Handle other translatable fields (name and description)
    return translation?.[field] || product[field] || '';
  };

  const nextImage = () => {
    if (product?.media) {
      setCurrentImageIndex((prev) => (prev + 1) % product.media.length);
    }
  };

  const prevImage = () => {
    if (product?.media) {
      setCurrentImageIndex((prev) => (prev - 1 + product.media.length) % product.media.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  const features = getTranslatedContent('features');
  const featureEntries = typeof features === 'object' ? Object.entries(features) : [];

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs productName={getTranslatedContent('name')} categoryName={product?.category} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                {t('productsPage.products.home')}
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li className="text-gray-900 font-medium">{getTranslatedContent('name')}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images and Video */}
          <div className="relative space-y-6">
            {/* Main Image Display */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              {product.media[currentImageIndex]?.type === 'image' ? (
                <Image
                  src={product.media[currentImageIndex].url}
                  alt={product.media[currentImageIndex].alt || getTranslatedContent('name')}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain p-6"
                  priority
                  quality={85}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder-image.jpg'; // Add a placeholder image in your public folder
                  }}
                />
              ) : null}
            </div>

            {/* Navigation arrows for images */}
            {product.media.filter(m => m.type === 'image').length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-[200px] bg-white/90 rounded-full p-2 hover:bg-white shadow-sm border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-[200px] bg-white/90 rounded-full p-2 hover:bg-white shadow-sm border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Thumbnail grid for images */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.media
                .filter(media => media.type === 'image')
                .map((media, index) => (
                  <button
                    key={media.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-gray-50 border transition-all ${
                      currentImageIndex === index ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={media.url}
                      alt={media.alt || `${getTranslatedContent('name')} thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 150px"
                      className="object-contain p-2"
                      loading="lazy"
                      quality={60}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder-image.jpg'; // Add a placeholder image in your public folder
                      }}
                    />
                  </button>
                ))}
            </div>

            {/* Video Display */}
            {product.media.filter(media => media.type === 'video').map((video) => (
              <div key={video.id} className="w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200 mt-8">
                <video
                  src={video.url}
                  controls
                  className="w-full aspect-video object-cover"
                  poster={product.media.find(m => m.type === 'image')?.url}
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h1 className="text-2xl font-bold text-gray-900">{getTranslatedContent('name')}</h1>
            </div>

            {/* Product Meta Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">{t('productsPage.products.brand')}</span>
                <p className="text-gray-900 font-semibold">{product.brand}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">{t('productsPage.products.category')}</span>
                <p className="text-gray-900 font-semibold">{product.category}</p>
              </div>
              {product.subCategory && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">{t('productsPage.products.subCategory')}</span>
                  <p className="text-gray-900 font-semibold">{product.subCategory}</p>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">{t('productsPage.products.type')}</span>
                <p className="text-gray-900 font-semibold">{product.type}</p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full border ${
                product.stock === 'IN_STOCK'
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : product.stock === 'LOW_STOCK'
                  ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                  : product.stock === 'PRE_ORDER'
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : product.stock === 'COMING_SOON'
                  ? 'bg-purple-100 text-purple-700 border-purple-200'
                  : 'bg-red-100 text-red-700 border-red-200'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  product.stock === 'IN_STOCK'
                  ? "bg-emerald-500"
                  : product.stock === 'LOW_STOCK'
                  ? "bg-yellow-500"
                  : product.stock === 'PRE_ORDER'
                  ? "bg-blue-500"
                  : product.stock === 'COMING_SOON'
                  ? "bg-purple-500"
                  : "bg-red-500"
                }`}></div>
                <span className="font-medium text-sm">
                  {product.stock === 'IN_STOCK'
                    ? t('productsPage.products.inStock')
                    : product.stock === 'LOW_STOCK'
                    ? t('productsPage.products.lowStock')
                    : product.stock === 'PRE_ORDER'
                    ? t('productsPage.products.preOrder')
                    : product.stock === 'COMING_SOON'
                    ? t('productsPage.products.comingSoon')
                    : t('productsPage.products.outOfStock')}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('productsPage.products.description')}</h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{getTranslatedContent('description')}</p>
              </div>
            </div>

            {/* Features */}
            {featureEntries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('productsPage.products.features')}</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <ul className="space-y-2">
                    {featureEntries.map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500 mr-3"></span>
                        <div>
                          <span className="text-gray-700">{String(value)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all flex items-center justify-center gap-2 ${
                  product.stock === 'IN_STOCK' || product.stock === 'LOW_STOCK' || product.stock === 'PRE_ORDER'
                    ? "bg-gray-900 hover:bg-emerald-800 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 'IN_STOCK'
                  ? t('productsPage.products.addToCart')
                  : product.stock === 'LOW_STOCK'
                  ? t('productsPage.products.addToCart')
                  : product.stock === 'PRE_ORDER'
                  ? t('productsPage.products.preOrder')
                  : product.stock === 'COMING_SOON'
                  ? t('productsPage.products.comingSoon')
                  : t('productsPage.products.outOfStock')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}