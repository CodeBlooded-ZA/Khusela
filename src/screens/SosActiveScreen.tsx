import React, { useState, useEffect } from 'react';
import { Friend } from '../types';
import { DarkMap } from '../components/DarkMap';
import { PhoneCall, Send, ShieldAlert, Check, X, Camera } from 'lucide-react';

interface SosActiveScreenProps {
  friends: Friend[];
  onCancelSos: (pin: string) => boolean; // returns true if verified
  onDispatchedHelp: () => void;
  userLocation?: { x: number; y: number };
}

export const SosActiveScreen: React.FC<SosActiveScreenProps> = ({
  friends,
  onCancelSos,
  onDispatchedHelp,
  userLocation = { x: 48, y: 52 }
}) => {
  // Timer state
  const [seconds, setSeconds] = useState(42);
  const [cameraActive, setCameraActive] = useState(true);

  // Friends status progression: SENT (grey) -> SEEN (yellow) -> RESPONDING (green)
  const [friendStatuses, setFriendStatuses] = useState<Record<string, 'SENT' | 'SEEN' | 'RESPONDING'>>({
    f1: 'RESPONDING', // Lerato
    f2: 'SEEN',       // Naledi
    f3: 'SEEN',       // Ayesha
    f4: 'SENT',       // Zanele
    f5: 'SENT'        // Busi
  });

  // Chat message state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'Lerato',
      text: "I'm sending help to your location now. Stay where you are. We can see your live coordinates.",
      time: 'Just now'
    }
  ]);

  // PIN modal state for "I'M SAFE"
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinDigits, setPinDigits] = useState<string[]>([]);
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: 'You', text: chatInput.trim(), time: 'Just now' }]);
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
      {/* Upper 60%: Dark Map with Pulsing Red Dot */}
      <div className="relative h-[58%] w-full">
        <DarkMap
          height="100%"
          showUser={true}
          userCoords={userLocation}
          userStatus="alert"
        />

        {/* Top-Left: Alert Active + LIVE badge + running timer */}
        <div className="absolute top-3 left-3 z-30 flex flex-col items-start bg-black/80 backdrop-blur-md p-2 rounded-xl border border-[#2E2E36]">
          <div className="flex items-center gap-2">
            <span className="font-condensed font-extrabold uppercase text-[15px] text-white tracking-wider">
              ALERT ACTIVE
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FF3B30] text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 animate-pulse shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              LIVE
            </span>
          </div>
          <span className="text-xs font-mono text-[#8E8E99] font-medium mt-0.5">
            Duration: {formatTimer(seconds)}
          </span>
        </div>

        {/* Top-Right: Small floating tile showing front camera preview with record dot */}
        <div
          onClick={() => setCameraActive(!cameraActive)}
          className="absolute top-3 right-3 z-30 w-20 h-28 rounded-xl overflow-hidden border-2 border-[#FF3B30] bg-[#16161A] shadow-2xl cursor-pointer"
          title="Live evidence recording"
        >
          {cameraActive ? (
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Front camera preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 px-1 py-0.5 rounded text-[8px] font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-ping" />
                REC
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center bg-black">
              <Camera size={18} className="text-[#8E8E99] mb-1" />
              <span className="text-[9px] text-[#8E8E99]">TAP TO RESUME</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area (Dark, 42% height) */}
      <div className="flex-1 bg-[#16161A] border-t border-[#2E2E36] px-4 pt-3 pb-2 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Friends Status Row: 5 avatars with status labels (SENT -> SEEN -> RESPONDING) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-condensed uppercase tracking-wider font-bold text-[#8E8E99]">
              5 TRUSTED FRIENDS NOTIFIED
            </span>
            <span className="text-[10px] font-bold text-[#34C759]">
              1 RESPONDING · 2 SEEN
            </span>
          </div>

          <div className="flex items-center justify-between gap-1">
            {friends.slice(0, 5).map((f) => {
              const status = friendStatuses[f.id] || 'SENT';
              return (
                <div key={f.id} className="flex flex-col items-center gap-1 flex-1">
                  <div className="relative">
                    <img
                      src={f.avatar}
                      alt={f.name}
                      className={`w-10 h-10 rounded-full object-cover border-2 ${
                        status === 'RESPONDING'
                          ? 'border-[#34C759] ring-2 ring-[#34C759]/40'
                          : status === 'SEEN'
                          ? 'border-[#FFC400]'
                          : 'border-[#5C5C66]'
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-black ${
                        status === 'RESPONDING'
                          ? 'bg-[#34C759]'
                          : status === 'SEEN'
                          ? 'bg-[#FFC400]'
                          : 'bg-[#5C5C66]'
                      }`}
                    />
                  </div>

                  <span className="text-[10px] text-white font-medium truncate max-w-[48px]">
                    {f.name}
                  </span>

                  <span
                    className={`text-[9px] font-condensed uppercase font-bold tracking-wider ${
                      status === 'RESPONDING'
                        ? 'text-[#34C759]'
                        : status === 'SEEN'
                        ? 'text-[#FFC400]'
                        : 'text-[#8E8E99]'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message bubble from the network */}
        <div className="my-2 bg-[#24242B] border border-[#2E2E36] rounded-2xl p-2.5 max-h-20 overflow-y-auto">
          {messages.map((m, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-bold text-[#3D8BFF] mr-1.5">{m.sender}:</span>
              <span className="text-[#E0E0E0]">{m.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Controls: Message Input Bar, Call 10111, I'M SAFE */}
        <div className="space-y-2 pt-1">
          {/* Message input bar */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message your network…"
              className="flex-1 h-10 bg-[#24242B] border border-[#2E2E36] rounded-full px-4 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] flex items-center justify-center text-white cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

          {/* Action Row: Call 10111 & I'M SAFE (PIN required) */}
          <div className="flex items-center gap-2">
            <a
              href="tel:10111"
              className="flex-1 h-11 rounded-xl bg-[#FF3B30] hover:bg-red-600 text-white font-condensed font-extrabold uppercase text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <PhoneCall size={16} />
              CALL 10111 (POLICE)
            </a>

            <button
              onClick={() => setShowPinModal(true)}
              className="px-4 h-11 rounded-xl bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] text-white font-condensed uppercase font-bold text-xs tracking-wider cursor-pointer"
            >
              I'M SAFE
            </button>
          </div>
        </div>
      </div>

      {/* 4-DIGIT SAFETY PIN MODAL */}
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

            {/* PIN digit slots */}
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

            {/* Keypad */}
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
