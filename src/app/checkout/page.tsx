'use client';

import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Package, Truck, Phone, Plus, Minus, Trash2 } from 'lucide-react';
import DevisModal from '@/components/modals/DevisModal';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Panier vide</h2>
            <p className="mt-1 text-sm text-gray-500">Votre panier est actuellement vide.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDevisRequest = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Demande de Devis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous vous fournirons un devis personnalisé pour vos produits sélectionnés. Notre équipe vous contactera dans les plus brefs délais.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Produits de Qualité</h3>
            <p className="text-gray-600">Tous nos produits sont certifiés et proviennent de marques reconnues</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Livraison Rapide</h3>
            <p className="text-gray-600">Service de livraison professionnel dans toute la Tunisie</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Support Personnalisé</h3>
            <p className="text-gray-600">Une équipe dédiée pour répondre à toutes vos questions</p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits Sélectionnés</h2>
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">Quantité:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                } else {
                                  removeFromCart(item.id);
                                }
                              }}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4 text-gray-500" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        
                        
                          <Trash2
                          onClick={() => removeFromCart(item.id)}
                          className="h-5 w-5 text-gray-500 hover:text-red-500"
                          />
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Demander un Devis</h2>
              <div className="space-y-4 mb-6">
                <p className="text-gray-600">
                  En cliquant sur le bouton ci-dessous, vous recevrez :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Un devis personnalisé
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Un appel de notre équipe commerciale
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">•</span>
                    Des conseils d&apos;experts sur vos produits
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
                disabled={loading}
                onClick={handleDevisRequest}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  'Demander un devis'
                )}
              </button>

              <p className="mt-4 text-sm text-gray-500 text-center">
                Notre équipe vous contactera sous 24-48h
              </p>
            </div>
          </div>
        </div>
      </div>

      <DevisModal 
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        items={cart.items}
      />
    </div>
  );
}
