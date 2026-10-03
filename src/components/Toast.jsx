import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 font-black text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5 z-60 animate-fade-in border border-amber-300">
      <Check className="w-3.5 h-3.5" />
      <span>{message}</span>
    </div>
  );
}
