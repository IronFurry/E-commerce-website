import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { api } from '../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.getProducts({ search: searchTerm });
        setResults(data.products.slice(0, 6));
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleFullSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="flex items-center px-6 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search headphones, keyboards, docks, chargers..."
            className="w-full text-base font-medium text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          >
            ESC
          </button>
        </form>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {loading && (
            <div className="py-8 text-center text-sm text-neutral-500 font-medium">
              Searching NEXORA catalog...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 px-3 pb-2">
                Matching Hardware
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-neutral-100 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {product.category} · <span className="font-medium text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
              
              <div className="pt-3 border-t border-neutral-100 flex justify-end">
                <button
                  onClick={handleFullSearch}
                  className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1.5 px-3 py-1.5"
                >
                  <span>See all results for "{searchTerm}"</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-neutral-800">No products matching "{searchTerm}"</p>
              <p className="text-xs text-neutral-500 mt-1">Try checking for typos or searching by category (e.g. Headphones, Keyboards)</p>
            </div>
          )}

          {!searchTerm && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Popular Searches</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Pulse X7', 'Mechanical Keyboard', 'Thunderbolt Dock', 'GaN Charger', 'Ergonomic Mouse', '4K Gaming'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
