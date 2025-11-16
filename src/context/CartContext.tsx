'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  dishId: string;
  dishName: string;
  quantity: number;
  traySize: 'Small' | 'Medium' | 'Large';
  image: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (dishId: string, traySize?: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if same dish with same tray size exists
      const existingItem = prevCart.find(i => i.dishId === item.dishId && i.traySize === item.traySize);
      
      if (existingItem) {
        return prevCart.map(i =>
          i.dishId === item.dishId && i.traySize === item.traySize
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      
      return [...prevCart, item];
    });
  };

  const removeFromCart = (dishId: string, traySize?: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.dishId === dishId && (!traySize || item.traySize === traySize))));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(dishId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.dishId === dishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
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
