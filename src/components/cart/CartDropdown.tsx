'use client';

import { useCart } from '@/hooks/useCart';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, setCartOpen } = useCart();

  useEffect(() => {
    setCartOpen?.(setIsOpen);
  }, [setCartOpen]);

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-700 hover:text-blue-600 p-2 transition-colors duration-200"
      >
        <ShoppingBag className="h-6 w-6" />
        {cart?.items?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {cart.items.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full sm:w-80 bg-white shadow-2xl transform translate-x-0 transition-transform duration-300 ease-in-out z-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Mon Panier</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 transition-colors duration-200 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {!cart?.items?.length ? (
                <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
                  <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center mb-4">Votre panier est vide</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 py-2 px-4 touch-manipulation"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto px-3 sm:px-4 py-2">
                    <div className="space-y-3 sm:space-y-4">
                      {cart.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{item.brand}</p>
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors duration-200 touch-manipulation"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors duration-200 touch-manipulation"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors duration-200 touch-manipulation"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md touch-manipulation"
                      onClick={() => setIsOpen(false)}
                    >
                      Demander un devis
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
