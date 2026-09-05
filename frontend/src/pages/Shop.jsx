import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'keyboards', label: 'Keyboards' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'desk-setup', label: 'Desk Setup' },
  { id: 'accessories', label: 'Accessories' }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentFilter = searchParams.get('filter') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const params = {};
        if (currentCategory !== 'all') params.category = currentCategory;
        if (currentSearch) params.search = currentSearch;
        if (currentFilter === 'deals' || currentFilter === 'flash') params.flash_sale = true;

        const res = await api.getProducts(params);
        let items = res.products || [];

        if (sortBy === 'price_asc') {
          items.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          items.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
          items.sort((a, b) => b.rating - a.rating);
        }

        setProducts(items);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [currentCategory, currentSearch, currentFilter, sortBy]);

  const handleCategoryChange = (catId) => {
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') {
      next.delete('category');
    } else {
      next.set('category', catId);
    }
    next.delete('search');
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set('search', searchInput.trim());
    } else {
      next.delete('search');
    }
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div id="nexora-shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {currentCategory === 'all' ? 'Hardware Store' : `Category / ${currentCategory}`}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1 capitalize">
            {currentSearch ? `Search: "${currentSearch}"` : currentCategory === 'all' ? 'Everyday Tech Essentials' : currentCategory.replace('-', ' ')}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Showing {products.length} precision products designed for durability and acoustics.
          </p>
        </div>

        {/* Search input bar & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3.5" />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 text-xs font-medium bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-800"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="h-80 bg-neutral-200/60 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 my-6">
          <SlidersHorizontal className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-900">No hardware found</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            No items matched your current filter criteria. Try searching a different term or resetting filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
