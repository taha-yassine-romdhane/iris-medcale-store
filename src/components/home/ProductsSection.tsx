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

const orderedProducts = {
  cpap: ['YH-680', 'YH-450', 'YH-550', 'AirSense 10 Elite', 'Prisma Smart Basic'],
  masks: ['YF-02', 'YN-03', 'YP-01', 'AirFit F20', 'AirFit F30'],
  oxygen: ['8F-5', '8F-10', 'Spirit 6', 'Spirit 3'],
};

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
        const response = await fetch('/api/products?limit=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data || !data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid data format received from API');
        }

        const categorizedProducts = {
          cpap: orderedProducts.cpap
            .map(name => data.products.find((p: Product) => 
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.type?.toLowerCase() === 'fixe' || p.type?.toLowerCase()?.includes('auto-pilote'))
            ))
            .filter((p): p is Product => p !== undefined),
          
          masks: orderedProducts.masks
            .map(name => data.products.find((p: Product) => 
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.category?.toLowerCase() === 'masques' || p.type?.toLowerCase()?.includes('masque'))
            ))
            .filter((p): p is Product => p !== undefined),
          
          oxygen: orderedProducts.oxygen
            .map(name => data.products.find((p: Product) => 
              p.name.toLowerCase().includes(name.toLowerCase()) &&
              (p.category?.toLowerCase() === 'concentrateur d\'oxygene' || p.type == '5 LITRES' || p.type == '10 LITRES' || p.type?.toLowerCase()?.includes('portable'))
            ))
            .filter((p): p is Product => p !== undefined),
          
          lits: data.products.filter((p: Product) => 
            p.category?.toLowerCase() === 'lit' || 
            p.type?.toLowerCase()?.includes('LIT MEDICALISE')
          ),
        };

        setProducts(categorizedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
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
      <div className="mb-12 px-6 last:mb-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleScroll('left', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 text-blue-900" />
            </button>
            <button
              onClick={() => handleScroll('right', refKey)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none" />
          
          <div 
            ref={sliderRefs[refKey]}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 hide-scrollbar scroll-smooth"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-56">
                    {product.media && product.media[0] && (
                      <Image
                        src={product.media[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture de stock'}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <Link href={`/product/${product.id}`} className="block group-hover:text-blue-700 transition-colors duration-200">
                    <h3 className="font-semibold text-lg mb-2 text-blue-900">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-blue-800/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-blue-700 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                    >
                      Voir détails
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto bg-white  rounded-2xl p-8 my-12">
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-12">{error}</div>
      ) : (
        <>
          <ProductSlider title="CPAP" products={products.cpap} refKey="cpap" />
          <ProductSlider title="Masques" products={products.masks} refKey="masks" />
          <ProductSlider title="Concentrateurs d'oxygène" products={products.oxygen} refKey="oxygen" />
          <ProductSlider title="Lits Médicalisés" products={products.lits} refKey="lits" />
        </>
      )}
    </div>
  );
}