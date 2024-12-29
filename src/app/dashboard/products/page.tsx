'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash, Search, Eye, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import ViewProductModal from '@/components/products/ViewProductModal';
import EditProductModal from '@/components/products/EditProductModal';
import DeleteProductModal from '@/components/products/DeleteProductModal';
import AddProductModal from '@/components/products/AddProductModal';
import { Product } from '@/types/product';
import Image from 'next/image';

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category] = useState('');
  const [type] = useState('');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          ...(category && { category }),
          ...(type && { type })
        });

        const response = await fetch(`/api/products?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        // Ensure price is converted to number
        const formattedData = Array.isArray(data) ? data.map(product => ({
          ...product,
          price: Number(product.price)
        })) : [];
        setProducts(formattedData);
      } catch (error) {
        console.error('Error:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category, type]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="p-10 flex flex-col h-full bg-gray-100">
      <div className="p-10">
        <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          {/* Left Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
            <p className="text-gray-500">Gérez vos produits</p>
          </div>

          {/* Right Section */}
          <div className="flex space-x-4">
            <a
              href="/dashboard"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Home className="mr-2" />
              Accueil
            </a>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="mr-2" />
              Ajouter un produit
            </button>
          </div>
        </div>


        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    En stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.media && product.media[0] ? (
                        <Image
                          src={product.media[0].url}
                          alt={product.media[0].alt || product.name}
                          width={64}
                          height={64}
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">TND {Number(product.price).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.inStock ? 'En stock' : 'En rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 mr-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className={currentPage === 1 ? "text-gray-300" : "text-gray-600"} />
              </button>
              <span className="mx-4 text-sm text-gray-700">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className={currentPage === totalPages ? "text-gray-300" : "text-gray-600"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ViewProductModal
        isOpen={isViewModalOpen}
        closeModal={() => setIsViewModalOpen(false)}
        product={selectedProduct}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        product={selectedProduct}
        onDelete={handleDeleteProduct}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        onAdd={(newProduct) => {
          setProducts([...products, newProduct]);
        }}
      />
    </div>
  );
}