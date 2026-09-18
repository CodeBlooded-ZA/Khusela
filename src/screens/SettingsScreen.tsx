import React, { useState } from 'react';
import { Friend, DataSharingLog, Theme } from '../types';
import {
  Bell,
  Users,
  Radio,
  WifiOff,
  Lock,
  FileText,
  ShieldCheck,
  ChevronRight,
  Download,
  Trash2,
  Phone,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  X,
  Sun,
  Moon
} from 'lucide-react';

interface SettingsScreenProps {
  friends: Friend[];
  sharingLogs: DataSharingLog[];
  onOpenOfflinePreview: () => void;
  onOpenPrivacyPolicy: () => void;
  onRevokeLog?: (id: string) => void;
  theme?: Theme;
  onToggleTheme?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  friends,
  sharingLogs,
  onOpenOfflinePreview,
  onOpenPrivacyPolicy,
  onRevokeLog,
  theme = 'dark',
  onToggleTheme
}) => {
  // Active sub-section modal if clicked
  const [activeSection, setActiveSection] = useState<
    'notifications' | 'network' | 'triggers' | 'offline' | 'privacy-centre' | 'compliance' | null
  >(null);

  // 12a Notifications state
  const [friendEnteredDanger, setFriendEnteredDanger] = useState(true);
  const [communityIncidentsNearMe, setCommunityIncidentsNearMe] = useState(true);
  const [incidentRadius, setIncidentRadius] = useState(5);
  const [trendingIncidents, setTrendingIncidents] = useState(true);
  const [quietHours, setQuietHours] = useState(false);

  // 12c Triggers state
  const [shakeToAlert, setShakeToAlert] = useState(true);
  const [tap5Times, setTap5Times] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [safetyPin, setSafetyPin] = useState('1234');
  const [duressPin, setDuressPin] = useState('9999');

  // 12d Offline state
  const [sendBySms, setSendBySms] = useState(true);
  const [receiveBySms, setReceiveBySms] = useState(true);

  // 12e Privacy toggles state
  const [shareLocNetwork, setShareLocNetwork] = useState(true);
  const [shareProfileProvider, setShareProfileProvider] = useState(true);
  const [shareDangerZone, setShareDangerZone] = useState(true);
  const [showReportsNamed, setShowReportsNamed] = useState(false);
  const [anonymousHeatmaps, setAnonymousHeatmaps] = useState(true);
  const [askEveryTime, setAskEveryTime] = useState(true);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black text-white overflow-y-auto select-none">
      {/* Toast */}
      {toast && (
        <div className="fixed top-14 left-4 right-4 z-55 p-3 bg-[#34C759] text-black font-condensed font-extrabold uppercase text-xs rounded-xl shadow-2xl flex items-center gap-2 animate-bounce-short">
          <CheckCircle2 size={16} className="stroke-[3]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center justify-between shrink-0">
        <h2 className="font-condensed font-extrabold uppercase text-xl text-white tracking-wider">
          SETTINGS & PRIVACY
        </h2>
      </div>

      <div className="p-4 space-y-6 flex-1">
        {/* Profile Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#16161A] border border-[#2E2E36]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Thandi"
              className="w-18 h-18 rounded-full object-cover border-2 border-white/80"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#34C759] border-2 border-black" />
          </div>

          <div className="flex-1">
            <h3 className="font-condensed font-extrabold uppercase text-xl text-white leading-tight">
              THANDI NDLOVU
            </h3>
            <p className="text-xs text-[#8E8E99] font-mono mt-0.5">+27 82 555 4471</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#24242B] border border-[#2E2E36] text-[10px] font-condensed font-bold uppercase text-[#3D8BFF]">
              POPIA VERIFIED ID
            </span>
          </div>
        </div>

        {/* Grouped Settings Sections with Chevrons */}
        <div className="space-y-2">
          <span className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] px-1">
            PREFERENCES & PERMISSIONS
          </span>

          <div className="rounded-2xl bg-[#16161A] border border-[#2E2E36] divide-y divide-[#2E2E36] overflow-hidden">
            {/* 12a Notifications */}
            <button
              onClick={() => setActiveSection('notifications')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#FF3B30]">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Notifications & Alerts</p>
                  <p className="text-[10px] text-[#8E8E99]">Emergency radius, push sounds & quiet hours</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* 12b My Network */}
            <button
              onClick={() => setActiveSection('network')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#3D8BFF]">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">My 5 Trusted Contacts</p>
                  <p className="text-[10px] text-[#8E8E99]">Manage permissions for each friend</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* 12c Alert Triggers */}
            <button
              onClick={() => setActiveSection('triggers')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#FFC400]">
                  <Radio size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Emergency Alert Triggers</p>
                  <p className="text-[10px] text-[#8E8E99]">Shake phone, 5-tap gesture, safety PINs</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* 12d Offline Alerts */}
            <button
              onClick={() => setActiveSection('offline')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-white">
                  <WifiOff size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Offline Alerts (USSD & SMS)</p>
                  <p className="text-[10px] text-[#8E8E99]">Works without data via *120*7233#</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* Appearance & Display Theme */}
            <div className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B]/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center">
                  {theme === 'dark' ? (
                    <Moon size={16} className="text-indigo-400" />
                  ) : (
                    <Sun size={16} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Appearance & Display</p>
                  <p className="text-[10px] text-[#8E8E99]">
                    {theme === 'dark' ? 'Dark theme (OLED optimized)' : 'Light theme (High daylight contrast)'}
                  </p>
                </div>
              </div>
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  aria-label="Toggle theme mode"
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    theme === 'light' ? 'bg-[#3D8BFF]' : 'bg-[#2E2E36]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'light' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PRIVACY, COMPLIANCE & LEGAL */}
        <div className="space-y-2">
          <span className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] px-1">
            PRIVACY & LEGAL (POPIA)
          </span>

          <div className="rounded-2xl bg-[#16161A] border border-[#2E2E36] divide-y divide-[#2E2E36] overflow-hidden">
            {/* 12e Privacy & Consent Centre */}
            <button
              onClick={() => setActiveSection('privacy-centre')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#34C759]">
                  <Lock size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Privacy & Consent Centre</p>
                  <p className="text-[10px] text-[#8E8E99]">Live data sharing audit log & consent toggles</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* 12f Privacy Policy */}
            <button
              onClick={onOpenPrivacyPolicy}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Privacy Policy & Terms</p>
                  <p className="text-[10px] text-[#8E8E99]">Plain-language data collection details</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>

            {/* 12g Compliance */}
            <button
              onClick={() => setActiveSection('compliance')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#24242B] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#3D8BFF]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Regulatory Compliance</p>
                  <p className="text-[10px] text-[#8E8E99]">POPIA, Information Officer & Regulators</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#8E8E99]" />
            </button>
          </div>
        </div>

        {/* 12h Account Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => showToast('Data archive download initiated (POPIA S23). Check SMS.')}
            className="w-full py-3 rounded-xl bg-[#16161A] hover:bg-[#24242B] border border-[#2E2E36] text-xs font-condensed uppercase font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            DOWNLOAD MY PERSONAL DATA (ZIP)
          </button>

          <button
            onClick={() => showToast('Account deletion request submitted. Data purge within 24h.')}
            className="w-full py-3 rounded-xl bg-transparent hover:bg-red-950/20 border border-[#FF3B30]/40 text-xs font-condensed uppercase font-extrabold text-[#FF3B30] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 size={14} />
            DELETE MY ACCOUNT AND DATA
          </button>
        </div>
      </div>

      {/* SECTION MODAL: 12a NOTIFICATIONS */}
      {activeSection === 'notifications' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                NOTIFICATION SETTINGS
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Locked Friend Alerts */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between opacity-90">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Friend Emergency Alerts</p>
                  <p className="text-[10px] text-[#34C759]">Always ON so you never miss a friend in danger</p>
                </div>
                <input type="checkbox" checked={true} disabled className="w-4 h-4 accent-[#FF3B30]" />
              </div>

              {/* Friend entered high-risk area */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Friend Entered High-Risk Area</p>
                  <p className="text-[10px] text-[#8E8E99]">Notify me when a network friend enters a danger zone</p>
                </div>
                <input
                  type="checkbox"
                  checked={friendEnteredDanger}
                  onChange={(e) => setFriendEnteredDanger(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>

              {/* Community incidents */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Community Incidents Near Me</p>
                  <p className="text-[10px] text-[#8E8E99]">Reports within your chosen radius</p>
                </div>
                <input
                  type="checkbox"
                  checked={communityIncidentsNearMe}
                  onChange={(e) => setCommunityIncidentsNearMe(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>

              {/* Radius slider (1-20 km) */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-white uppercase font-condensed">Incident Radius</span>
                  <span className="font-mono text-[#3D8BFF] font-bold">{incidentRadius} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={incidentRadius}
                  onChange={(e) => setIncidentRadius(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              {/* Trending */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Trending Area Incidents</p>
                  <p className="text-[10px] text-[#8E8E99]">Surges in vehicle theft or suspicious activity</p>
                </div>
                <input
                  type="checkbox"
                  checked={trendingIncidents}
                  onChange={(e) => setTrendingIncidents(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>

              {/* Quiet hours */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Quiet Hours (23:00 - 06:00)</p>
                  <p className="text-[10px] text-[#8E8E99]">Mutes community tips (emergency alerts still ring)</p>
                </div>
                <input
                  type="checkbox"
                  checked={quietHours}
                  onChange={(e) => setQuietHours(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setActiveSection(null)}
              className="w-full py-3 bg-white text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer"
            >
              SAVE PREFERENCES
            </button>
          </div>
        </div>
      )}

      {/* SECTION MODAL: 12b MY NETWORK */}
      {activeSection === 'network' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                MANAGE 5 TRUSTED CONTACTS
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#8E8E99]">
              Configure which trusted friends receive your real-time emergency telemetry.
            </p>

            <div className="space-y-2.5">
              {friends.map((f) => (
                <div key={f.id} className="p-3 rounded-xl bg-[#24242B] border border-[#2E2E36] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-white uppercase font-condensed">{f.name} {f.surname}</p>
                        <p className="text-[10px] text-[#8E8E99] font-mono">{f.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast(`Removed ${f.name} from emergency contacts.`)}
                      className="text-[10px] font-condensed uppercase font-bold text-[#FF3B30] px-2 py-1 bg-black/40 rounded-lg"
                    >
                      REMOVE
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#2E2E36] space-y-1 text-[11px] text-[#CCCCCC]">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Can view live location during SOS</span>
                      <input type="checkbox" defaultChecked className="accent-[#34C759]" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Gets danger-zone notifications</span>
                      <input type="checkbox" defaultChecked className="accent-[#FFC400]" />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('Invite link generated for 6th pending contact.')}
              className="w-full py-2.5 bg-[#24242B] border border-dashed border-[#5C5C66] text-white font-condensed font-bold uppercase text-xs rounded-xl"
            >
              + ADD ANOTHER CONTACT
            </button>
          </div>
        </div>
      )}

      {/* SECTION MODAL: 12c ALERT TRIGGERS */}
      {activeSection === 'triggers' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                ALERT TRIGGERS & PINS
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Shake to Alert</p>
                  <p className="text-[10px] text-[#8E8E99]">Rapidly shake phone back and forth</p>
                </div>
                <input
                  type="checkbox"
                  checked={shakeToAlert}
                  onChange={(e) => setShakeToAlert(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Tap Screen 5 Times</p>
                  <p className="text-[10px] text-[#8E8E99]">Silent emergency trigger without looking</p>
                </div>
                <input
                  type="checkbox"
                  checked={tap5Times}
                  onChange={(e) => setTap5Times(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Biometric Face ID</p>
                  <p className="text-[10px] text-[#8E8E99]">Authorize responder dispatch via Face ID</p>
                </div>
                <input
                  type="checkbox"
                  checked={faceIdEnabled}
                  onChange={(e) => setFaceIdEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#34C759] cursor-pointer"
                />
              </div>

              {/* Safety PIN */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Safety PIN (I'M SAFE)</p>
                  <p className="text-[10px] text-[#8E8E99]">Cancels active emergency alert</p>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={safetyPin}
                  onChange={(e) => setSafetyPin(e.target.value)}
                  className="w-16 h-8 bg-black border border-[#2E2E36] rounded text-center text-white font-mono text-xs"
                />
              </div>

              {/* Duress PIN */}
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#FFC400] uppercase font-condensed">Duress PIN (Coercion Mode)</p>
                  <p className="text-[10px] text-[#8E8E99]">Appears to cancel, but keeps alert live secretly</p>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={duressPin}
                  onChange={(e) => setDuressPin(e.target.value)}
                  className="w-16 h-8 bg-black border border-[#FFC400]/40 rounded text-center text-[#FFC400] font-mono text-xs"
                />
              </div>
            </div>

            <button
              onClick={() => setActiveSection(null)}
              className="w-full py-3 bg-white text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer"
            >
              SAVE TRIGGERS
            </button>
          </div>
        </div>
      )}

      {/* SECTION MODAL: 12d OFFLINE ALERTS */}
      {activeSection === 'offline' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                OFFLINE ALERTS (SMS & USSD)
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            {/* Explainer card */}
            <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] space-y-1">
              <p className="font-condensed font-extrabold uppercase text-sm text-white">
                NO DATA? YOU CAN STILL GET & SEND ALERTS.
              </p>
              <p className="text-xs text-[#8E8E99]">
                Khusela is integrated with South African cellular gateways (Vodacom, MTN, Telkom, Cell C) to broadcast reverse-billed emergency packets.
              </p>
            </div>

            {/* Toggles */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Send my alerts by SMS if no data</p>
                  <p className="text-[10px] text-[#8E8E99]">Dispatches last known GPS via GSM</p>
                </div>
                <input
                  type="checkbox"
                  checked={sendBySms}
                  onChange={(e) => setSendBySms(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Receive friends' alerts by SMS</p>
                  <p className="text-[10px] text-[#8E8E99]">Get incoming emergency SMS when offline</p>
                </div>
                <input
                  type="checkbox"
                  checked={receiveBySms}
                  onChange={(e) => setReceiveBySms(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
              </div>
            </div>

            {/* Large USSD Code Card */}
            <div className="p-4 rounded-2xl bg-black border-2 border-white text-center space-y-1">
              <span className="text-[10px] font-condensed uppercase font-bold text-[#8E8E99]">
                SOUTH AFRICAN EMERGENCY USSD
              </span>
              <h2 className="font-mono font-extrabold text-[28px] text-white tracking-widest">
                *120*7233#
              </h2>
              <p className="text-[10px] text-[#8E8E99]">
                Works on any phone (smart or feature phone). No data or airtime required.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveSection(null);
                onOpenOfflinePreview();
              }}
              className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer"
            >
              PREVIEW OFFLINE MODE (USSD & SMS INTERACTIVE)
            </button>
          </div>
        </div>
      )}

      {/* SECTION MODAL: 12e PRIVACY & CONSENT CENTRE */}
      {activeSection === 'privacy-centre' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                PRIVACY & CONSENT CENTRE (POPIA)
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#8E8E99]">
              Under POPIA Section 11, personal data is processed strictly with your explicit consent or in life-threatening emergencies.
            </p>

            {/* Consent Cards */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Emergency Location to Network</p>
                  <p className="text-[10px] text-[#8E8E99]">Transmitted to 5 contacts during active SOS</p>
                </div>
                <input
                  type="checkbox"
                  checked={shareLocNetwork}
                  onChange={(e) => setShareLocNetwork(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Photo & Telemetry to Dispatched Responder</p>
                  <p className="text-[10px] text-[#8E8E99]">Passed to verified SAPS / Security car</p>
                </div>
                <input
                  type="checkbox"
                  checked={shareProfileProvider}
                  onChange={(e) => setShareProfileProvider(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Danger-Zone Alerts to Network</p>
                  <p className="text-[10px] text-[#8E8E99]">Automated notification on entering high-risk area</p>
                </div>
                <input
                  type="checkbox"
                  checked={shareDangerZone}
                  onChange={(e) => setShareDangerZone(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
              </div>

              <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white uppercase font-condensed">Ask every time before non-emergency share</p>
                  <p className="text-[10px] text-[#8E8E99]">Mandatory confirmation dialogue</p>
                </div>
                <input
                  type="checkbox"
                  checked={askEveryTime}
                  onChange={(e) => setAskEveryTime(e.target.checked)}
                  className="w-4 h-4 accent-[#34C759]"
                />
              </div>
            </div>

            {/* DATA SHARING LOG (LIVE TIMELINE) */}
            <div className="pt-2 border-t border-[#2E2E36] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99]">
                  DATA SHARING AUDIT LOG
                </span>
                <span className="text-[10px] text-[#34C759] font-mono">POPIA COMPLIANT</span>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {sharingLogs.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-[#24242B] border border-[#2E2E36] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#8E8E99] text-[10px]">
                      <span className="font-mono text-white font-bold">{log.timestamp}</span>
                      {log.isRevoked ? (
                        <span className="text-[#FF3B30] font-bold">REVOKED</span>
                      ) : (
                        <span className="text-[#34C759]">ACTIVE TOKEN</span>
                      )}
                    </div>

                    <p className="text-white font-medium">{log.description}</p>
                    <p className="text-[10px] text-[#8E8E99]">Recipient: <span className="text-[#3D8BFF]">{log.recipient}</span></p>

                    <div className="flex items-center justify-between pt-1 border-t border-[#2E2E36]/60 text-[10px]">
                      <span className="text-[#8E8E99] italic">{log.reason}</span>
                      {log.canRevoke && !log.isRevoked && (
                        <button
                          onClick={() => {
                            if (onRevokeLog) onRevokeLog(log.id);
                            showToast(`Revoked data access token for ${log.recipient}.`);
                          }}
                          className="text-[#FF3B30] font-condensed uppercase font-bold hover:underline"
                        >
                          REVOKE ACCESS
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveSection(null)}
              className="w-full py-3 bg-white text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer"
            >
              CLOSE PRIVACY CENTRE
            </button>
          </div>
        </div>
      )}

      {/* SECTION MODAL: 12g COMPLIANCE */}
      {activeSection === 'compliance' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[370px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 space-y-3 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                REGULATORY COMPLIANCE
              </h3>
              <button onClick={() => setActiveSection(null)} className="text-[#8E8E99]">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-[#24242B] rounded-xl border border-[#34C759] space-y-1">
              <div className="flex items-center gap-1.5 text-[#34C759] font-bold font-condensed uppercase">
                <CheckCircle2 size={14} />
                POPIA COMPLIANT (ACT 4 OF 2013)
              </div>
              <p className="text-[11px] text-[#CCCCCC]">
                All personal telemetry, identity profiles, and location logs are strictly governed in accordance with South Africa's Protection of Personal Information Act.
              </p>
            </div>

            <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] space-y-1">
              <p className="font-condensed font-extrabold uppercase text-white">INFORMATION OFFICER</p>
              <p className="text-[11px] text-[#CCCCCC]">Adv. N. Sithole (Registered with Information Regulator)</p>
              <p className="text-[10px] text-[#3D8BFF] font-mono">info-officer@khusela.org.za · +27 11 029 4400</p>
            </div>

            <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] space-y-1">
              <p className="font-condensed font-extrabold uppercase text-white">ENCRYPTION ARCHITECTURE</p>
              <p className="text-[11px] text-[#CCCCCC]">
                AES-256 in transit and at rest. Live GPS coordinates are purged automatically after 30 days unless linked to an official criminal docket.
              </p>
            </div>

            <div className="p-3 bg-[#24242B] rounded-xl border border-[#2E2E36] space-y-1">
              <p className="font-condensed font-extrabold uppercase text-white">SA INFORMATION REGULATOR</p>
              <p className="text-[11px] text-[#CCCCCC]">
                You have the statutory right to lodge a complaint directly with the Information Regulator of South Africa (inforeg@justice.gov.za).
              </p>
            </div>

            <button
              onClick={() => showToast('Report submitted to Khusela compliance officer.')}
              className="w-full py-2.5 bg-[#24242B] border border-[#2E2E36] hover:border-white text-white font-condensed font-bold uppercase rounded-xl"
            >
              REPORT A PRIVACY CONCERN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
