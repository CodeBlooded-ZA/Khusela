import React, { useState } from 'react';
import { UserPersona, Theme } from '../types';
import { Sparkles, Users, AlertTriangle, Radio, WifiOff, RefreshCw, ChevronRight, CheckCircle2, Sun, Moon } from 'lucide-react';

interface DemoToolbarProps {
  currentPersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
  theme?: Theme;
  onToggleTheme?: () => void;
  onWalkIntoDangerZone: () => void;
  onSimulateShake: () => void;
  onSimulateFiveTaps: () => void;
  onToggleOffline: () => void;
  isOffline: boolean;
  onResetDemo: () => void;
  onQuickDispatch: () => void;
  onSimulateArrival: () => void;
  userInDangerZone: boolean;
  sosActive: boolean;
  dispatched: boolean;
  arrived: boolean;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  currentPersona,
  onSelectPersona,
  theme = 'dark',
  onToggleTheme,
  onWalkIntoDangerZone,
  onSimulateShake,
  onSimulateFiveTaps,
  onToggleOffline,
  isOffline,
  onResetDemo,
  onQuickDispatch,
  onSimulateArrival,
  userInDangerZone,
  sosActive,
  dispatched,
  arrived
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Small dark "DEMO" pill fixed in the top-right corner */}
      <div className="absolute top-14 right-3 z-50 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#16161A]/90 hover:bg-[#24242B] border border-[#2E2E36] rounded-full text-[11px] font-condensed tracking-wider uppercase text-white shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
          <span className="font-bold">DEMO</span>
          <span className="text-[#8E8E99] text-[10px]">
            {currentPersona === 'thandi' ? 'Thandi' : currentPersona === 'lerato' ? 'Lerato' : 'Provider'}
          </span>
        </button>
      </div>

      {/* Demo Control Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-[360px] bg-[#16161A] border border-[#2E2E36] rounded-2xl p-4 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FF3B30]/20 border border-[#FF3B30] flex items-center justify-center text-[#FF3B30]">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h3 className="font-condensed uppercase font-bold text-white text-base">
                    INTERACTIVE DEMO CONTROLS
                  </h3>
                  <p className="text-[11px] text-[#8E8E99]">
                    Simulate real-time emergency triggers & personas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8E8E99] hover:text-white text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Theme & Appearance Switch */}
            <div>
              <label className="text-[11px] font-condensed uppercase tracking-wider text-[#8E8E99] block mb-1.5">
                APPEARANCE THEME
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (theme !== 'dark' && onToggleTheme) onToggleTheme();
                  }}
                  className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#24242B] border-[#FF3B30] text-white font-bold shadow-sm'
                      : 'bg-black/30 border-[#2E2E36] text-[#8E8E99] hover:text-white'
                  }`}
                >
                  <Moon size={14} className={theme === 'dark' ? 'text-indigo-400' : ''} />
                  <span className="text-xs font-condensed uppercase tracking-wider">Dark Mode</span>
                </button>
                <button
                  onClick={() => {
                    if (theme !== 'light' && onToggleTheme) onToggleTheme();
                  }}
                  className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-[#24242B] border-[#FF3B30] text-white font-bold shadow-sm'
                      : 'bg-black/30 border-[#2E2E36] text-[#8E8E99] hover:text-white'
                  }`}
                >
                  <Sun size={14} className={theme === 'light' ? 'text-amber-400' : ''} />
                  <span className="text-xs font-condensed uppercase tracking-wider">Light Mode</span>
                </button>
              </div>
            </div>

            {/* Switch Persona */}
            <div>
              <label className="text-[11px] font-condensed uppercase tracking-wider text-[#8E8E99] block mb-1.5">
                ACTIVE PERSONA
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    onSelectPersona('thandi');
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                    currentPersona === 'thandi'
                      ? 'bg-[#24242B] border-[#FF3B30] text-white font-bold'
                      : 'bg-black/40 border-[#2E2E36] text-[#8E8E99] hover:text-white'
                  }`}
                >
                  <p className="text-xs font-condensed uppercase">Thandi</p>
                  <span className="text-[9px] text-[#8E8E99] block">User (In Joburg)</span>
                </button>

                <button
                  onClick={() => {
                    onSelectPersona('lerato');
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                    currentPersona === 'lerato'
                      ? 'bg-[#24242B] border-[#FF3B30] text-white font-bold'
                      : 'bg-black/40 border-[#2E2E36] text-[#8E8E99] hover:text-white'
                  }`}
                >
                  <p className="text-xs font-condensed uppercase">Lerato</p>
                  <span className="text-[9px] text-[#8E8E99] block">Friend (Responder)</span>
                </button>

                <button
                  onClick={() => {
                    onSelectPersona('provider');
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                    currentPersona === 'provider'
                      ? 'bg-[#24242B] border-[#FF3B30] text-white font-bold'
                      : 'bg-black/40 border-[#2E2E36] text-[#8E8E99] hover:text-white'
                  }`}
                >
                  <p className="text-xs font-condensed uppercase">Sentinel</p>
                  <span className="text-[9px] text-[#8E8E99] block">Armed Provider</span>
                </button>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="space-y-2">
              <label className="text-[11px] font-condensed uppercase tracking-wider text-[#8E8E99] block">
                SIMULATION TRIGGERS
              </label>

              {/* Walk into Danger Zone */}
              <button
                onClick={() => {
                  onWalkIntoDangerZone();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-left text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={16} className="text-[#FFC400]" />
                  <div>
                    <span className="text-white font-semibold">Walk into danger zone</span>
                    <p className="text-[10px] text-[#8E8E99]">Triggers geofence alert (Hillbrow)</p>
                  </div>
                </div>
                {userInDangerZone ? (
                  <span className="text-[10px] text-[#FFC400] font-bold">ACTIVE</span>
                ) : (
                  <ChevronRight size={14} className="text-[#8E8E99]" />
                )}
              </button>

              {/* Simulate Shake */}
              <button
                onClick={() => {
                  onSimulateShake();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-left text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Radio size={16} className="text-[#FF3B30]" />
                  <div>
                    <span className="text-white font-semibold">Simulate phone shake</span>
                    <p className="text-[10px] text-[#8E8E99]">Activates 3-second SOS countdown</p>
                  </div>
                </div>
                {sosActive ? (
                  <span className="text-[10px] text-[#FF3B30] font-bold">LIVE SOS</span>
                ) : (
                  <ChevronRight size={14} className="text-[#8E8E99]" />
                )}
              </button>

              {/* 5-Tap Gesture */}
              <button
                onClick={() => {
                  onSimulateFiveTaps();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-left text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px] font-bold">5</div>
                  <div>
                    <span className="text-white font-semibold">Simulate 5 quick screen taps</span>
                    <p className="text-[10px] text-[#8E8E99]">Discrete emergency alert trigger</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#8E8E99]" />
              </button>

              {/* Dispatch Sentinel & Move Car */}
              {sosActive && !dispatched && (
                <button
                  onClick={() => {
                    onQuickDispatch();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-[#34C759]/20 hover:bg-[#34C759]/30 border border-[#34C759] rounded-xl text-left text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#34C759]" />
                    <div>
                      <span className="text-white font-semibold">Dispatch Sentinel Rapid Response</span>
                      <p className="text-[10px] text-[#8E8E99]">As Lerato, send armed vehicle</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#34C759] font-bold">SEND</span>
                </button>
              )}

              {/* Simulate Arrival */}
              {dispatched && !arrived && (
                <button
                  onClick={() => {
                    onSimulateArrival();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-[#34C759]/20 hover:bg-[#34C759]/30 border border-[#34C759] rounded-xl text-left text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#34C759]" />
                    <div>
                      <span className="text-white font-semibold">Simulate vehicle arrival</span>
                      <p className="text-[10px] text-[#8E8E99]">Mark Officer S. Dlamini as arrived</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#34C759] font-bold">ARRIVE</span>
                </button>
              )}

              {/* Toggle Offline (SMS & USSD) */}
              <button
                onClick={() => {
                  onToggleOffline();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 border rounded-xl text-left text-xs transition-colors cursor-pointer ${
                  isOffline
                    ? 'bg-[#FFC400]/20 border-[#FFC400] text-white'
                    : 'bg-[#24242B] hover:bg-[#2E2E36] border-[#2E2E36] text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <WifiOff size={16} className={isOffline ? 'text-[#FFC400]' : 'text-[#8E8E99]'} />
                  <div>
                    <span className="font-semibold">
                      {isOffline ? 'Offline Mode Active (USSD/SMS)' : 'Go Offline (Simulate No Data)'}
                    </span>
                    <p className="text-[10px] text-[#8E8E99]">Tests USSD *120*7233# fallback</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${isOffline ? 'text-[#FFC400]' : 'text-[#8E8E99]'}`}>
                  {isOffline ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>

            {/* Reset Scenario Button */}
            <div className="pt-2 border-t border-[#2E2E36]">
              <button
                onClick={() => {
                  onResetDemo();
                  setIsOpen(false);
                }}
                className="w-full py-2 bg-black hover:bg-[#24242B] border border-[#2E2E36] text-[#8E8E99] hover:text-white rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-condensed uppercase tracking-wider"
              >
                <RefreshCw size={13} />
                RESET DEMO TO INITIAL STATE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
