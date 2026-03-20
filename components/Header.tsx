'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cartStorage, wishlistStorage } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(cartStorage.getCartItemsCount());
      setWishlistCount(wishlistStorage.getWishlist().length);
    };

    updateCounts();
    
    const handleStorageChange = () => {
      updateCounts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Products' },
    { href: '/cart', label: `Cart (${cartCount})` },
    { href: '/wishlist', label: `Wishlist (${wishlistCount})` },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            E-Commerce
          </Link>
          
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href ? 'bg-gray-100' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
