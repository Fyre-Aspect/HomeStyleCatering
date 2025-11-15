import React from 'react';
import PageHero from '@/components/PageHero';
import MenuGrid from '@/components/MenuGrid';
import Button from '@/components/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { dishes } from '@/data/dishes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu | HOMESTYLÉ Catering',
  description: 'Authentic homestyle dishes made fresh with traditional recipes.',
  openGraph: {
    title: 'Menu | HOMESTYLÉ Catering',
    description: 'Authentic homestyle dishes made fresh with traditional recipes.',
    type: 'website',
  },
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-warmBrown-50">
      {/* Hero Section */}
      <PageHero 
        title="Our Menu"
        subtitle="Discover our selection of authentic homestyle delicacies, each prepared with love and tradition"
        image="/images/Lamb-biryani.jpg"
      />

      {/* Menu Items */}
      <MenuGrid 
        dishes={dishes}
      />

      {/* Coming Soon Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-gold-50 to-warmBrown-100 rounded-2xl p-12 shadow-lg">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-warmBrown-900 mb-4">
                More Homestyle Delights Coming Soon!
              </h2>
              <p className="text-lg text-warmBrown-700 mb-8">
                We&apos;re constantly expanding our menu with more traditional favorites. 
                Have a special request? Let us know when you order!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/order" variant="primary">
                  Order Now
                </Button>
                <Button href="/" variant="outline">
                  Back to Home
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Banner */}

    </main>
  );
}
