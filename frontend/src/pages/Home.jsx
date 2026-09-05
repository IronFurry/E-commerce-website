import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Shield, Flame } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryStrip from '../components/CategoryStrip';
import FlashSaleBanner from '../components/FlashSaleBanner';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getProducts();
        const prods = res.products || [];
        setFeaturedProducts(prods.filter(p => p.is_featured).slice(0, 8));
        setTrendingProducts(prods.slice(0, 8));
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div id="nexora-home" className="min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                NEW SEASON COLLECTION
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
                Technology that fits your everyday.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Thoughtfully designed gear for work, play, and everything in between. Uncompromising acoustics, tactile typing, and enduring aluminum craftsmanship.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-95 group"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/shop?filter=deals"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-sm transition-all active:scale-95"
                >
                  Explore Deals
                </Link>
              </div>

              {/* Micro proof badges */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>

            {/* Right: Dominant Premium Product Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 p-2 sm:p-4 group">
                <div className="relative aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
                    alt="Nexora Pulse X7 Flagship Headphones"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                  
                  {/* Floating product label */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600">Flagship Acoustic</span>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">Nexora Pulse X7</h3>
                      <p className="text-xs text-neutral-500">42dB ANC · 60h Endurance</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-neutral-950">₹8,499</span>
                      <Link
                        to="/product/prod_pulse_x7"
                        className="block text-xs font-semibold text-neutral-900 hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY STRIP */}
      <CategoryStrip />

      {/* SECTION 3: TRENDING NOW (4-COLUMN DESKTOP GRID) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Trending now
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Our most-demanded everyday tech essentials this week.
            </p>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 text-sm font-semibold text-neutral-900 hover:text-neutral-600 inline-flex items-center gap-1 group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="h-80 bg-neutral-200/60 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4: FLASH SALE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FlashSaleBanner />
      </div>

      {/* SECTION 5: EDITORIAL PROMO SECTION */}
      <section className="py-12 bg-white border-y border-neutral-200/80 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Promo Card 1: Keyboards */}
            <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[380px] group">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80')` }}
              ></div>
              <div className="relative z-10">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Tactile Mastery</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">CNC Anodized Mechanicals</h3>
                <p className="text-sm text-neutral-300 mt-2 max-w-sm">Gasket-mounted isolation, factory-lubed switches, and double-shot PBT keycaps for supreme tactile feedback.</p>
              </div>
              <div className="relative z-10 pt-6">
                <Link
                  to="/shop?category=keyboards"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition-all"
                >
                  <span>Explore Keyboards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Promo Card 2: Desk Setup */}
            <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[380px] group">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80')` }}
              ></div>
              <div className="relative z-10">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">Workspace Optimization</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">Thunderbolt Docks & ScreenBars</h3>
                <p className="text-sm text-neutral-300 mt-2 max-w-sm">Eliminate desktop friction. Asymmetric glare-free monitor lamps, 14-in-1 hubs, and top-grain desk pads.</p>
              </div>
              <div className="relative z-10 pt-6">
                <Link
                  to="/shop?category=desk-setup"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition-all"
                >
                  <span>Upgrade Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: WHY NEXORA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">The NEXORA Standard</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">Engineered without compromise.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-900 mb-4">
              01
            </div>
            <h4 className="text-base font-bold text-neutral-900">Billet Aerospace Aluminum</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              We machine chassis and enclosures from monolithic aluminum 6000-series billets rather than molded hollow plastics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-900 mb-4">
              02
            </div>
            <h4 className="text-base font-bold text-neutral-900">Laboratory Acoustic Tuning</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Every speaker and headphone model undergoes anechoic chamber tuning to achieve flat, true-to-life harmonic profiles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-900 mb-4">
              03
            </div>
            <h4 className="text-base font-bold text-neutral-900">Doorstep Pan-India Service</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Experience zero service friction. Should any component require warranty attention, our team handles pickup and exchange at your door.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
