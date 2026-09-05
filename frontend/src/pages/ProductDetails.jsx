import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, Shield, Truck, RotateCcw, Check, 
  ChevronRight, Plus, Minus, Share2, ArrowLeft 
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const res = await api.getProductById(id);
        if (res.product) {
          setProduct(res.product);
          setSelectedImage(res.product.image);
          if (res.product.colors && res.product.colors.length > 0) {
            setSelectedColor(res.product.colors[0]);
          }
        }
        if (res.related) {
          setRelated(res.related);
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-neutral-200/80 rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-8 bg-neutral-200 rounded-lg w-3/4"></div>
            <div className="h-6 bg-neutral-200 rounded-lg w-1/4"></div>
            <div className="h-24 bg-neutral-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-4">
        <h2 className="text-2xl font-bold text-neutral-900">Product Not Found</h2>
        <p className="text-sm text-neutral-500 mt-2">The product you are looking for does not exist or has been discontinued.</p>
        <Link to="/shop" className="mt-6 inline-block px-6 py-3 rounded-xl bg-neutral-900 text-white text-xs font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/checkout');
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-8">
        <Link to="/" className="hover:text-neutral-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link to="/shop" className="hover:text-neutral-900">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-neutral-900">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discount && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-neutral-900 text-white rounded-lg">
                SAVE {product.discount}%
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl ? 'border-neutral-950 scale-95' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400">({product.review_count} verified reviews)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight mt-2">
              {product.name}
            </h1>
            <p className="text-sm text-neutral-500 mt-2 font-normal">
              {product.tagline}
            </p>

            {/* Pricing */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-neutral-950">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <span className="text-base text-neutral-400 line-through">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Inclusive of all taxes
              </span>
            </div>

            {/* Stock status & estimated delivery */}
            <div className="mt-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-neutral-900">In Stock</span>
                <span className="text-neutral-500">({product.stock_count} units available)</span>
              </div>
              <span className="text-neutral-500">Order now for delivery by <strong className="text-neutral-800">tomorrow, 7 PM</strong></span>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Finish: <span className="font-medium text-neutral-900">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedColor === color
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-neutral-300 rounded-2xl px-3 py-2 sm:w-32 bg-white">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 text-neutral-500 hover:text-black active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock_count, q + 1))}
                  className="p-1 text-neutral-500 hover:text-black active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
                <span>·</span>
                <span>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all active:scale-95 shadow-md"
              >
                Buy Now
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border transition-colors ${
                  inWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-neutral-300 hover:border-neutral-400 text-neutral-700'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Added Toast feedback */}
            {addedToast && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added {quantity}x {product.name} to your cart.</span>
                <Link to="/cart" className="ml-auto underline font-bold">View Cart</Link>
              </div>
            )}

            {/* Key Features Checklist */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-center text-[11px] text-neutral-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-neutral-700" />
              <span>Complimentary Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-4 h-4 text-neutral-700" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-neutral-700" />
              <span>7-Day Return Pickup</span>
            </div>
          </div>

        </div>

      </div>

      {/* TECHNICAL SPECIFICATIONS TABLE */}
      {product.specs && (
        <section className="mt-16 pt-12 border-t border-neutral-200">
          <div className="max-w-3xl">
            <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight mb-6">Technical Specifications</h3>
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-3.5 grid grid-cols-3 text-xs">
                  <span className="font-semibold text-neutral-500">{key}</span>
                  <span className="col-span-2 font-medium text-neutral-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="mt-16 pt-12 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight">Verified Hardware Reviews</h3>
            <p className="text-xs text-neutral-500 mt-1">Based on {product.review_count} verified purchases across India</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-neutral-900">{product.rating} / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Rohan M. (Bengaluru)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              "The build quality is phenomenal. The CNC aluminum finish feels identical to high-end studio gear. Shipped to Bengaluru within 24 hours."
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Pooja S. (Mumbai)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              "Battery life easily exceeded my expectations. Tested with both my MacBook and iPhone seamlessly. Highly recommended."
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Aditya K. (Delhi NCR)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              "Tactile feel is so satisfying. Looks minimal on my desk setup without RGB screaming. Premium unboxing experience as well."
            </p>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-neutral-200">
          <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight mb-8">Complementary Hardware</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
