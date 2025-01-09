'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { fetchCategoryProducts } from '@/lib/helpers/product-helpers';

export default function AspirateurConsommablesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { products, initialSelectedMedia } = await fetchCategoryProducts('aspirateur-consommables');
        if (!Array.isArray(products)) {
          console.error('Products is not an array:', products);
          throw new Error('Invalid products data');
        }
        setProducts(products);
        setSelectedMedia(initialSelectedMedia);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Consommables d&lsquo;Aspiration</h1>
          <p className="text-gray-600">
            Découvrez notre gamme de consommables pour machines d&lsquo;aspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative h-64 overflow-hidden">
                  {product.media && product.media.length > 0 && (
                    <Image
                      src={product.media[selectedMedia[product.id]].url}
                      alt={product.media[selectedMedia[product.id]].alt || product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">{product.brand}</span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
