import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-block font-semibold py-3 px-8 rounded-lg transition-all duration-200 text-center active:scale-95 hover:scale-105';
  
  const variantStyles = {
    primary: 'bg-gold-600 hover:bg-gold-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-deepRed-600 hover:bg-deepRed-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white shadow-md hover:shadow-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
