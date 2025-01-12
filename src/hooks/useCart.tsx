'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '@/types/cart'; // Import Cart and CartItem types
import { Product } from '@/types/product'; // Import the Product type
import { toast } from 'react-hot-toast';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void; // Use `Product` instead of `any`
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultCart: Cart = {
  items: [],
  total: 0
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(defaultCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && Array.isArray(parsedCart.items)) {
          setCart(parsedCart);
        } else {
          setCart(defaultCart);
        }
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      setCart(defaultCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (cart && Array.isArray(cart.items)) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total) => total , 0);
  };

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increment quantity
        return {
          ...currentCart,
          items: currentCart.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // If item doesn't exist, add it with the first media URL as image
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          quantity: 1,
          inStock: product.inStock,
          features: product.features,
          image: product.media[0]?.url // Use the first media item's URL as the image
        };
        
        return {
          ...currentCart,
          items: [...currentCart.items, cartItem]
        };
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId);
      toast.success('Produit retiré du panier');
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const clearCart = () => {
    setCart(defaultCart);
    toast.success('Panier vidé');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}