'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { CartItem } from '@/context/CartContext';

interface OrderSuccessProps {
  orderDetails: {
    customerName: string;
    orderDate: string;
    orderTime: string;
    deliveryOption: 'pickup' | 'delivery';
    deliveryAddress?: string;
    contactPreference: 'email' | 'phone';
    paymentMethod: 'cash' | 'etransfer';
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
  onClose: () => void;
}

export default function OrderSuccess({ orderDetails, onClose }: OrderSuccessProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowConfetti(true), 300);
    
    // Remove confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#eab308', '#ca8a04', '#a16207', '#dc2626', '#b91c1c'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Modal */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Header with Animation */}
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
          <div className="relative z-10 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 animate-bounce">
              <svg
                className="w-12 h-12 text-gold-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              🎉 Congratulations!
            </h2>
            <p className="font-sans text-gold-100 text-lg mb-1">
              Your Order is Confirmed, {orderDetails.customerName}!
            </p>
            <p className="font-sans text-gold-200 text-sm">
              We can't wait to serve you delicious homestyle food!
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-8 space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-sans text-sm text-green-800">
                  Your order has been processed and we&apos;ve received all your details.
                  We&apos;ll contact you via {orderDetails.contactPreference} shortly to go over everything and finalize the next steps.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery/Pickup Info */}
          <div className="bg-gold-50 rounded-xl p-6 border border-gold-200">
            <h3 className="font-display text-xl font-bold text-warmBrown-900 mb-4 flex items-center gap-2">
              {orderDetails.deliveryOption === 'delivery' ? (
                <>
                  <span>🚚</span> Delivery Details
                </>
              ) : (
                <>
                  <span>📦</span> Pickup Details
                </>
              )}
            </h3>
            <div className="space-y-2 font-sans text-warmBrown-700">
              <p>
                <span className="font-semibold">Date:</span> {new Date(orderDetails.orderDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {orderDetails.orderTime}
              </p>
              {orderDetails.deliveryOption === 'delivery' && orderDetails.deliveryAddress && (
                <p>
                  <span className="font-semibold">Address:</span> {orderDetails.deliveryAddress}
                </p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-display text-xl font-bold text-warmBrown-900 mb-4 flex items-center gap-2">
              <span>💳</span> Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                  {orderDetails.paymentMethod === 'cash' ? '💵' : '📧'}
                </div>
                <div className="flex-1">
                  <p className="font-sans font-semibold text-warmBrown-900 mb-1">
                    {orderDetails.paymentMethod === 'cash' 
                      ? `Cash at ${orderDetails.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'}` 
                      : 'E-Transfer'}
                  </p>
                  {orderDetails.paymentMethod === 'cash' ? (
                    <p className="text-sm text-warmBrown-700">
                      Please have <span className="font-bold text-gold-700">${Math.round(orderDetails.total)}</span> ready when you {orderDetails.deliveryOption === 'delivery' ? 'receive your delivery' : 'pick up your order'}.
                    </p>
                  ) : (
                    <div className="text-sm text-warmBrown-700 space-y-2">
                      <p>
                        Please send <span className="font-bold text-gold-700">${Math.round(orderDetails.total)}</span> via e-transfer to:
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-300">
                        <p className="font-mono font-semibold text-blue-700 break-all">
                          homestylecateringkwc@gmail.com
                        </p>
                      </div>
                      <p className="text-xs text-warmBrown-600">
                        ℹ️ We&apos;ll confirm receipt of your payment shortly.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-display text-xl font-bold text-warmBrown-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              {orderDetails.items.map((item, index) => (
                <div
                  key={`${item.dishId}-${item.traySize}-${index}`}
                  className="flex items-center justify-between p-3 bg-warmBrown-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.dishName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-warmBrown-900">
                        {item.dishName}
                      </p>
                      <p className="font-sans text-sm text-warmBrown-600">
                        <span className="inline-block bg-gold-100 text-gold-800 px-2 py-0.5 rounded text-xs font-semibold">
                          {item.traySize} Tray
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-sans font-bold text-gold-700">
                    ${Math.round(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-warmBrown-200 pt-4 space-y-2">
            <div className="flex justify-between font-sans text-warmBrown-700">
              <span>Subtotal:</span>
              <span className="font-semibold">${Math.round(orderDetails.subtotal)}</span>
            </div>
            {orderDetails.deliveryFee > 0 && (
              <div className="flex justify-between font-sans text-warmBrown-700">
                <span>Delivery Fee:</span>
                <span className="font-semibold">${Math.round(orderDetails.deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-sans text-lg font-bold text-warmBrown-900 pt-2 border-t border-warmBrown-300">
              <span>Total:</span>
              <span className="text-gold-700 text-2xl">${Math.round(orderDetails.total)}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-warmBrown-50 rounded-xl p-6 border border-warmBrown-200">
            <h3 className="font-display text-lg font-bold text-warmBrown-900 mb-3">
              Need to make changes?
            </h3>
            <p className="font-sans text-warmBrown-700 mb-4">
              Contact us anytime:
            </p>
            <div className="space-y-2 font-sans text-warmBrown-700">
              <p>📞 <a href="tel:6477854298" className="text-gold-700 hover:text-gold-800 font-semibold">(647) 785-4298</a></p>
              <p>📧 <a href="mailto:homestylecateringkwc@gmail.com" className="text-gold-700 hover:text-gold-800 font-semibold">homestylecateringkwc@gmail.com</a></p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="primary"
              onClick={onClose}
              className="flex-1 text-lg py-4"
            >
              ✓ Done
            </Button>
            <Button
              variant="outline"
              href="/menu"
              className="flex-1 text-lg py-4"
            >
              Browse Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Add confetti animation styles */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
