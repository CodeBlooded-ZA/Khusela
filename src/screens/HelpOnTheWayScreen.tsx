import React, { useState, useEffect } from 'react';
import { ServiceProvider, Friend } from '../types';
import { DarkMap } from '../components/DarkMap';
import { Phone, CheckCircle2, Shield, Send, X } from 'lucide-react';

interface HelpOnTheWayScreenProps {
  provider: ServiceProvider;
  friends: Friend[];
  onCancelSos: (pin: string) => boolean;
  onHelpArrived?: () => void;
  userLocation?: { x: number; y: number };
  initialProgress?: number;
}

export const HelpOnTheWayScreen: React.FC<HelpOnTheWayScreenProps> = ({
  provider,
  friends,
  onCancelSos,
  onHelpArrived,
  userLocation = { x: 48, y: 52 },
  initialProgress = 0.2
}) => {
  // Vehicle coordinates moving along route toward userLocation
  // Start vehicle at (68, 28) moving towards (48, 52)
  const startCoords = { x: 68, y: 28 };
  const [routeProgress, setRouteProgress] = useState(initialProgress);
  const [etaMinutes, setEtaMinutes] = useState(provider.etaMinutes || 6);
  const [hasArrived, setHasArrived] = useState(false);

  // Chat message state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>([
    {
      sender: 'Officer S. Dlamini',
      text: "I'm on my way to your exact location. ETA 6 minutes. Hold tight, Thandi."
    }
  ]);

  // PIN modal state for "I'M SAFE NOW"
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState(false);
  const [showWhoIsComing, setShowWhoIsComing] = useState(false);

  // Animated vehicle progress
  useEffect(() => {
    const interval = setInterval(() => {
      setRouteProgress((prev) => {
        if (prev >= 0.98) {
          clearInterval(interval);
          setHasArrived(true);
          if (onHelpArrived) onHelpArrived();
          return 1;
        }
        const next = prev + 0.05;
        // Decrease ETA as it gets closer
        if (next > 0.7) setEtaMinutes(1);
        else if (next > 0.4) setEtaMinutes(3);
        else setEtaMinutes(5);
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [onHelpArrived]);

  // Current car coordinates interpolated
  const carX = startCoords.x + (userLocation.x - startCoords.x) * routeProgress;
  const carY = startCoords.y + (userLocation.y - startCoords.y) * routeProgress;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  const handlePinInput = (num: string) => {
    if (pinDigits.length < 4) {
      const updated = [...pinDigits, num];
      setPinDigits(updated);
      if (updated.length === 4) {
        const pinStr = updated.join('');
        const success = onCancelSos(pinStr);
        if (!success) {
          setPinError(true);
          setTimeout(() => {
            setPinDigits([]);
            setPinError(false);
          }, 800);
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black text-white overflow-hidden select-none">
      {/* Top Banner if arrived */}
      {hasArrived && (
        <div className="w-full bg-[#34C759] text-black px-4 py-2.5 flex items-center justify-between font-condensed font-extrabold uppercase text-sm tracking-wider z-40 animate-bounce-short">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="stroke-[3]" />
            <span>HELP HAS ARRIVED · OFFICER S. DLAMINI IS ON SCENE</span>
          </div>
        </div>
      )}

      {/* Upper 58%: Dark Map with car moving along route line */}
      <div className="relative h-[56%] w-full">
        <DarkMap
          height="100%"
          showUser={true}
          userCoords={userLocation}
          userStatus="alert"
          responderCarCoords={{ x: carX, y: carY }}
          routeProgress={routeProgress}
        />

        {/* Top-Left: Provider name in uppercase with timer below */}
        <div className="absolute top-3 left-3 z-30 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-[#2E2E36]">
          <div className="flex items-center gap-1.5">
            <span className="font-condensed font-extrabold uppercase text-[15px] text-white tracking-wider">
              {provider.name}
            </span>
          </div>
          <p className="text-xs font-mono text-[#34C759] font-bold mt-0.5">
            {hasArrived ? 'STATUS: ON SCENE' : `ETA: ${etaMinutes} MIN · RAPID DISPATCH`}
          </p>
        </div>

        {/* Top-Right: Small tile with responder's photo */}
        <div className="absolute top-3 right-3 z-30 w-16 h-20 rounded-xl overflow-hidden border-2 border-[#34C759] bg-[#16161A] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
            alt="Officer S. Dlamini"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[8px] font-bold text-white uppercase">
            DLAMINI
          </div>
        </div>

        {/* Centered Small Caps Link on Map's Lower Edge: "SEE WHO'S COMING" */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-30">
          <button
            onClick={() => setShowWhoIsComing(!showWhoIsComing)}
            className="px-3 py-1 bg-black/85 backdrop-blur-md border border-[#2E2E36] hover:border-white rounded-full text-[10px] font-condensed uppercase tracking-widest font-bold text-white shadow-xl cursor-pointer"
          >
            {showWhoIsComing ? 'HIDE VEHICLE DETAILS' : "SEE WHO'S COMING"}
          </button>
        </div>
      </div>

      {/* Bottom Area (Dark, 44% height) */}
      <div className="flex-1 bg-[#16161A] border-t border-[#2E2E36] px-4 pt-3 pb-2 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Responder Card */}
        <div className="p-3 rounded-2xl bg-[#24242B] border border-[#2E2E36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Officer S. Dlamini"
                className="w-12 h-12 rounded-full object-cover border border-[#2E2E36]"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#34C759] border-2 border-black flex items-center justify-center text-[7px] text-white font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-condensed font-extrabold uppercase text-white text-base leading-tight">
                  Officer S. Dlamini
                </h4>
                <span className="px-1.5 py-0.2 rounded bg-[#34C759]/20 text-[#34C759] font-bold text-[9px] uppercase">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#CCCCCC] mt-0.5">
                White Toyota Hilux · <span className="font-mono text-white">GP 12 AB 34</span>
              </p>
            </div>
          </div>

          <a
            href={`tel:${provider.phone}`}
            className="w-10 h-10 rounded-full bg-[#34C759] hover:bg-green-600 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
            title="Call Officer"
          >
            <Phone size={18} className="fill-black" />
          </a>
        </div>

        {/* Live Message Bubble from Officer */}
        <div className="my-1.5 p-2.5 rounded-xl bg-[#24242B]/80 border border-[#2E2E36] max-h-16 overflow-y-auto">
          {chatMessages.map((msg, i) => (
            <p key={i} className="text-xs">
              <span className="font-bold text-[#34C759] mr-1.5">{msg.sender}:</span>
              <span className="text-white">{msg.text}</span>
            </p>
          ))}
        </div>

        {/* Network status row: "Dispatched by Lerato · 3 friends responding" */}
        <div className="flex items-center justify-between px-1 text-[11px] text-[#8E8E99]">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {friends.slice(0, 3).map((f) => (
                <img
                  key={f.id}
                  src={f.avatar}
                  alt={f.name}
                  className="w-5 h-5 rounded-full object-cover border border-black"
                />
              ))}
            </div>
            <span className="text-white font-medium">Dispatched by Lerato</span>
          </div>
          <span className="text-[#34C759] font-semibold">3 friends responding</span>
        </div>

        {/* Bottom controls: Message Bar + I'M SAFE NOW */}
        <div className="space-y-2 pt-1">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send message to Officer Dlamini…"
              className="flex-1 h-10 bg-[#24242B] border border-[#2E2E36] rounded-full px-4 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] flex items-center justify-center text-white cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

          <button
            onClick={() => setShowPinModal(true)}
            className="w-full h-11 bg-white hover:bg-neutral-200 text-black font-condensed font-extrabold uppercase text-sm tracking-wider rounded-xl transition-colors cursor-pointer shadow-lg"
          >
            I'M SAFE NOW (VERIFY PIN)
          </button>
        </div>
      </div>

      {/* Vehicle Info Drawer Modal */}
      {showWhoIsComing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-3">
          <div className="w-full max-w-[360px] bg-[#16161A] border border-[#2E2E36] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <h3 className="font-condensed uppercase font-extrabold text-white text-base">
                OFFICER CREDENTIALS & VEHICLE
              </h3>
              <button onClick={() => setShowWhoIsComing(false)} className="text-[#8E8E99]">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#2E2E36]">
                <span className="text-[#8E8E99]">Security Organisation:</span>
                <span className="text-white font-semibold">{provider.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2E36]">
                <span className="text-[#8E8E99]">Tactical Officer:</span>
                <span className="text-white font-semibold">Sipho Dlamini (ID #SRR-884)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2E36]">
                <span className="text-[#8E8E99]">Patrol Vehicle:</span>
                <span className="text-white font-semibold">White Toyota Hilux 2.8GD-6</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2E36]">
                <span className="text-[#8E8E99]">Registration:</span>
                <span className="text-[#3D8BFF] font-mono font-bold">GP 12 AB 34</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#2E2E36]">
                <span className="text-[#8E8E99]">PSIRA Accreditation:</span>
                <span className="text-[#34C759] font-mono font-bold">2948210 / A1 Verified</span>
              </div>
            </div>

            <button
              onClick={() => setShowWhoIsComing(false)}
              className="w-full py-2 bg-[#24242B] text-white font-condensed uppercase tracking-wider rounded-xl text-xs font-bold mt-2"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Safety PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] bg-[#16161A] border border-[#2E2E36] rounded-3xl p-5 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-condensed uppercase tracking-wider font-bold text-[#8E8E99]">
                VERIFY SAFETY
              </span>
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPinDigits([]);
                }}
                className="text-[#8E8E99] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <h3 className="font-condensed font-extrabold uppercase text-xl text-white">
                ENTER 4-DIGIT SAFETY PIN
              </h3>
              <p className="text-xs text-[#8E8E99] mt-1">
                Default demo PIN is <span className="font-mono text-white font-bold">1234</span>
              </p>
            </div>

            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-11 h-13 rounded-xl border flex items-center justify-center text-xl font-bold ${
                    pinDigits[idx]
                      ? 'border-white bg-[#24242B] text-white'
                      : 'border-[#2E2E36] bg-black text-transparent'
                  } ${pinError ? 'border-[#FF3B30] text-[#FF3B30]' : ''}`}
                >
                  {pinDigits[idx] ? '●' : ''}
                </div>
              ))}
            </div>

            {pinError && (
              <p className="text-xs text-[#FF3B30] font-bold">
                Incorrect PIN. Please try again.
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 pt-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    if (k === 'C') setPinDigits([]);
                    else if (k === '⌫') setPinDigits(pinDigits.slice(0, -1));
                    else handlePinInput(k);
                  }}
                  className="h-11 rounded-xl bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] font-mono text-base font-bold text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
