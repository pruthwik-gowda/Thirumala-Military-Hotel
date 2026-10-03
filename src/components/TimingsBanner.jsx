import React from 'react';
import { Clock } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function TimingsBanner() {
  return (
    <div className="bg-amber-50/95 dark:bg-[#1c1613] rounded-2xl p-3.5 sm:p-4 border-2 border-amber-400/80 dark:border-amber-600/60 shadow-md text-stone-900 dark:text-stone-100 transition-all duration-200 my-2">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-300/80 dark:border-[#3e2c21] pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-200 dark:bg-amber-950 flex items-center justify-center text-amber-900 dark:text-amber-300 shadow-sm">
            <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-amber-400 uppercase tracking-wide leading-none">
              Hotel Operational Timings
            </h4>
            <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 kannada-text leading-none">
              ಹೋಟೆಲ್ ಕಾರ್ಯನಿರ್ವಹಣೆಯ ಸಮಯ
            </span>
          </div>
        </div>

        <span className="bg-red-800 text-amber-200 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
          Daily Fresh
        </span>
      </div>

      {/* Regular Session Hours Grid */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs">
        {/* Morning Session */}
        <div className="bg-white dark:bg-[#140f0c] p-2 rounded-xl border border-amber-200 dark:border-stone-800 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold flex items-center justify-center">
            <span>Morning / Lunch</span>
          </span>
          <span className="text-xs sm:text-sm font-black text-stone-900 dark:text-amber-300 mt-0.5">
            {HOTEL_INFO.timings.morning}
          </span>
          <span className="text-[9px] font-bold text-amber-800 dark:text-amber-500 kannada-text">
            ಬೆಳಗಿನ ಊಟ
          </span>
        </div>

        {/* Evening Session */}
        <div className="bg-white dark:bg-[#140f0c] p-2 rounded-xl border border-amber-200 dark:border-stone-800 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold flex items-center justify-center">
            <span>Evening / Dinner</span>
          </span>
          <span className="text-xs sm:text-sm font-black text-stone-900 dark:text-amber-300 mt-0.5">
            {HOTEL_INFO.timings.evening}
          </span>
          <span className="text-[9px] font-bold text-amber-800 dark:text-amber-500 kannada-text">
            ಸಂಜೆಯ ಊಟ
          </span>
        </div>
      </div>

      {/* Special Sunday Timing Highlight Strip */}
      <div className="mt-2.5 bg-gradient-to-r from-amber-200/90 via-yellow-200/90 to-amber-200/90 dark:from-amber-950 dark:via-yellow-950/60 dark:to-amber-950 border border-amber-400 dark:border-amber-600/70 rounded-xl p-2 px-3 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="leading-tight">
            <div className="text-[11px] sm:text-xs font-black text-red-900 dark:text-amber-300">
              Sundays: {HOTEL_INFO.timings.sunday}
            </div>
            <div className="text-[9px] text-stone-700 dark:text-stone-300 font-medium">
              Woodfire Leg Soup & breakfast starts early at 7:00 AM!
            </div>
          </div>
        </div>

        <span className="text-[10px] font-black text-red-800 dark:text-amber-400 kannada-text shrink-0 bg-white/70 dark:bg-black/40 px-2 py-0.5 rounded-lg border border-amber-400/50">
          ಭಾನುವಾರ 7 ರಿಂದ
        </span>
      </div>

    </div>
  );
}
