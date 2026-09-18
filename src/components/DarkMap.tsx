import React, { useState } from 'react';
import { Incident, ServiceProvider, DangerZone } from '../types';
import { Shield, Navigation, AlertTriangle, Eye, Car } from 'lucide-react';

interface DarkMapProps {
  height?: string | number;
  interactive?: boolean;
  showUser?: boolean;
  theme?: 'dark' | 'light';
  userCoords?: { x: number; y: number };
  userStatus?: 'safe' | 'alert' | 'danger';
  incidents?: Incident[];
  providers?: ServiceProvider[];
  dangerZones?: DangerZone[];
  activeIncidentId?: string;
  selectedZoneId?: string;
  responderCarCoords?: { x: number; y: number } | null;
  routeProgress?: number; // 0 to 1
  onSelectIncident?: (incident: Incident) => void;
  onSelectZone?: (zone: DangerZone) => void;
  onSelectProvider?: (provider: ServiceProvider) => void;
  centerLocationName?: string;
}

export const DarkMap: React.FC<DarkMapProps> = ({
  height = '100%',
  interactive = true,
  showUser = true,
  theme = 'dark',
  userCoords = { x: 48, y: 52 }, // Braamfontein
  userStatus = 'safe',
  incidents = [],
  providers = [],
  dangerZones = [],
  activeIncidentId,
  responderCarCoords = null,
  routeProgress = 0,
  onSelectIncident,
  onSelectZone,
  onSelectProvider,
  centerLocationName = 'BRAAMFONTEIN'
}) => {
  const [activePopup, setActivePopup] = useState<{
    type: 'incident' | 'provider' | 'zone';
    data: any;
    x: number;
    y: number;
  } | null>(null);

  const isLight = theme === 'light';
  const terrainColor = isLight ? '#F1F5F9' : '#0D0D11';
  const gridColor = isLight ? '#E2E8F0' : '#1c1c22';
  const waterColor = isLight ? '#BAE6FD' : '#131B26';
  const motorwayColor = isLight ? '#CBD5E1' : '#32323A';
  const motorwayDashColor = isLight ? '#94A3B8' : '#42424E';
  const majorRoadColor = isLight ? '#E2E8F0' : '#2A2A32';
  const streetColor = isLight ? '#E2E8F0' : '#23232B';
  const streetTextColor = isLight ? '#475569' : '#6A6A76';
  const minorStreetTextColor = isLight ? '#64748B' : '#585864';
  const suburbTextColor = isLight ? '#334155' : '#8E8E99';
  const railwayColor = isLight ? '#94A3B8' : '#383842';

  return (
    <div 
      className={`relative w-full overflow-hidden select-none ${isLight ? 'bg-[#E2E8F0]' : 'bg-[#0a0a0c]'}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="dangerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC400" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#FFC400" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FFC400" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="liveRedPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF3B30" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="userBlueHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3D8BFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3D8BFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3D8BFF" stopOpacity="0.0" />
          </radialGradient>

          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Base terrain */}
        <rect width="1000" height="1000" fill={terrainColor} />
        
        {/* Subtle grid pattern */}
        <rect width="1000" height="1000" fill="url(#grid)" opacity={isLight ? 0.6 : 0.4} />

        {/* Water bodies */}
        <path
          d="M 50 150 Q 220 220 380 180 T 700 240 T 950 190 L 980 230 Q 750 310 400 250 T 60 210 Z"
          fill={waterColor}
          opacity="0.9"
        />
        <path
          d="M 120 780 Q 280 820 520 790 T 890 850 L 870 890 Q 500 830 250 860 Z"
          fill={waterColor}
          opacity="0.8"
        />

        {/* Major Johannesburg Arterials & Highway Network */}
        {/* M1 North/South Motorway */}
        <path
          d="M 490 0 L 485 240 L 470 500 L 460 750 L 450 1000"
          stroke={motorwayColor}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 490 0 L 485 240 L 470 500 L 460 750 L 450 1000"
          stroke={motorwayDashColor}
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 6"
        />

        {/* M2 East/West Motorway */}
        <path
          d="M 0 570 Q 250 560 470 560 T 1000 580"
          stroke={motorwayColor}
          strokeWidth="9"
          fill="none"
        />

        {/* Jan Smuts Ave & Empire Rd */}
        <path
          d="M 320 0 L 370 280 L 440 480 L 470 520 L 720 540"
          stroke={majorRoadColor}
          strokeWidth="7"
          fill="none"
        />

        {/* Chris Hani Road (Soweto) */}
        <path
          d="M 100 850 L 350 720 L 460 620"
          stroke={majorRoadColor}
          strokeWidth="6"
          fill="none"
        />

        {/* Secondary Road Grid */}
        <g stroke={streetColor} strokeWidth="3" fill="none">
          {/* Braamfontein & Hillbrow grid */}
          <line x1="380" y1="440" x2="650" y2="440" />
          <line x1="380" y1="480" x2="650" y2="480" />
          <line x1="380" y1="520" x2="650" y2="520" />
          <line x1="380" y1="560" x2="650" y2="560" />
          <line x1="420" y1="400" x2="420" y2="600" />
          <line x1="460" y1="400" x2="460" y2="600" />
          <line x1="500" y1="400" x2="500" y2="600" />
          <line x1="540" y1="400" x2="540" y2="600" />
          <line x1="580" y1="400" x2="580" y2="600" />

          {/* Alexandra grid */}
          <line x1="620" y1="260" x2="820" y2="260" />
          <line x1="620" y1="300" x2="820" y2="300" />
          <line x1="620" y1="340" x2="820" y2="340" />
          <line x1="660" y1="220" x2="660" y2="380" />
          <line x1="700" y1="220" x2="700" y2="380" />
          <line x1="740" y1="220" x2="740" y2="380" />
          <line x1="780" y1="220" x2="780" y2="380" />

          {/* Soweto Bara grid */}
          <line x1="180" y1="680" x2="360" y2="680" />
          <line x1="180" y1="720" x2="360" y2="720" />
          <line x1="180" y1="760" x2="360" y2="760" />
          <line x1="220" y1="640" x2="220" y2="800" />
          <line x1="260" y1="640" x2="260" y2="800" />
          <line x1="300" y1="640" x2="300" y2="800" />
        </g>

        {/* Railway lines */}
        <path
          d="M 50 620 L 450 540 L 800 520 L 1000 500"
          stroke={railwayColor}
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Street labels in small caps */}
        <text x="475" y="120" fill={streetTextColor} fontSize="11" fontWeight="600" letterSpacing="2">M1 DE VILLIERS GRAAFF</text>
        <text x="410" y="475" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">DE KORTE ST</text>
        <text x="410" y="515" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">JORISSEN ST</text>
        <text x="500" y="555" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">BREE ST (LILIAN NGOYI)</text>
        <text x="510" y="435" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">PRETORIA ST (HILLBROW)</text>
        <text x="650" y="295" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">VASCO DA GAMA / 3RD AVE</text>
        <text x="190" y="715" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">CHRIS HANI RD (BARA)</text>
        <text x="310" y="240" fill={minorStreetTextColor} fontSize="9" fontWeight="600" letterSpacing="1">JAN SMUTS AVE</text>

        {/* Suburb Name Labels */}
        <text x="420" y="420" fill="#3D8BFF" opacity={isLight ? "0.9" : "0.65"} fontSize="12" fontWeight="700" letterSpacing="2">BRAAMFONTEIN</text>
        <text x="520" y="410" fill={suburbTextColor} opacity={isLight ? "0.8" : "0.6"} fontSize="12" fontWeight="700" letterSpacing="2">HILLBROW</text>
        <text x="660" y="250" fill={suburbTextColor} opacity={isLight ? "0.8" : "0.6"} fontSize="12" fontWeight="700" letterSpacing="2">ALEXANDRA</text>
        <text x="210" y="660" fill={suburbTextColor} opacity={isLight ? "0.8" : "0.6"} fontSize="12" fontWeight="700" letterSpacing="2">SOWETO</text>
        <text x="330" y="160" fill={suburbTextColor} opacity={isLight ? "0.8" : "0.6"} fontSize="12" fontWeight="700" letterSpacing="2">RANDBURG</text>

        {/* Danger Zones (Soft yellow-to-transparent gradient areas) */}
        {dangerZones.map((zone) => {
          const cx = zone.x * 10;
          const cy = zone.y * 10;
          const r = zone.radius * 2.2;
          return (
            <g
              key={zone.id}
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => {
                if (onSelectZone) onSelectZone(zone);
                setActivePopup({
                  type: 'zone',
                  data: zone,
                  x: zone.x,
                  y: zone.y
                });
              }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="url(#dangerGradient)"
              />
              <circle
                cx={cx}
                cy={cy}
                r={r * 0.95}
                stroke="#FFC400"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.6"
              />
              {/* Danger Zone Label Badge */}
              <rect
                x={cx - 45}
                y={cy - 12}
                width="90"
                height="22"
                rx="11"
                fill="#16161ACC"
                stroke="#FFC400"
                strokeWidth="1"
              />
              <text
                x={cx}
                y={cy + 3}
                fill="#FFC400"
                fontSize="9"
                fontWeight="700"
                textAnchor="middle"
                letterSpacing="0.5"
              >
                ⚠ HIGH-RISK ({zone.incidentCount})
              </text>
            </g>
          );
        })}

        {/* Route Line if Responder is Active */}
        {responderCarCoords && (
          <g>
            <path
              d={`M ${responderCarCoords.x * 10} ${responderCarCoords.y * 10} L ${userCoords.x * 10} ${userCoords.y * 10}`}
              stroke="#3D8BFF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <path
              d={`M ${responderCarCoords.x * 10} ${responderCarCoords.y * 10} L ${userCoords.x * 10} ${userCoords.y * 10}`}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
            />
          </g>
        )}

        {/* Service Provider Pins (White shield pins) */}
        {providers.map((p) => {
          // Calculate arbitrary map positions if not set
          const coords = p.id === 'p1' ? { x: 74, y: 28 } :
                         p.id === 'p2' ? { x: 62, y: 20 } :
                         p.id === 'p3' ? { x: 50, y: 35 } :
                         p.id === 'p4' ? { x: 55, y: 46 } :
                         p.id === 'p5' ? { x: 44, y: 53 } :
                         { x: 58, y: 62 };
          const cx = coords.x * 10;
          const cy = coords.y * 10;
          return (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={() => {
                if (onSelectProvider) onSelectProvider(p);
                setActivePopup({
                  type: 'provider',
                  data: p,
                  x: coords.x,
                  y: coords.y
                });
              }}
            >
              <circle cx={cx} cy={cy} r="14" fill="#16161A" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x={cx} y={cy + 4} fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">
                {p.logoText.slice(0, 3)}
              </text>
            </g>
          );
        })}

        {/* Incident Pins */}
        {incidents.map((inc) => {
          const cx = inc.x * 10;
          const cy = inc.y * 10;
          const isLive = inc.status === 'live' || inc.id === activeIncidentId;

          if (isLive) {
            return (
              <g
                key={inc.id}
                className="cursor-pointer"
                onClick={() => {
                  if (onSelectIncident) onSelectIncident(inc);
                  setActivePopup({
                    type: 'incident',
                    data: inc,
                    x: inc.x,
                    y: inc.y
                  });
                }}
              >
                {/* Red pulsing radar ring */}
                <circle cx={cx} cy={cy} r="35" fill="url(#liveRedPulse)" className="animate-pulse" />
                <circle cx={cx} cy={cy} r="18" fill="#FF3B30" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx={cx} cy={cy} r="6" fill="#FFFFFF" />
                <text x={cx} y={cy - 24} fill="#FF3B30" fontSize="10" fontWeight="800" textAnchor="middle" letterSpacing="1">
                  LIVE SOS
                </text>
              </g>
            );
          }

          // Photo pin or yellow square pin
          if (inc.photos && inc.photos.length > 0) {
            return (
              <g
                key={inc.id}
                className="cursor-pointer"
                onClick={() => {
                  if (onSelectIncident) onSelectIncident(inc);
                  setActivePopup({
                    type: 'incident',
                    data: inc,
                    x: inc.x,
                    y: inc.y
                  });
                }}
              >
                <rect
                  x={cx - 14}
                  y={cy - 14}
                  width="28"
                  height="28"
                  rx="6"
                  fill="#FFC400"
                />
                <rect
                  x={cx - 12}
                  y={cy - 12}
                  width="24"
                  height="24"
                  rx="4"
                  fill="#16161A"
                />
                <text x={cx} y={cy + 4} fill="#FFC400" fontSize="10" fontWeight="700" textAnchor="middle">
                  📷
                </text>
              </g>
            );
          }

          // Yellow rounded square pin
          return (
            <g
              key={inc.id}
              className="cursor-pointer"
              onClick={() => {
                if (onSelectIncident) onSelectIncident(inc);
                setActivePopup({
                  type: 'incident',
                  data: inc,
                  x: inc.x,
                  y: inc.y
                });
              }}
            >
              <rect
                x={cx - 10}
                y={cy - 10}
                width="20"
                height="20"
                rx="4"
                fill="#FFC400"
                stroke="#16161A"
                strokeWidth="2"
              />
              <circle cx={cx} cy={cy} r="3" fill="#000000" />
            </g>
          );
        })}

        {/* User Location Dot (Blue with pulsing halo) */}
        {showUser && (
          <g>
            <circle
              cx={userCoords.x * 10}
              cy={userCoords.y * 10}
              r={userStatus === 'alert' ? 42 : 28}
              fill={userStatus === 'alert' ? 'url(#liveRedPulse)' : 'url(#userBlueHalo)'}
              className="animate-pulse"
            />
            <circle
              cx={userCoords.x * 10}
              cy={userCoords.y * 10}
              r="9"
              fill={userStatus === 'alert' ? '#FF3B30' : '#3D8BFF'}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            {/* Compass pointing cone */}
            <path
              d={`M ${userCoords.x * 10 - 4} ${userCoords.y * 10 - 10} L ${userCoords.x * 10} ${userCoords.y * 10 - 24} L ${userCoords.x * 10 + 4} ${userCoords.y * 10 - 10} Z`}
              fill={userStatus === 'alert' ? '#FF3B30' : '#3D8BFF'}
              opacity="0.8"
            />
          </g>
        )}

        {/* Moving Responder Car (Vehicle on the way) */}
        {responderCarCoords && (
          <g transform={`translate(${responderCarCoords.x * 10 - 18}, ${responderCarCoords.y * 10 - 18})`}>
            {/* White-and-red badge around vehicle */}
            <circle cx="18" cy="18" r="16" fill="#16161A" stroke="#FF3B30" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="13" fill="#FFFFFF" />
            {/* Small vehicle silhouette */}
            <path
              d="M 12 19 L 14 14 L 22 14 L 24 19 Z M 11 19 L 25 19 L 25 22 L 11 22 Z"
              fill="#FF3B30"
            />
            <circle cx="14" cy="22" r="1.5" fill="#000000" />
            <circle cx="22" cy="22" r="1.5" fill="#000000" />
          </g>
        )}
      </svg>

      {/* Interactive Popup Card on Pin Click */}
      {activePopup && (
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${activePopup.x}%`,
            top: `${activePopup.y}%`
          }}
        >
          <div className="bg-[#16161A] border border-[#2E2E36] rounded-xl p-3 shadow-2xl w-60 text-left">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                activePopup.type === 'incident'
                  ? (activePopup.data.status === 'live' ? 'bg-[#FF3B30] text-white' : 'bg-[#FFC400] text-black')
                  : activePopup.type === 'provider'
                  ? 'bg-white text-black'
                  : 'bg-[#FFC400] text-black'
              }`}>
                {activePopup.type === 'incident' ? activePopup.data.status : activePopup.type}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopup(null);
                }}
                className="text-[#8E8E99] hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <h4 className="font-condensed uppercase font-bold text-white text-[15px] leading-tight line-clamp-2">
              {activePopup.data.title || activePopup.data.name}
            </h4>

            <p className="text-xs text-[#3D8BFF] mt-1 truncate">
              ➤ {activePopup.data.location || activePopup.data.address || activePopup.data.area}
            </p>

            {activePopup.data.distanceKm !== undefined && (
              <p className="text-[11px] text-[#FF3B30] font-medium mt-0.5">
                {activePopup.data.distanceKm} km away {activePopup.data.timeAgo && `· ${activePopup.data.timeAgo}`}
              </p>
            )}

            <button
              onClick={() => {
                if (activePopup.type === 'incident' && onSelectIncident) {
                  onSelectIncident(activePopup.data);
                } else if (activePopup.type === 'provider' && onSelectProvider) {
                  onSelectProvider(activePopup.data);
                } else if (activePopup.type === 'zone' && onSelectZone) {
                  onSelectZone(activePopup.data);
                }
                setActivePopup(null);
              }}
              className="mt-2 w-full py-1.5 bg-[#24242B] hover:bg-[#2E2E36] text-white font-condensed uppercase tracking-wider text-xs rounded-lg transition-colors"
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
