import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product'; // Import your Product type

interface ProductFiltersProps {
  onFilter: (filters: { category: string; type: string; brand: string }) => void;
  products?: Product[]; // Use the Product type instead of any
}

export default function ProductFilters({ products = [], onFilter }: ProductFiltersProps) {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  // Debug logging
  useEffect(() => {
    console.log('Products received:', products);
  }, [products]);

  // Extract unique categories, types, and brands from products
  const categories = Array.from(new Set(products.map(product => product.category).filter(Boolean)));
  const types = Array.from(new Set(products.map(product => product.type).filter(Boolean)));
  const brands = Array.from(new Set(products.map(product => product.brand).filter(Boolean)));

  // Use useCallback to memoize handleFilter
  const handleFilter = useCallback(() => {
    onFilter({ category, type, brand });
  }, [category, type, brand, onFilter]);

  const clearFilters = () => {
    setCategory('');
    setType('');
    setBrand('');
    onFilter({ category: '', type: '', brand: '' });
  };

  // Apply filters automatically when any filter changes
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  if (!products || products.length === 0) {
    return null; // Don't render filters if there are no products
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtrer les produits</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          Réinitialiser les filtres
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Tous les types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Marque
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Toutes les marques</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}