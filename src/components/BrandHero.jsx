import React from 'react';
import { Phone, MapPin, Navigation, Flame, Award } from 'lucide-react';
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

      <div className="flex items-center gap-3.5 relative">
        
        {/* Exact Circular TM Seal Emblem */}
        <button
          onClick={onOpenEmblemView}
          className="cursor-pointer shrink-0 group text-left relative focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full"
          title="Click to view full hotel seal"
        >
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-amber-500 bg-[#fbf5e8] shadow-md group-hover:scale-105 transition-transform flex items-center justify-center p-0.5 relative">
            <svg className="w-full h-full" viewBox="0 0 500 500" aria-label="Thirumala Military Hotel Emblem">
              <circle cx="250" cy="250" r="242" fill="#801010" stroke="#f59e0b" strokeWidth="4"/>
              <circle cx="250" cy="250" r="234" fill="#FBF5E8"/>
              {/* Vintage Brass Pots & Vessels illustration */}
              <g stroke="#805b38" strokeWidth="3" fill="#cf9d72" opacity="0.95">
                <ellipse cx="250" cy="405" rx="55" ry="30" fill="#c48a58"/>
                <ellipse cx="140" cy="355" rx="42" ry="24"/>
                <ellipse cx="360" cy="355" rx="42" ry="24"/>
                <ellipse cx="110" cy="210" rx="38" ry="22"/>
                <ellipse cx="390" cy="210" rx="38" ry="22"/>
                <ellipse cx="160" cy="115" rx="32" ry="18" fill="#c48a58"/>
                <ellipse cx="340" cy="115" rx="32" ry="18" fill="#c48a58"/>
                <ellipse cx="250" cy="95" rx="42" ry="22"/>
              </g>
              <circle cx="250" cy="250" r="145" fill="#fcf9f2" stroke="#681919" strokeWidth="6"/>
              <circle cx="250" cy="250" r="136" fill="none" stroke="#681919" strokeWidth="2" strokeDasharray="4,4"/>
              <path id="curve-seal-hero" d="M 140 230 A 110 110 0 0 1 360 230" fill="none"/>
              <text fontFamily="'Cinzel', serif" fontSize="28" fontWeight="900" fill="#541212" letterSpacing="4">
                <textPath href="#curve-seal-hero" startOffset="50%" textAnchor="middle">THIRUMALA</textPath>
              </text>
              <text x="250" y="275" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="76" fontWeight="900" fill="#541212" textAnchor="middle" stroke="#ffffff" strokeWidth="3" paintOrder="stroke fill">TM</text>
              <line x1="175" y1="298" x2="325" y2="298" stroke="#681919" strokeWidth="2.5"/>
              <text x="250" y="318" fontFamily="'Cinzel', serif" fontSize="20" fontWeight="900" fill="#541212" letterSpacing="3" textAnchor="middle">MILITARY</text>
              <text x="250" y="340" fontFamily="'Cinzel', serif" fontSize="18" fontWeight="800" fill="#541212" letterSpacing="2" textAnchor="middle">HOTEL</text>
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-amber-600 text-white rounded-full p-1 text-[10px] shadow leading-none" title="Expand">🔍</span>
          </div>
        </button>

        {/* Hotel Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-[#781212] text-amber-100 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-red-800/60 shadow-sm flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-300" />
              <span>Official Menu</span>
            </span>
            <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-400 dark:border-amber-600/40 text-[10px] font-bold px-2 py-0.5 rounded-full kannada-text flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              <span>ಒಲೆ ಊಟ • Nati Style</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-red-800 dark:text-amber-400 kannada-text leading-tight mt-1 truncate">
            {HOTEL_INFO.kannadaName}
          </h1>
          <h2 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-200 serif-text uppercase tracking-wider">
            {HOTEL_INFO.englishName}
          </h2>

          <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium flex items-center gap-1 mt-1 truncate">
            <MapPin className="w-3 h-3 text-red-600 shrink-0" />
            <span className="truncate">Next to Sattva Lumina, Rajanukunte, Bengaluru</span>
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
