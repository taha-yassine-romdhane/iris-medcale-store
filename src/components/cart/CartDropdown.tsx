'use client';

import { useCart } from '@/hooks/useCart';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, setCartOpen } = useCart();
  const { t } = useTranslation();

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
          <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {cart.items.length}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute sm:right-4 sm:top-4 bottom-0 right-0 sm:rounded-lg sm:w-96 w-full max-h-[90vh] overflow-hidden flex flex-col bg-white shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{t('cart.title')}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Empty Cart */}
              {!cart?.items?.length ? (
                <div className="flex flex-col items-center justify-center flex-1 p-8">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center mb-4">{t('cart.empty')}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    {t('cart.continue')}
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-auto p-6">
                    <div className="space-y-6">
                      {cart.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-6 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          {/* Product Image */}
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
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

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                            <div className="flex items-center mt-3 space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('cart.requestQuote')}
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}