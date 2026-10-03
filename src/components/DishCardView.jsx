import React from 'react';
import { Flame, Sparkles, Phone, AlertCircle } from 'lucide-react';

export default function DishCardView({ items, onOpenCallModal }) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1c1613] rounded-2xl p-8 border border-amber-200 dark:border-[#3e2c21] text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
        <h3 className="font-bold text-stone-800 dark:text-stone-200 text-sm">No dishes found</h3>
        <p className="text-xs text-stone-500">Try changing your search keywords or category filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((dish) => {
        const isMutton = dish.category === 'mutton';
        const isChicken = dish.category === 'chicken';
        const isStaples = dish.category === 'staples';

        return (
          <div
            key={dish.id}
            className={`bg-white dark:bg-[#1c1613] rounded-2xl p-3 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
              !dish.inStock
                ? 'opacity-60 border-stone-300 dark:border-stone-800'
                : 'border-amber-200 dark:border-[#3e2c21] hover:border-amber-400'
            }`}
          >
            {/* Top row: Tags & Badges */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                {/* Meat/Veg Dot Indicator */}
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${
                    isMutton
                      ? 'bg-red-700'
                      : isChicken
                      ? 'bg-amber-600'
                      : 'bg-emerald-600'
                  }`}
                  title={isMutton ? 'Mutton' : isChicken ? 'Chicken' : 'Staples/Sides'}
                />

                <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">
                  {dish.category}
                </span>

                {dish.isSundaySpecial && (
                  <span className="bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-red-300 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Sunday</span>
                  </span>
                )}
                {dish.isSpecial && !dish.isSundaySpecial && (
                  <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-amber-300 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 text-orange-500" />
                    <span>Special</span>
                  </span>
                )}
              </div>

              {/* In Stock / Sold Out tag */}
              {!dish.inStock && (
                <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-extrabold px-1.5 py-0.5 rounded-md border border-red-300">
                  Sold Out
                </span>
              )}
            </div>

            {/* Dish Names: Kannada & English */}
            <div className="space-y-0.5">
              <h4 className="text-base sm:text-lg font-black text-stone-900 dark:text-amber-300 kannada-text leading-snug">
                {dish.kannadaName}
              </h4>
              <p className="text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-200">
                {dish.englishName}
              </p>
              {dish.portion && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {dish.portion}
                </p>
              )}
            </div>

            {/* Bottom Row: Price & Call Button */}
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-100 dark:border-stone-800/80">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-[#15803d] dark:text-emerald-400 leading-none">
                  ₹{dish.price}
                </span>
                <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                  / portion
                </span>
              </div>

              <button
                onClick={onOpenCallModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-bold transition active:scale-95"
                title="Call to order this item"
              >
                <Phone className="w-3 h-3 text-amber-600" />
                <span>Order</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
