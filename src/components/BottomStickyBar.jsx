import React from 'react';
import { Phone, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function BottomStickyBar({ onOpenCallModal }) {
  return (
    <aside className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#140f0c]/95 backdrop-blur-md border-t border-amber-200 dark:border-[#3b2a1e] py-2 px-3 z-30 shadow-2xl transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <button
          onClick={onOpenCallModal}
          id="sticky-call-btn"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition"
        >
          <Phone className="w-4 h-4" />
          <span>Call: {HOTEL_INFO.phones[0]}</span>
        </button>

        <a
          href={HOTEL_INFO.mapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          id="sticky-directions-btn"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md active:scale-95 transition"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
        </a>
      </div>
    </aside>
  );
}
