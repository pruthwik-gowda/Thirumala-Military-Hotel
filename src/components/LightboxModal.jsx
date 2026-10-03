import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, title, children }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(Math.max(0.7, Number((prev + delta).toFixed(2))), 2.5));
  };

  const resetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col backdrop-blur-md animate-fade-in">
      {/* Lightbox Toolbar */}
      <div className="p-3 bg-[#191411] border-b border-[#3b2b20] flex items-center justify-between text-white shrink-0">
        <div>
          <h3 className="text-sm font-bold text-amber-400 truncate max-w-xs">{title || 'Menu Viewer'}</h3>
          <p className="text-[10px] text-stone-400">Pinch or use zoom controls to inspect</p>
        </div>

        {/* Zoom Controls & Close */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoom(-0.25)}
            className="w-8 h-8 rounded-lg bg-stone-800 text-white font-bold text-sm flex items-center justify-center border border-stone-700 active:scale-95 hover:bg-stone-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={resetZoom}
            className="px-2 h-8 rounded-lg bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center border border-stone-700 active:scale-95 hover:bg-stone-700 transition"
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={() => handleZoom(0.25)}
            className="w-8 h-8 rounded-lg bg-stone-800 text-white font-bold text-sm flex items-center justify-center border border-stone-700 active:scale-95 hover:bg-stone-700 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="ml-2 w-8 h-8 rounded-lg bg-red-700 text-white font-bold text-sm flex items-center justify-center active:scale-95 hover:bg-red-800 transition shadow"
            title="Close Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lightbox Content Container */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center select-none">
        <div
          id="lightbox-zoom-container"
          style={{ transform: `scale(${zoom})` }}
          className="max-w-md w-full my-auto transition-transform duration-150"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
