'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/hooks/useCart';
import { Loader } from 'lucide-react'; // Import the Loader icon from Lucide React

interface Media {
  id: string;
  url: string;
  alt: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  brand: string;
  category: string;
  type?: string;
  features?: string; // JSON string of features
  media: Media[];
}

interface CategoryProducts {
  cpap: Product[];
  masks: Product[];
  oxygen: Product[];
}

export default function ProductsSection() {
  const [products, setProducts] = useState<CategoryProducts>({
    cpap: [],
    masks: [],
    oxygen: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRefs = {
    cpap: useRef<HTMLDivElement | null>(null),
    masks: useRef<HTMLDivElement | null>(null),
    oxygen: useRef<HTMLDivElement | null>(null)
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products/brand/yuwell');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        const categorizedProducts: CategoryProducts = {
          cpap: data.filter((p: Product) => p.category.toLowerCase() === 'cpap' || p.category.toLowerCase() === 'bipap-vni'),
          masks: data.filter((p: Product) =>
            p.category.toLowerCase() === 'accessoires' &&
            (p.type?.toLowerCase().includes('masque') ||
              p.name.toLowerCase().includes('masque'))
          ),
          oxygen: data.filter((p: Product) => p.category.toLowerCase() === 'oxygen' || p.category.toLowerCase().includes('concentrateur'))
        };

        setProducts(categorizedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right', category: keyof CategoryProducts) => {
    const ref = scrollRefs[category];
    if (ref.current) {
      const scrollAmount = 250;
      const currentScroll = ref.current.scrollLeft;
      const newScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
      ref.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const ProductSlider = ({ title, products, refKey }: { title: string, products: Product[], refKey: keyof CategoryProducts }) => {
    const { addToCart } = useCart();

    return (
      <section className="mb-14">
        <h2 className="text-3xl font-bold text-left p-8 text-blue-800 font-spartan">{title}</h2>      
        <div className="relative overflow-hidden max-w-full">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left', refKey)}
            aria-label="Scroll Left"
            className="absolute left-0 top-0 bottom-0 m-auto h-10 w-10 flex items-center justify-center bg-blue-200 hover:bg-blue-300 text-blue-600 rounded-full shadow-md z-10 transition-all duration-200"
          >
            &lt;
          </button>
          <button
            onClick={() => scroll('right', refKey)}
            aria-label="Scroll Right"
            className="absolute right-0 top-0 bottom-0 m-auto h-10 w-10 flex items-center justify-center bg-blue-200 hover:bg-blue-300 text-blue-600 rounded-full shadow-md z-10 transition-all duration-200"
          >
            &gt;
          </button>

          {/* Products */}
          <div ref={scrollRefs[refKey]} className="flex space-x-6 overflow-x-auto px-6 hide-scrollbar">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-72 bg-gray-50 rounded-t-lg">
                  {product.media?.length ? (
                    <Image
                      src={product.media[0].url}
                      alt={product.media[0].alt || product.name}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">No image</div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800 line-clamp-1 font-spartan">{product.name}</h3>
                  <p className="text-blue-900 text-sm mb-3 line-clamp-2 font-spartan">{product.description}</p>
                  {product.features && (
                    <ul className="text-gray-500 text-xs mb-4 space-y-1 font-spartan">
                      {JSON.parse(product.features).map((feature: string, index: number) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 font-spartan"
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
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" /> {/* Lucide Loader spinner */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <section className="py-8 px-12 font-spartan">
      <div className="max-w-8xl mx-auto px-12">
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
              Découvrez nos produits Yuwell
            </h3>
          </div>
        </section>
        <section>
          <div className="space-y-12">
            {/* CPAP Machines Section */}
            {products.cpap.length > 0 && (
              <>
                <div className="flex items-center mb-6"></div>
                <ProductSlider
                  title="Appareils CPAP"
                  products={products.cpap}
                  refKey="cpap"
                />
              </>
            )}

            {/* Masks Section */}
            {products.masks.length > 0 && (
              <>
                <div className="flex items-center"></div>
                <ProductSlider
                  title="Masques"
                  products={products.masks}
                  refKey="masks"
                />
              </>
            )}

            {/* Oxygen Concentrators Section */}
            {products.oxygen.length > 0 && (
              <>
                <div className="flex items-center"></div>
                <ProductSlider
                  title="Concentrateurs d&apos;Oxygène"
                  products={products.oxygen}
                  refKey="oxygen"
                />
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}