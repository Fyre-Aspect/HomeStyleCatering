'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import type { Dish, DishOption } from '@/data/dishes';

interface DishCardProps {
  dish: Dish;
  showOrderButton?: boolean;
}

export default function DishCard({ dish, showOrderButton = true }: DishCardProps) {
  const { addToCart } = useCart();
  const [traySize, setTraySize] = useState<'Regular' | 'Large'>('Regular');
  const [selectedOption, setSelectedOption] = useState<DishOption | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // Initialize selected option
  useEffect(() => {
    if (dish.options && dish.options.length > 0) {
      setSelectedOption(dish.options[0]);
    }
  }, [dish]);

  // Calculate price based on size and selected option
  const getOptionPrice = (option: DishOption, size: 'Regular' | 'Large' = traySize) => {
    if (size === 'Regular') {
      return option.price;
    } else {
      return option.largePrice || option.price * 2;
    }
  };

  const currentPrice = React.useMemo(() => {
    if (!selectedOption) return dish.price;
    return getOptionPrice(selectedOption);
  }, [traySize, selectedOption, dish.price]);

  const getSizePrice = (size: 'Regular' | 'Large') => {
    if (!selectedOption) return 0;
    return getOptionPrice(selectedOption, size);
  };

  const getSizeLabel = (size: 'Regular' | 'Large') => {
    const isAppetizer = dish.category.includes('APPETIZERS');
    
    if (size === 'Regular') {
      return isAppetizer ? '(25 PCS)' : '(4-8 ppl)';
    } else {
      return isAppetizer ? '(50 PCS)' : '(10-15 ppl)';
    }
  };

  const handleAddToCart = () => {
    if (!selectedOption) return;

    addToCart({
      dishId: dish.id,
      dishName: dish.name,
      quantity: 1,
      traySize,
      selectedOption: selectedOption.name,
      image: dish.image,
      price: currentPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (!selectedOption) return null; // Or loading state

  return (
    <div className="card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden shrink-0">
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
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-warmBrown-900 mb-2 group-hover:text-gold-600 transition-colors">
            {dish.name}
          </h3>
          <p className="text-warmBrown-600 text-sm line-clamp-2">
            {dish.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          {/* Options Selection */}
          {dish.options && dish.options.length > 1 && (
            <div className="flex bg-warmBrown-50 rounded-lg p-1 mb-2">
              {dish.options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setSelectedOption(option)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-95 ${
                    selectedOption.name === option.name
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'text-warmBrown-600 hover:text-warmBrown-800 hover:bg-warmBrown-100'
                  }`}
                >
                  <span className="block">{option.name}</span>
                  <span className={`text-xs opacity-90 ${selectedOption.name === option.name ? 'text-white' : 'text-warmBrown-500'}`}>
                    ${getOptionPrice(option)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Size Selection */}
          <div className="flex bg-warmBrown-50 rounded-lg p-1">
            {(['Regular', 'Large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setTraySize(size)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-95 ${
                  traySize === size
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'text-warmBrown-600 hover:text-warmBrown-800 hover:bg-warmBrown-100'
                }`}
              >
                <span className="block">{size}</span>
                <span className="block text-xs opacity-90 mb-0.5">{getSizeLabel(size)}</span>
                <span className={`text-xs font-bold ${traySize === size ? 'text-white' : 'text-warmBrown-500'}`}>
                  ${getSizePrice(size)}
                </span>
              </button>
            ))}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-warmBrown-100">
            <div className="flex flex-col">
              <span className="text-xs text-warmBrown-500 font-medium uppercase tracking-wider">
                Price
              </span>
              <span className="text-2xl font-bold text-gold-600">
                ${currentPrice}
              </span>
            </div>

            {showOrderButton && (
              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`btn-primary py-2 px-6 text-sm ${
                  justAdded ? 'bg-green-600 border-green-600' : ''
                }`}
              >
                {justAdded ? 'Added!' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
