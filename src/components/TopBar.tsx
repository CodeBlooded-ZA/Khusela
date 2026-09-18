import React from 'react';
import { Shield, Search, Bell, ChevronDown, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface TopBarProps {
  locationName?: string;
  hasUnreadAlerts?: boolean;
  theme?: Theme;
  onToggleTheme?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onLocationClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  locationName = 'BRAAMFONTEIN',
  hasUnreadAlerts = true,
  theme = 'dark',
  onToggleTheme,
  onSearchClick,
  onNotificationsClick,
  onLocationClick
}) => {
  return (
    <div className="w-full h-12 bg-black/90 backdrop-blur-md border-b border-[#2E2E36] px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Location selector on left */}
      <button
        onClick={onLocationClick}
        className="flex items-center gap-1.5 text-xs text-[#3D8BFF] hover:opacity-80 transition-opacity group cursor-pointer"
        title="Current precinct"
      >
        <span className="text-[#3D8BFF] text-xs">➤</span>
        <span className="font-condensed font-bold tracking-wider uppercase text-white group-hover:text-[#3D8BFF]">
          {locationName}
        </span>
        <ChevronDown size={12} className="text-[#8E8E99]" />
      </button>

      {/* Centered App Logo Mark */}
      <div className="flex items-center gap-1.5 cursor-default">
        <div className="w-5 h-5 rounded-md bg-[#FF3B30] flex items-center justify-center shadow-[0_0_8px_rgba(255,59,48,0.5)]">
          <Shield size={12} className="text-white fill-white" />
        </div>
        <span className="font-condensed font-extrabold text-lg tracking-wider text-white uppercase">
          KHUSELA
        </span>
      </div>

      {/* Icons on right */}
      <div className="flex items-center gap-1">
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E99] hover:text-white hover:bg-[#16161A] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-indigo-600" />
            )}
          </button>
        )}
        <button
          onClick={onSearchClick}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E99] hover:text-white hover:bg-[#16161A] transition-colors cursor-pointer"
          title="Search safety reports"
        >
          <Search size={16} />
        </button>
        <button
          onClick={onNotificationsClick}
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E99] hover:text-white hover:bg-[#16161A] transition-colors cursor-pointer"
          title="Emergency notifications"
        >
          <Bell size={16} />
          {hasUnreadAlerts && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B30] ring-2 ring-black animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};
