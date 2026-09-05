import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Shield, ChevronRight, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Account() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // orders, addresses, profile
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.getUserOrders(user.id);
        setOrders(res.orders || []);
      } catch (err) {
        console.error("Failed to load user orders", err);
      } finally {
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* User Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white font-bold text-xl flex items-center justify-center">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">{user.name}</h1>
            <p className="text-xs text-neutral-500 mt-0.5">{user.email} · {user.phone}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
              <Shield className="w-3 h-3" />
              <span>NEXORA Priority Member</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'addresses' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Addresses
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-neutral-900">Order History</h2>
          
          {loadingOrders ? (
            <div className="space-y-4">
              {[1, 2].map(n => (
                <div key={n} className="h-32 bg-white rounded-2xl border border-neutral-200 animate-pulse"></div>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-neutral-900">#{order.order_id}</span>
                      <span className="text-xs text-neutral-400 ml-2">
                        · {new Date(order.created_at * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {order.status.toUpperCase()}
                      </span>
                      <span className="text-sm font-extrabold text-neutral-950">
                        ₹{order.total_amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-100" />
                          <div>
                            <span className="font-semibold text-neutral-900">{item.name}</span>
                            <span className="text-neutral-400 ml-2">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                    <span>Tracking: <strong className="font-mono text-neutral-800">{order.tracking_number}</strong></span>
                    <span className="text-emerald-700 font-semibold">Free Express Courier</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-neutral-200 text-center">
              <Package className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">No Orders Yet</h3>
              <p className="text-xs text-neutral-500 mt-1">Once you complete a purchase, your order history and tracking will appear here.</p>
            </div>
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-neutral-900">Saved Addresses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.savedAddresses.map((addr) => (
              <div key={addr.id} className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs relative">
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800">
                    Default
                  </span>
                )}
                <h4 className="text-sm font-bold text-neutral-900">{addr.fullName}</h4>
                <p className="text-xs text-neutral-600 mt-1">{addr.addressLine}</p>
                <p className="text-xs text-neutral-600">{addr.city}, {addr.state} - {addr.postalCode}</p>
                <p className="text-xs text-neutral-500 mt-2">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
