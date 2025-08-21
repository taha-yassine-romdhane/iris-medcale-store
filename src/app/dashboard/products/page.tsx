'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash, Search, Eye } from 'lucide-react';
import ViewProductModal from '@/components/products/ViewProductModal';
import EditProductModal from '@/components/products/EditProductModal';
import DeleteProductModal from '@/components/products/DeleteProductModal';
import AddProductModal from '@/components/products/AddProductModal';
import ProductFilters from '@/components/products/ProductFilters';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch all products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          ...(category && { category }),
          ...(type && { type }),
          ...(brand && { brand }),
          ...(searchQuery && { search: searchQuery }),
        });

        const response = await fetch(`/api/products?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, type, brand, searchQuery, refreshTrigger]);

  // Filter handlers
  const handleFilter = ({ category, type, brand }: { category: string; type: string; brand: string }) => {
    setCategory(category);
    setType(type);
    setBrand(brand);
  };

  const handleResetPage = () => {
    setCategory('');
    setType('');
    setBrand('');
    setSearchQuery('');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    // First update the local state
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // Then trigger a refresh to ensure we have the latest data
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des produits</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Retour
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter un produit
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <ProductFilters
            onFilter={handleFilter}
            onResetPage={handleResetPage}
            className=""
          />

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Marque
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Categorie
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        Aucun produit trouvé
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-gray-100">
                            {product.media && product.media[0] ? (
                              <Image
                                src={product.media[0].url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full bg-gray-100">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.stock === 'IN_STOCK'
                                ? 'bg-green-100 text-green-800'
                                : product.stock === 'LOW_STOCK'
                                ? 'bg-yellow-100 text-yellow-800'
                                : product.stock === 'OUT_OF_STOCK'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsViewModalOpen(true);
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1 text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {/* Modals */}
      <ViewProductModal
        isOpen={isViewModalOpen}
        closeModal={() => setIsViewModalOpen(false)}
        product={selectedProduct}
      />

      {selectedProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          closeModal={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
        />
      )}

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        product={selectedProduct}
        onDelete={handleDeleteProduct}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
      </div>
    </div>
  );
}