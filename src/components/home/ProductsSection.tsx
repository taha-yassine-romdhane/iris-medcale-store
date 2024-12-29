'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
        
        // Categorize Yuwell products
        const categorizedProducts: CategoryProducts = {
          cpap: data.filter((p: Product) => p.category.toLowerCase() === 'cpap' || p.category.toLowerCase() === 'bipap-vni'),
          masks: data.filter((p: Product) => p.category.toLowerCase() === 'accessoires' || p.category.toLowerCase().includes('mask')),
          oxygen: data.filter((p: Product) => p.category.toLowerCase() === 'oxygen' || p.category.toLowerCase().includes('concentrateur'))
        };
        
        console.log('Categorized products:', categorizedProducts);
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

  if (loading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const ProductSlider = ({ title, products, refKey }: { title: string, products: Product[], refKey: keyof CategoryProducts }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="relative overflow-x-auto pb-6">
        <button
          onClick={() => scroll('left', refKey)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition z-10 text-sm"
        >
          &lt;
        </button>
        <button
          onClick={() => scroll('right', refKey)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition z-10 text-sm"
        >
          &gt;
        </button>
        <div ref={scrollRefs[refKey]} className="flex space-x-4 overflow-x-auto hide-scrollbar px-8">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="flex-shrink-0 w-56 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition transform hover:scale-105"
            >
              <div className="relative h-48">
                {product.media && product.media.length > 0 ? (
                  <Image
                    src={product.media[0].url}
                    alt={product.media[0].alt || product.name}
                    fill
                    className="object-contain p-2 rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>
                <button className="w-full py-1.5 px-2 bg-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-700 transition">
                  Demander un devis
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Produits de Yuwell</h2>
        <section className="py-12 ">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Découvrez nos produits Yuwell
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Yuwell propose une gamme de produits innovants conçus pour améliorer
          votre bien-être et faciliter votre quotidien. Nos produits se
          distinguent par leur qualité exceptionnelle, leur design ergonomique
          et leur technologie de pointe. Que ce soit pour des équipements
          médicaux, des solutions de santé à domicile ou des dispositifs de
          diagnostic, Yuwell allie fiabilité et performance pour répondre aux
          besoins variés de ses utilisateurs.
        </p>
      </div>
    </section>
        <div className="space-y-12">
          {products.cpap.length > 0 && <ProductSlider title="Machines CPAP" products={products.cpap} refKey="cpap" />}
          {products.masks.length > 0 && <ProductSlider title="Masques et Accessoires" products={products.masks} refKey="masks" />}
          {products.oxygen.length > 0 && <ProductSlider title="Concentrateurs d'Oxygène" products={products.oxygen} refKey="oxygen" />}
        </div>
      </div>
    </section>
  );
}
