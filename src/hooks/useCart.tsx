'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '@/types/cart';
import { toast } from 'react-hot-toast';

interface CartContextType {
  cart: Cart;
  addToCart: (product: any) => void;
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
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToCart = (product: any) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCart((prevCart) => {
      if (!prevCart || !Array.isArray(prevCart.items)) {
        prevCart = defaultCart;
      }

      const existingItem = prevCart.items.find((item) => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success('Quantité mise à jour dans le panier');
      } else {
        newItems = [
          ...prevCart.items,
          {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            quantity: 1,
            brand: product.brand,
            image: product.media?.[0]?.url
          }
        ];
        toast.success('Produit ajouté au panier');
      }

      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
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
