import React, { useState } from 'react';
import { Friend, ServiceProvider, Incident } from '../types';
import { DarkMap } from '../components/DarkMap';
import {
  UserPlus,
  Phone,
  MessageSquare,
  Shield,
  X,
  CheckCircle2,
  Navigation,
  AlertTriangle,
  Send,
  Clock
} from 'lucide-react';

interface FriendsScreenProps {
  friends: Friend[];
  providers: ServiceProvider[];
  incidents: Incident[];
  onDispatchProvider: (provider: ServiceProvider, targetFriendName: string) => void;
  dispatchedProviderId?: string | null;
  onOpenIncidentDetail?: (incident: Incident) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({
  friends,
  providers,
  incidents,
  onDispatchProvider,
  dispatchedProviderId = null,
  onOpenIncidentDetail
}) => {
  const [activeTab, setActiveTab] = useState<'LIVE ALERTS' | 'NETWORK' | 'CHECK-INS'>('LIVE ALERTS');
  
  // Expanded alert card state (Dynamic Island expansion)
  const [selectedAlertFriend, setSelectedAlertFriend] = useState<Friend | null>(null);

  // Dispatch confirmation modal state
  const [confirmingProvider, setConfirmingProvider] = useState<ServiceProvider | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check-ins history state
  const [checkIns, setCheckIns] = useState([
    { id: 'c1', name: 'Lerato', time: '18 mins ago', area: 'Hillbrow', status: 'Sent "Are you okay?"', reply: 'Replied: "All good, just buying bread at Spar."' },
    { id: 'c2', name: 'Ayesha', time: 'Yesterday 21:00', area: 'Randburg', status: 'Routine evening check-in', reply: 'Checked in: Safe at home.' },
    { id: 'c3', name: 'Zanele', time: '2 days ago', area: 'Soweto', status: 'Left Bara Taxi Rank', reply: 'Checked in: Safe in taxi.' }
  ]);

  // Live alert friends
  const alertFriends = friends.filter((f) => f.status === 'alert');
  const dangerZoneFriends = friends.filter((f) => f.status === 'danger-zone');
  const liveCount = alertFriends.length;

  const handleConfirmDispatch = () => {
    if (!confirmingProvider || !selectedAlertFriend) return;
    onDispatchProvider(confirmingProvider, selectedAlertFriend.name);
    setToastMessage(`Help dispatched. ${selectedAlertFriend.name} can see it coming.`);
    setConfirmingProvider(null);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black text-white overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-3 left-4 right-4 z-50 p-3 bg-[#34C759] text-black font-condensed uppercase font-extrabold text-xs tracking-wider rounded-xl shadow-2xl flex items-center gap-2 animate-bounce-short">
          <CheckCircle2 size={18} className="stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar: FRIENDS on left, Add-Friend on right */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center justify-between shrink-0">
        <h2 className="font-condensed font-extrabold uppercase text-xl text-white tracking-wider">
          FRIENDS & NETWORK
        </h2>
        <button
          className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-[#8E8E99] hover:text-white hover:border-white transition-colors cursor-pointer"
          title="Add trusted contact"
        >
          <UserPlus size={16} />
        </button>
      </div>

      {/* Tabs: LIVE ALERTS (red count) | NETWORK | CHECK-INS */}
      <div className="flex items-center px-4 bg-[#16161A] border-b border-[#2E2E36] shrink-0">
        {(['LIVE ALERTS', 'NETWORK', 'CHECK-INS'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 text-[11px] font-condensed uppercase tracking-wider font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                isActive ? 'text-white' : 'text-[#8E8E99] hover:text-white'
              }`}
            >
              {tab}
              {tab === 'LIVE ALERTS' && liveCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#FF3B30] text-white text-[9px] font-extrabold font-mono animate-pulse">
                  {liveCount}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* TAB 1: LIVE ALERTS */}
        {activeTab === 'LIVE ALERTS' && (
          <div className="space-y-3">
            {/* Live emergency alert row */}
            {alertFriends.length === 0 ? (
              <div className="p-8 text-center text-[#8E8E99] space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-[#34C759]" />
                <p className="font-condensed uppercase font-bold text-white text-base">
                  ALL NETWORK CONTACTS ARE SAFE
                </p>
                <p className="text-xs">No active SOS alerts triggered by your 5 trusted friends.</p>
              </div>
            ) : (
              alertFriends.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedAlertFriend(f)}
                  className="p-3.5 rounded-2xl bg-[#FF3B30]/10 border-2 border-[#FF3B30] hover:bg-[#FF3B30]/15 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,59,48,0.2)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#FF3B30] ring-2 ring-[#FF3B30]/50 animate-pulse"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FF3B30] border-2 border-black animate-ping" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-condensed font-extrabold uppercase text-white text-[17px] leading-tight truncate">
                          {f.name} NEEDS HELP
                        </h3>
                        <span className="px-1.5 py-0.2 rounded bg-[#FF3B30] text-white font-extrabold text-[9px] uppercase tracking-wider shrink-0 animate-pulse">
                          LIVE
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs mt-0.5">
                        <span className="text-[#3D8BFF] truncate">
                          ➤ {f.alertDetail?.address || f.lastLocation}
                        </span>
                        <span className="text-[#FF3B30] font-bold shrink-0">
                          {f.alertDetail?.distanceKm || 2.3} km
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E8E99] mt-0.5">
                        Alert sent {f.alertDetail?.timeAgo || '1 min ago'}
                      </p>
                    </div>

                    {/* Red RESPOND Pill */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAlertFriend(f);
                      }}
                      className="px-3.5 py-1.5 bg-[#FF3B30] hover:bg-red-600 text-white font-condensed font-extrabold uppercase tracking-wider text-xs rounded-full shadow-lg shrink-0 transition-transform active:scale-95 cursor-pointer"
                    >
                      RESPOND
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Danger Zone notices for friends */}
            {dangerZoneFriends.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-2xl bg-[#FFC400]/10 border border-[#FFC400] flex items-center justify-between gap-3"
              >
                <div className="relative shrink-0">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC400]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FFC400] border-2 border-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-condensed font-extrabold uppercase text-white text-sm leading-tight">
                    {f.name} ENTERED A HIGH-RISK AREA
                  </h4>
                  <p className="text-[11px] text-[#3D8BFF] mt-0.5">
                    ➤ {f.lastLocation} (Hillbrow) · 18 mins ago
                  </p>
                </div>

                <button
                  onClick={() => {
                    setToastMessage(`Check-in "Are you okay?" sent to ${f.name}`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3 py-1 bg-[#24242B] hover:bg-[#2E2E36] border border-[#FFC400] text-[#FFC400] font-condensed font-bold uppercase text-xs rounded-full shrink-0"
                >
                  CHECK IN
                </button>
              </div>
            ))}

            {/* Resolved alerts tag below */}
            <div className="pt-4 border-t border-[#2E2E36]">
              <span className="text-[10px] font-condensed uppercase tracking-wider font-bold text-[#5C5C66] block mb-2">
                PAST RESOLVED ALERTS
              </span>
              <div className="p-3 rounded-xl bg-[#16161A] border border-[#2E2E36] opacity-60 flex items-center justify-between">
                <div>
                  <p className="font-condensed font-bold text-white text-xs uppercase">
                    AYESHA PATEL · JAN SMUTS AVE
                  </p>
                  <p className="text-[10px] text-[#8E8E99]">Resolved yesterday · Dispatched MedAssist</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#34C759]/20 text-[#34C759] font-bold text-[9px] uppercase">
                  RESOLVED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NETWORK */}
        {activeTab === 'NETWORK' && (
          <div className="space-y-2">
            <p className="text-xs text-[#8E8E99] pb-1">
              Your 5 closest emergency contacts with instant notification access:
            </p>

            {friends.map((friend) => (
              <div
                key={friend.id}
                className="p-3 rounded-xl bg-[#16161A] border border-[#2E2E36] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#2E2E36]"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-black ${
                        friend.isOnline ? 'bg-[#34C759]' : 'bg-[#5C5C66]'
                      }`}
                    />
                  </div>

                  <div>
                    <h4 className="font-condensed font-extrabold uppercase text-white text-sm">
                      {friend.name} {friend.surname}
                    </h4>
                    <p className="text-[11px] text-[#8E8E99]">
                      Last known: <span className="text-white">{friend.lastLocation}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${friend.phone}`}
                    className="w-9 h-9 rounded-full bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] flex items-center justify-center text-white"
                  >
                    <Phone size={15} />
                  </a>
                  <button
                    onClick={() => {
                      setToastMessage(`Check-in request sent to ${friend.name}`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="px-2.5 py-1.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl text-[10px] font-condensed uppercase tracking-wider font-bold text-white"
                  >
                    Check in
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CHECK-INS */}
        {activeTab === 'CHECK-INS' && (
          <div className="space-y-2.5">
            {checkIns.map((ci) => (
              <div key={ci.id} className="p-3 rounded-xl bg-[#16161A] border border-[#2E2E36] space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#8E8E99]">
                  <span className="font-bold text-white uppercase font-condensed text-sm">{ci.name}</span>
                  <span className="text-[10px]">{ci.time} · {ci.area}</span>
                </div>
                <p className="text-[#8E8E99]">{ci.status}</p>
                <p className="text-[#34C759] font-medium">{ci.reply}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXPANDED ALERT CARD (APPLE DYNAMIC ISLAND STYLE EXPANSION) */}
      {selectedAlertFriend && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in select-none">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-4 shadow-2xl max-h-[92vh] overflow-y-auto space-y-3.5">
            {/* 1. Header: Red LIVE badge, timer, close 'X' */}
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FF3B30] text-white text-[10px] font-extrabold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE ALERT ACTIVE
                </span>
                <span className="text-xs font-mono text-[#8E8E99]">0:42 elapsed</span>
              </div>
              <button
                onClick={() => setSelectedAlertFriend(null)}
                className="w-7 h-7 rounded-full bg-[#24242B] hover:bg-[#2E2E36] flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* 2. Profile: Face ID photo (72px, red ring), Name uppercase, phone number */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={selectedAlertFriend.avatar}
                  alt={selectedAlertFriend.name}
                  className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[#FF3B30] ring-4 ring-[#FF3B30]/30"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#FF3B30] border-2 border-black animate-ping" />
              </div>

              <div>
                <h3 className="font-condensed font-extrabold uppercase text-[22px] text-white leading-tight">
                  {selectedAlertFriend.name} {selectedAlertFriend.surname}
                </h3>
                <p className="text-xs text-[#8E8E99] font-mono">{selectedAlertFriend.phone}</p>
                <p className="text-[11px] text-[#FF3B30] font-bold mt-0.5">
                  Alert sent 1 min ago via 5-tap gesture
                </p>
              </div>
            </div>

            {/* 3. Mini dark map (180px) with pulsing red pin */}
            <div className="relative w-full h-[170px] rounded-2xl overflow-hidden border border-[#2E2E36]">
              <DarkMap
                height="100%"
                showUser={false}
                userCoords={{ x: 68, y: 32 }}
                incidents={[
                  {
                    id: 'live-victim',
                    title: `${selectedAlertFriend.name} Location`,
                    location: '3rd Ave, Alexandra',
                    distanceKm: 2.3,
                    timeAgo: 'Just now',
                    description: '',
                    status: 'live',
                    category: 'Emergency',
                    verified: true,
                    x: 68,
                    y: 32,
                    timeline: []
                  }
                ]}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#2E2E36] flex items-center justify-between text-xs">
                <span className="text-[#3D8BFF] truncate font-medium">
                  ➤ 3rd Ave, Alexandra (Near taxi rank)
                </span>
                <span className="text-[#FF3B30] font-bold shrink-0">
                  2.3 km
                </span>
              </div>
            </div>

            {/* 4. Mini Timeline of her alert */}
            <div className="p-2.5 rounded-xl bg-[#24242B] border border-[#2E2E36] text-xs space-y-1 font-medium">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
                <span className="text-[#FF3B30] font-mono font-bold">Now:</span>
                <span>Location telemetry updating every 3s</span>
              </div>
              <div className="flex items-center gap-2 text-[#8E8E99]">
                <span className="w-2 h-2 rounded-full bg-[#5C5C66]" />
                <span className="font-mono">1 min ago:</span>
                <span>Emergency SOS triggered by {selectedAlertFriend.name}</span>
              </div>
            </div>

            {/* 5. Three Round Buttons: CALL, MESSAGE, ON MY WAY */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${selectedAlertFriend.phone}`}
                className="py-2.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl flex flex-col items-center justify-center gap-1 text-white text-[11px] font-condensed uppercase font-bold tracking-wider"
              >
                <Phone size={15} />
                CALL
              </a>

              <button
                onClick={() => {
                  setToastMessage(`Direct SMS sent to ${selectedAlertFriend.name}`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="py-2.5 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] rounded-xl flex flex-col items-center justify-center gap-1 text-white text-[11px] font-condensed uppercase font-bold tracking-wider"
              >
                <MessageSquare size={15} />
                MESSAGE
              </button>

              <button
                onClick={() => {
                  setToastMessage(`Notified ${selectedAlertFriend.name}: You are on your way!`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="py-2.5 bg-white text-black rounded-xl flex flex-col items-center justify-center gap-1 text-[11px] font-condensed uppercase font-extrabold tracking-wider hover:bg-neutral-200 shadow-md"
              >
                <Navigation size={15} />
                ON MY WAY
              </button>
            </div>

            {/* 6. Header: CLOSEST SERVICE PROVIDERS */}
            <div className="pt-2 border-t border-[#2E2E36]">
              <h4 className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] mb-2">
                CLOSEST SERVICE PROVIDERS (DISPATCH RESCUE)
              </h4>

              {/* 7. Three Provider Rows */}
              <div className="space-y-2">
                {providers.slice(0, 3).map((p) => {
                  const isThisDispatched = dispatchedProviderId === p.id;

                  return (
                    <div
                      key={p.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                        isThisDispatched
                          ? 'bg-[#34C759]/15 border-[#34C759]'
                          : 'bg-[#24242B] border-[#2E2E36]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-white font-extrabold font-condensed text-xs shrink-0">
                          {p.logoText}
                        </div>
                        <div className="min-w-0">
                          <p className="font-condensed font-extrabold uppercase text-white text-xs truncate">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-[#8E8E99]">
                            {p.type} · <span className="text-[#FF3B30] font-bold">{p.distanceKm} km ({p.etaMinutes} min)</span>
                          </p>
                        </div>
                      </div>

                      {isThisDispatched ? (
                        <span className="px-3 py-1.5 rounded-full bg-[#34C759] text-black font-condensed font-extrabold uppercase text-[10px] tracking-wider shrink-0 shadow-md">
                          DISPATCHED ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirmingProvider(p)}
                          className="px-3.5 py-1.5 rounded-full border border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white font-condensed font-extrabold uppercase text-[11px] tracking-wider shrink-0 transition-colors cursor-pointer"
                        >
                          SEND HELP
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH CONFIRMATION SHEET */}
      {confirmingProvider && selectedAlertFriend && (
        <div className="fixed inset-0 z-55 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-[340px] bg-[#16161A] border border-[#2E2E36] rounded-3xl p-5 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF3B30]/20 border border-[#FF3B30] flex items-center justify-center text-[#FF3B30] mx-auto">
              <Shield size={24} />
            </div>

            <div>
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                DISPATCH {confirmingProvider.name}?
              </h3>
              <p className="text-xs text-[#8E8E99] mt-1.5 leading-relaxed">
                Send {confirmingProvider.name} to {selectedAlertFriend.name}? Her exact live GPS location, photo, and emergency status will be shared with the responder terminal under POPIA emergency consent.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setConfirmingProvider(null)}
                className="py-3 bg-[#24242B] hover:bg-[#2E2E36] text-white font-condensed font-bold uppercase text-xs rounded-xl"
              >
                CANCEL
              </button>

              <button
                onClick={handleConfirmDispatch}
                className="py-3 bg-white hover:bg-neutral-200 text-black font-condensed font-extrabold uppercase text-xs rounded-xl shadow-lg"
              >
                CONFIRM DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
