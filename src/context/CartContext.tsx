'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  dishId: string;
  dishName: string;
  quantity: number;
  traySize: 'Regular' | 'Large';
  image: string;
  price: number;
  selectedOption?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (dishId: string, traySize?: string, selectedOption?: string) => void;
  updateQuantity: (dishId: string, quantity: number, traySize?: string, selectedOption?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if same dish with same tray size and option exists
      const existingItem = prevCart.find(i => 
        i.dishId === item.dishId && 
        i.traySize === item.traySize && 
        i.selectedOption === item.selectedOption
      );
      
      if (existingItem) {
        return prevCart.map(i =>
          i.dishId === item.dishId && i.traySize === item.traySize && i.selectedOption === item.selectedOption
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      
      return [...prevCart, item];
    });
  };

  const removeFromCart = (dishId: string, traySize?: string, selectedOption?: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.dishId === dishId && 
        (!traySize || item.traySize === traySize) &&
        (!selectedOption || item.selectedOption === selectedOption)
      )
    ));
  };

  const updateQuantity = (dishId: string, quantity: number, traySize?: string, selectedOption?: string) => {
    if (quantity < 1) {
      removeFromCart(dishId, traySize, selectedOption);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.dishId === dishId && 
        (!traySize || item.traySize === traySize) &&
        (!selectedOption || item.selectedOption === selectedOption)
          ? { ...item, quantity } : item
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
