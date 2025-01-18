'use client';

import { useEffect, useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useFilters } from '@/contexts/FilterContext';
import { useTranslation } from '@/context/TranslationContext';

interface Filters {
  categories: string[];
  brands: string[];
  types: string[];
  subCategories: string[];
}

interface FilterParams {
  category: string | null;
  type: string | null;
  subCategory: string | null;
  brand: string | null;
}

interface ApiResponse {
  products: Product[];
}

interface Media {
  url: string;
  alt?: string;
  type: 'image' | 'video';
}

interface ProductFeatures {
  features: string[] | string;
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const { category, type, subCategory, updateFilters } = useFilters();
  const [params, setParams] = useState<FilterParams>({
    category: null,
    type: null,
    subCategory: null,
    brand: null
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    types: [],
    subCategories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedMedia, setSelectedMedia] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize params from URL only once on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialParams = {
      category: urlParams.get('category'),
      type: urlParams.get('type'),
      subCategory: urlParams.get('subCategory'),
      brand: urlParams.get('brand')
    };
    setParams(initialParams);

    // Initialize filters from URL params
    if (initialParams.category || initialParams.type || initialParams.subCategory) {
      updateFilters({
        category: initialParams.category || '',
        type: initialParams.type || '',
        subCategory: initialParams.subCategory || '',
      });
    }
  }, []); // Empty dependency array as this should only run once on mount

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        
        // Use both context filters and URL params
        const effectiveCategory = category || params.category;
        const effectiveType = type || params.type;
        const effectiveSubCategory = subCategory || params.subCategory;
        
        if (effectiveCategory) queryParams.append('category', effectiveCategory);
        if (effectiveType) queryParams.append('type', effectiveType);
        if (effectiveSubCategory) queryParams.append('subCategory', effectiveSubCategory);
        if (params.brand && params.brand !== 'all') queryParams.append('brand', params.brand);

        const response = await fetch(`/api/products?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json() as ApiResponse;

        if (!data || !Array.isArray(data.products)) {
          console.error('Invalid data format:', data);
          setProducts([]);
          setFilteredProducts([]);
          return;
        }

        const fetchedProducts = data.products;
        setProducts(fetchedProducts);

        // Update available filters
        if (fetchedProducts.length > 0) {
          const uniqueFilters: Filters = {
            categories: [...new Set(fetchedProducts.map(p => p.category).filter(Boolean))],
            brands: [...new Set(fetchedProducts.map(p => p.brand).filter(Boolean))],
            types: [...new Set(fetchedProducts.map(p => p.type).filter(Boolean))],
            subCategories: [...new Set(fetchedProducts.filter(p => p.subCategory).map(p => p.subCategory as string))],
          };
          setFilters(uniqueFilters);
        }
      } catch (error) {
        console.error('Error fetching products:', error instanceof Error ? error.message : 'Unknown error');
        toast.error('Error fetching products');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, type, subCategory, params.brand]); // Only re-fetch when filters change

  // Apply local search filter whenever products or search query changes
  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        (product.features && Array.isArray(product.features) &&
          product.features.some((feature: string) =>
            feature.toLowerCase().includes(query)
          ))
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery]); // Only update filtered products when products or search query changes

  const handleAddToCart = useCallback((product: Product) => {
    if (!product.inStock) return;
    addToCart(product);
    toast.success('Product added to cart');
  }, [addToCart]);

  const handleMediaNavigation = useCallback((productId: string, direction: 'prev' | 'next') => {
    const currentIndex = selectedMedia[productId] || 0;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const maxIndex = product.media.length - 1;
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    } else {
      newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    }

    setSelectedMedia(prev => ({ ...prev, [productId]: newIndex }));
  }, [products, selectedMedia]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md p-4">
                    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-75"></div>
        <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
              {t('productsPage.hero.title')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('productsPage.hero.description')}
            </p>
          </div>
        </div>
        {/* Decorative SVG divider */}
        <div className="absolute bottom-0 w-full">
          <svg className="w-full h-15 sm:h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,160L1440,320L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('productsPage.filters.title')}</h2>
            </div>
            <div className="flex flex-wrap gap-4 items-center flex-1 md:justify-end">
              <div className="relative flex-grow md:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t('productsPage.filters.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={params.brand ?? undefined}
                onValueChange={(value) => setParams(prev => ({ ...prev, brand: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('productsPage.filters.selectBrand')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('productsPage.filters.allBrands')}</SelectItem>
                  {filters.brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.category')}: {category}
              </Badge>
            )}
            {type && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.type')}: {type}
              </Badge>
            )}
            {subCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.subcategory')}: {subCategory}
              </Badge>
            )}
            {params.brand && params.brand !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.brand')}: {params.brand}
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">{t('productsPage.products.noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentMediaIndex = selectedMedia[product.id] || 0;
              const currentMedia = product.media[currentMediaIndex];

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Main Product Image/Video */}
                  <div className="relative aspect-square">
                    {product.media && product.media.length > 0 ? (
                      currentMedia?.type === 'image' ? (
                        <Link href={`/product/${product.id}`} className="block w-full h-full">
                          <Image
                            src={currentMedia.url}
                            alt={currentMedia.alt || product.name}
                            fill
                            className="object-contain p-4 cursor-pointer transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                          />
                        </Link>
                      ) : (
                        <video
                          src={currentMedia?.url}
                          controls
                          className="w-full h-full object-contain p-4"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">{t('productsPage.products.noImage')}</span>
                      </div>
                    )}

                    {/* Navigation Buttons for Multiple Media */}
                    {product.media.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleMediaNavigation(product.id, 'prev');
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleMediaNavigation(product.id, 'next');
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {/* Type and Stock Badges */}
                    <div className="absolute top-7 right-4 bg-blue-600 text-white px-2 rounded-full text-sm font-medium">
                      {product.type}
                    </div>
                    <div className={cn(
                      "absolute top-1 right-4 px-2 rounded-full text-sm font-medium",
                      product.inStock ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {product.inStock ? t('productsPage.products.inStock') : t('productsPage.products.outOfStock')}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/product/${product.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                        {product.brand}
                      </Link>
                      {product.category && (
                        <Badge variant="secondary">{product.category}</Badge>
                      )}
                    </div>

                    <Link href={`/product/${product.id}`} className="block group-hover:text-blue-600">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                    </Link>

                    {/* Features List */}
                    <div className="mt-4">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(Array.isArray(product.features) ? product.features :
                          typeof product.features === 'string' ? JSON.parse(product.features) :
                            []).slice(0, 3).map((feature: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                      </ul>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      variant="default"
                      size="lg"
                      className={cn(
                        "w-full mt-4 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2",
                        !product.inStock && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => product.inStock && handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {product.inStock ? t('productsPage.products.addToCart') : t('productsPage.products.outOfStock')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}