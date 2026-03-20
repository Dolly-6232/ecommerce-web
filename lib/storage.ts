import { CartItem, Product } from '@/types/product';

const CART_KEY = 'ecommerce-cart';
const WISHLIST_KEY = 'ecommerce-wishlist';

export const cartStorage = {
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (product: Product, quantity: number = 1): void => {
    if (typeof window === 'undefined') return;
    const cart = cartStorage.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  updateQuantity: (productId: number, quantity: number): void => {
    if (typeof window === 'undefined') return;
    const cart = cartStorage.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        cartStorage.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      }
    }
  },

  removeFromCart: (productId: number): void => {
    if (typeof window === 'undefined') return;
    const cart = cartStorage.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  },

  clearCart: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_KEY);
  },

  getCartTotal: (): number => {
    const cart = cartStorage.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemsCount: (): number => {
    const cart = cartStorage.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

export const wishlistStorage = {
  getWishlist: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  },

  addToWishlist: (product: Product): void => {
    if (typeof window === 'undefined') return;
    const wishlist = wishlistStorage.getWishlist();
    const exists = wishlist.some(item => item.id === product.id);
    
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  },

  removeFromWishlist: (productId: number): void => {
    if (typeof window === 'undefined') return;
    const wishlist = wishlistStorage.getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  },

  isInWishlist: (productId: number): boolean => {
    const wishlist = wishlistStorage.getWishlist();
    return wishlist.some(item => item.id === productId);
  }
};
