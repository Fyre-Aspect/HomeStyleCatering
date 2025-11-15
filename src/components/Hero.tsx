'use client';

import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(202, 138, 4, 0.9) 0%, rgba(120, 53, 15, 0.85) 100%), url("/images/Chicken Biryani.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 hero-content">
        <h1 className="hero-title font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          HOMESTYLÉ Catering
        </h1>
        
        <p className="hero-subtitle text-lg md:text-2xl mb-4 font-light max-w-3xl mx-auto">
          Authentic Homestyle Cuisine
        </p>
        
        <p className="hero-description text-base md:text-lg mb-12 max-w-2xl mx-auto opacity-90">
          Experience the warmth of tradition with every bite. Crafted with love, served with excellence.
        </p>
        
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/menu" variant="primary" className="text-lg min-w-[200px]">
            View Full Menu
          </Button>
          <Button href="/order" variant="outline" className="text-lg min-w-[200px] bg-white/10 backdrop-blur-sm border-white text-white hover:bg-brown-300 hover:text-gold-700 hover:border-white">
            Order Now
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
