'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';

// Separate the search results content into its own component
function SearchResults({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">
          Aucun résultat trouvé
        </h2>
        <p className="mt-2 text-gray-600">
          Nous n&apos;avons trouvé aucun produit correspondant à &quot;{query}&quot;
        </p>
        <p className="mt-1 text-gray-500">
          Essayez avec des termes différents ou vérifiez l&apos;orthographe
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
        >
          <div className="relative h-64 bg-gray-100">
            {product.media && product.media[0] ? (
              <Image
                src={product.media[0].url}
                alt={product.media[0].alt || product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h2>
            {product.brand && (
              <p className="text-sm text-blue-600 font-medium mt-1">
                {product.brand}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
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
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Loading fallback component
function SearchPageFallback() {
  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-12 w-64 bg-gray-300 rounded mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4">
              <div className="h-64 bg-gray-100 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {query ? `Résultats pour "${query}"` : 'Recherche'}
          </h1>
        </div>

        <SearchResults query={query} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}