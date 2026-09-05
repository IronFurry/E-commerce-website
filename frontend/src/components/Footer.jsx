import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Lock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Prop Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-neutral-200/80">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Complimentary Express</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Free pan-India delivery on orders over ₹1,500</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">2-Year Warranty</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Comprehensive hardware replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">7-Day Test Period</h4>
              <p className="text-xs text-neutral-500 mt-0.5">No-questions-asked doorstep return pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Encrypted Checkout</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Supports UPI, NetBanking, and credit/debit cards</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tighter text-neutral-900">NEXORA</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 mb-2"></span>
            </Link>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              Purveyors of elevated everyday tech hardware. Precision acoustics, tactile mechanical keyboards, and minimalist desk gear engineered for longevity.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-xs text-neutral-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Bengaluru · Mumbai · Delhi</span>
              </div>
            </div>
          </div>

          {/* Column 1: Hardware */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Hardware</h5>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li><Link to="/shop?category=headphones" className="hover:text-black transition-colors">Headphones & Buds</Link></li>
              <li><Link to="/shop?category=keyboards" className="hover:text-black transition-colors">Mechanical Keyboards</Link></li>
              <li><Link to="/shop?category=wearables" className="hover:text-black transition-colors">Smart Wearables</Link></li>
              <li><Link to="/shop?category=gaming" className="hover:text-black transition-colors">Gaming Precision</Link></li>
              <li><Link to="/shop?category=desk-setup" className="hover:text-black transition-colors">Desk Workstations</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-black transition-colors">Power & Hubs</Link></li>
            </ul>
          </div>

          {/* Column 2: Service & Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Support</h5>
            <ul className="space-y-2.5 text-sm text-neutral-600">
              <li><Link to="/account" className="hover:text-black transition-colors">Track Order</Link></li>
              <li><a href="#warranty" className="hover:text-black transition-colors">Warranty Registration</a></li>
              <li><a href="#returns" className="hover:text-black transition-colors">Return Policy</a></li>
              <li><a href="#shipping" className="hover:text-black transition-colors">Shipping Schedule</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Customer Care</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Dispatch</h5>
            <p className="text-xs text-neutral-500 mb-3">Subscribe for limited drop notifications and engineering logs.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for joining the NEXORA dispatch list."); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="developer@company.com"
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black text-neutral-900"
              />
              <button
                type="submit"
                className="w-full py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all"
              >
                Join Waitlist
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} NEXORA Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-neutral-900">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-900">Terms of Commerce</a>
            <a href="#security" className="hover:text-neutral-900">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
