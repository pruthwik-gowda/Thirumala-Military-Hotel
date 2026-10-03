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

      {/* Timings Tab Switcher (Morning Menu vs Evening Menu) */}
      <div>
        <div className="flex items-center justify-between px-1 mb-1 text-[11px] font-bold text-stone-500 dark:text-stone-400">
          <span className="uppercase tracking-wider text-amber-800 dark:text-amber-400">Select Menu Timings</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-500 font-medium">Authentic Woodfire Cooking</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-[#181310] rounded-xl border border-amber-200/80 dark:border-[#3b2a1f] shadow-sm">
          {/* Tab 1: Morning Menu */}
          <button
            onClick={() => onTimingChange('morning')}
            id="tab-morning"
            className={`py-2 px-2 rounded-lg text-center font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTiming === 'morning'
                ? 'bg-[#881313] text-white shadow-md scale-[1.01]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            <span className="kannada-text text-xs leading-none flex items-center gap-1.5">
              <span>🌅</span>
              <span>೧. ಬೆಳಗಿನ ಮೆನು</span>
            </span>
            <span className="text-[10px] opacity-90 leading-none">1. Morning Menu</span>
          </button>

          {/* Tab 2: Evening Menu */}
          <button
            onClick={() => onTimingChange('evening')}
            id="tab-evening"
            className={`py-2 px-2 rounded-lg text-center font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTiming === 'evening'
                ? 'bg-[#881313] text-white shadow-md scale-[1.01]'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
            }`}
          >
            <span className="kannada-text text-xs leading-none flex items-center gap-1.5">
              <span>🌙</span>
              <span>೨. ಸಂಜೆಯ ಮೆನು</span>
            </span>
            <span className="text-[10px] opacity-90 leading-none">2. Evening Menu</span>
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
