import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, CreditCard, QrCode, Building2, Check, 
  Lock, ArrowRight, Truck, AlertCircle, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Events } from '../services/eventService';


export default function Checkout() {
  const { items, subtotal, discountAmount, shippingFee, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [address, setAddress] = useState({
    fullName: user.name || 'Aryan Sharma',
    email: user.email || 'aryan@example.com',
    phone: user.phone || '+91 98765 43210',
    addressLine: 'Flat 402, Skyline Heights, Tech Zone 4',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560103'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking
  const [upiId, setUpiId] = useState('aryan@okhdfcbank');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Aryan Sharma',
    expiry: '08/29',
    cvv: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fire checkout-started event when this page mounts
  useEffect(() => {
    Events.checkout(user.id, totalAmount, items.length);
  }, []);


  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-neutral-900">No items in your cart</h2>
        <p className="text-xs text-neutral-500 mt-1">Please add hardware to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      // 1. Create order on backend
      const orderPayload = {
        user_id: user.id,
        items: items.map(i => ({
          product_id: i.product_id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          color: i.color,
          image: i.image
        })),
        shipping_address: {
          full_name: address.fullName,
          email: address.email,
          phone: address.phone,
          address_line: address.addressLine,
          city: address.city,
          state: address.state,
          postal_code: address.postalCode,
          country: 'India'
        },
        payment_method: paymentMethod,
        subtotal: subtotal,
        discount_amount: discountAmount,
        shipping_fee: shippingFee,
        total_amount: totalAmount
      };

      const orderResult = await api.createOrder(orderPayload);
      const createdOrder = orderResult.order;

      // 2. Simulate payment confirmation
      const paymentResult = await api.processPayment({
        order_id: createdOrder.order_id,
        amount: totalAmount,
        payment_method: paymentMethod,
        upi_id: paymentMethod === 'upi' ? upiId : null,
        card_last4: paymentMethod === 'card' ? '4242' : null
      });

      // 3. Fire PAYMENT event (CRITICAL priority in pipeline)
      await Events.payment(
        user.id,
        createdOrder.order_id,
        totalAmount,
        paymentMethod,
        paymentResult?.transaction_id
      );

      // 4. Fire ORDER event (CRITICAL priority in pipeline)
      await Events.order(
        user.id,
        createdOrder.order_id,
        totalAmount,
        items.length,
        paymentMethod
      );

      // 5. Show payment success animation, then navigate
      clearCart();
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/order-confirmation', { state: { order: createdOrder } });
      }, 2200);

    } catch (err) {
      console.error("Order placement failed", err);
      setErrorMessage("Could not process order. Please verify connection to backend.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="nexora-checkout" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Payment Success Overlay Animation */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Animated checkmark circle */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="#d1fae5"
                  strokeWidth="6"
                />
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="6"
                  strokeDasharray="289"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{
                    animation: 'stroke-draw 0.6s ease-out forwards',
                    transformOrigin: 'center',
                    transform: 'rotate(-90deg)',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">Payment Authorised</p>
              <h2 className="text-2xl font-extrabold text-neutral-950 tracking-tight">Order Confirmed!</h2>
              <p className="text-sm text-neutral-500 mt-2">Redirecting to your order receipt...</p>
            </div>

            {/* Animated progress dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate` }}
                />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes stroke-draw {
              from { stroke-dashoffset: 289; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes bounce {
              from { transform: translateY(0); opacity: 0.4; }
              to   { transform: translateY(-6px); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">Express Checkout</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Complete your delivery details and choose a payment method.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Shipping Address */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-neutral-900">Shipping Destination</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-600 font-semibold mb-1">Email (for Order Confirmation & Tracking)</label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-600 font-semibold mb-1">Street Address / Suite / Landmark</label>
                <input
                  type="text"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">PIN / Postal Code</label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Country</label>
                <input
                  type="text"
                  disabled
                  value="India"
                  className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-neutral-900">Simulated Payment Authorization</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* UPI Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'upi'
                    ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-700'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs font-semibold">UPI / QR</span>
              </button>

              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-semibold">Debit / Credit</span>
              </button>

              {/* NetBanking */}
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'netbanking'
                    ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-700'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="text-xs font-semibold">NetBanking</span>
              </button>
            </div>

            {/* Payment Details Sub-panel */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">UPI ID / VPA</span>
                  <span className="text-emerald-600 font-bold">Instant Zero-Fee</span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                />
                <p className="text-[11px] text-neutral-500">A simulated UPI authorization prompt will be accepted instantly.</p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">CVV</label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
                <label className="block font-semibold mb-2">Select Primary Indian Bank</label>
                <select className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900">
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

          </div>

        </div>

        {/* Summary Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-extrabold text-neutral-950 tracking-tight">Review Your Gear</h3>

            {/* Item list preview */}
            <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.product_id}_${item.color}`} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-100" />
                    <div>
                      <span className="font-semibold text-neutral-900 line-clamp-1">{item.name}</span>
                      <span className="text-neutral-500">Qty: {item.quantity} · {item.color || 'Standard'}</span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-950">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Total Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promotional Savings</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Courier</span>
                <span className="font-semibold text-neutral-900">
                  {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-neutral-900">Final Amount</span>
                <p className="text-[11px] text-neutral-400">Taxes included</p>
              </div>
              <span className="text-2xl font-extrabold text-neutral-950">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                  <span>·</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-neutral-400">
              By authorizing, you agree to NEXORA's Hardware Terms of Sale and Warranty Agreement.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
