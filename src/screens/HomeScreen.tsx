import React, { useState } from 'react';
import { Friend, Incident, DangerZone } from '../types';
import { Shield, ChevronRight, AlertTriangle, Radio, CheckCircle, Flame, Clock } from 'lucide-react';

interface HomeScreenProps {
  userGreetingName?: string;
  userInDangerZone?: boolean;
  friends: Friend[];
  incidents: Incident[];
  onSelectFriend: (friend: Friend) => void;
  onSelectIncident: (incident: Incident) => void;
  onOpenLiveAlert: (incident: Incident) => void;
  onNavigateToFriends: () => void;
  onNavigateToMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userGreetingName = 'THANDI',
  userInDangerZone = false,
  friends,
  incidents,
  onSelectFriend,
  onSelectIncident,
  onOpenLiveAlert,
  onNavigateToFriends,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'RECENT' | 'NEARBY' | 'TRENDING'>('RECENT');

  // Filter feed based on activeTab
  const liveIncidents = incidents.filter((i) => i.status === 'live');
  const feedIncidents = incidents.filter((i) => {
    if (i.status === 'live') return false; // pinned separately
    if (activeTab === 'TRENDING') return i.status === 'trending';
    if (activeTab === 'NEARBY') return i.distanceKm <= 3.0;
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-y-auto">
      {/* Danger Zone Banner if active */}
      {userInDangerZone && (
        <div
          onClick={onNavigateToMap}
          className="mx-4 mt-3 p-3 rounded-xl bg-[#FFC400]/15 border border-[#FFC400] flex items-center justify-between cursor-pointer hover:bg-[#FFC400]/25 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-[#FFC400] shrink-0" />
            <div>
              <p className="font-condensed uppercase font-bold text-white text-xs">
                YOU'VE ENTERED A HIGH-RISK AREA · HILLBROW
              </p>
              <p className="text-[11px] text-[#8E8E99]">
                18 incidents reported here in 7 days. Network notified.
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#FFC400]" />
        </div>
      )}

      {/* Greeting Section */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-condensed font-extrabold text-[26px] uppercase tracking-wider text-white leading-tight">
          HELLO, {userGreetingName}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`w-2 h-2 rounded-full ${
              userInDangerZone ? 'bg-[#FFC400] animate-ping' : 'bg-[#34C759]'
            }`}
          />
          <p className="text-[13px] text-[#8E8E99]">
            {userInDangerZone
              ? "You're in a high-risk area (Hillbrow)"
              : "You're in a safe area (Braamfontein)"}
          </p>
        </div>
      </div>

      {/* Your Network Row */}
      <div className="pt-3 pb-3 border-b border-[#2E2E36]">
        <div className="px-4 flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-condensed uppercase tracking-wider font-semibold text-[#8E8E99]">
            YOUR NETWORK
          </span>
          <button
            onClick={onNavigateToFriends}
            className="text-[11px] font-condensed uppercase tracking-wider font-bold text-white hover:text-[#3D8BFF] transition-colors cursor-pointer"
          >
            SEE ALL
          </button>
        </div>

        {/* 5 Circular Avatars (56px) */}
        <div className="px-4 flex items-center justify-between gap-2 overflow-x-auto">
          {friends.slice(0, 5).map((friend) => {
            const hasAlert = friend.status === 'alert';
            const inDangerZone = friend.status === 'danger-zone';

            return (
              <button
                key={friend.id}
                onClick={() => onSelectFriend(friend)}
                className="flex flex-col items-center gap-1 group cursor-pointer shrink-0"
              >
                <div className="relative">
                  <div
                    className={`w-[56px] h-[56px] rounded-full overflow-hidden p-0.5 transition-all ${
                      hasAlert
                        ? 'ring-2 ring-[#FF3B30] ring-offset-2 ring-offset-black animate-pulse shadow-[0_0_12px_rgba(255,59,48,0.7)]'
                        : inDangerZone
                        ? 'ring-2 ring-[#FFC400] ring-offset-1 ring-offset-black'
                        : 'border border-[#2E2E36]'
                    }`}
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Status dot bottom-right */}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${
                      hasAlert
                        ? 'bg-[#FF3B30] animate-ping'
                        : inDangerZone
                        ? 'bg-[#FFC400]'
                        : friend.isOnline
                        ? 'bg-[#34C759]'
                        : 'bg-[#5C5C66]'
                    }`}
                  />
                </div>

                <span className="text-[13px] text-white font-medium truncate max-w-[58px]">
                  {friend.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Feed Section */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="px-4 pt-3 flex items-center gap-6 border-b border-[#2E2E36]">
          {(['RECENT', 'NEARBY', 'TRENDING'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-[12px] font-condensed uppercase tracking-wider font-bold transition-all relative flex items-center gap-1 cursor-pointer ${
                  isActive ? 'text-white' : 'text-[#8E8E99] hover:text-white'
                }`}
              >
                {tab}
                {tab === 'TRENDING' && (
                  <span className="text-[#FF3B30] font-extrabold text-xs">!</span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feed Items */}
        <div className="divide-y divide-[#2E2E36]">
          {/* PINNED LIVE FRIEND ALERTS */}
          {liveIncidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-[#FF3B30]/10 border-b border-[#FF3B30]/30 hover:bg-[#FF3B30]/15 transition-colors cursor-pointer"
              onClick={() => onOpenLiveAlert(incident)}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 bg-[#FF3B30] text-white text-[10px] font-extrabold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE ALERT
                </span>
                <span className="text-[11px] font-mono text-[#FF3B30] font-semibold">
                  {incident.timeAgo}
                </span>
              </div>

              <h3 className="font-condensed font-extrabold text-[20px] uppercase text-white leading-tight">
                {incident.title}
              </h3>

              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-[#3D8BFF] font-medium truncate">
                  ➤ {incident.location}
                </span>
                <span className="text-[#FF3B30] font-bold shrink-0">
                  {incident.distanceKm} km
                </span>
              </div>

              <p className="text-sm text-[#8E8E99] mt-1.5 line-clamp-2">
                {incident.description}
              </p>

              {/* Red ● RESPOND Pill Centered Below Card */}
              <div className="mt-3 flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLiveAlert(incident);
                  }}
                  className="px-6 py-2 bg-[#FF3B30] hover:bg-red-600 text-white font-condensed font-extrabold uppercase tracking-wider text-xs rounded-full shadow-[0_0_12px_rgba(255,59,48,0.5)] flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  ● RESPOND TO ALERT
                </button>
              </div>
            </div>
          ))}

          {/* STANDARD INCIDENT CARDS */}
          {feedIncidents.map((incident) => {
            const isDangerZone = incident.isDangerZoneNotice;

            return (
              <div
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className="p-4 hover:bg-[#16161A] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-condensed font-bold text-[19px] uppercase text-white leading-tight flex-1">
                    {incident.title}
                  </h3>
                  {isDangerZone && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FFC400] text-black shrink-0">
                      GEOFENCE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="text-[#3D8BFF] font-medium truncate">
                    ➤ {incident.location}
                  </span>
                  <span className="text-[#FF3B30] font-bold shrink-0">
                    {incident.distanceKm} km
                  </span>
                  <span className="text-[#8E8E99] text-[11px] shrink-0">
                    · {incident.timeAgo}
                  </span>
                </div>

                <p className="text-sm text-[#8E8E99] mt-1.5 line-clamp-2">
                  {incident.description}
                </p>

                {incident.photos && incident.photos.length > 0 && (
                  <div className="mt-2.5 rounded-lg overflow-hidden border border-[#2E2E36] max-h-32">
                    <img
                      src={incident.photos[0]}
                      alt="Incident reference"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
