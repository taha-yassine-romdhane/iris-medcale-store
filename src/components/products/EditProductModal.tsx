'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Product, Media, StockStatus } from '@/types/product';
import Image from 'next/image';
import { UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface EditProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

export default function EditProductModal({ isOpen, closeModal, product, onUpdate }: EditProductModalProps) {
  // Helper function to parse features
  const parseFeatures = (features: Product['features']): string[] => {
    try {
      if (typeof features === 'string') {
        return JSON.parse(features);
      } else if (Array.isArray(features)) {
        return features;
      } else if (typeof features === 'object') {
        return [];
      }
    } catch (error) {
      console.error('Error parsing features:', error);
    }
    return [];
  };

  // Initialize with default values for all fields
  const [formData, setFormData] = useState<Product>({
    ...product,
    name: product?.name || '',
    description: product?.description || '',
    media: Array.isArray(product?.media) ? product.media : [],
    stock: product.stock ?? StockStatus.IN_STOCK,
    features: parseFeatures(product?.features),
    category: product?.category || '',
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        media: Array.isArray(product.media) ? product.media : [],
        features: parseFeatures(product.features),
        stock: product.stock ?? StockStatus.IN_STOCK,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      const productData = {
        ...formData,
        features: Array.isArray(formData.features) ? formData.features : [],
        subCategory: formData.subCategory || null,
        media: formData.media.map((m, index) => ({
          ...m,
          order: index,
        })),
        stock: formData.stock || StockStatus.IN_STOCK
      };

      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      const result = await response.json();
      
      // Call onUpdate with the complete updated product
      onUpdate({
        ...result,
        media: result.media || [],  // Ensure media is always an array
        features: result.features || [],  // Ensure features is always an array
        subCategory: result.subCategory || null  // Ensure subCategory is properly handled
      });

      // Show success message
      alert('Product updated successfully!');
      
      // Close modal
      closeModal();
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error instanceof Error ? error.message : 'Failed to update product. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleMediaUpload = (files: { url: string; type: string; name: string }[]) => {
    const newMedia: Media[] = files.map((file) => ({
      url: file.url,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      alt: file.name,
      order: formData.media.length,
    }));

    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, ...newMedia],
    }));
  };

  const handleMediaDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(Array.isArray(prev.features) ? prev.features : []), newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: Array.isArray(prev.features) ? prev.features.filter((_, i) => i !== index) : [],
    }));
  };

  const handleMediaMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.media.length - 1)
    ) {
      return;
    }

    const newMedia = [...formData.media];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the media items
    [newMedia[index], newMedia[newIndex]] = [newMedia[newIndex], newMedia[index]];
    
    // Update the order property
    newMedia.forEach((media, i) => {
      media.order = i;
    });

    setFormData(prev => ({
      ...prev,
      media: newMedia
    }));
  };

  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Modifier le produit</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Marque
                      </label>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                        Sous-catégorie
                      </label>
                      <input
                        type="text"
                        name="subCategory"
                        id="subCategory"
                        value={formData.subCategory || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caractéristiques
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                          placeholder="Ajouter une caractéristique"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Ajouter
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {Array.isArray(formData.features) && formData.features.map((feature, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700">{feature}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images du produit
                    </label>
                    <UploadDropzone<OurFileRouter,"mediaUploader">
                      endpoint="mediaUploader"
                      onClientUploadComplete={handleMediaUpload}
                      onUploadError={(error: Error) => {
                        console.error('Upload error:', error);
                        alert(`Error uploading file: ${error.message}`);
                      }}
                      config={{
                        mode: "auto"
                      }}
                    />
                    
                    {/* Media Preview */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {formData?.media?.map((media, index) => (
                        <div key={index} className="relative group bg-gray-50 p-2 rounded-lg">
                          <div className="relative">
                            {media.type === 'image' ? (
                              <Image
                                src={media.url}
                                alt={media.alt || `Product image ${index + 1}`}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover"
                              />
                            ) : (
                              <video
                                src={media.url}
                                controls
                                className="rounded-lg w-full h-[200px] object-cover"
                              />
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleMediaDelete(index)}
                                className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Order: {media.order + 1}</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleMediaMove(index, 'up')}
                                disabled={index === 0}
                                className={`p-1 rounded-full ${
                                  index === 0 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                                } text-white`}
                              >
                                <ArrowUp size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMediaMove(index, 'down')}
                                disabled={index === formData.media.length - 1}
                                className={`p-1 rounded-full ${
                                  index === formData.media.length - 1
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                } text-white`}
                              >
                                <ArrowDown size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Status du stock
                    </label>
                    <select
                      name="stock"
                      id="stock"
                      value={formData?.stock || StockStatus.IN_STOCK}
                      onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value as StockStatus }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value={StockStatus.IN_STOCK}>En stock</option>
                      <option value={StockStatus.LOW_STOCK}>Stock faible</option>
                      <option value={StockStatus.PRE_ORDER}>Pré-commande</option>
                      <option value={StockStatus.COMING_SOON}>En Arrivage</option>
                      <option value={StockStatus.OUT_OF_STOCK}>En rupture</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}