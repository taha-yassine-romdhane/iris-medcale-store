'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/types/product';

interface ViewProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: Product | null;
}

export default function ViewProductModal({ isOpen, closeModal, product }: ViewProductModalProps) {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Détails du produit
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <div className="mt-2">
                  {product.media && product.media[0] && (
                    <Image
                      src={product.media[0]?.url || '/placeholder.jpg'}
                      alt={product.media[0]?.alt || product.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  )}

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Nom</h4>
                      <p className="text-base text-gray-900">{product.name}</p>
                    </div>

                    {product.subCategory && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Catégorie</h4>
                        <p className="text-base text-gray-900">{product.subCategory}</p>
                      </div>
                    )}

                    {product.brand && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Marque</h4>
                        <p className="text-base text-gray-900">{product.brand}</p>
                      </div>
                    )}

                    {product.type && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Type</h4>
                        <p className="text-base text-gray-900">{product.type}</p>
                      </div>
                    )}

                    {product.description && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="text-base text-gray-900">{product.description}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                      <span
                        className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${product.stock === 'IN_STOCK'
                            ? 'bg-green-100 text-green-800'
                            : product.stock === 'LOW_STOCK'
                              ? 'bg-blue-100 text-blue-800'
                              : product.stock === 'OUT_OF_STOCK'
                                ? 'bg-red-100 text-red-800'
                                : product.stock === 'COMING_SOON'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : ''
                          }`}
                      >
                        {product.stock === 'IN_STOCK' ? 'En stock' : product.stock === 'LOW_STOCK' ? 'Stock faible' : product.stock === 'OUT_OF_STOCK' ? 'En rupture' : product.stock === 'COMING_SOON' ? 'En Arrivage' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
