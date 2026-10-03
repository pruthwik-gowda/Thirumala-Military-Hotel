import React from 'react';
import { Maximize2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function PosterBoard({ items, activeTiming, showPrices = false, isLightbox = false, onOpenLightbox, onOpenCallModal }) {
  // Balanced columns: always fill the left column first, then right column
  const midPoint = Math.ceil(items.length / 2);
  const leftColumnItems = items.slice(0, midPoint);
  const rightColumnItems = items.slice(midPoint);

  const isEvening = activeTiming === 'evening';

  return (
    <div
      onClick={isLightbox ? undefined : onOpenLightbox}
      className={`poster-glow bg-[#f97316] p-2 sm:p-2.5 rounded-2xl relative overflow-hidden ${
        isLightbox ? '' : 'cursor-pointer group transition-all duration-200 active:scale-[0.99]'
      }`}
      title={isLightbox ? undefined : 'Click or tap to view full screen poster'}
    >
      <div className="bg-[#fbf5e8] text-stone-900 rounded-xl p-2.5 sm:p-3.5 space-y-2.5 border-2 border-amber-600/40">
        
        {/* Top Invocations */}
        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-amber-950 border-b border-amber-200/90 pb-1.5 kannada-text">
          <span>{HOTEL_INFO.invocations[0]}</span>
          <span className="text-amber-600 text-sm">🛕</span>
          <span>{HOTEL_INFO.invocations[1]}</span>
        </div>

        {/* Brand Title Header */}
        <div className="text-center pt-0.5">
          <h2 className="text-xl sm:text-2xl font-black text-[#15803d] leading-none kannada-text drop-shadow-sm">
            {HOTEL_INFO.kannadaName}
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-[#15803d] tracking-wide serif-text mt-1">
            {HOTEL_INFO.englishName}
          </p>
        </div>

        {/* Menu Timing Ribbon */}
        <div className="text-center my-1">
          <span className="inline-flex items-center justify-center bg-[#881313] text-white text-xs sm:text-sm font-black px-4 py-1 rounded-full uppercase tracking-wider shadow">
            <span>
              -: {isEvening ? '6:00 PM – 9:30 PM • ಸಂಜೆಯ ಊಟ' : '11:00 AM – 4:00 PM • ಬೆಳಗಿನ ಊಟ'} :-
            </span>
          </span>
        </div>

        {/* Outdoor Catering Pill */}
        <div className="text-center">
          <span className="inline-block bg-yellow-200 border border-yellow-500 text-red-800 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
            {HOTEL_INFO.cateringTag}
          </span>
        </div>

        {/* 2-Column Table Grid */}
        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-5 border border-stone-300 text-center space-y-1">
            <p className="font-bold text-xs sm:text-sm text-stone-800">
              No dishes found matching this filter in this session.
            </p>
            <p className="text-[11px] text-stone-500">
              {isEvening
                ? 'Evening Menu serves: Chicken Biryani, Kebab, Chilli Chicken, Chicken Chops, Parotta, Chicken Lollipop, Eggs. Other items served in Morning Session (11 AM – 4 PM).'
                : 'Try clearing your search query or switching categories.'}
            </p>
          </div>
        ) : (
          <div className="border-2 border-[#15803d] rounded-lg overflow-hidden bg-white text-[11px] sm:text-xs shadow-inner">
            <div className="grid grid-cols-2 divide-x divide-[#15803d]">
              
              {/* Left Column */}
              <div className="divide-y divide-[#15803d]/40">
                {leftColumnItems.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-1 px-1.5 flex justify-between items-center gap-1 hover:bg-stone-50 transition-colors"
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
                      ) : showPrices ? (
                        <span className="font-black text-[#15803d] text-[10px] sm:text-xs">
                          ₹{dish.price}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="divide-y divide-[#15803d]/40">
                {rightColumnItems.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-1 px-1.5 flex justify-between items-center gap-1 hover:bg-stone-50 transition-colors"
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
                      ) : showPrices ? (
                        <span className="font-black text-[#15803d] text-[10px] sm:text-xs">
                          ₹{dish.price}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}

                {/* Symmetrical footer badge when columns are uneven (e.g. 7 evening dishes) */}
                {rightColumnItems.length < leftColumnItems.length && (
                  <div className="p-1 px-1.5 bg-amber-50/70 flex items-center justify-center text-center h-full min-h-[32px]">
                    <span className="text-[9px] sm:text-[10px] font-bold text-amber-900 kannada-text">
                      🔥 ಬಿಸಿ ಬಿಸಿ ಸಂಜೆ ಊಟ
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Floating Enlarge Indicator Badge */}
      {!isLightbox && (
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Tap to Enlarge</span>
        </div>
      )}
    </div>
  );
}
