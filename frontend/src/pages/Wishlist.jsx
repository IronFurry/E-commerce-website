import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-neutral-950 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Save devices and accessories you want to acquire or compare later.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all active:scale-95"
        >
          <span>Explore Gear</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">Saved Hardware</h1>
          <p className="text-xs text-neutral-500 mt-1">
            {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved to your personal registry.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 transition-all shadow-xs"
          >
            <div>
              <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {product.category}
                </span>
                <Link to={`/product/${product.id}`} className="block mt-1">
                  <h3 className="text-sm font-bold text-neutral-900 line-clamp-1 hover:text-neutral-600">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-2 text-base font-extrabold text-neutral-950">
                  ₹{product.price?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center gap-2">
              <button
                onClick={() => handleMoveToCart(product)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="p-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 text-neutral-400 hover:text-rose-600 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
