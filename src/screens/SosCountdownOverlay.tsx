import React, { useState, useEffect } from 'react';

interface SosCountdownOverlayProps {
  onCountdownComplete: () => void;
  onCancel: () => void;
}

export const SosCountdownOverlay: React.FC<SosCountdownOverlayProps> = ({
  onCountdownComplete,
  onCancel
}) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 1) {
      const timer = setTimeout(() => {
        onCountdownComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, onCountdownComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-8 select-none animate-fade-in overflow-hidden">
      {/* Red radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.45)_0%,rgba(0,0,0,0.95)_75%)] pointer-events-none animate-pulse" />

      {/* Top Header */}
      <div className="relative z-10 text-center pt-8">
        <span className="px-3 py-1 bg-[#FF3B30] text-white text-[11px] font-extrabold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,59,48,0.8)]">
          EMERGENCY PROTOCOL INITIATING
        </span>
        <h2 className="font-condensed font-extrabold text-[28px] uppercase tracking-wider text-white mt-4">
          ALERTING YOUR NETWORK
        </h2>
        <p className="text-sm text-[#8E8E99] mt-1 max-w-[280px] mx-auto">
          Broadcasting live GPS coordinates & streaming evidence to your 5 trusted contacts.
        </p>
      </div>

      {/* Huge Countdown Number */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="relative w-44 h-44 rounded-full border-4 border-[#FF3B30] flex items-center justify-center shadow-[0_0_50px_rgba(255,59,48,0.6)] bg-black/50 backdrop-blur-md">
          <span className="font-condensed font-extrabold text-[120px] text-white leading-none tracking-tight animate-ping-short">
            {count}
          </span>
        </div>
      </div>

      {/* Bottom White-outlined Cancel Pill */}
      <div className="relative z-10 w-full pb-8">
        <button
          onClick={onCancel}
          className="w-full h-14 rounded-full border-2 border-white bg-transparent hover:bg-white/10 text-white font-condensed font-extrabold uppercase text-lg tracking-wider transition-all cursor-pointer"
        >
          CANCEL ALERT
        </button>
      </div>
    </div>
  );
};
