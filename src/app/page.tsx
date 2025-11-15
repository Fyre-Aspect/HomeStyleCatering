import React from 'react';
import Hero from '@/components/Hero';
import DishCard from '@/components/DishCard';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { featuredDishes } from '@/data/dishes';
import { reviews } from '@/data/reviews';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HOMESTYLÉ Catering',
  description: 'Authentic homestyle cuisine crafted with love and tradition.',
  openGraph: {
    title: 'HOMESTYLÉ Catering',
    description: 'Authentic homestyle cuisine crafted with love and tradition.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Featured Dishes Section */}
      <section className="py-20 bg-warmBrown-50">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Dishes</h2>
              <p className="section-subtitle">
                Handpicked specialties that showcase the best of our traditional recipes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <ScrollReveal key={dish.id} delay={index * 100}>
                <DishCard dish={dish} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-12">
              <Button href="/menu" variant="primary">
                View Full Menu
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-gold-50 to-warmBrown-100">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">
                Loved by families across the community
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Carousel reviews={reviews} />
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="section-title">Our Story</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="font-sans text-warmBrown-700 text-base md:text-lg leading-relaxed mb-6">
                    HOMESTYLÉ Catering was born from a deep love for traditional cooking and a desire to share 
                    the warmth of home-cooked meals with our community. Every dish we prepare carries the essence 
                    of generations of culinary wisdom, passed down through our family.
                  </p>
                  
                  <p className="font-sans text-warmBrown-700 text-base md:text-lg leading-relaxed mb-6">
                    We believe that food is more than sustenance—it&apos;s a celebration of culture, family, and 
                    tradition. That&apos;s why we use only the freshest ingredients, authentic spices, and time-honored 
                    techniques to create dishes that taste just like home.
                  </p>

                  <p className="font-sans text-warmBrown-700 text-base md:text-lg leading-relaxed mb-8">
                    From our aromatic biryanis to our delicate pineapple soufflé, each recipe is crafted with 
                    care and served with love. We invite you to experience the authentic flavors that make 
                    homestyle cuisine so special.
                  </p>

                  <div className="bg-gold-50 border-l-4 border-gold-600 p-6 rounded-r-lg mb-8">
                    <p className="font-sans text-warmBrown-800 font-medium italic">
                      &ldquo;Every dish tells a story. Every meal brings us together. This is the heart of HOMESTYLÉ Catering.&rdquo;
                    </p>
                  </div>

                  <div className="text-center">
                    <Button href="/order" variant="secondary" className="text-base">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
