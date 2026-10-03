import React from 'react';
import { Flame, Sparkles, Phone } from 'lucide-react';

export default function SundaySpecialBanner({ legSoupItem, showPrices = false, onOpenCallModal }) {
  const price = legSoupItem ? legSoupItem.price : 120;
  const inStock = legSoupItem ? legSoupItem.inStock : true;

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-800 to-amber-900 text-white rounded-2xl p-3.5 shadow-lg border-2 border-amber-500/60 relative overflow-hidden my-2">
      {/* Background flare */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 relative">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1 bg-black/40 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-400/30">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>⚡ SUNDAYS: 7:00 AM – 4:00 PM ⚡</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black kannada-text text-yellow-300 drop-shadow-sm mt-1">
            ಕಾಲು ಸೂಪ್ • Leg Soup
          </h3>

          <p className="text-[11px] text-amber-100/90 leading-tight mt-0.5">
            Authentic Wood-fire cooked Leg Soup available every Sunday early morning from 7:00 AM!
          </p>

          <div className="flex items-center gap-2 mt-2">
            {showPrices && (
              <span className="text-sm font-black text-amber-300 bg-black/50 px-2 py-0.5 rounded-lg border border-amber-400/30">
                ₹{price}
              </span>
            )}
            <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              inStock ? 'bg-emerald-800/80 text-emerald-200' : 'bg-red-900/80 text-red-200'
            }`}>
              {inStock ? 'Available Sundays' : 'Sold Out for Today'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenCallModal}
          className="shrink-0 flex flex-col items-center justify-center gap-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black p-2.5 rounded-xl shadow-md transition active:scale-95 text-xs"
          title="Call to enquire/reserve Sunday soup"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] uppercase font-bold leading-none">Order</span>
        </button>
      </div>
    </div>
  );
}
