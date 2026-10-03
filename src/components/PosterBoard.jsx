import React from 'react';
import { Maximize2, Phone, MapPin } from 'lucide-react';
import FoodHighlights from './FoodHighlights';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function PosterBoard({ items, activeTiming, onOpenLightbox, onOpenCallModal }) {
  // Split items into Left Column (Mutton & Staples) and Right Column (Chicken & Soups)
  const leftColumnItems = items.filter(
    (item) => item.column === 'left' || item.category === 'mutton' || item.category === 'staples'
  );
  const rightColumnItems = items.filter(
    (item) => item.column === 'right' || item.category === 'chicken' || item.category === 'soups'
  );

  const isEvening = activeTiming === 'evening';

  return (
    <div
      onClick={onOpenLightbox}
      className="poster-glow bg-[#f97316] p-2 sm:p-2.5 rounded-2xl cursor-pointer group relative overflow-hidden transition-all duration-200 active:scale-[0.99]"
      title="Click or tap to view full screen poster"
    >
      <div className="bg-[#fbf5e8] text-stone-900 rounded-xl p-2.5 sm:p-3.5 space-y-2.5 border-2 border-amber-600/40">
        
        {/* Top Invocations */}
        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-amber-950 border-b border-amber-200/90 pb-1.5 kannada-text">
          <span>{HOTEL_INFO.invocations[0]}</span>
          <span className="text-amber-600 text-sm">🛕</span>
          <span>{HOTEL_INFO.invocations[1]}</span>
        </div>

        {/* Brand Title Header */}
        <div className="flex items-center justify-between gap-2.5 pt-0.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-600 bg-white p-0.5 shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
            <img
              src="/logo-tm.png"
              alt="Thirumala Military Hotel Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-[#dc2626] leading-none kannada-text drop-shadow-sm">
              {HOTEL_INFO.kannadaName}
            </h2>
            <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-bold text-amber-900 mt-1">
              <span className="kannada-text">ಒಲೆ ಊಟ...!</span>
              <span>•</span>
              <span className="kannada-text">ನಾಟಿ ಸ್ಟೈಲ್...!</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#15803d] tracking-wide serif-text">
              {HOTEL_INFO.englishName}
            </p>
          </div>

          {/* Stove Woodfire Stamp */}
          <div className="w-12 h-12 rounded-lg border border-amber-600 bg-amber-950 flex flex-col items-center justify-center text-center p-0.5 text-white shrink-0 shadow-sm">
            <span className="text-sm">🔥</span>
            <span className="text-[7px] font-bold kannada-text leading-none text-amber-300">ಒಲೆ ಊಟ</span>
          </div>
        </div>

        {/* Menu Timing Ribbon */}
        <div className="text-center my-1">
          <span className="inline-flex items-center gap-1.5 bg-[#881313] text-white text-xs sm:text-sm font-black px-4 py-1 rounded-full uppercase tracking-wider shadow">
            <span>{isEvening ? '🌙' : '🌅'}</span>
            <span>
              -: {isEvening ? 'Evening Menu • ಸಂಜೆಯ ಊಟ' : 'Morning Menu • ಬೆಳಗಿನ ಊಟ'} :-
            </span>
          </span>
        </div>

        {/* Outdoor Catering Pill */}
        <div className="text-center">
          <span className="inline-block bg-yellow-200 border border-yellow-500 text-red-800 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
            {HOTEL_INFO.cateringTag}
          </span>
        </div>

        {/* 2-Column Table Grid (Exact 25 items from poster) */}
        <div className="border-2 border-[#15803d] rounded-lg overflow-hidden bg-white text-[11px] sm:text-xs shadow-inner">
          <div className="grid grid-cols-2 divide-x divide-[#15803d]">
            
            {/* Left Column: Mutton & Staples */}
            <div className="divide-y divide-[#15803d]/40">
              {leftColumnItems.map((dish) => {
                const isSpecialPortion = isEvening && (dish.portion && dish.portion.includes('pc'));
                return (
                  <div
                    key={dish.id}
                    className={`p-1 px-1.5 flex justify-between items-center gap-1 transition-colors ${
                      isSpecialPortion ? 'bg-amber-100/70' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-blue-900 kannada-text leading-tight truncate">
                        {dish.kannadaName}
                      </span>
                      {dish.portion && isEvening && (
                        <span className="text-[9px] font-black text-red-700 leading-tight">
                          {dish.englishName} ({dish.portion})
                        </span>
                      )}
                      {(!dish.portion || !isEvening) && (
                        <span className="font-bold text-stone-800 text-[10px] leading-tight truncate">
                          {dish.englishName}
                        </span>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {!dish.inStock ? (
                        <span className="text-[8px] bg-red-100 text-red-700 font-extrabold px-1 rounded border border-red-300">
                          Sold Out
                        </span>
                      ) : (
                        <span className="font-black text-[#15803d] text-[10px] sm:text-xs">
                          ₹{dish.price}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Chicken & Soups */}
            <div className="divide-y divide-[#15803d]/40">
              {rightColumnItems.map((dish) => {
                const isSpecialPortion = isEvening && (dish.portion && dish.portion.includes('pc'));
                return (
                  <div
                    key={dish.id}
                    className={`p-1 px-1.5 flex justify-between items-center gap-1 transition-colors ${
                      isSpecialPortion ? 'bg-amber-100/70' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-blue-900 kannada-text leading-tight truncate">
                        {dish.kannadaName}
                      </span>
                      <span className="font-bold text-stone-800 text-[10px] leading-tight truncate">
                        {dish.englishName}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {!dish.inStock ? (
                        <span className="text-[8px] bg-red-100 text-red-700 font-extrabold px-1 rounded border border-red-300">
                          Sold Out
                        </span>
                      ) : (
                        <span className="font-black text-[#15803d] text-[10px] sm:text-xs">
                          ₹{dish.price}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* 5 Food Showcase Cards */}
        <FoodHighlights />

        {/* Address & Catering Box */}
        <div className="bg-white rounded-lg p-2.5 border border-stone-300 text-stone-900 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <p className="font-extrabold text-[11px] sm:text-xs text-red-950 leading-tight">
                {HOTEL_INFO.address}
              </p>
              <div className="mt-1 bg-yellow-100 border border-yellow-400 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block">
                Parcel Extra Charges • Thank You Visit Again...!
              </div>
            </div>

            {/* Location QR Code representation */}
            <div className="w-13 h-13 bg-stone-100 border border-stone-700 rounded-lg p-1 flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-[8px] font-bold text-stone-700">Map</span>
              <span className="text-xl leading-none">📍</span>
            </div>
          </div>

          {/* Phone numbers */}
          <div className="pt-1.5 border-t border-stone-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#1e3a8a]">
            <span>📞 {HOTEL_INFO.phones[0]}</span>
            <span>|</span>
            <span>{HOTEL_INFO.phones[1]}</span>
          </div>
        </div>

      </div>

      {/* Floating Enlarge Indicator Badge */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
        <span>Tap to Enlarge</span>
      </div>
    </div>
  );
}
