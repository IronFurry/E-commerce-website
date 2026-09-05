import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Download, Clock } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If accessed directly without state, use realistic fallback
  const orderData = order || {
    order_id: 'NX-10482',
    tracking_number: 'TRK-IN-982412',
    created_at: Math.floor(Date.now() / 1000),
    total_amount: 8499,
    payment_method: 'UPI',
    items: [
      {
        name: 'Nexora Pulse X7 Wireless Headphones',
        price: 8499,
        quantity: 1,
        color: 'Matte Obsidian',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
      }
    ],
    shipping_address: {
      full_name: 'Aryan Sharma',
      address_line: 'Flat 402, Skyline Heights, Tech Zone 4',
      city: 'Bengaluru',
      state: 'Karnataka',
      postal_code: '560103'
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Payment Authorized
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Order confirmed
        </h1>
        <p className="text-sm text-neutral-600">
          Order <span className="font-mono font-bold text-neutral-900">#{orderData.order_id}</span>
        </p>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Your order has been successfully placed. We have dispatched your digital invoice and courier tracking link to your registered email.
        </p>
      </div>

      {/* Delivery Tracking Stepper */}
      <div className="mt-10 p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 text-xs">
          <span className="font-bold text-neutral-900">Courier Tracking</span>
          <span className="font-mono text-neutral-500">{orderData.tracking_number}</span>
        </div>

        <div className="pt-6 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs mb-2">
              ✓
            </div>
            <span className="font-bold text-neutral-900">Confirmed</span>
            <span className="text-[10px] text-neutral-400 mt-0.5">Payment Verified</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 flex items-center justify-center font-bold text-xs mb-2">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-bold text-neutral-800">Dispatching</span>
            <span className="text-[10px] text-neutral-400 mt-0.5">Warehouse Hub</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-400 flex items-center justify-center font-bold text-xs mb-2">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-medium text-neutral-400">Delivery</span>
            <span className="text-[10px] text-neutral-400 mt-0.5">By Tomorrow, 7 PM</span>
          </div>
        </div>
      </div>

      {/* Order Item Breakdown */}
      <div className="mt-6 p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-neutral-900">Hardware Allocation</h3>
        <div className="divide-y divide-neutral-100">
          {orderData.items.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-neutral-100" />
                <div>
                  <h4 className="font-bold text-neutral-900">{item.name}</h4>
                  <p className="text-neutral-500">Qty: {item.quantity} · {item.color || 'Standard'}</p>
                </div>
              </div>
              <span className="font-bold text-neutral-950">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>

        {/* Shipping address & payment summary */}
        <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Shipping To</span>
            <p className="font-semibold text-neutral-900 mt-1">{orderData.shipping_address?.full_name}</p>
            <p className="text-neutral-600">{orderData.shipping_address?.address_line}</p>
            <p className="text-neutral-600">{orderData.shipping_address?.city}, {orderData.shipping_address?.state} - {orderData.shipping_address?.postal_code}</p>
          </div>
          <div>
            <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px]">Total Paid</span>
            <p className="text-xl font-extrabold text-neutral-950 mt-1">₹{orderData.total_amount?.toLocaleString('en-IN')}</p>
            <p className="text-neutral-500">Paid via {String(orderData.payment_method).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-sm active:scale-95 text-center"
        >
          Continue Shopping
        </Link>
        <Link
          to="/account"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold transition-all text-center"
        >
          View in Account
        </Link>
      </div>

    </div>
  );
}
