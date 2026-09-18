import React, { useState, useEffect, useRef } from 'react';
import { Incident, ServiceProvider, DangerZone } from '../types';
import { DarkMap } from '../components/DarkMap';
import {
  Layers,
  Crosshair,
  Plus,
  Minus,
  MessageSquare,
  AlertTriangle,
  Users,
  Shield,
  Radio,
  ChevronRight
} from 'lucide-react';

interface SafetyMapScreenProps {
  userLocation: { x: number; y: number };
  userInDangerZone: boolean;
  theme?: 'dark' | 'light';
  incidents: Incident[];
  providers: ServiceProvider[];
  dangerZones: DangerZone[];
  onTriggerSos: () => void;
  onOpenReportIncident: () => void;
  onOpenFriends: () => void;
  onOpenIncidentDetail: (incident: Incident) => void;
  onDismissDangerZoneNotice?: () => void;
  onShareLiveLocation?: () => void;
  onProfileClick?: () => void;
}

export const SafetyMapScreen: React.FC<SafetyMapScreenProps> = ({
  userLocation,
  userInDangerZone,
  theme = 'dark',
  incidents,
  providers,
  dangerZones,
  onTriggerSos,
  onOpenReportIncident,
  onOpenFriends,
  onOpenIncidentDetail,
  onDismissDangerZoneNotice,
  onShareLiveLocation,
  onProfileClick
}) => {
  // Layer toggles
  const [showHotspots, setShowHotspots] = useState(true);
  const [showProviders, setShowProviders] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // 5-Tap Detection on Screen
  const [tapCount, setTapCount] = useState(0);
  const lastTapRef = useRef<number>(0);

  const handleScreenTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 800) {
      const nextCount = tapCount + 1;
      setTapCount(nextCount);
      if (nextCount >= 5) {
        setTapCount(0);
        onTriggerSos();
      }
    } else {
      setTapCount(1);
    }
    lastTapRef.current = now;
  };

  // Danger zone top slide card state
  const [dangerCardDismissed, setDangerCardDismissed] = useState(false);

  useEffect(() => {
    if (userInDangerZone) {
      setDangerCardDismissed(false);
    }
  }, [userInDangerZone]);

  const filteredIncidents = showHotspots ? incidents : [];
  const filteredProviders = showProviders ? providers : [];
  const filteredZones = showZones ? dangerZones : [];

  return (
    <div
      className="relative w-full h-full flex flex-col bg-black text-white overflow-hidden select-none"
      onClick={handleScreenTap}
    >
      {/* 5-Tap visual feedback badge if user is tapping */}
      {tapCount > 1 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-40 px-3 py-1 bg-[#FF3B30] text-white text-xs font-condensed font-bold uppercase rounded-full shadow-lg pointer-events-none animate-pulse">
          SOS TAP DETECTED: {tapCount}/5
        </div>
      )}

      {/* FLOATING TOP BAR OVER MAP */}
      <div
        className="absolute top-2 left-3 right-3 z-30 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Avatar */}
        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full overflow-hidden border border-[#2E2E36] hover:border-white transition-colors shrink-0 shadow-lg cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Thandi profile"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dark Pill Search Bar */}
        <div className="flex-1 h-10 bg-[#16161A]/95 border border-[#2E2E36] rounded-full px-3.5 flex items-center gap-2 backdrop-blur-md shadow-xl">
          <span className="text-xs text-[#8E8E99]">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Johannesburg safe zones..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
          />
        </div>

        {/* Chat Icon with Red Dot */}
        <button
          onClick={onOpenFriends}
          className="relative w-10 h-10 rounded-full bg-[#16161A]/95 border border-[#2E2E36] flex items-center justify-center text-white hover:bg-[#24242B] transition-colors shrink-0 shadow-xl cursor-pointer"
        >
          <MessageSquare size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF3B30] ring-2 ring-black animate-pulse" />
        </button>
      </div>

      {/* FLOATING RIGHT-SIDE CONTROLS */}
      <div
        className="absolute top-16 right-3 z-30 flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Re-center */}
        <button
          className="w-11 h-11 rounded-full bg-[#16161A]/95 border border-[#2E2E36] hover:border-white flex items-center justify-center text-white shadow-xl backdrop-blur-md transition-colors cursor-pointer"
          title="Re-center on your location"
        >
          <Crosshair size={18} className="text-[#3D8BFF]" />
        </button>

        {/* Layers toggle button */}
        <div className="relative">
          <button
            onClick={() => setLayersMenuOpen(!layersMenuOpen)}
            className="w-11 h-11 rounded-full bg-[#16161A]/95 border border-[#2E2E36] hover:border-white flex items-center justify-center text-white shadow-xl backdrop-blur-md transition-colors cursor-pointer"
            title="Toggle map layers"
          >
            <Layers size={18} />
          </button>

          {/* Layer menu dropdown */}
          {layersMenuOpen && (
            <div className="absolute right-12 top-0 w-44 bg-[#16161A] border border-[#2E2E36] rounded-xl p-2.5 shadow-2xl space-y-2 text-xs">
              <span className="text-[10px] font-condensed uppercase font-bold text-[#8E8E99] block mb-1">
                MAP LAYERS
              </span>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Incidents</span>
                <input
                  type="checkbox"
                  checked={showHotspots}
                  onChange={(e) => setShowHotspots(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#FFC400]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Providers (SAPS/Med)</span>
                <input
                  type="checkbox"
                  checked={showProviders}
                  onChange={(e) => setShowProviders(e.target.checked)}
                  className="w-3.5 h-3.5 accent-white"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Danger Zones</span>
                <input
                  type="checkbox"
                  checked={showZones}
                  onChange={(e) => setShowZones(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#FFC400]"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* DANGER ZONE SLIDING TOP CARD (SCREEN 5A) */}
      {userInDangerZone && !dangerCardDismissed && (
        <div
          className="absolute top-14 left-3 right-3 z-35 animate-bounce-short"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#16161A] border-2 border-[#FFC400] rounded-2xl p-3.5 shadow-2xl space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-[#FFC400] shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-condensed font-extrabold uppercase text-white text-[15px] leading-tight">
                  YOU'VE ENTERED A HIGH-RISK AREA
                </h4>
                <p className="text-[11px] text-[#8E8E99] mt-0.5 leading-snug">
                  18 incidents reported here in the last 7 days. Your 5 network contacts have been automatically notified.
                </p>
              </div>
            </div>

            {/* Three buttons in card: I'M FINE (grey), SHARE LIVE LOCATION (white), GET HELP (red outline) */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => {
                  setDangerCardDismissed(true);
                  if (onDismissDangerZoneNotice) onDismissDangerZoneNotice();
                }}
                className="py-2 bg-[#24242B] hover:bg-[#2E2E36] text-white font-condensed uppercase font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
              >
                I'M FINE
              </button>

              <button
                onClick={() => {
                  if (onShareLiveLocation) onShareLiveLocation();
                  setDangerCardDismissed(true);
                }}
                className="py-2 bg-white text-black font-condensed uppercase font-extrabold text-[11px] rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                SHARE LIVE
              </button>

              <button
                onClick={onTriggerSos}
                className="py-2 bg-transparent border border-[#FF3B30] text-[#FF3B30] font-condensed uppercase font-extrabold text-[11px] rounded-lg hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer"
              >
                GET HELP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-BLEED DARK MAP (~70% of screen) */}
      <div className="flex-1 w-full relative">
        <DarkMap
          height="100%"
          theme={theme}
          userCoords={userLocation}
          userStatus={userInDangerZone ? 'danger' : 'safe'}
          incidents={filteredIncidents}
          providers={filteredProviders}
          dangerZones={filteredZones}
          onSelectIncident={onOpenIncidentDetail}
        />
      </div>

      {/* BOTTOM PANEL (#16161A, 24px top radius, drag handle) */}
      <div
        className="w-full bg-[#16161A] border-t border-[#2E2E36] rounded-t-[24px] px-4 pt-2.5 pb-3 z-30 shrink-0 space-y-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Small grey drag handle */}
        <div className="w-10 h-1 rounded-full bg-[#5C5C66] mx-auto mb-1" />

        {/* Row 1: Two side-by-side secondary buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenReportIncident}
            className="h-11 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-white font-condensed uppercase font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>➕</span>
            Report Incident
          </button>

          <button
            onClick={onOpenFriends}
            className="h-11 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-white font-condensed uppercase font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>👥</span>
            Add Friends
          </button>
        </div>

        {/* Row 2: Full-width red-outlined pill button, 60px tall: "SOMETHING IS GOING ON" */}
        <button
          onClick={onTriggerSos}
          className="w-full h-[60px] rounded-full border-2 border-[#FF3B30] bg-black hover:bg-[#FF3B30]/15 text-[#FF3B30] font-condensed font-extrabold uppercase text-[20px] tracking-wider shadow-[0_0_20px_rgba(255,59,48,0.3)] flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full bg-[#FF3B30] animate-ping" />
          SOMETHING IS GOING ON
        </button>

        {/* Row 3: Grey caption */}
        <p className="text-[12px] text-[#8E8E99] text-center font-medium">
          Or shake your phone, or tap the screen 5 times.
        </p>

        {/* Row 4: Incidents near you section header & first item */}
        <div className="pt-2 border-t border-[#2E2E36]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-condensed uppercase tracking-wider font-bold text-[#8E8E99]">
              INCIDENTS NEAR YOU
            </span>
            <span className="text-[10px] font-mono text-[#FF3B30] font-bold">
              {incidents.length} REPORTED
            </span>
          </div>

          {/* First incident row preview */}
          {incidents.length > 0 && (
            <div
              onClick={() => onOpenIncidentDetail(incidents[0])}
              className="flex items-center justify-between p-2 rounded-xl bg-[#24242B]/70 hover:bg-[#24242B] border border-[#2E2E36] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5 h-5 rounded-md bg-[#FFC400] flex items-center justify-center text-black font-bold text-xs shrink-0">
                  !
                </div>
                <div className="truncate">
                  <p className="font-condensed uppercase font-bold text-white text-xs truncate">
                    {incidents[0].title}
                  </p>
                  <p className="text-[10px] text-[#8E8E99] truncate">
                    {incidents[0].location}
                  </p>
                </div>
              </div>

              <div className="px-2 py-0.5 rounded bg-[#FFC400]/20 text-[#FFC400] font-bold text-[10px] shrink-0">
                {incidents[0].distanceKm} km
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
