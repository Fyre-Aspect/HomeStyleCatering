import React from 'react';
import DishCard from './DishCard';
import type { Dish } from '@/data/dishes';

interface MenuGridProps {
  dishes: Dish[];
  title?: string;
  subtitle?: string;
}

export default function MenuGrid({ dishes, title, subtitle }: MenuGridProps) {
  return (
    <section className="py-16">
      <div className="container-custom">
        {title && (
          <div className="text-center mb-12">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

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
