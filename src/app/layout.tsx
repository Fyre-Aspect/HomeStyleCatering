import type { Metadata } from 'next';
import { Lora, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'HOMESTYLÉ Catering',
  description: 'Authentic homestyle cuisine crafted with love and tradition.',
  keywords: ['homestyle food', 'catering', 'authentic cuisine', 'biryani', 'butter chicken', 'traditional cooking'],
  authors: [{ name: 'HOMESTYLÉ Catering' }],
  icons: {
    icon: '/Homestyle Catering.png',
    apple: '/Homestyle Catering.png',
  },
  openGraph: {
    title: 'HOMESTYLÉ Catering',
    description: 'Authentic homestyle cuisine crafted with love and tradition.',
    type: 'website',
    locale: 'en_US',
    images: ['/Homestyle Catering.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${cormorant.variable}`}>
      <body className={lora.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
