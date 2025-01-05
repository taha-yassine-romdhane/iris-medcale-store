'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';


interface CategoryProducts {
  cpap: Product[];
  masks: Product[];
  oxygen: Product[];
  lits: Product[];
}

export default function ProductsSection() {
  const [products, setProducts] = useState<CategoryProducts>({
    cpap: [],
    masks: [],
    oxygen: [],
    lits: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sliderRefs = {
    cpap: useRef<HTMLDivElement | null>(null),
    masks: useRef<HTMLDivElement | null>(null),
    oxygen: useRef<HTMLDivElement | null>(null),
    lits: useRef<HTMLDivElement | null>(null)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        console.log('Fetched products:', data);

        const categorizedProducts = {
          cpap: data.filter((p: Product) => 
            p.category.toLowerCase() === 'cpap' || 
            p.type?.toLowerCase().includes('cpap') ||
            p.name.toLowerCase().includes('cpap')
          ),
          masks: data.filter((p: Product) => 
            p.category.toLowerCase() === 'masks' || 
            p.category.toLowerCase() === 'masques' ||
            p.type?.toLowerCase().includes('masque') ||
            p.name.toLowerCase().includes('masque')
          ),
          oxygen: data.filter((p: Product) => 
            p.category.toLowerCase() === 'oxygen' || 
            p.category.toLowerCase() === 'oxygène' ||
            p.category.toLowerCase().includes('concentrateur') ||
            p.type?.toLowerCase().includes('concentrateur') ||
            p.name.toLowerCase().includes('concentrateur') ||
            p.name.toLowerCase().includes('oxygène')
          ),
          lits: data.filter((p: Product) => 
            p.category.toLowerCase() === 'lits' || 
            p.category.toLowerCase() === 'lit' ||
            p.type?.toLowerCase().includes('lit') ||
            p.name.toLowerCase().includes('lit médicalisé')
          )
        };

        console.log('Categorized products:', categorizedProducts);

        setProducts(categorizedProducts);
        setError(null);
      } catch {
        console.error('Error fetching products');
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = (direction: 'left' | 'right', refKey: keyof typeof sliderRefs) => {
    const container = sliderRefs[refKey].current;
    if (!container) return;

    const scrollAmount = 300;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const ProductSlider = ({ title, products, refKey }: { title: string, products: Product[], refKey: keyof CategoryProducts }) => {
    const { addToCart } = useCart();

    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-left p-6 text-blue-800 font-spartan">{title}</h2>      
        <div className="relative overflow-hidden max-w-full">
          {/* Scroll Buttons */}
          <button
            onClick={() => handleScroll('left', refKey)}
            aria-label="Scroll Left"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-10 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right', refKey)}
            aria-label="Scroll Right"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-10 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Products */}
          <div ref={sliderRefs[refKey]} className="flex space-x-6 overflow-x-auto px-6 hide-scrollbar">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-square h-64 bg-gray-50 rounded-t-lg overflow-hidden">
                  {product.media?.length ? (
                    <Image
                      src={product.media[0].url}
                      alt={product.media[0].alt || product.name}
                      fill
                      className="object-contain p-4 cursor-pointer transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">No image</div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800 line-clamp-1 hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-blue-900 text-sm mb-3 line-clamp-2">{product.description}</p>
                  {product.features && (
                    <ul className="text-gray-600 text-xs mb-4 space-y-1">
                      {(() => {
                        try {
                          const features = typeof product.features === 'string' 
                            ? JSON.parse(product.features)
                            : Array.isArray(product.features)
                              ? product.features
                              : [];
                          return features.map((feature: string, index: number) => (
                            <li key={index}>• {feature}</li>
                          ));
                        } catch {
                          // If JSON parsing fails, treat it as a single feature
                          return <li>• {product.features}</li>;
                        }
                      })()}
                    </ul>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-8 px-6 font-spartan">
      <div className="max-w-8xl mx-auto px-6">
        <section className="py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Découvrez nos produits
            </h3>
          </div>
        </section>
        <section>
          <div className="space-y-7">
            {/* CPAP Machines Section */}
            {products.cpap.length > 0 && (
              <ProductSlider
                title="Machines CPAP"
                products={products.cpap}
                refKey="cpap"
              />
            )}

            {/* Masks Section */}
            {products.masks.length > 0 && (
              <ProductSlider
                title="Masques"
                products={products.masks}
                refKey="masks"
              />
            )}

            {/* Oxygen Concentrators Section */}
            {products.oxygen.length > 0 && (
              <ProductSlider
                title="Concentrateurs d'Oxygène"
                products={products.oxygen}
                refKey="oxygen"
              />
            )}

            {/* Medical Beds Section */}
            {products.lits.length > 0 && (
              <ProductSlider
                title="Lits Médicalisés"
                products={products.lits}
                refKey="lits"
              />
            )}
          </div>
        </section>
      </div>
    </section>
  );
}