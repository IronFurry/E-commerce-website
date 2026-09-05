import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Keyboard, Watch, Gamepad2, Laptop, Layers } from 'lucide-react';

const CATEGORY_ITEMS = [
  { name: 'Headphones', slug: 'headphones', icon: Headphones, count: '4 Items' },
  { name: 'Keyboards', slug: 'keyboards', icon: Keyboard, count: '3 Items' },
  { name: 'Wearables', slug: 'wearables', icon: Watch, count: '2 Items' },
  { name: 'Gaming', slug: 'gaming', icon: Gamepad2, count: '2 Items' },
  { name: 'Desk Setup', slug: 'desk-setup', icon: Laptop, count: '5 Items' },
  { name: 'Accessories', slug: 'accessories', icon: Layers, count: '4 Items' },
];

export default function CategoryStrip() {
  return (
    <section className="py-8 border-y border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_ITEMS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 hover:border-neutral-900 hover:bg-white transition-all duration-200 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:text-black group-hover:bg-neutral-100 group-hover:scale-105 transition-all shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="mt-3 text-sm font-semibold text-neutral-900 group-hover:text-black">
                  {cat.name}
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
