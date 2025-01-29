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



export default function ProductPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [translations, setTranslations] = useState<ProductTranslation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { language } = useTranslation();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        const [productRes, translationsRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch(`/api/products/${id}/translations`)
        ]);

        if (!productRes.ok) throw new Error('Failed to fetch product');
        if (!translationsRes.ok) throw new Error('Failed to fetch translations');

        const [productData, translationsData] = await Promise.all([
          productRes.json(),
          translationsRes.json()
        ]);

        setProduct(productData);
        setTranslations(translationsData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);
 
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
      <div className="min-h-screen bg-gray-50 pt-32">
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
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  const features = getTranslatedContent('features');
  const featureEntries = typeof features === 'object' ? Object.entries(features) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[600px]">
          {/* Product Images and Video */}
          <div className="relative space-y-6">
            {/* Main Image Display */}
            <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden bg-gray-100 min-h-[400px]">
              {product.media[currentImageIndex]?.type === 'image' ? (
                <Image
                  src={product.media[currentImageIndex].url}
                  alt={product.media[currentImageIndex].alt || getTranslatedContent('name')}
                  width={600}
                  height={600}
                  className="object-cover object-center"
                  priority
                />
              ) : null}
            </div>

            {/* Navigation arrows for images */}
            {product.media.filter(m => m.type === 'image').length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-[200px] bg-white/80 rounded-full p-2 hover:bg-white shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-[200px] bg-white/80 rounded-full p-2 hover:bg-white shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
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
                    className={`relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                  >
                    <Image
                      src={media.url}
                      alt={media.alt || `${getTranslatedContent('name')} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </button>
                ))}
            </div>

            {/* Video Display */}
            {product.media.filter(media => media.type === 'video').map((video) => (
              <div key={video.id} className="w-full rounded-lg overflow-hidden bg-gray-100 shadow-lg mt-8">
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
          <div className="flex flex-col min-h-[600px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{getTranslatedContent('name')}</h1>

            {/* Product Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-gray-600 font-medium">{t('productsPage.products.brand')}:</span>
                <span className="ml-2 text-blue-900 font-bold">{product.brand}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-medium">{t('productsPage.products.category')}:</span>
                <span className="ml-2 text-blue-900">{product.category}</span>
              </div>
              {product.subCategory && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium">{t('productsPage.products.subCategory')}:</span>
                  <span className="ml-2 text-blue-900">{product.subCategory}</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="text-gray-600 font-medium">{t('productsPage.products.type')}:</span>
                <span className="ml-2 text-blue-900">{product.type}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                product.stock === 'IN_STOCK'
                  ? 'bg-green-100 text-green-800'
                  : product.stock === 'LOW_STOCK'
                  ? 'bg-yellow-100 text-yellow-800'
                  : product.stock === 'PRE_ORDER'
                  ? 'bg-orange-100 text-orange-800'
                  : product.stock === 'COMING_SOON'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              } border`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  product.stock === 'IN_STOCK'
                  ? "bg-green-500"
                  : product.stock === 'LOW_STOCK'
                  ? "bg-yellow-500"
                  : product.stock === 'PRE_ORDER'
                  ? "bg-orange-500"
                  : product.stock === 'COMING_SOON'
                  ? "bg-blue-500"
                  : "bg-red-500"
                }`}></div>
                <span className="font-medium">
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
              <h2 className="text-lg font-bold text-gray-900 mb-2">{t('productsPage.products.description')}</h2>
              <p className="text-gray-600">{getTranslatedContent('description')}</p>
            </div>

            {/* Features */}
            {featureEntries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{t('productsPage.products.features')}</h2>
                <ul className="space-y-3">
                  {featureEntries.map(([key, value]) => (
                    <li key={key} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></span>
                      <div>
                        <span className="font-medium text-gray-900">{key}:</span>
                        <span className="ml-2 text-gray-600">{String(value)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Add to Cart Section */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 'OUT_OF_STOCK' || product.stock === 'COMING_SOON'}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  product.stock === 'IN_STOCK'
                    ? "bg-blue-800 hover:bg-blue-900 text-white"
                    : product.stock === 'LOW_STOCK'
                    ? "bg-blue-900 hover:bg-blue-900 text-white"
                    : product.stock === 'PRE_ORDER'
                    ? "bg-blue-900 hover:bg-blue-900 text-white"
                    : product.stock === 'COMING_SOON'
                    ? "bg-blue-500 text-white cursor-not-allowed opacity-60"
                    : "bg-gray-400 text-white cursor-not-allowed opacity-60"
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
