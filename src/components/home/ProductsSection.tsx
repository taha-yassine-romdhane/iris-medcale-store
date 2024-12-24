'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
  order: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  description: string;
  price: string;
  features: string;
  category: string;
  subCategory?: string;
  media: Media[];
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYuwellProducts() {
      try {
        const response = await fetch('/api/products/brand/yuwell');
        const textResponse = await response.text(); // First get the response as text
        console.log('Raw response:', textResponse);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try to parse the text response
        let data;
        try {
          data = JSON.parse(textResponse);
          console.log('Parsed data:', data);
        } catch (parseError) {
          console.error('JSON Parse error:', parseError);
          throw new Error('Invalid response format from server');
        }

        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data);
          throw new Error('Unexpected response format from server');
        }

        setProducts(data);
      } catch (error) {
        console.error('Error details:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchYuwellProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Machines CPAP Yuwell</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Machines CPAP Yuwell</h2>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Produits By Yuwell</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              href={`/product/${product.id}`}
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                {product.media && product.media.length > 0 ? (
                  <Image
                    src={product.media[0].url}
                    alt={product.media[0].alt || product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
