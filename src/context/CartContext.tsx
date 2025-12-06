'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from "firebase/analytics";
import { db, app } from '@/utils/firebase';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists() && docSnap.data().cart) {
            // If user has a saved cart, load it
            // Optional: Merge with current local cart if needed, but for now we'll just load the saved one
            // to ensure consistency across devices.
            setCart(docSnap.data().cart);
          }
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          await setDoc(docRef, { cart }, { merge: true });
        } catch (error) {
          console.error("Error saving cart:", error);
        }
      }
    };

    // Debounce saving to avoid too many writes
    const timeoutId = setTimeout(() => {
      saveCart();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cart, user]);

  const addToCart = (item: CartItem) => {
    if (typeof window !== 'undefined') {
      const analytics = getAnalytics(app);
      logEvent(analytics, 'add_to_cart', {
        currency: 'USD',
        value: item.price * item.quantity,
        items: [{
          item_id: item.dishId,
          item_name: item.dishName,
          item_variant: item.traySize + (item.selectedOption ? ` - ${item.selectedOption}` : ''),
          price: item.price,
          quantity: item.quantity
        }]
      });
    }

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
