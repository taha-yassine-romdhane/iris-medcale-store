'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  price: number;
  features: string;
  media: Media[];
  reviews: Array<{
    rating: number;
    comment?: string;
  }>;
}

export default function CPAPMachinesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?category=cpap');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        // Initialize selected media for each product
        const initialSelected = data.reduce((acc: { [key: string]: number }, product: Product) => {
          acc[product.id] = 0;
          return acc;
        }, {});
        setSelectedMedia(initialSelected);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-28">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-75"></div>
        <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
              Machines CPAP
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection de machines CPAP de haute qualité pour le traitement de l'apnée du sommeil.
              Nous proposons des modèles fixes et auto-pilotés des meilleures marques.
            </p>
          </div>
        </div>
        {/* Decorative SVG divider */}
        <div className="absolute bottom-0 w-full ">
          <svg className="w-full h-15 sm:h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,160L1440,320L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>


      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Main Product Image */}
              <div className="relative aspect-w-1 aspect-h-1 h-64">
                {product.media && product.media.length > 0 ? (
                  product.media[selectedMedia[product.id]]?.type === 'image' ? (
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <Image
                        src={product.media[selectedMedia[product.id]]?.url || ''}
                        alt={product.media[selectedMedia[product.id]]?.alt || product.name}
                        fill
                        className="object-contain p-4 cursor-pointer transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </Link>
                  ) : (
                    <video
                      src={product.media[selectedMedia[product.id]]?.url}
                      controls
                      className="w-full h-full object-contain p-4"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.type}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/product/${product.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                    {product.brand}
                  </Link>
                  
                </div>
                <Link href={`/product/${product.id}`} className="block group-hover:text-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </Link>

                {/* Features List */}
                <div className="mt-4">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {JSON.parse(product.features).slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => {/* Add to cart logic */}}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
