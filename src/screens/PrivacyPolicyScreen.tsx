import React from 'react';
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-hidden select-none">
      {/* Top Bar with Back Arrow */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-white hover:bg-[#24242B]"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="font-condensed font-extrabold uppercase text-lg text-white tracking-wider">
          PRIVACY POLICY & POPIA
        </h2>
      </div>

      {/* Readable Long-Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-[#CCCCCC] leading-relaxed">
        <div className="p-3 rounded-xl bg-[#16161A] border border-[#34C759] flex items-center gap-2 text-[#34C759]">
          <Shield size={18} />
          <span className="font-condensed font-extrabold uppercase text-xs">
            COMPLIANT WITH THE PROTECTION OF PERSONAL INFORMATION ACT (ACT 4 OF 2013)
          </span>
        </div>

        <div>
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            1. WHAT WE COLLECT
          </h3>
          <p>
            When you register and use Khusela Safety, we collect your name, verified South African mobile number, emergency PIN hash, trusted contacts list, and telemetry data (GPS coordinates and front-camera evidence buffers during active emergency alerts).
          </p>
        </div>

        <div>
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            2. WHY WE COLLECT IT
          </h3>
          <p>
            Your information is processed strictly to protect your physical safety and well-being in emergency situations, coordinate prompt dispatch of accredited emergency responders (SAPS, private security, ambulance services), and keep your trusted network informed when entering geofenced danger zones.
          </p>
        </div>

        <div>
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            3. WHO WE SHARE IT WITH
          </h3>
          <p>
            Your exact GPS telemetry is only broadcast to your 5 designated trusted contacts when you trigger an alert or enter an active danger zone. If you or a friend dispatch a service provider, your location and photo are transferred via end-to-end encrypted protocol to the verified terminal of that accredited service provider under emergency data processing provisions.
          </p>
        </div>

        <div>
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            4. HOW LONG WE KEEP IT (30-DAY PURGE)
          </h3>
          <p>
            Location tracks and active audio/video evidence recordings are automatically and permanently purged from our servers 30 days after the incident resolution, unless requested by the South African Police Service (SAPS) for an active criminal investigation docket.
          </p>
        </div>

        <div>
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            5. YOUR STATUTORY RIGHTS
          </h3>
          <p>
            Under Section 23 of POPIA, you have the right to request a complete machine-readable copy of your personal records, rectify inaccurate records, or demand the permanent deletion of your profile and historical telemetry at any time.
          </p>
        </div>

        <div className="pt-2 border-t border-[#2E2E36]">
          <h3 className="font-condensed font-extrabold uppercase text-white text-base mb-1">
            6. CONTACT OUR INFORMATION OFFICER
          </h3>
          <p>
            For statutory privacy inquiries or data subject access requests, contact our registered Information Officer:
          </p>
          <div className="mt-2 p-3 rounded-xl bg-[#16161A] border border-[#2E2E36] font-mono text-[11px] text-white">
            <p>Adv. N. Sithole</p>
            <p className="text-[#3D8BFF]">info-officer@khusela.org.za</p>
            <p>Khusela Safety NPC, Johannesburg, South Africa</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 bg-white text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl cursor-pointer mt-4"
        >
          RETURN TO SETTINGS
        </button>
      </div>
    </div>
  );
};
