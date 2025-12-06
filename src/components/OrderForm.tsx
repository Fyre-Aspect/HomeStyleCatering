'use client';

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import Image from 'next/image';
import Button from './Button';
import OrderSuccess from './OrderSuccess';
import PaymentMethodModal from './PaymentMethodModal';
import OrderProcessedModal from './OrderProcessedModal';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import SignInButton from './SignInButton';
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from '@/utils/firebase';

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
  paymentMethod: 'cash' | 'etransfer';
}

interface OrderDetails {
  customerName: string;
  orderDate: string;
  orderTime: string;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  contactPreference: 'email' | 'phone';
  paymentMethod: 'cash' | 'etransfer';
  items: Array<{
    dishId: string;
    dishName: string;
    quantity: number;
    traySize: 'Regular' | 'Large';
    image: string;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function OrderForm() {
  const { cart, removeFromCart, clearCart, getTotalItems, getSubtotal } = useCart();
  const { user, loading } = useAuth();
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const openNativeDatePicker = () => {
    const el = dateInputRef.current;
    if (!el) return;
    try {
      // showPicker is supported on modern Chromium and Safari 16.4+
      // Fallback to focus+click when not available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyEl = el as any;
      if (typeof anyEl.showPicker === 'function') {
        anyEl.showPicker();
      } else {
        el.focus();
        el.click();
      }
    } catch {
      el.focus();
      el.click();
    }
  };
  
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
    paymentMethod: 'cash',
  });

  // Prefill form with user data when signed in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        fullName: user.displayName || prev.fullName
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const [processedStatus, setProcessedStatus] = useState<'processing' | 'success'>('processing');
  const [successOrderDetails, setSuccessOrderDetails] = useState<OrderDetails | null>(null);

  const DELIVERY_FEE = 6.00;
  const subtotal = getSubtotal();
  const deliveryFee = formData.deliveryOption === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Show payment modal instead of immediately submitting
    setShowPaymentModal(true);
  };

  const handlePaymentSelection = async (paymentMethod: 'cash' | 'etransfer') => {
    // Close payment modal and show processing modal
    setShowPaymentModal(false);
    setShowProcessedModal(true);
    setProcessedStatus('processing');
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
        paymentMethod: paymentMethod === 'cash' ? `Cash at ${formData.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'}` : 'E-Transfer',
        notes: formData.notes,
        orderItems: itemsList,
        totalItems: getTotalItems(),
        subtotal: `$${Math.round(subtotal)}`,
        deliveryFee: `$${Math.round(deliveryFee)}`,
        totalPrice: `$${Math.round(total)}`,
        timestamp: new Date().toISOString(),
        _subject: `New Order from ${formData.fullName} - $${Math.round(total)}`,
      };

      const response = await fetch('https://formspree.io/f/mvgdakkp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to submit order');

      if (typeof window !== 'undefined') {
        const analytics = getAnalytics(app);
        logEvent(analytics, 'purchase', {
          transaction_id: new Date().getTime().toString(),
          value: total,
          currency: 'USD',
          tax: 0,
          shipping: deliveryFee,
          items: cart.map(item => ({
            item_id: item.dishId,
            item_name: item.dishName,
            item_variant: item.traySize + (item.selectedOption ? ` - ${item.selectedOption}` : ''),
            price: item.price,
            quantity: item.quantity
          }))
        });
      }

      // Prepare success details for full summary modal
      setSuccessOrderDetails({
        customerName: formData.fullName,
        orderDate: formData.orderDate,
        orderTime: formData.orderTime,
        deliveryOption: formData.deliveryOption,
        deliveryAddress: formData.deliveryAddress,
        contactPreference: formData.contactPreference,
        paymentMethod: paymentMethod,
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
      });

      // Flip the interim modal to "processed" then close it shortly after
      setProcessedStatus('success');
      await new Promise((r) => setTimeout(r, 1200));
      setShowProcessedModal(false);

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
        paymentMethod: 'cash',
      });

      // Show the detailed confirmation modal
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      setShowProcessedModal(false);
      alert('Sorry, there was an error submitting your order. Please try again or call us at (647) 785-4298.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-warmBrown-100">
          <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-warmBrown-900 mb-4">
            Sign In to Order
          </h2>
          <p className="font-sans text-warmBrown-600 mb-8 max-w-md mx-auto">
            Please sign in with your Google account to place an order. This helps us track your order and provide better service.
          </p>
          <div className="flex justify-center">
            <SignInButton />
          </div>
        </div>
      </div>
    );
  }

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
          {user && (
            <div className="mb-4 p-3 bg-gold-50 rounded-lg flex items-center gap-3 border border-gold-100">
              {user.photoURL && (
                <Image 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              )}
              <div className="text-sm text-warmBrown-800">
                <span className="block text-xs text-warmBrown-500">Ordering as</span>
                <span className="font-semibold">{user.displayName}</span>
              </div>
            </div>
          )}
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
                📅 Order Date *
              </label>
              <div
                className="block cursor-pointer"
                onClick={openNativeDatePicker}
                role="button"
                aria-label="Open date picker"
              >
                <input
                  ref={dateInputRef}
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange}
                  min={getTomorrowDate()}
                  required
                  className="w-full font-sans px-4 py-3 border-2 border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all cursor-pointer hover:border-gold-400 bg-white [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100"
                  style={{ colorScheme: 'light' }}
                />
              </div>
              <p className="mt-1 text-xs text-warmBrown-600">Orders require 48 hours notice</p>
            </div>
            <div>
              <label htmlFor="orderTime" className="block font-sans text-sm font-semibold text-warmBrown-800 mb-2">
                🕐 Preferred Time *
              </label>
              <select
                id="orderTime"
                name="orderTime"
                value={formData.orderTime}
                onChange={handleChange}
                required
                className="w-full font-sans px-4 py-3 border-2 border-warmBrown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all cursor-pointer hover:border-gold-400 bg-white appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b5b4d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
              <p className="mt-1 text-xs text-warmBrown-600">Approximate time - we&apos;ll confirm</p>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed inline-block font-semibold rounded-lg transition-all duration-200 text-center active:scale-95 hover:scale-105 bg-gold-600 hover:bg-gold-700 text-white shadow-lg hover:shadow-xl"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Continue to Payment
              </span>
            )}
          </button>

          <p className="text-sm text-warmBrown-500 text-center">
            * Required fields
          </p>
        </form>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentMethodModal
          deliveryOption={formData.deliveryOption}
          total={total}
          onSelectPayment={handlePaymentSelection}
        />
      )}

      {/* New: Post-payment processing/processed modal */}
      {showProcessedModal && <OrderProcessedModal status={processedStatus} />}

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
