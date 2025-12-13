'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import SignInButton from './SignInButton';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { getTotalItems } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Order', path: '/order' },
  ];

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav 
      className={`sticky top-0 z-50 bg-white shadow-md transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Homestyle Catering.png"
              alt="Homestyle Catering"
              width={50}
              height={50}
              className="h-10 md:h-12 w-auto"
              priority
            />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gold-700">
              HOMESTYLÉ Catering
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-sans font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-gold-700 border-b-2 border-gold-700'
                    : 'text-warmBrown-700 hover:text-gold-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/order"
              className="relative p-2 text-warmBrown-700 hover:text-gold-700 transition-colors"
              aria-label="View cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Sign In Button & Halal Logo */}
            <div className="flex items-center gap-4">
              <div className="relative group" title="Halal Certified">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-300 to-gold-600 rounded-full opacity-20 blur group-hover:opacity-50 transition duration-500"></div>
                <Image
                  src="/images/HALAL LOGO.png"
                  alt="Halal Certified"
                  width={45}
                  height={45}
                  className="relative object-contain drop-shadow-md"
                />
              </div>
              <SignInButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-warmBrown-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-warmBrown-800"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-warmBrown-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-gold-100 text-gold-700'
                    : 'text-warmBrown-700 hover:bg-warmBrown-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Cart Link */}
            <Link
              href="/order"
              className="flex items-center justify-between py-3 px-4 rounded-lg font-medium text-warmBrown-700 hover:bg-warmBrown-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-gold-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            <div className="px-4 py-3 border-t border-warmBrown-100 mt-2">
              <SignInButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
