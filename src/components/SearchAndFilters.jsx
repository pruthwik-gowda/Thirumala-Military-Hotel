import React from 'react';
import { Search, X, LayoutGrid, Newspaper } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/defaultMenu';

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  activeTiming,
  onTimingChange,
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange
}) {
  return (
    <div className="space-y-2.5">
      
      {/* Search Input Box */}
      <div className="bg-white dark:bg-[#181310] p-2 px-3 rounded-xl border border-amber-200 dark:border-[#3b2a1f] flex items-center gap-2 shadow-sm transition-colors">
        <Search className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
        <input
          type="text"
          id="dish-search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search dishes (e.g. Mutton, ಬಿರಿಯಾನಿ, Kebab, ಮುದ್ದೆ)..."
          className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Hotel Session Timings & Sunday Legend */}
      <div>
        {/* Sunday Timings Legend */}
        <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 dark:from-amber-950/80 dark:via-stone-900 dark:to-amber-950/80 border border-amber-400/80 dark:border-amber-600/50 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-xs shadow-sm mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">⚡</span>
            <span className="font-black text-red-800 dark:text-amber-300 uppercase tracking-wide text-[10px] sm:text-[11px]">
              Sunday Timings:
            </span>
            <span className="font-extrabold text-stone-900 dark:text-stone-100 text-[11px] sm:text-xs">
              7:00 AM – 4:00 PM
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 kannada-text shrink-0">
            (ಭಾನುವಾರ ಬೆಳಿಗ್ಗೆ 7:00 ರಿಂದ)
          </span>
        </div>

        {/* Regular Timings Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-[#181310] rounded-xl border border-amber-200/80 dark:border-[#3b2a1f] shadow-sm">
          {/* Tab 1: 11:00 AM – 4:00 PM */}
          <button
            onClick={() => onTimingChange('morning')}
            id="tab-morning"
            className={`py-2 px-2 rounded-lg text-center font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTiming === 'morning'
                ? 'bg-[#881313] text-white shadow-md scale-[1.01]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            <span className="text-xs sm:text-sm font-black leading-tight flex items-center gap-1">
              <span>🌅</span>
              <span>11:00 AM – 4:00 PM</span>
            </span>
            <span className="text-[10px] opacity-90 leading-tight kannada-text font-bold">
              ಬೆಳಗಿನ ಊಟ • Morning
            </span>
          </button>

          {/* Tab 2: 6:00 PM – 9:30 PM */}
          <button
            onClick={() => onTimingChange('evening')}
            id="tab-evening"
            className={`py-2 px-2 rounded-lg text-center font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTiming === 'evening'
                ? 'bg-[#881313] text-white shadow-md scale-[1.01]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            <span className="text-xs sm:text-sm font-black leading-tight flex items-center gap-1">
              <span>🌙</span>
              <span>6:00 PM – 9:30 PM</span>
            </span>
            <span className="text-[10px] opacity-90 leading-tight kannada-text font-bold">
              ಸಂಜೆಯ ಊಟ • Evening
            </span>
          </button>
        </div>
      </div>

      {/* Category Pills & View Mode Toggle */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white dark:bg-[#181310] text-stone-600 dark:text-stone-300 border-amber-200/80 dark:border-[#3b2a1f] hover:bg-amber-50 dark:hover:bg-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1 opacity-80 text-[10px] kannada-text font-normal">({cat.kannadaLabel})</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle: Poster Board vs Modern Card List */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#181310] p-1 rounded-xl border border-amber-200/80 dark:border-[#3b2a1f] shrink-0">
          <button
            onClick={() => onViewModeChange('poster')}
            className={`p-1.5 rounded-lg transition text-xs flex items-center gap-1 ${
              viewMode === 'poster'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
            title="Authentic Board View"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">Board</span>
          </button>

          <button
            onClick={() => onViewModeChange('cards')}
            className={`p-1.5 rounded-lg transition text-xs flex items-center gap-1 ${
              viewMode === 'cards'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
            title="Card View with Pricing"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">Cards</span>
          </button>
        </div>

      </div>

    </div>
  );
}
