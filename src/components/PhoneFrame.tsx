import React from 'react';
import { Wifi, BatteryMedium, Signal, WifiOff, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface PhoneFrameProps {
  children: React.ReactNode;
  isOffline?: boolean;
  currentTime?: string;
  theme?: Theme;
  onToggleTheme?: () => void;
  onQuickReset?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isOffline = false,
  currentTime = '21:14',
  theme = 'dark',
  onToggleTheme,
  onQuickReset,
}) => {
  return (
    <div className={`h-[100dvh] max-h-[100dvh] w-full bg-[var(--bg-desktop)] flex flex-col items-center justify-center p-0 sm:p-2 sm:py-2 overflow-hidden select-none ${theme === 'light' ? 'theme-light' : ''}`}>
      {/* Container simulating high-end iPhone chassis fitted to 100dvh */}
      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-full sm:max-h-[min(844px,calc(100dvh-16px))] bg-[var(--bg-frame)] sm:rounded-[44px] shadow-[0_20px_50px_var(--chassis-shadow),0_0_0_8px_var(--chassis-rim),0_0_0_10px_var(--chassis-outer)] overflow-hidden flex flex-col border border-[var(--chassis-outer)] sm:border-transparent transition-all duration-300">
        
        {/* Top Safe Area: 44px tall */}
        <div className="w-full h-[44px] bg-transparent text-[var(--top-bar-text)] px-6 flex items-center justify-between z-50 shrink-0 select-none text-[13px] font-semibold tracking-tight">
          {/* Time with Quick Theme Switcher */}
          <div className="w-16 flex items-center gap-1.5">
            <span className="text-left font-mono text-[12px]">{currentTime}</span>
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun size={12} className="text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon size={12} className="text-indigo-600 hover:-rotate-12 transition-transform" />
                )}
              </button>
            )}
          </div>

          {/* Dynamic Island Pill */}
          <div className="dynamic-island-capsule w-28 h-[24px] bg-black rounded-full border border-[#2E2E36]/80 flex items-center justify-between px-2 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/40" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#16161A] border border-[#2E2E36]" />
          </div>

          {/* Status Icons: Signal, Wifi, Battery */}
          <div className="w-16 flex items-center justify-end gap-1.5 opacity-90">
            {isOffline ? (
              <span className="text-[10px] text-[#FFC400] font-mono font-bold">NO DATA</span>
            ) : (
              <Signal size={13} strokeWidth={2.5} />
            )}
            
            {isOffline ? (
              <WifiOff size={13} className="text-[#FFC400]" />
            ) : (
              <Wifi size={13} strokeWidth={2.5} />
            )}
            
            <BatteryMedium size={15} strokeWidth={2.2} />
          </div>
        </div>

        {/* Screen Content Viewport: fits strictly within 100dvh flex parent */}
        <div className="relative w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col bg-[var(--bg-frame)] text-[var(--top-bar-text)]">
          {children}
        </div>

        {/* Bottom Safe Area with iPhone home bar indicator */}
        <div className="w-full h-[22px] bg-transparent flex items-center justify-center z-50 shrink-0 pointer-events-none select-none pb-1">
          <div className="w-32 h-1 rounded-full bg-[var(--home-bar)]" />
        </div>
      </div>
    </div>
  );
};
