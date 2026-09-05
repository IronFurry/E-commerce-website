import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromo,
    removePromo,
    shippingFee,
    totalAmount
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage(res);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-neutral-950 tracking-tight">Your Cart is Empty</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Explore our collection of studio headphones, tactile mechanical keyboards, and precision desk hardware.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all active:scale-95"
        >
          <span>Explore Hardware</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Heading */}
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">Shopping Bag</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review your items and proceed to secure encrypted checkout.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart items list (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product_id}_${item.color}`}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                />
                <div>
                  <Link
                    to={`/product/${item.product_id}`}
                    className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  {item.color && (
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Finish: <span className="text-neutral-700 font-medium">{item.color}</span>
                    </p>
                  )}
                  <div className="mt-2 text-sm font-extrabold text-neutral-950">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <div className="flex items-center border border-neutral-200 rounded-xl px-2 py-1 bg-neutral-50">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.color)}
                    className="p-1 text-neutral-500 hover:text-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-neutral-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.color)}
                    className="p-1 text-neutral-500 hover:text-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product_id, item.color)}
                  className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Free Shipping Alert Bar */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
            {subtotal >= 1500 ? (
              <span className="text-emerald-700 font-semibold">🎉 You have unlocked complimentary express shipping!</span>
            ) : (
              <span>Add <strong>₹{(1500 - subtotal).toLocaleString('en-IN')}</strong> more to qualify for free express shipping.</span>
            )}
          </div>
        </div>

        {/* Order Summary Box (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-extrabold text-neutral-950 tracking-tight">Order Summary</h3>

            {/* Promo Code Form */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Promo: {promoCode} ({discountPercent}% OFF)
                  </span>
                  <button onClick={removePromo} className="text-rose-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon (e.g. NEXORA10)"
                    className="flex-1 px-3.5 py-2.5 text-xs uppercase bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-xs font-semibold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoMessage && !promoCode && (
                <p className={`text-xs mt-1.5 ${promoMessage.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {promoMessage.message}
                </p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promotional Discount</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (GST 18%)</span>
                <span className="text-neutral-500">Included</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-neutral-200 pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-neutral-900">Total Due</span>
                <p className="text-[11px] text-neutral-400">All duties and taxes inclusive</p>
              </div>
              <span className="text-2xl font-extrabold text-neutral-950">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-neutral-600" />
              <span>256-Bit SSL Encrypted Transaction</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
