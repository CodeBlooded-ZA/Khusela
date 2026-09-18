import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, TrendingUp, MapPin, Phone, Car } from 'lucide-react';
import { DarkMap } from '../components/DarkMap';

interface ProviderPortalScreenProps {
  onBack: () => void;
  onSimulateAcceptDispatch?: () => void;
}

export const ProviderPortalScreen: React.FC<ProviderPortalScreenProps> = ({
  onBack,
  onSimulateAcceptDispatch
}) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'REGISTER'>('DASHBOARD');

  // 11b. Dashboard state
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [activeDispatch, setActiveDispatch] = useState<any | null>({
    id: 'req-1',
    title: 'WOMAN NEEDS HELP · ALEXANDRA',
    victim: 'Naledi Mokoena',
    address: '3rd Ave & Vasco Da Gama, Alexandra',
    distanceKm: 1.1,
    time: '2 mins ago',
    dispatchedBy: 'Lerato Molefe (Verified Network Friend)',
    status: 'incoming'
  });
  const [acceptedDispatch, setAcceptedDispatch] = useState(false);

  // 11a. Registration state
  const [orgName, setOrgName] = useState('Sentinel Tactical Security');
  const [orgType, setOrgType] = useState('Private Security');
  const [psiraNumber, setPsiraNumber] = useState('2948210 / B');
  const [coverageArea, setCoverageArea] = useState('Sandton & Alexandra');
  const [coverageRadius, setCoverageRadius] = useState(15);
  const [contactNumber, setContactNumber] = useState('+27 11 888 2400');
  const [email, setEmail] = useState('dispatch@sentinelsecurity.co.za');
  const [about, setAbout] = useState('24/7 armed response with specialized female responders and rapid GPS tracking.');
  const [consentDPA, setConsentDPA] = useState(true);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const handleAcceptRequest = () => {
    setAcceptedDispatch(true);
    if (activeDispatch) {
      setActiveDispatch({ ...activeDispatch, status: 'active' });
    }
    if (onSimulateAcceptDispatch) {
      onSimulateAcceptDispatch();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentDPA) return;
    setRegistrationSubmitted(true);
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-hidden select-none">
      {/* Top Bar with Back Arrow */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-white hover:bg-[#24242B]"
          >
            <ArrowLeft size={16} />
          </button>
          <h2 className="font-condensed font-extrabold uppercase text-lg text-white tracking-wider">
            PROVIDER OPERATIONS
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-[#16161A] border border-[#2E2E36] rounded-lg p-0.5 text-[11px] font-condensed uppercase font-bold">
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'DASHBOARD' ? 'bg-white text-black' : 'text-[#8E8E99]'
            }`}
          >
            TERMINAL
          </button>
          <button
            onClick={() => setActiveTab('REGISTER')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'REGISTER' ? 'bg-white text-black' : 'text-[#8E8E99]'
            }`}
          >
            REGISTER
          </button>
        </div>
      </div>

      {/* VIEW 1: DASHBOARD (11b) */}
      {activeTab === 'DASHBOARD' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Header with Logo + ON DUTY toggle */}
          <div className="p-3.5 rounded-2xl bg-[#16161A] border border-[#2E2E36] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#24242B] border border-[#2E2E36] flex items-center justify-center text-white font-condensed font-extrabold text-sm">
                SRR
              </div>
              <div>
                <h3 className="font-condensed font-extrabold uppercase text-white text-sm">
                  SENTINEL RAPID RESPONSE
                </h3>
                <p className="text-[10px] text-[#8E8E99]">Terminal #JHB-NORTH-04 · Vehicle Hilux GP 12 AB</p>
              </div>
            </div>

            {/* On duty switch */}
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-condensed uppercase font-bold ${isOnDuty ? 'text-[#34C759]' : 'text-[#8E8E99]'}`}>
                {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
              </span>
              <button
                onClick={() => setIsOnDuty(!isOnDuty)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isOnDuty ? 'bg-[#34C759]' : 'bg-[#24242B] border border-[#2E2E36]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isOnDuty ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Stat row (Active responses / Today's requests / Avg response) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#16161A] border border-[#2E2E36]">
              <p className="text-[9px] text-[#8E8E99] uppercase font-condensed">ACTIVE UNITS</p>
              <p className="text-base font-extrabold text-[#34C759] font-condensed mt-0.5">
                {acceptedDispatch ? '1 ON SCENE' : '0 DISPATCHED'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#16161A] border border-[#2E2E36]">
              <p className="text-[9px] text-[#8E8E99] uppercase font-condensed">TODAY'S ALERTS</p>
              <p className="text-base font-extrabold text-white font-condensed mt-0.5">
                14 COMPLETED
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#16161A] border border-[#2E2E36]">
              <p className="text-[9px] text-[#8E8E99] uppercase font-condensed">AVG RESPONSE</p>
              <p className="text-base font-extrabold text-[#3D8BFF] font-condensed mt-0.5">
                5.8 MIN
              </p>
            </div>
          </div>

          {/* INCOMING EMERGENCY REQUEST */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99]">
                LIVE DISPATCH QUEUE
              </span>
              <span className="text-[10px] text-[#FF3B30] font-bold font-mono">
                {acceptedDispatch ? '1 IN PROGRESS' : '1 PENDING ACTION'}
              </span>
            </div>

            {activeDispatch && !acceptedDispatch && (
              <div className="p-3.5 rounded-2xl bg-[#FF3B30]/10 border-2 border-[#FF3B30] space-y-2.5 shadow-xl animate-pulse">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#FF3B30] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    PRIORITY 1 · SOS BROADCAST
                  </span>
                  <span className="text-[11px] font-mono text-[#FF3B30] font-bold">
                    {activeDispatch.time}
                  </span>
                </div>

                <h3 className="font-condensed font-extrabold uppercase text-white text-lg leading-tight">
                  {activeDispatch.title}
                </h3>

                <div className="text-xs space-y-0.5 text-[#CCCCCC]">
                  <p className="text-[#3D8BFF] font-medium">➤ {activeDispatch.address}</p>
                  <p>Distance: <span className="font-bold text-white">{activeDispatch.distanceKm} km</span></p>
                  <p className="text-[#8E8E99]">{activeDispatch.dispatchedBy}</p>
                </div>

                {/* ACCEPT / DECLINE Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setActiveDispatch(null)}
                    className="py-2.5 bg-[#24242B] hover:bg-[#2E2E36] text-[#8E8E99] hover:text-white font-condensed font-bold uppercase text-xs rounded-xl"
                  >
                    DECLINE
                  </button>

                  <button
                    onClick={handleAcceptRequest}
                    className="py-2.5 bg-[#34C759] hover:bg-green-600 text-black font-condensed font-extrabold uppercase text-xs rounded-xl shadow-lg cursor-pointer"
                  >
                    ACCEPT & DISPATCH
                  </button>
                </div>
              </div>
            )}

            {/* ACCEPTED REQUEST IN PROGRESS */}
            {acceptedDispatch && (
              <div className="p-3.5 rounded-2xl bg-[#16161A] border-2 border-[#34C759] space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#34C759] text-black text-[10px] font-extrabold uppercase tracking-wider">
                    ACTIVE RESPONSE · EN ROUTE
                  </span>
                  <span className="text-[11px] font-mono text-[#34C759] font-bold">
                    ETA 4 MIN
                  </span>
                </div>

                <h4 className="font-condensed font-extrabold uppercase text-white text-base">
                  PATROL UNIT DISPATCHED: OFFICER S. DLAMINI
                </h4>

                {/* Mini dark map */}
                <div className="h-32 rounded-xl overflow-hidden border border-[#2E2E36] relative">
                  <DarkMap
                    height="100%"
                    showUser={true}
                    userCoords={{ x: 68, y: 32 }}
                    responderCarCoords={{ x: 60, y: 30 }}
                  />
                  <div className="absolute bottom-1 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white">
                    Live telemetry feed active
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#8E8E99]">POPIA Emergency Data Token: Active</span>
                  <button
                    onClick={() => setAcceptedDispatch(false)}
                    className="px-3 py-1.5 bg-[#24242B] text-white rounded-lg text-xs font-condensed uppercase font-bold"
                  >
                    MARK COMPLETED
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PROMOTE YOUR LISTING CARD (Advertising & Monetisation Feature) */}
          <div className="p-4 rounded-2xl bg-[#16161A] border border-[#2E2E36] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#FFC400]">
                <TrendingUp size={16} />
                <h4 className="font-condensed font-extrabold uppercase text-sm text-white">
                  PROMOTE YOUR LISTING
                </h4>
              </div>
              <span className="text-[10px] text-[#34C759] font-mono font-bold">+42% INTAKE</span>
            </div>

            <p className="text-xs text-[#8E8E99]">
              Your fleet profile received <span className="text-white font-bold">1,420 views</span> and was dispatched in 18 emergencies this week across Johannesburg North.
            </p>

            <button className="w-full py-2 bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] text-white font-condensed uppercase font-bold text-xs rounded-xl transition-colors">
              BOOST ACCREDITED VISIBILITY
            </button>
          </div>
        </div>
      ) : (
        /* VIEW 2: REGISTRATION (11a) */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="font-condensed font-extrabold uppercase text-xl text-white">
              REGISTER YOUR ORGANISATION
            </h2>
            <p className="text-xs text-[#8E8E99] mt-0.5">
              Join the certified South African emergency response network under POPIA compliance.
            </p>
          </div>

          {registrationSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#16161A] border border-[#34C759] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#34C759]/20 border border-[#34C759] flex items-center justify-center text-[#34C759] mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-condensed font-extrabold uppercase text-lg text-white">
                PENDING VERIFICATION
              </h3>
              <p className="text-xs text-[#8E8E99] max-w-[280px] mx-auto">
                Your PSIRA licence <span className="font-mono text-white">{psiraNumber}</span> has been queued for verification. A Khusela compliance officer will audit within 48 hours.
              </p>
              <button
                onClick={() => setRegistrationSubmitted(false)}
                className="px-4 py-2 bg-[#24242B] text-white text-xs font-condensed uppercase font-bold rounded-xl"
              >
                EDIT DETAILS
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                  Organisation Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                    Provider Type
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Private Security">Private Security</option>
                    <option value="Ambulance Service">Ambulance Service</option>
                    <option value="Community Policing">Community Policing</option>
                    <option value="Fire & Rescue">Fire & Rescue</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                    PSIRA / Reg Number
                  </label>
                  <input
                    type="text"
                    value={psiraNumber}
                    onChange={(e) => setPsiraNumber(e.target.value)}
                    className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-xs text-white font-mono focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                  Coverage Area & Radius ({coverageRadius} km)
                </label>
                <input
                  type="text"
                  value={coverageArea}
                  onChange={(e) => setCoverageArea(e.target.value)}
                  className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-xs text-white mb-2 focus:outline-none"
                  required
                />
                <input
                  type="range"
                  min="2"
                  max="35"
                  value={coverageRadius}
                  onChange={(e) => setCoverageRadius(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                    Emergency Line
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1">
                    Dispatch Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* DPA Consent Checkbox */}
              <div className="pt-2 border-t border-[#2E2E36]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentDPA}
                    onChange={(e) => setConsentDPA(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#FF3B30] rounded cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-[#CCCCCC] leading-tight">
                    We will only use shared personal data to respond to the dispatched emergency, per the Data Processing Agreement and Section 11 of POPIA.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!consentDPA}
                className={`w-full h-13 font-condensed font-extrabold uppercase text-sm tracking-wider rounded-xl transition-colors mt-2 ${
                  consentDPA
                    ? 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-md'
                    : 'bg-[#24242B] text-[#5C5C66] cursor-not-allowed'
                }`}
              >
                SUBMIT FOR VERIFICATION
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
