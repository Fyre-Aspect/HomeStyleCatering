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

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto bg-warmBrown-50 rounded-2xl p-8 md:p-12 shadow-lg border border-warmBrown-100">
              <h2 className="font-display text-3xl font-bold text-warmBrown-900 mb-8 text-center">
                Important Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Order Notes */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-gold-600">Order Notes</h3>
                  <ul className="space-y-2 text-warmBrown-700 list-disc list-inside">
                    <li>Pickup and delivery available (additional charges may apply based on distance).</li>
                    <li>Please place your order at least 48 hours in advance.</li>
                    <li>We’ll confirm availability and provide the exact timing once your order has been received.</li>
                  </ul>
                </div>

                <div className="space-y-8">
                  {/* Pricing Disclaimer */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-gold-600">Pricing Disclaimer</h3>
                    <p className="text-warmBrown-700">
                      Prices subject to change without any notice.
                    </p>
                  </div>

                  {/* Allergy Disclaimer */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-gold-600">Allergy Disclaimer</h3>
                    <p className="text-warmBrown-700">
                      Please advise of any allergies so we can guide accordingly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Button href="/order" variant="primary">
                  Place Your Order
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
