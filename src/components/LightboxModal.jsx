import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, Maximize, Smartphone } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, title, children }) {
  const [zoom, setZoom] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const scrollContainerRef = useRef(null);
  const lastTapRef = useRef(0);

  // Auto-fit or reset zoom on open
  useEffect(() => {
    if (isOpen) {
      // If mobile screen with height < 800px, start with fit-to-screen (~0.85) so user sees the whole menu
      const vh = window.innerHeight;
      if (vh < 780) {
        const fitRatio = Math.max(0.65, Number(((vh - 90) / 880).toFixed(2)));
        setZoom(fitRatio);
      } else {
        setZoom(1);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Touch Pinch-to-Zoom Event Listeners (non-passive touchmove for smooth mobile gestures)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !isOpen) return;

    let distStart = 0;
    let zoomStart = 1;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        distStart = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        zoomStart = zoomRef.current;
        setIsPinching(true);
      } else if (e.touches.length === 1) {
        // Double tap detection
        const now = Date.now();
        if (now - lastTapRef.current < 320) {
          e.preventDefault();
          setZoom((prev) => (prev > 1.1 ? 0.85 : 1.5));
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
        }
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2 && distStart > 0) {
        // Prevent default native page zoom so the lightbox zooms cleanly
        if (e.cancelable) e.preventDefault();

        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / distStart;
        const newZoom = Math.min(Math.max(0.5, Number((zoomStart * factor).toFixed(2))), 3.0);
        setZoom(newZoom);
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) {
        setIsPinching(false);
        distStart = 0;
      }
    };

    // Wheel zoom with Ctrl or trackpad pinch
    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        setZoom((prev) => Math.min(Math.max(0.5, Number((prev + delta).toFixed(2))), 3.0));
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(Math.max(0.5, Number((prev + delta).toFixed(2))), 3.0));
  };

  const handleFitToScreen = () => {
    const vh = window.innerHeight;
    const fitRatio = Math.max(0.6, Number(((vh - 100) / 880).toFixed(2)));
    setZoom(fitRatio);
  };

  const handleResetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col backdrop-blur-md animate-fade-in select-none">
      
      {/* Lightbox Top Header Toolbar */}
      <div className="p-2.5 sm:p-3 bg-[#191411] border-b border-[#3b2b20] flex items-center justify-between text-white shrink-0 shadow-md z-10">
        <div className="min-w-0 pr-2">
          <h3 className="text-xs sm:text-sm font-black text-amber-400 truncate max-w-[180px] sm:max-w-xs">
            {title || 'Menu Viewer'}
          </h3>
          <p className="text-[10px] text-stone-400 truncate">
            Pinch to zoom • Drag to scroll
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Fit to Screen button */}
          <button
            onClick={handleFitToScreen}
            className="px-2 py-1 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] flex items-center gap-1 border border-stone-700 active:scale-95 transition"
            title="Fit whole menu on screen"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fit</span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => handleZoom(-0.2)}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm flex items-center justify-center border border-stone-700 active:scale-95 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          {/* Current Zoom Percentage (tap to toggle 100%) */}
          <button
            onClick={zoom === 1 ? handleFitToScreen : handleResetZoom}
            className="px-2 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-extrabold text-[11px] sm:text-xs flex items-center justify-center border border-stone-700 active:scale-95 transition min-w-[50px]"
            title="Click to reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>

          {/* Zoom In */}
          <button
            onClick={() => handleZoom(0.2)}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm flex items-center justify-center border border-stone-700 active:scale-95 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="ml-1 sm:ml-2 w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center active:scale-95 transition shadow"
            title="Close Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lightbox Scrollable Content Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-2 sm:p-4 overscroll-contain relative touch-pan-x touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="min-h-full w-full flex flex-col items-center justify-start py-2"
          style={{
            // Dynamic bottom padding so zoomed content can scroll all the way to the end
            paddingBottom: zoom > 1 ? `${Math.round((zoom - 1) * 850 + 60)}px` : '50px'
          }}
        >
          <div
            id="lightbox-zoom-container"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: isPinching ? 'none' : 'transform 0.15s ease-out'
            }}
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Zoom Bar for Mobile Thumb Accessibility */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md border border-amber-500/40 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-2xl z-20 text-xs">
        <button
          onClick={() => handleZoom(-0.2)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center active:scale-95 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleFitToScreen}
          className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-black text-[10px] uppercase tracking-wider active:scale-95 transition"
        >
          Fit Whole Menu
        </button>

        <button
          onClick={handleResetZoom}
          className="px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 font-extrabold text-[10px] active:scale-95 transition"
        >
          100%
        </button>

        <button
          onClick={() => handleZoom(0.2)}
          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center active:scale-95 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
