'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { wishlistStorage, cartStorage } from '@/lib/storage';
import Image from 'next/image';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      const updatedItems = wishlistStorage.getWishlist();
      setWishlistItems(updatedItems);
    };

    // Initial load
    handleWishlistUpdate();

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  const removeFromWishlist = (productId: number) => {
    wishlistStorage.removeFromWishlist(productId);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addToCart = (product: Product) => {
    cartStorage.addToCart(product);
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.title} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist!
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Wishlist ({wishlistItems.length} items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-48 w-full flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating.rate}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
