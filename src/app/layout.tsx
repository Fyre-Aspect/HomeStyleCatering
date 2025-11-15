import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HOMESTYLÉ Catering',
  description: 'Authentic homestyle cuisine crafted with love and tradition.',
  keywords: ['homestyle food', 'catering', 'authentic cuisine', 'biryani', 'butter chicken', 'traditional cooking'],
  authors: [{ name: 'HOMESTYLÉ Catering' }],
  openGraph: {
    title: 'HOMESTYLÉ Catering',
    description: 'Authentic homestyle cuisine crafted with love and tradition.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
