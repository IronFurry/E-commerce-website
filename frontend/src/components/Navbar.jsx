import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ onOpenSearch }) {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop?tab=categories' },
    { name: 'Deals', path: '/shop?filter=deals' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-black focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-2xl tracking-tighter text-neutral-900 group-hover:text-neutral-700 transition-colors">
                NEXORA
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 mb-2"></span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-neutral-950 ${
                    isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              title="Search Gear (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-all shadow-sm active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-800 hover:text-neutral-950"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
            <span>Free Shipping on orders above ₹1,500</span>
          </div>
        </div>
      )}
    </header>
  );
}
