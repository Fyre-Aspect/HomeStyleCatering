import React from 'react';
import DishCard from './DishCard';
import type { Dish } from '@/data/dishes';

interface MenuGridProps {
  dishes: Dish[];
  title?: string;
  subtitle?: string;
}

export default function MenuGrid({ dishes, title, subtitle }: MenuGridProps) {
  // Group dishes by category in the specified order
  const categoryOrder = ['Biryani', 'Curries', 'Appetizers', 'Desserts'];
  
  const dishesByCategory = categoryOrder.reduce((acc, category) => {
    const categoryDishes = dishes.filter(dish => dish.category === category);
    if (categoryDishes.length > 0) {
      acc[category] = categoryDishes;
    }
    return acc;
  }, {} as Record<string, Dish[]>);

  return (
    <section className="py-16">
      <div className="container-custom">
        {title && (
          <div className="text-center mb-12">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        {/* Render dishes grouped by category */}
        {Object.entries(dishesByCategory).map(([category, categoryDishes]) => (
          <div key={category} className="mb-16">
            <h3 className="font-display text-3xl font-bold text-warmBrown-900 mb-8 text-center">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        ))}

        {dishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-warmBrown-600 text-lg">
              More delicious dishes coming soon...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
