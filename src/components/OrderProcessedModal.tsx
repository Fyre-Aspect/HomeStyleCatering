'use client';

import React from 'react';

interface OrderProcessedModalProps {
  status: 'processing' | 'success';
}

export default function OrderProcessedModal({ status }: OrderProcessedModalProps) {
  const isSuccess = status === 'success';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className={`p-6 text-center ${isSuccess ? 'bg-green-50' : 'bg-gold-50'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow mb-3">
            {isSuccess ? (
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="animate-spin h-8 w-8 text-gold-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M12 3a9 9 0 00-9 9h3a6 6 0 016-6V3z"></path>
              </svg>
            )}
          </div>

          <h3 className="font-display text-xl font-bold text-warmBrown-900">
            {isSuccess ? 'Order Processed' : 'Processing Your Order'}
          </h3>
          <p className="font-sans text-sm text-warmBrown-700 mt-2">
            {isSuccess
              ? 'Thanks for choosing HOMESTYLÉ! We’ll reach out shortly to confirm details.'
              : 'Please wait a moment while we finalize your order...'}
          </p>
        </div>
      </div>
    </div>
  );
}
