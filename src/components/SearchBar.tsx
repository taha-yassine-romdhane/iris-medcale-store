'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
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
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (searchQuery.trim().length >= 2) && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="py-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <div className="relative h-12 w-12 flex-shrink-0">
                    {product.media && product.media[0] ? (
                      <Image
                        src={product.media[0].url}
                        alt={product.media[0].alt || product.name}
                        fill
                        className="object-contain rounded"
                        sizes="48px"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 rounded flex items-center justify-center">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Aucun résultat trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}
