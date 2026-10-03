import React from 'react';

export default function FoodHighlights() {
  const highlights = [
    { icon: '🔥', title: 'ಒಲೆ ಊಟ', subtitle: 'Woodfire', bg: 'from-amber-950 to-stone-900 border-amber-600/60' },
    { icon: '🍲', title: 'ಮುದ್ದೆ ಊಟ', subtitle: 'Ragi Mudde', bg: 'from-amber-900 to-amber-950 border-amber-500/60' },
    { icon: '🍗', title: 'ಬಿರಿಯಾನಿ', subtitle: 'Biriyani', bg: 'from-red-950 to-stone-900 border-red-600/60' },
    { icon: '🥘', title: 'ನಾಟಿ ಕೋಳಿ', subtitle: 'Nati Koli', bg: 'from-amber-950 to-stone-900 border-amber-600/60' },
    { icon: '🥣', title: 'ಖೈಮಾ', subtitle: 'Keema', bg: 'from-red-950 to-amber-950 border-red-500/60' }
  ];

  return (
    <div className="grid grid-cols-5 gap-1.5 pt-1">
      {highlights.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-xl bg-gradient-to-b ${item.bg} border text-center p-1 py-1.5 shadow-sm flex flex-col items-center justify-center relative overflow-hidden`}
        >
          <span className="text-xl sm:text-2xl leading-none filter drop-shadow">{item.icon}</span>
          <span className="text-[9px] sm:text-[10px] font-black text-amber-300 kannada-text leading-tight mt-1 truncate w-full">
            {item.title}
          </span>
          <span className="text-[8px] font-bold text-stone-300 opacity-90 leading-none truncate w-full">
            {item.subtitle}
          </span>
        </div>
      ))}
    </div>
  );
}
