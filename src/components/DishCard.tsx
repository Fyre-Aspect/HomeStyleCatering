'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import type { Dish } from '@/data/dishes';

interface DishCardProps {
  dish: Dish;
  showOrderButton?: boolean;
}

export default function DishCard({ dish, showOrderButton = true }: DishCardProps) {
  const { addToCart } = useCart();
  const [traySize, setTraySize] = useState<'Regular' | 'Large'>('Regular');
  const [justAdded, setJustAdded] = useState(false);

  // Different pricing for different dishes
  const getPriceForSize = (size: 'Regular' | 'Large') => {
    if (size === 'Regular') return dish.price;
    
    // Large tray prices
    const largePrices: { [key: string]: number } = {
      'chicken-biryani': 109,
      'lamb-biryani': 130,
      'veg-biryani': 95,
      'butter-chicken': 75,
      'sauce-chicken': 75,
      'haleem': 80,
    };
    
    // If dish has specific large price, use it; otherwise use multiplier
    return largePrices[dish.id] || dish.price * 2.24;
  };

  const trayPrice = getPriceForSize(traySize);

  const handleAddToCart = () => {
    addToCart({
      dishId: dish.id,
      dishName: dish.name,
      quantity: 1,
      traySize,
      image: dish.image,
      price: trayPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gold-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {dish.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold text-warmBrown-900 mb-2">
          {dish.name}
        </h3>
        <p className="font-sans text-warmBrown-600 mb-3 line-clamp-3">
          {dish.description}
        </p>
        <div className="mb-4">
          <p className="text-sm text-warmBrown-600 mb-1">Starting from</p>
          <span className="text-2xl font-bold text-gold-700">${Math.round(dish.price)}</span>
        </div>
        
        {showOrderButton && (
          <div className="space-y-3">
            {/* Tray Size Selector */}
            <div>
              <label className="block text-sm font-semibold text-warmBrown-800 mb-2">Select Tray Size:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTraySize('Regular')}
                  className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                    traySize === 'Regular'
                      ? 'bg-gold-600 text-white shadow-lg'
                      : 'bg-warmBrown-100 text-warmBrown-700 hover:bg-warmBrown-200'
                  }`}
                >
                  Regular
                  <div className="text-xs mt-1">(4-5 people)</div>
                  <div className="text-xs font-bold mt-0.5">${Math.round(dish.price)}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTraySize('Large')}
                  className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                    traySize === 'Large'
                      ? 'bg-gold-600 text-white shadow-lg'
                      : 'bg-warmBrown-100 text-warmBrown-700 hover:bg-warmBrown-200'
                  }`}
                >
                  Large
                  <div className="text-xs mt-1">(6+ people)</div>
                  <div className="text-xs font-bold mt-0.5">${Math.round(getPriceForSize('Large'))}</div>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl ${
                justAdded 
                  ? 'bg-green-600 text-white'
                  : 'bg-gold-600 hover:bg-gold-700 text-white'
              }`}
            >
              {justAdded ? '✓ Added!' : '🛒 Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
