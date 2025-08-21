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
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (searchQuery.trim().length >= 2) && (
        <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-500 text-sm">{t('search.loading')}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="py-1">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${createProductSlug(product.name)}`}
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                  onClick={() => setShowResults(false)}
                >
                  <div className="relative h-16 w-16 flex-shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                    {product.media && product.media[0] ? (
                      <Image
                        src={product.media[0].url}
                        alt={product.media[0].alt || product.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-50 rounded flex items-center justify-center">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        {product.brand && (
                          <p className="text-xs text-gray-600 mt-0.5">{product.brand}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      {product.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      )}
                      {product.type && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          {product.type}
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-1 text-xs text-gray-600 line-clamp-1">{product.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Search className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">{t('search.noResult')}</p>
              <p className="text-xs text-gray-400 mt-1">{t('search.tryDifferent')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}