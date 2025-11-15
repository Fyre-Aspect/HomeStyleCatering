'use client';

import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  image?: string;
}

export default function PageHero({ title, subtitle, image = '/images/Butter chicken.jpg' }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(202, 138, 4, 0.92) 0%, rgba(120, 53, 15, 0.88) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 py-20">
        <h1 className="hero-title font-display text-4xl md:text-5xl font-bold mb-4">
          {title}
        </h1>
        <p className="hero-subtitle font-sans text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
