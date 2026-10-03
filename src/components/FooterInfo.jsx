import React from 'react';
import { Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function FooterInfo({ onCopyPhone, onOpenAdmin, isAdminLoggedIn }) {
  return (
    <footer className="space-y-3 pt-2">
      {/* Catering & Hotel Info Card */}
      <div className="bg-white/90 dark:bg-[#191411] rounded-2xl p-4 border border-amber-200 dark:border-[#3b2b20] text-center space-y-2 text-xs text-stone-600 dark:text-stone-400 shadow-sm transition-colors">
        <p className="font-extrabold text-amber-800 dark:text-amber-400 flex items-center justify-center gap-1.5 text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{HOTEL_INFO.cateringTag}</span>
        </p>

        <p className="text-[11px] leading-relaxed max-w-sm mx-auto text-stone-600 dark:text-stone-300">
          Authentic Nati style wood-fire meals (ಒಲೆ ಊಟ) for family functions, festivals, private events & bulk parcel orders.
        </p>

        {/* Hotel Operational Hours */}
        <div className="bg-amber-50/90 dark:bg-stone-900/70 rounded-xl p-2 border border-amber-200/80 dark:border-stone-800 text-[10px] sm:text-[11px] text-stone-700 dark:text-stone-300 max-w-sm mx-auto space-y-0.5">
          <div className="font-bold text-amber-900 dark:text-amber-400 flex items-center justify-center gap-1">
            <span>⏰</span>
            <span>Hotel Operational Timings</span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap text-stone-600 dark:text-stone-300">
            <span>Morning: <strong>11:00 AM – 4:00 PM</strong></span>
            <span>•</span>
            <span>Evening: <strong>6:00 PM – 9:30 PM</strong></span>
          </div>
          <div className="text-red-700 dark:text-amber-300 font-extrabold text-[10px]">
            ⚡ Sundays: <strong>7:00 AM – 4:00 PM</strong> (Starts at 7:00 AM)
          </div>
        </div>

        <div className="pt-2 border-t border-amber-200/60 dark:border-stone-800/80 text-[11px] text-stone-700 dark:text-stone-300 flex items-center justify-center gap-2 flex-wrap">
          <a
            href={HOTEL_INFO.mapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline text-stone-700 dark:text-stone-300"
            title="Open in Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Rajanukunte, Bengaluru</span>
          </a>
          <span>•</span>
          <a
            href={`tel:${HOTEL_INFO.telPhones ? HOTEL_INFO.telPhones[0] : '+917795085362'}`}
            className="text-amber-700 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
            title="Click to call"
          >
            <Phone className="w-3 h-3" />
            <span>{HOTEL_INFO.phones[0]}</span>
          </a>
          <span>/</span>
          <a
            href={`tel:${HOTEL_INFO.telPhones ? HOTEL_INFO.telPhones[1] : '+917349729646'}`}
            className="text-amber-700 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
            title="Click to call"
          >
            <Phone className="w-3 h-3" />
            <span>{HOTEL_INFO.phones[1]}</span>
          </a>
        </div>

        {/* Subtle Admin Link */}
        <div className="pt-2 text-center">
          <button
            onClick={onOpenAdmin}
            className="text-[10px] text-stone-400 dark:text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium inline-flex items-center gap-1 transition"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{isAdminLoggedIn ? 'Admin Panel Active' : 'Staff / Owner Login'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
