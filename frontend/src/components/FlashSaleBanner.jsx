import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export default function FlashSaleBanner() {
  // Simulated countdown timer (Days, Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 36
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white my-14 p-8 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
      {/* Subtle texture / ambient highlight */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left copy */}
        <div className="text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-rose-500/30">
            <Zap className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            Limited Window
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            FLASH SALE EVENT
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Up to 40% off select audio, tactile keyboards, and precision desk hardware. Grab yours before allocation ends.
          </p>
        </div>

        {/* Right: Countdown & Shop Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Countdown timer blocks */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-800/90 border border-neutral-700 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold text-white shadow-inner">
                {formatNum(timeLeft.hours)}
              </div>
              <span className="text-[10px] uppercase font-medium tracking-wider text-neutral-400 mt-1">Hours</span>
            </div>
            <span className="text-xl font-bold text-neutral-500 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-800/90 border border-neutral-700 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold text-white shadow-inner">
                {formatNum(timeLeft.minutes)}
              </div>
              <span className="text-[10px] uppercase font-medium tracking-wider text-neutral-400 mt-1">Mins</span>
            </div>
            <span className="text-xl font-bold text-neutral-500 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-800/90 border border-neutral-700 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold text-amber-400 shadow-inner">
                {formatNum(timeLeft.seconds)}
              </div>
              <span className="text-[10px] uppercase font-medium tracking-wider text-neutral-400 mt-1">Secs</span>
            </div>
          </div>

          <Link
            to="/shop?filter=flash"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-sm transition-all shadow-md active:scale-95 group whitespace-nowrap"
          >
            <span>Shop Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
