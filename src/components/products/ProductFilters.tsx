'use client';

import { useState, useEffect } from 'react';

interface ProductFiltersProps {
  onFilter: (filters: { category: string; type: string; brand: string }) => void;
  onResetPage: () => void;
}

export default function ProductFilters({ onFilter, onResetPage }: ProductFiltersProps) {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[];
    types: string[];
    brands: string[];
  }>({
    categories: [],
    types: [],
    brands: []
  });

  // Fetch filter options when component mounts
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/products/filters');
        if (!response.ok) throw new Error('Failed to fetch filter options');
        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    let newCategory = category;
    let newType = type;
    let newBrand = brand;

    switch (field) {
      case 'category':
        newCategory = value;
        setCategory(value);
        break;
      case 'type':
        newType = value;
        setType(value);
        break;
      case 'brand':
        newBrand = value;
        setBrand(value);
        break;
    }

    onResetPage();
    onFilter({ 
      category: newCategory, 
      type: newType, 
      brand: newBrand 
    });
  };

  const clearFilters = () => {
    setCategory('');
    setType('');
    setBrand('');
    onResetPage();
    onFilter({ category: '', type: '', brand: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
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
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Toutes les catégories</option>
            {filterOptions.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Tous les types</option>
            {filterOptions.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Marque
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Toutes les marques</option>
            {filterOptions.brands.map((b) => (
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