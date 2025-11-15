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
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      dishId: dish.id,
      dishName: dish.name,
      quantity,
      image: dish.image,
      price: dish.price,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    setQuantity(1);
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
          <span className="text-2xl font-bold text-gold-700">${dish.price.toFixed(2)}</span>
        </div>
        
        {showOrderButton && (
          <div className="space-y-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-warmBrown-200 hover:bg-warmBrown-300 flex items-center justify-center transition-all active:scale-90 font-bold"
              >
                −
              </button>
              <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-warmBrown-200 hover:bg-warmBrown-300 flex items-center justify-center transition-all active:scale-90 font-bold"
              >
                +
              </button>
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
