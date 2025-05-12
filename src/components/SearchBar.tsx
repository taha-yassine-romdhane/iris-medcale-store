'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/contexts/TranslationContext';
import { createProductSlug } from '@/utils/slugify';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  type?: string;
  subCategory?: string;
  media: Array<{
    url: string;
    alt: string | null;
  }>;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation();


  useEffect(() => {
    // Close search results when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) throw new Error('Search failed');
          const data = await response.json();
          setProducts(data);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts([]);
        setShowResults(false);
      }
    }, 300); // Debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </form>

      {/* Enhanced Search Results Dropdown */}
      {showResults && (searchQuery.trim().length >= 2) && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[32rem] overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">{t('search.loading')}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="py-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${createProductSlug(product.name, product.id)}`}
                  className="flex items-start px-6 py-4 hover:bg-blue-50 transition-colors group"
                  onClick={() => setShowResults(false)}
                >
                  <div className="relative h-24 w-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 group-hover:border-blue-200 transition-colors">
                    {product.media && product.media[0] ? (
                      <Image
                        src={product.media[0].url}
                        alt={product.media[0].alt || product.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                        {product.brand && (
                          <p className="text-sm text-blue-600 font-medium mt-0.5">{product.brand}</p>
                        )}
                      </div>
                    
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      {product.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      )}
                      {product.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.type}
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-lg">{t('search.noResult')}</p>
              <p className="text-sm text-gray-400 mt-1">{t('search.tryDifferent')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
