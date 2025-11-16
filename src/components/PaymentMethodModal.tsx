'use client';

import React, { useState, useEffect } from 'react';

interface PaymentMethodModalProps {
  deliveryOption: 'pickup' | 'delivery';
  total: number;
  onSelectPayment: (paymentMethod: 'cash' | 'etransfer') => void;
}

export default function PaymentMethodModal({ 
  deliveryOption, 
  total,
  onSelectPayment 
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'etransfer' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    // Allow natural scrolling; avoid locking html/body which breaks mobile scroll
    return () => {};
  }, []);

  const handleConfirm = () => {
    if (selectedMethod) {
      onSelectPayment(selectedMethod);
    }
  };

  const paymentLabel = deliveryOption === 'delivery' ? 'Delivery' : 'Pickup';

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 py-4 sm:py-8">
        {/* Modal Container */}
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-md transition-all duration-300 transform ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white p-4 sm:p-6 rounded-t-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">💳</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-1">
                Choose Payment Method
              </h2>
              <p className="font-sans text-gold-100 text-xs sm:text-sm">
                Please select how you&apos;d like to pay for your order
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Order Total Display */}
            <div className="bg-warmBrown-50 rounded-xl p-3 sm:p-4 border border-warmBrown-200 text-center">
              <p className="font-sans text-warmBrown-700 text-xs sm:text-sm mb-1">Order Total</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-gold-700">
                ${Math.round(total)}
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Cash Option */}
              <button
                onClick={() => setSelectedMethod('cash')}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-200 ${
                  selectedMethod === 'cash'
                    ? 'border-gold-600 bg-gold-50 shadow-md'
                    : 'border-warmBrown-300 bg-white hover:border-gold-400 hover:bg-gold-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    selectedMethod === 'cash' ? 'bg-gold-600' : 'bg-warmBrown-100'
                  }`}>
                    {selectedMethod === 'cash' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>💵</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-base text-warmBrown-900 mb-1">
                      Pay at {paymentLabel}
                    </h3>
                    <p className="font-sans text-sm text-warmBrown-700">
                      Pay with cash when you {deliveryOption === 'delivery' ? 'receive your delivery' : 'pick up your order'}. 
                      Please have exact change ready.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Quick & Easy
                    </div>
                  </div>
                </div>
              </button>

              {/* E-Transfer Option */}
              <button
                onClick={() => setSelectedMethod('etransfer')}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-200 ${
                  selectedMethod === 'etransfer'
                    ? 'border-gold-600 bg-gold-50 shadow-md'
                    : 'border-warmBrown-300 bg-white hover:border-gold-400 hover:bg-gold-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    selectedMethod === 'etransfer' ? 'bg-gold-600' : 'bg-warmBrown-100'
                  }`}>
                    {selectedMethod === 'etransfer' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>📧</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-base text-warmBrown-900 mb-1">
                      E-Transfer
                    </h3>
                    <p className="font-sans text-sm text-warmBrown-700">
                      Pay securely online via Interac e-Transfer. You&apos;ll receive payment instructions after confirming your order.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Secure & Contactless
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Important Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-2.5 sm:p-3 rounded-r-lg">
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="font-sans text-xs sm:text-sm text-blue-800">
                  <strong>Note:</strong> You must select a payment method to continue. We&apos;ll confirm your order details shortly after submission.
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedMethod}
              className={`w-full font-sans font-bold text-sm sm:text-base py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl transition-all duration-200 ${
                selectedMethod
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
                  : 'bg-warmBrown-200 text-warmBrown-400 cursor-not-allowed'
              }`}
            >
              {selectedMethod ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm & Place Order
                </span>
              ) : (
                'Please Select Payment Method'
              )}
            </button>

            <p className="text-center font-sans text-[10px] sm:text-xs text-warmBrown-500">
              🔒 Your information is secure and will only be used to process your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
