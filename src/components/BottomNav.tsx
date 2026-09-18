import React from 'react';
import { Home, Users, MapPin, Shield, Settings } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  liveAlertCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  liveAlertCount = 1
}) => {
  return (
    <div className="w-full bg-black/95 backdrop-blur-md border-t border-[#2E2E36] h-[58px] pb-1 px-3 flex items-center justify-between z-40 select-none shrink-0 relative">
      {/* 1. Home */}
      <button
        onClick={() => onNavigate('home')}
        className="flex-1 flex flex-col items-center justify-center pt-1 group cursor-pointer"
      >
        <Home
          size={19}
          className={`transition-colors ${
            currentScreen === 'home' ? 'text-[#FF3B30]' : 'text-[#8E8E99] group-hover:text-white'
          }`}
        />
        <span
          className={`text-[10px] mt-0.5 uppercase font-medium tracking-wider ${
            currentScreen === 'home' ? 'text-[#FF3B30] font-bold' : 'text-[#8E8E99]'
          }`}
        >
          Home
        </span>
      </button>

      {/* 2. Friends */}
      <button
        onClick={() => onNavigate('friends')}
        className="flex-1 flex flex-col items-center justify-center pt-1 relative group cursor-pointer"
      >
        <div className="relative">
          <Users
            size={19}
            className={`transition-colors ${
              currentScreen === 'friends' ? 'text-[#FF3B30]' : 'text-[#8E8E99] group-hover:text-white'
            }`}
          />
          {liveAlertCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-[#FF3B30] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-[0_0_8px_rgba(255,59,48,0.8)] animate-pulse">
              {liveAlertCount}
            </span>
          )}
        </div>
        <span
          className={`text-[10px] mt-0.5 uppercase font-medium tracking-wider ${
            currentScreen === 'friends' ? 'text-[#FF3B30] font-bold' : 'text-[#8E8E99]'
          }`}
        >
          Friends
        </span>
      </button>

      {/* 3. Center Raised Map Button */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-3">
        <button
          onClick={() => onNavigate('safety-map')}
          className="w-11 h-11 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-[0_0_12px_rgba(255,59,48,0.5)] hover:scale-105 active:scale-95 transition-transform group cursor-pointer"
          title="Open Safety Map"
        >
          <MapPin
            size={20}
            className="text-white fill-white transition-transform group-hover:scale-110"
          />
        </button>
        <span
          className={`text-[10px] mt-0.5 uppercase font-medium tracking-wider ${
            currentScreen === 'safety-map' ? 'text-[#FF3B30] font-bold' : 'text-[#8E8E99]'
          }`}
        >
          Map
        </span>
      </div>

      {/* 4. Providers */}
      <button
        onClick={() => onNavigate('providers')}
        className="flex-1 flex flex-col items-center justify-center pt-1 group cursor-pointer"
      >
        <Shield
          size={19}
          className={`transition-colors ${
            currentScreen === 'providers' || currentScreen === 'provider-portal'
              ? 'text-[#FF3B30]'
              : 'text-[#8E8E99] group-hover:text-white'
          }`}
        />
        <span
          className={`text-[10px] mt-0.5 uppercase font-medium tracking-wider ${
            currentScreen === 'providers' ? 'text-[#FF3B30] font-bold' : 'text-[#8E8E99]'
          }`}
        >
          Providers
        </span>
      </button>

      {/* 5. Settings */}
      <button
        onClick={() => onNavigate('settings')}
        className="flex-1 flex flex-col items-center justify-center pt-1 group cursor-pointer"
      >
        <Settings
          size={19}
          className={`transition-colors ${
            currentScreen === 'settings' || currentScreen === 'offline-preview'
              ? 'text-[#FF3B30]'
              : 'text-[#8E8E99] group-hover:text-white'
          }`}
        />
        <span
          className={`text-[10px] mt-0.5 uppercase font-medium tracking-wider ${
            currentScreen === 'settings' ? 'text-[#FF3B30] font-bold' : 'text-[#8E8E99]'
          }`}
        >
          Settings
        </span>
      </button>
    </div>
  );
};
