import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { cartStorage, wishlistStorage } from '@/lib/storage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(wishlistStorage.isInWishlist(product.id));

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setIsInWishlist(wishlistStorage.isInWishlist(product.id));
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product.id]);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartStorage.addToCart(product, 1);
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.title} successfully added to cart!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlistStorage.isInWishlist(product.id)) {
      const confirmRemove = confirm(`Are you sure you want to remove "${product.title}" from your wishlist?`);
      if (confirmRemove) {
        wishlistStorage.removeFromWishlist(product.id);
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    } else {
      const confirmAdd = confirm(`Add "${product.title}" to your wishlist?`);
      if (confirmAdd) {
        wishlistStorage.addToWishlist(product);
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    }
  };


  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-md transition-colors ${isInWishlist
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
