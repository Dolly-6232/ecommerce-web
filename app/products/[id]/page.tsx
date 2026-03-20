'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { getProduct } from '@/lib/api';
import { cartStorage, wishlistStorage } from '@/lib/storage';
import { Heart } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProduct(productId);
      setProduct(data);
      setIsInWishlist(wishlistStorage.isInWishlist(productId));
    } catch {
      setError('Failed to load product. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      cartStorage.addToCart(product, quantity);
      window.dispatchEvent(new Event('cartUpdated'));
      alert(`${quantity} ${product.title}(s) added to cart!`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist) {
        wishlistStorage.removeFromWishlist(product.id);
        setIsInWishlist(false);
      } else {
        wishlistStorage.addToWishlist(product);
        setIsInWishlist(true);
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <ErrorMessage
        message={error || 'Product not found'}
        onRetry={() => router.push('/')}
      />
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 text-black rounded-full border border-black flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-12 text-center text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 text-black rounded-full border border-black flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`flex items-center px-6 py-3 rounded-md transition-colors font-semibold ${isInWishlist
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
