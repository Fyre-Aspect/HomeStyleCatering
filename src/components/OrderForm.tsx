'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import Button from './Button';
import OrderSuccess from './OrderSuccess';
import { useCart } from '@/context/CartContext';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  orderDate: string;
  orderTime: string;
  contactPreference: 'email' | 'phone';
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
}

export default function OrderForm() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalItems, getSubtotal } = useCart();
  
  // Get tomorrow's date as minimum order date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    orderDate: getTomorrowDate(),
    orderTime: '12:00',
    contactPreference: 'email',
    deliveryOption: 'pickup',
    deliveryAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successOrderDetails, setSuccessOrderDetails] = useState<any>(null);

  const DELIVERY_FEE = 6.00;
  const subtotal = getSubtotal();
  const deliveryFee = formData.deliveryOption === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Small delay so the loading state feels intentional
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Prepare order data for Formspree
      const itemsList = cart.map(item => `${item.dishName} (${item.traySize} Tray) - $${Math.round(item.price)}`).join('\n');
      
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        orderDate: formData.orderDate,
        orderTime: formData.orderTime,
        contactPreference: formData.contactPreference,
        deliveryOption: formData.deliveryOption,
        deliveryAddress: formData.deliveryOption === 'delivery' ? formData.deliveryAddress : 'N/A - Pickup',
        notes: formData.notes,
        orderItems: itemsList,
        totalItems: getTotalItems(),
        subtotal: `$${Math.round(subtotal)}`,
        deliveryFee: `$${Math.round(deliveryFee)}`,
        totalPrice: `$${Math.round(total)}`,
        timestamp: new Date().toISOString(),
        _subject: `New Order from ${formData.fullName} - $${Math.round(total)}`,
      };

      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mvgdakkp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      // Store order details for success screen
      setSuccessOrderDetails({
        customerName: formData.fullName,
        orderDate: formData.orderDate,
        orderTime: formData.orderTime,
        deliveryOption: formData.deliveryOption,
        deliveryAddress: formData.deliveryAddress,
        contactPreference: formData.contactPreference,
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
      });

      // Clear cart and form
      clearCart();
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        notes: '',
        orderDate: getTomorrowDate(),
        orderTime: '12:00',
        contactPreference: 'email',
        deliveryOption: 'pickup',
        deliveryAddress: '',
      });

      // Show success screen with a slight delay so transition feels smooth
      setTimeout(() => {
        setShowSuccess(true);
      }, 400);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(
        'Sorry, there was an error submitting your order. Please try again or call us at (647) 785-4298.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-warmBrown-900 mb-4">
            Your Cart is Empty
          </h3>
          <p className="font-sans text-base md:text-lg text-warmBrown-600 mb-8">
            Browse our menu and add some delicious dishes to get started!
          </p>
          <Button href="/menu" variant="primary" className="text-base">
            View Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Call Now Button */}
      <div className="mb-8 text-center">
        <a
          href="tel:6477854298"
          className="inline-block bg-deepRed-600 hover:bg-deepRed-700 text-white font-sans font-bold text-lg md:text-xl py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 hover:scale-105"
        >
          📞 Call Now: (647) 785-4298
        </a>
        <p className="mt-4 font-sans text-warmBrown-600">Or complete your order below</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-warmBrown-900">
              Your Order ({getTotalItems()} items)
            </h3>
            <button
              onClick={clearCart}
              className="font-sans text-sm text-deepRed-600 hover:text-deepRed-700 font-semibold transition-all"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cart.map((item, index) => (
              <div
                key={`${item.dishId}-${item.traySize}-${index}`}
                className="flex items-center gap-4 p-4 bg-warmBrown-50 rounded-lg border border-warmBrown-200 transition-all hover:shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.dishName}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h5 className="font-sans font-semibold text-warmBrown-900">{item.dishName}</h5>
                  <p className="text-sm text-warmBrown-600">
                    <span className="inline-block bg-gold-100 text-gold-800 px-2 py-0.5 rounded text-xs font-semibold mr-1">
                      {item.traySize} Tray
                    </span>
                  </p>
                  <p className="text-sm font-bold text-gold-700">${Math.round(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.dishId, item.traySize)}
                    className="text-deepRed-600 hover:text-deepRed-700 font-bold transition-all active:scale-90 hover:bg-deepRed-50 p-2 rounded-lg"
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-warmBrown-200 space-y-3">
            <div className="flex justify-between text-base">
              <span className="font-sans text-warmBrown-700">Subtotal:</span>
              <span className="font-sans font-semibold text-warmBrown-900">${Math.round(subtotal)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-base">
                <span className="font-sans text-warmBrown-700">Delivery Fee:</span>
                <span className="font-sans font-semibold text-warmBrown-900">${Math.round(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg pt-3 border-t border-warmBrown-200">
              <span className="font-sans font-bold text-warmBrown-900">Total:</span>
              <span className="font-sans font-bold text-gold-700 text-2xl">${Math.round(total)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-warmBrown-200">
            <Button href="/menu" variant="outline" className="w-full">
              ← Add More Items
            </Button>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-warmBrown-900 mb-6">
            Checkout
          </h3>

          <div>
            <label htmlFor="fullName" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full font-sans px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full font-sans px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="(647) 785-4298"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full font-sans px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="orderDate" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
                Order Date *
              </label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                min={getTomorrowDate()}
                required
                className="w-full font-sans px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="orderTime" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
                Preferred Time *
              </label>
              <input
                type="time"
                id="orderTime"
                name="orderTime"
                value={formData.orderTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-warmBrown-800 mb-3">
              Delivery Option *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="pickup"
                  checked={formData.deliveryOption === 'pickup'}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 focus:ring-gold-500 mr-2"
                />
                <span className="text-warmBrown-700 group-hover:text-warmBrown-900 transition-colors">Pickup (Free)</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={formData.deliveryOption === 'delivery'}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 focus:ring-gold-500 mr-2"
                />
                <span className="text-warmBrown-700 group-hover:text-warmBrown-900 transition-colors">Delivery (+$6.00)</span>
              </label>
            </div>
            {formData.deliveryOption === 'delivery' && (
              <p className="mt-2 text-sm text-warmBrown-600">
                📍 Serving Kitchener-Waterloo Area
              </p>
            )}
          </div>

          {/* Delivery Address Field - Shows only when delivery is selected */}
          {formData.deliveryOption === 'delivery' && (
            <div>
              <label htmlFor="deliveryAddress" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
                Delivery Address *
              </label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                rows={3}
                className="w-full font-sans px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your complete delivery address (street, city, postal code)"
              />
            </div>
          )}

          <div className="bg-gold-50 border-l-4 border-gold-600 p-4 rounded-r-lg">
            <p className="text-sm text-warmBrown-700">
              <strong>Please note:</strong> Orders must be placed at least 48 hours in advance. We&apos;ll confirm availability and exact timing after receiving your order.
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-warmBrown-800 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
              placeholder="Any allergies or special requests?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warmBrown-800 mb-3">
              Preferred Contact Method *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="contactPreference"
                  value="email"
                  checked={formData.contactPreference === 'email'}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 focus:ring-gold-500 mr-2"
                />
                <span className="text-warmBrown-700 group-hover:text-warmBrown-900 transition-colors">Email</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="contactPreference"
                  value="phone"
                  checked={formData.contactPreference === 'phone'}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold-600 focus:ring-gold-500 mr-2"
                />
                <span className="text-warmBrown-700 group-hover:text-warmBrown-900 transition-colors">Phone Call</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-wait"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Placing Order...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete Order
              </span>
            )}
          </Button>

          <p className="text-sm text-warmBrown-500 text-center">
            * Required fields
          </p>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && successOrderDetails && (
        <OrderSuccess
          orderDetails={successOrderDetails}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
