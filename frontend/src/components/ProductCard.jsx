import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const isAdded = items.some(i => i.product_id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col hover:border-neutral-400/80 hover:shadow-md transition-all duration-300">
      
      {/* Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges: Flash sale or Custom badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-neutral-900 rounded-md shadow-xs backdrop-blur-xs">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 text-[11px] font-bold bg-neutral-900 text-white rounded-md">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-rose-600 transition-colors shadow-xs z-10"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </Link>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="font-medium tracking-wide uppercase">{product.category}</span>
            <div className="flex items-center gap-1 font-medium text-neutral-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 text-[11px]">({product.review_count})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
              {product.tagline}
            </p>
          </Link>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-neutral-950">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.original_price && (
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.original_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
              isAdded
                ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
