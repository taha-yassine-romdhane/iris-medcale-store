'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Loader2, Filter } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Product } from '@/types/product';


export default function TranslationsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [translations, setTranslations] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EN: { name: string; description: string; features: Record<string, any> };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FR: { name: string; description: string; features: Record<string, any> };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AR: { name: string; description: string; features: Record<string, any> };
  }>({
    EN: { name: '', description: '', features: {} },
    FR: { name: '', description: '', features: {} },
    AR: { name: '', description: '', features: {} },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const authToken = localStorage.getItem('auth_token');
      const response = await fetch('/api/products', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken || '',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      const productsWithTranslations = data.products.map((product: Product) => ({
        ...product,
        translations: product.translations || []
      }));
      setProducts(productsWithTranslations);
      setFilteredProducts(productsWithTranslations);
    } catch (error) {
      toast.error('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setSelectedProduct(productId);

    const newTranslations = {
      EN: { name: '', description: '', features: {} },
      FR: { name: '', description: '', features: {} },
      AR: { name: '', description: '', features: {} },
    };

    if (product.translations) {
      product.translations.forEach(trans => {
        if (trans && trans.language) {
          newTranslations[trans.language] = {
            name: trans.name || '',
            description: trans.description || '',
            features: trans.features || {},
          };
        }
      });
    }

    setTranslations(newTranslations);
  };

  const handleTranslationChange = (
    language: 'EN' | 'FR' | 'AR',
    field: 'name' | 'description',
    value: string
  ) => {
    setTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (
    language: 'EN' | 'FR' | 'AR',
    featureKey: string,
    value: string
  ) => {
    setTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        features: {
          ...prev[language].features,
          [featureKey]: value,
        },
      },
    }));
  };

  const handleAddFeature = (language: 'EN' | 'FR' | 'AR') => {
    const featureKey = prompt('Enter feature name:');
    if (featureKey && featureKey.trim()) {
      setTranslations(prev => ({
        ...prev,
        [language]: {
          ...prev[language],
          features: {
            ...prev[language].features,
            [featureKey.trim()]: ''
          }
        }
      }));
    }
  };
  const handleRemoveFeature = (
    language: 'EN' | 'FR' | 'AR',
    featureKey: string
  ) => {
    if (window.confirm(`Are you sure you want to remove this feature?`)) {
      setTranslations(prev => {
        const newFeatures = { ...prev[language].features };
        delete newFeatures[featureKey];
        return {
          ...prev,
          [language]: {
            ...prev[language],
            features: newFeatures
          }
        };
      });
    }
  };

  const handleSaveTranslations = async () => {
    if (!selectedProduct) return;

    try {
      setSaving(true);
      const authToken = localStorage.getItem('auth_token');
      const response = await fetch(`/api/products/${selectedProduct}/translations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken || '',
        },
        body: JSON.stringify({ translations }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success('Translations saved successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving translations');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const selectedProductData = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

  return (
    <div className="flex-1 pt-20 p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Translations</h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product List */}
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-4 border border-blue-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow border border-blue-200">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">
                  Products ({filteredProducts.length})
                </h2>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedProduct === product.id ? 'bg-blue-50' : ''
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      {product.media?.[0] && (
                        <div className="flex-shrink-0 w-12 h-12 relative rounded-lg overflow-hidden">
                          <Image
                            src={product.media[0].url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.brand} • {product.category}
                        </p>
                        <div className="flex items-center mt-1">
                          {(['FR', 'EN', 'AR'] as const).map(lang => (
                            <span
                              key={lang}
                              className={`text-xs mr-2 px-2 py-1 rounded ${product.translations?.some(t => t.language === lang)
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Translation Form */}
          <div className="md:col-span-2">
            {selectedProductData ? (
              <div className="bg-white rounded-lg shadow border border-blue-200">
                {/* Product Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-4">
                    {selectedProductData.media?.[0] && (
                      <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={selectedProductData.media[0].url}
                          alt={selectedProductData.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedProductData.name}
                      </h2>
                      <p className="text-gray-500">
                        {selectedProductData.brand} • {selectedProductData.category}
                        {selectedProductData.subCategory && ` • ${selectedProductData.subCategory}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Translation Form */}
                <div className="p-6">
                  <div className="space-y-6">
                    {(['EN', 'FR', 'AR'] as const).map((lang) => (
                      <div
                        key={lang}
                        className="p-4 border rounded-lg bg-blue-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {lang === 'EN' ? 'English' : lang === 'FR' ? 'French' : 'Arabic'}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${translations[lang].name || translations[lang].description
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-600'
                            }`}>
                            {translations[lang].name || translations[lang].description
                              ? 'Translated'
                              : 'Not translated'}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={translations[lang].name}
                              onChange={(e) => handleTranslationChange(lang, 'name', e.target.value)}
                              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              dir={lang === 'AR' ? 'rtl' : 'ltr'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={translations[lang].description}
                              onChange={(e) => handleTranslationChange(lang, 'description', e.target.value)}
                              rows={4}
                              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              dir={lang === 'AR' ? 'rtl' : 'ltr'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Features
                            </label>
                            {Object.keys(translations[lang].features).map((featureKey) => (
                              <div key={featureKey} className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {featureKey}
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(lang, featureKey)}
                                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Remove feature"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  value={translations[lang].features[featureKey]}
                                  onChange={(e) => handleFeatureChange(lang, featureKey, e.target.value)}
                                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  dir={lang === 'AR' ? 'rtl' : 'ltr'}
                                />
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddFeature(lang)}
                              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Add Feature
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleSaveTranslations}
                      disabled={saving}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                          Saving...
                        </>
                      ) : (
                        'Save Translations'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-[300px] border border-blue-200">
                <div className="text-center">
                  <Filter className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Select a product to manage translations</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}