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
import { useTranslation } from '@/contexts/TranslationContext';
import { useSearchParams } from 'next/navigation';

interface Filters {
  categories: string[];
  brands: string[];
  types: string[];
  subCategories: string[];
}
export default function ProductsPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    types: [],
    subCategories: [],
  });
  const [selectedMedia, setSelectedMedia] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  // Fetch products when URL params change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products?${searchParams?.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        if (!data || !Array.isArray(data.products)) {
          throw new Error('Invalid data format');
        }

        setProducts(data.products);
        setFilteredProducts(data.products);

        // Update available filters
        if (data.products.length > 0) {
          const uniqueFilters: Filters = {
            categories: Array.from(
              new Set(
                data.products
                  .map((p: Product) => p.category)
                  .filter((category: string ): category is string => 
                    typeof category === 'string' && category.length > 0
                  )
              )
            ),
            brands: Array.from(
              new Set(
                data.products
                  .map((p: Product) => p.brand)
                  .filter((brand: string ): brand is string => 
                    typeof brand === 'string' && brand.length > 0
                  )
              )
            ),
            types: Array.from(
              new Set(
                data.products
                  .map((p: Product) => p.type)
                  .filter((type: string ): type is string => 
                    typeof type === 'string' && type.length > 0
                  )
              )
            ),
            subCategories: Array.from(
              new Set(
                data.products
                  .map((p: Product) => p.subCategory)
                  .filter((subCategory: string ): subCategory is string => 
                    typeof subCategory === 'string' && subCategory.length > 0
                  )
              )
            ),
          };
          setFilters(uniqueFilters);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error(t('products.fetchError'));
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, t]);

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (searchParams?.get('category')) queryParams.append('category', searchParams.get('category') as string);
    if (searchParams?.get('type')) queryParams.append('type', searchParams.get('type') as string);
    if (searchParams?.get('subCategory')) queryParams.append('subCategory', searchParams.get('subCategory') as string);

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchParams]);

  // Update filtered products when search query or brand changes
  useEffect(() => {
    if (!products) return;
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (selectedBrand && selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedBrand]);

  const handleAddToCart = useCallback((product: Product) => {
    if (product.stock !== 'IN_STOCK') return;
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
                  value={typeof searchQuery === 'string' ? searchQuery : ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedBrand}
                onValueChange={(value) => setSelectedBrand(value)}
              >
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
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedBrand && selectedBrand !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Brand: {selectedBrand}
                <button 
                  onClick={() => setSelectedBrand('all')}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchParams?.get('category') && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.category')}: {searchParams.get('category')}
              </Badge>
            )}
            {searchParams?.get('type') && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.type')}: {searchParams.get('type')}
              </Badge>
            )}
            {searchParams?.get('subCategory') && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t('productsPage.filters.activeFilters.subcategory')}: {searchParams.get('subCategory')}
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
                      product.stock === 'IN_STOCK' 
                        ? "bg-green-500 text-white" 
                        : product.stock === 'LOW_STOCK'
                        ? "bg-yellow-500 text-white"
                        : product.stock === 'PRE_ORDER'
                        ? "bg-orange-500 text-white"
                        : product.stock === 'COMING_SOON'
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    )}>
                      {product.stock === 'IN_STOCK' 
                        ? t('productsPage.products.inStock')
                        : product.stock === 'LOW_STOCK'
                        ? t('productsPage.products.lowStock')
                        : product.stock === 'PRE_ORDER'
                        ? t('productsPage.products.preOrder')
                        : product.stock === 'COMING_SOON'
                        ? t('productsPage.products.comingSoon')
                        : t('productsPage.products.outOfStock')}
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
                        product.stock !== 'IN_STOCK' && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => product.stock === 'IN_STOCK' && handleAddToCart(product)}
                      disabled={product.stock !== 'IN_STOCK'}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {product.stock === 'IN_STOCK' 
                        ? t('productsPage.products.addToCart')
                        : product.stock === 'LOW_STOCK'
                        ? t('productsPage.products.lowStock')
                        : product.stock === 'PRE_ORDER'
                        ? t('productsPage.products.preOrder')
                        : product.stock === 'COMING_SOON'
                        ? t('productsPage.products.comingSoon')
                        : t('productsPage.products.outOfStock')}
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