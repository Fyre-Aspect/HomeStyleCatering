import React from 'react';
import PageHero from '@/components/PageHero';
import OrderForm from '@/components/OrderForm';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order | HOMESTYLÉ Catering',
  description: 'Quick and easy ordering for pickup or delivery.',
  openGraph: {
    title: 'Order | HOMESTYLÉ Catering',
    description: 'Quick and easy ordering for pickup or delivery.',
    type: 'website',
  },
};

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-warmBrown-50 to-gold-50">
      {/* Hero Section */}
      <PageHero 
        title="Place Your Order"
        subtitle="Experience authentic flavors delivered to your doorstep"
        image="/images/Haleem.jpg"
      />

      {/* Order Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <ScrollReveal>
            <OrderForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Delivery Info */}
              <div className="text-center p-6 bg-warmBrown-50 rounded-xl">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="font-bold text-xl text-warmBrown-900 mb-2">
                  Pickup & Delivery
                </h3>
                <p className="text-warmBrown-600">
                  Available for both pickup and delivery. We&apos;ll confirm your order details shortly.
                </p>
              </div>

              {/* Fresh Food */}
              <div className="text-center p-6 bg-warmBrown-50 rounded-xl">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="font-bold text-xl text-warmBrown-900 mb-2">
                  Made Fresh
                </h3>
                <p className="text-warmBrown-600">
                  Every dish is prepared fresh to order using authentic recipes and quality ingredients.
                </p>
              </div>

              {/* Customer Support */}
              <div className="text-center p-6 bg-warmBrown-50 rounded-xl">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold text-xl text-warmBrown-900 mb-2">
                  We&apos;re Here to Help
                </h3>
                <p className="text-warmBrown-600">
                  Questions about your order? Call us at (647) 785-4298 or send us an email.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Banner */}

    </main>
  );
}
