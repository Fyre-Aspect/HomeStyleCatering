import React from 'react';
import type { Review } from '@/data/reviews';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-gold-500' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] md:min-w-[350px] flex-shrink-0">
      {renderStars(review.rating)}
      
      <p className="font-sans text-warmBrown-700 mb-4 italic leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>
      
      <div className="border-t border-warmBrown-200 pt-4">
        <p className="font-sans font-semibold text-warmBrown-900">{review.name}</p>
        <p className="font-sans text-sm text-warmBrown-500">{formatDate(review.date)}</p>
      </div>
    </div>
  );
}
