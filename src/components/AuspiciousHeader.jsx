import React from 'react';
import { Sun, Moon, ShieldCheck, Lock } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function AuspiciousHeader({ isDark, onToggleTheme, onOpenAdmin, isAdminLoggedIn }) {
  return (
    <div className="w-full bg-[#781212] text-[#fef08a] py-2 px-3 border-b border-amber-500/40 sticky top-0 z-40 shadow-md">
      <div className="max-w-xl mx-auto flex items-center justify-between text-[11px] sm:text-xs font-bold tracking-wide">
        
        {/* Sacred Invocations */}
        <div className="flex items-center gap-1.5 kannada-text truncate">
          <span>{HOTEL_INFO.invocations[0]}</span>
          <span className="text-amber-300">🪔</span>
          <span className="hidden sm:inline">{HOTEL_INFO.invocations[1]}</span>
        </div>

        {/* Action Controls: Admin Button & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            id="admin-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold transition active:scale-95 border ${
              isAdminLoggedIn
                ? 'bg-emerald-800/90 text-emerald-100 border-emerald-400'
                : 'bg-black/30 hover:bg-black/50 text-amber-200 border-amber-400/40'
            }`}
            title={isAdminLoggedIn ? 'Admin Panel (Logged In)' : 'Admin Login'}
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Admin</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button (Light mode default) */}
          <button
            onClick={onToggleTheme}
            id="theme-toggle-btn"
            className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-amber-200 px-2.5 py-1 rounded-full border border-amber-400/40 text-[10px] sm:text-xs font-bold transition active:scale-95"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-yellow-300" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-200" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
