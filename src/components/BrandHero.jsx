import React from 'react';
import { Phone, MapPin, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function BrandHero({ onOpenCallModal, onOpenEmblemView }) {
  return (
    <header className="bg-white/90 dark:bg-[#1c1613] rounded-2xl p-4 border border-amber-200/80 dark:border-[#3e2c21] shadow-xl relative overflow-hidden transition-all duration-200">
      
      {/* Decorative background brass watermark */}
      <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
        <svg width="220" height="220" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" strokeWidth="20" />
          <text x="250" y="320" fontSize="200" fontWeight="900" textAnchor="middle" fill="currentColor">TM</text>
        </svg>
      </div>

      <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 relative">
        
        {/* Exact Circular TM Seal Emblem */}
        <button
          onClick={onOpenEmblemView}
          className="cursor-pointer shrink-0 group text-left relative focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full mt-0.5 sm:mt-0"
          title="Click to view full hotel seal"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500 bg-[#fbf5e8] shadow-md group-hover:scale-105 transition-transform flex items-center justify-center p-1 relative overflow-hidden">
            <img
              src="/logo-tm.png"
              alt="Thirumala Military Hotel Emblem"
              className="w-full h-full object-contain rounded-full"
            />
            <span className="absolute bottom-0 right-0 bg-amber-600 text-white rounded-full p-0.5 sm:p-1 text-[8px] sm:text-[10px] shadow leading-none" title="Expand">🔍</span>
          </div>
        </button>

        {/* Hotel Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            <span className="bg-[#781212] text-amber-100 text-[9px] sm:text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-red-800/60 shadow-sm inline-flex items-center leading-none">
              Official Menu
            </span>
            <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-400 dark:border-amber-600/40 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center leading-none">
              <span className="inline-flex items-center gap-1 leading-none">
                <span className="kannada-text inline-block translate-y-[2px]">ಒಲೆ ಊಟ</span>
                <span className="opacity-50 text-[8px]">•</span>
                <span>Nati Style</span>
              </span>
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl font-black text-[#15803d] dark:text-emerald-400 kannada-text leading-snug mt-1 break-words">
            {HOTEL_INFO.kannadaName}
          </h1>
          <h2 className="text-[11px] sm:text-xs md:text-sm font-extrabold text-[#15803d] dark:text-emerald-400 serif-text uppercase tracking-wider leading-snug break-words">
            {HOTEL_INFO.englishName}
          </h2>

          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium flex items-start gap-1 mt-1 leading-snug break-words">
            <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
            <span>Next to Sattva Lumina, Rajanukunte, Bengaluru</span>
          </p>
        </div>
      </div>

      {/* Direct Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-amber-200 dark:border-[#34241b]">
        <button
          onClick={onOpenCallModal}
          id="hero-call-btn"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Hotel</span>
        </button>

        <a
          href={HOTEL_INFO.mapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          id="hero-directions-btn"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md active:scale-95 transition"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </a>
      </div>

    </header>
  );
}
