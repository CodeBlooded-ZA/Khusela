import React, { useState } from 'react';
import { Shield, ArrowLeft, Check, Camera, Search, Lock, MapPin, Bell, Activity, ExternalLink } from 'lucide-react';
import { DarkMap } from '../components/DarkMap';

interface OnboardingScreenProps {
  onComplete: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onOpenPrivacyPolicy
}) => {
  const [step, setStep] = useState<number>(1); // 1 to 6

  // 1b form state
  const [fullName, setFullName] = useState('Thandi Ndlovu');
  const [phoneNumber, setPhoneNumber] = useState('82 555 4471');

  // 1c code state
  const [otpCode, setOtpCode] = useState(['5', '9', '2', '4', '', '']);

  // 1d Face ID state
  const [faceScanned, setFaceScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // 1e Friends selection state
  const [selectedFriends, setSelectedFriends] = useState<string[]>(['f1', 'f2', 'f3']);
  const [friendSearch, setFriendSearch] = useState('');

  const sampleContacts = [
    { id: 'f1', name: 'Lerato Molefe', phone: '+27 82 555 1201', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'f2', name: 'Naledi Mokoena', phone: '+27 83 992 4819', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80' },
    { id: 'f3', name: 'Ayesha Patel', phone: '+27 71 443 8920', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    { id: 'f4', name: 'Zanele Khumalo', phone: '+27 84 321 0092', avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80' },
    { id: 'f5', name: 'Busi Sithole', phone: '+27 76 112 3490', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80' },
    { id: 'f6', name: 'Kagiso Dube', phone: '+27 82 109 4321', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
  ];

  // 1f Permissions & Consent state
  const [permLocation, setPermLocation] = useState(true);
  const [permNotifications, setPermNotifications] = useState(true);
  const [permMotion, setPermMotion] = useState(true);

  const [consentFriends, setConsentFriends] = useState(true);
  const [consentProvider, setConsentProvider] = useState(true);
  const [consentDangerZone, setConsentDangerZone] = useState(true);
  const [consentPolicy, setConsentPolicy] = useState(true);

  const handleScanFace = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFaceScanned(true);
    }, 1200);
  };

  const toggleFriend = (id: string) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter((f) => f !== id));
    } else {
      if (selectedFriends.length < 5) {
        setSelectedFriends([...selectedFriends, id]);
      }
    }
  };

  const isConsentValid = consentFriends && consentProvider && consentPolicy;

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-black text-white">
      {/* Top Header & Progress Bar (except step 1) */}
      <div className="shrink-0 px-4 pt-3 pb-2 z-20">
        {step > 1 && (
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              onClick={() => setStep(step - 1)}
              className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-[#8E8E99] hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>

            {/* 6-segment progress bar */}
            <div className="flex-1 flex items-center gap-1.5 px-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? 'bg-white' : 'bg-[#2E2E36]'
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] font-mono text-[#8E8E99]">
              {step}/6
            </div>
          </div>
        )}
      </div>

      {/* STEP 1A: WELCOME */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Top 55% dark map of Johannesburg with pins */}
          <div className="relative h-[55%] w-full overflow-hidden">
            <DarkMap height="100%" interactive={false} />
            {/* Dark gradient fade at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />
          </div>

          {/* Bottom typography & button */}
          <div className="px-6 pb-6 pt-2 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#FF3B30] flex items-center justify-center shadow-[0_0_20px_rgba(255,59,48,0.5)] mb-3">
              <Shield size={22} className="text-white fill-white" />
            </div>

            <h1 className="font-condensed font-extrabold text-[36px] uppercase tracking-wider text-white leading-none">
              KHUSELA
            </h1>
            <p className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#8E8E99] mt-2 mb-8">
              YOUR COMMUNITY HAS YOUR BACK.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full h-14 bg-white text-black font-condensed font-extrabold uppercase text-lg tracking-wider rounded-xl hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
            >
              GET STARTED
            </button>

            <button
              onClick={() => setStep(2)}
              className="mt-3 text-xs text-[#8E8E99] hover:text-white transition-colors cursor-pointer"
            >
              Already have an account? <span className="text-white underline">Log in</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 1B: YOUR DETAILS */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-6">
          <div className="space-y-6 pt-2">
            <div>
              <h2 className="font-condensed font-bold text-[26px] uppercase tracking-wider text-white">
                LET'S GET TO KNOW YOU
              </h2>
              <p className="text-sm text-[#8E8E99] mt-1">
                Your closest contacts will see this during alerts so they know it's you.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#8E8E99] block mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Thandi Ndlovu"
                  className="w-full h-14 bg-[#24242B] border border-[#2E2E36] rounded-xl px-4 text-white text-base focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#8E8E99] block mb-1.5">
                  Phone number
                </label>
                <div className="flex items-center h-14 bg-[#24242B] border border-[#2E2E36] rounded-xl overflow-hidden focus-within:border-white transition-colors">
                  <span className="px-4 text-sm font-semibold text-[#8E8E99] border-r border-[#2E2E36]">
                    +27
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="82 123 4567"
                    className="flex-1 h-full px-4 bg-transparent text-white text-base focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            disabled={!fullName.trim() || !phoneNumber.trim()}
            className={`w-full h-14 font-condensed font-bold uppercase text-lg tracking-wider rounded-xl transition-colors ${
              fullName.trim() && phoneNumber.trim()
                ? 'bg-white text-black hover:bg-neutral-200 cursor-pointer'
                : 'bg-[#24242B] text-[#5C5C66] cursor-not-allowed'
            }`}
          >
            CONTINUE
          </button>
        </div>
      )}

      {/* STEP 1C: VERIFY NUMBER */}
      {step === 3 && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-6">
          <div className="space-y-6 pt-2">
            <div>
              <h2 className="font-condensed font-bold text-[26px] uppercase tracking-wider text-white">
                ENTER THE CODE
              </h2>
              <p className="text-sm text-[#8E8E99] mt-1">
                Sent to +27 {phoneNumber || '82 *** 4471'}. Standard SMS rates apply.
              </p>
            </div>

            {/* 6 code boxes */}
            <div className="flex justify-between gap-2 pt-4">
              {otpCode.map((digit, idx) => (
                <div
                  key={idx}
                  className={`w-[48px] h-[56px] rounded-xl bg-[#24242B] border flex items-center justify-center text-xl font-bold text-white transition-colors ${
                    digit ? 'border-white' : 'border-[#2E2E36]'
                  }`}
                >
                  {digit || (idx === 4 ? '•' : '')}
                </div>
              ))}
            </div>

            <p className="text-xs text-[#8E8E99] text-center pt-2">
              Resend code in <span className="text-white font-mono font-semibold">0:24</span>
            </p>
          </div>

          <button
            onClick={() => {
              setOtpCode(['5', '9', '2', '4', '8', '1']);
              setStep(4);
            }}
            className="w-full h-14 bg-white text-black font-condensed font-bold uppercase text-lg tracking-wider rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            VERIFY NUMBER
          </button>
        </div>
      )}

      {/* STEP 1D: FACE ID */}
      {step === 4 && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-6">
          <div className="space-y-4 pt-2 text-center">
            <div>
              <h2 className="font-condensed font-bold text-[26px] uppercase tracking-wider text-white">
                SET UP FACE ID
              </h2>
              <p className="text-sm text-[#8E8E99] mt-1 max-w-[280px] mx-auto">
                Dispatched responders see your photo on their terminal so they can find you in a crowd.
              </p>
            </div>

            {/* 240px circular camera frame with dashed outline & silhouette */}
            <div className="relative w-[240px] h-[240px] mx-auto my-4 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center overflow-hidden bg-[#16161A]">
              {faceScanned ? (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                    alt="Face scan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-950/40 border-4 border-[#34C759] rounded-full flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#34C759] flex items-center justify-center text-white shadow-lg">
                      <Check size={32} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <Camera size={44} className="text-[#8E8E99] mb-2" />
                  <span className="text-xs text-[#8E8E99]">Position your face within the frame</span>
                </div>
              )}

              {/* Scanning progress ring animation */}
              {isScanning && (
                <div className="absolute inset-0 rounded-full border-4 border-t-[#34C759] border-r-[#34C759] border-b-transparent border-l-transparent animate-spin" />
              )}
            </div>

            {!faceScanned && (
              <button
                onClick={handleScanFace}
                disabled={isScanning}
                className="px-6 py-2.5 bg-[#24242B] border border-[#2E2E36] hover:border-white rounded-full text-xs font-condensed uppercase tracking-wider text-white transition-all cursor-pointer"
              >
                {isScanning ? 'Scanning biometric profile...' : 'Scan my face'}
              </button>
            )}
          </div>

          <button
            onClick={() => setStep(5)}
            disabled={!faceScanned}
            className={`w-full h-14 font-condensed font-bold uppercase text-lg tracking-wider rounded-xl transition-colors ${
              faceScanned
                ? 'bg-white text-black hover:bg-neutral-200 cursor-pointer'
                : 'bg-[#24242B] text-[#5C5C66] cursor-not-allowed'
            }`}
          >
            {faceScanned ? 'CONTINUE' : 'COMPLETE SCAN TO CONTINUE'}
          </button>
        </div>
      )}

      {/* STEP 1E: ADD YOUR 5 CLOSEST FRIENDS */}
      {step === 5 && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-6 overflow-hidden">
          <div className="space-y-4 pt-2 flex-1 flex flex-col overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-condensed font-bold text-[26px] uppercase tracking-wider text-white">
                  WHO'S IN YOUR NETWORK?
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#24242B] text-white">
                  {selectedFriends.length} / 5
                </span>
              </div>
              <p className="text-sm text-[#8E8E99] mt-0.5">
                These 5 trusted people receive your emergency SOS alerts first.
              </p>
            </div>

            {/* Row of 5 circular slots (56px) */}
            <div className="flex justify-between py-1 shrink-0">
              {[0, 1, 2, 3, 4].map((slotIdx) => {
                const friendId = selectedFriends[slotIdx];
                const friendObj = sampleContacts.find((c) => c.id === friendId);
                return (
                  <div key={slotIdx} className="flex flex-col items-center gap-1">
                    <div className="w-[56px] h-[56px] rounded-full border border-dashed border-[#5C5C66] bg-[#16161A] flex items-center justify-center overflow-hidden">
                      {friendObj ? (
                        <img
                          src={friendObj.avatar}
                          alt={friendObj.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[11px] text-[#5C5C66] font-semibold font-mono">
                          +{slotIdx + 1}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8E8E99] truncate max-w-[56px]">
                      {friendObj ? friendObj.name.split(' ')[0] : 'Empty'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Search bar */}
            <div className="relative shrink-0">
              <Search size={16} className="absolute left-3.5 top-3.5 text-[#8E8E99]" />
              <input
                type="text"
                value={friendSearch}
                onChange={(e) => setFriendSearch(e.target.value)}
                placeholder="Search contacts..."
                className="w-full h-11 bg-[#24242B] border border-[#2E2E36] rounded-xl pl-9 pr-4 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
              />
            </div>

            {/* Contacts list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {sampleContacts
                .filter((c) => c.name.toLowerCase().includes(friendSearch.toLowerCase()))
                .map((contact) => {
                  const isAdded = selectedFriends.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#16161A] border border-[#2E2E36]"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#2E2E36]"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{contact.name}</p>
                          <p className="text-[11px] text-[#8E8E99]">{contact.phone}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFriend(contact.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#34C759]/20 text-[#34C759] border border-[#34C759]'
                            : 'bg-[#24242B] text-white hover:bg-[#2E2E36] border border-[#2E2E36]'
                        }`}
                      >
                        {isAdded ? 'ADDED ✓' : 'ADD'}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            onClick={() => setStep(6)}
            disabled={selectedFriends.length === 0}
            className="w-full h-14 bg-white text-black font-condensed font-bold uppercase text-lg tracking-wider rounded-xl hover:bg-neutral-200 transition-colors mt-2 cursor-pointer"
          >
            CONFIRM NETWORK ({selectedFriends.length}/5)
          </button>
        </div>
      )}

      {/* STEP 1F: PERMISSIONS & POPIA CONSENT */}
      {step === 6 && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-6 overflow-hidden">
          <div className="space-y-4 pt-2 flex-1 overflow-y-auto pr-1">
            <div>
              <h2 className="font-condensed font-bold text-[26px] uppercase tracking-wider text-white">
                YOUR DATA, YOUR CHOICE
              </h2>
              <p className="text-xs text-[#8E8E99] mt-0.5">
                Compliant with South Africa's Protection of Personal Information Act (POPIA).
              </p>
            </div>

            {/* Permission cards */}
            <div className="space-y-2">
              <div className="p-3 bg-[#16161A] border border-[#2E2E36] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#3D8BFF]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Precise Location</p>
                    <p className="text-[10px] text-[#8E8E99]">Broadcasting only during active alerts or zone check-ins</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={permLocation}
                  onChange={(e) => setPermLocation(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#16161A] border border-[#2E2E36] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#FFC400]">
                    <Bell size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Emergency Notifications</p>
                    <p className="text-[10px] text-[#8E8E99]">Critical alerts bypass silent mode</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={permNotifications}
                  onChange={(e) => setPermNotifications(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#16161A] border border-[#2E2E36] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#24242B] flex items-center justify-center text-[#34C759]">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Motion Sensors</p>
                    <p className="text-[10px] text-[#8E8E99]">Enables shake phone gesture to trigger SOS</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={permMotion}
                  onChange={(e) => setPermMotion(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="pt-2 border-t border-[#2E2E36] space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentFriends}
                  onChange={(e) => setConsentFriends(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF3B30] rounded cursor-pointer shrink-0"
                />
                <span className="text-[11px] text-[#CCCCCC] leading-tight">
                  In an emergency, share my live location, name, photo and phone number with my 5 closest friends.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentProvider}
                  onChange={(e) => setConsentProvider(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF3B30] rounded cursor-pointer shrink-0"
                />
                <span className="text-[11px] text-[#CCCCCC] leading-tight">
                  In an emergency, share my location and photo with the service provider my friend dispatches.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentDangerZone}
                  onChange={(e) => setConsentDangerZone(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF3B30] rounded cursor-pointer shrink-0"
                />
                <span className="text-[11px] text-[#CCCCCC] leading-tight">
                  Notify my network automatically when I enter a high-risk area. (Optional)
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentPolicy}
                  onChange={(e) => setConsentPolicy(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF3B30] rounded cursor-pointer shrink-0"
                />
                <span className="text-[11px] text-[#CCCCCC] leading-tight">
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenPrivacyPolicy) onOpenPrivacyPolicy();
                    }}
                    className="text-[#3D8BFF] underline inline-flex items-center gap-0.5"
                  >
                    Privacy Policy <ExternalLink size={10} />
                  </button>
                  .
                </span>
              </label>
            </div>

            <p className="text-[10px] text-[#5C5C66] italic">
              You can change or withdraw any of these consents at any time in Settings.
            </p>
          </div>

          <button
            onClick={onComplete}
            disabled={!isConsentValid}
            className={`w-full h-14 font-condensed font-bold uppercase text-lg tracking-wider rounded-xl transition-colors mt-2 ${
              isConsentValid
                ? 'bg-white text-black hover:bg-neutral-200 cursor-pointer'
                : 'bg-[#24242B] text-[#5C5C66] cursor-not-allowed'
            }`}
          >
            FINISH SETUP
          </button>
        </div>
      )}
    </div>
  );
};
