import React, { useState } from 'react';
import { Incident } from '../types';
import { ArrowLeft, MapPin, Camera, Check, Shield } from 'lucide-react';
import { DarkMap } from '../components/DarkMap';

interface ReportIncidentScreenProps {
  onBack: () => void;
  onSubmitReport: (newIncident: Partial<Incident>) => void;
  currentLocationName?: string;
}

export const ReportIncidentScreen: React.FC<ReportIncidentScreenProps> = ({
  onBack,
  onSubmitReport,
  currentLocationName = 'Bree St (Lilian Ngoyi), Braamfontein'
}) => {
  const [category, setCategory] = useState('Suspicious vehicle');
  const [locationAddress, setLocationAddress] = useState(currentLocationName);
  const [pinCoords, setPinCoords] = useState({ x: 50, y: 55 });
  const [details, setDetails] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  const categories = [
    'Suspicious person',
    'Suspicious vehicle',
    'Harassment',
    'Mugging',
    'Break-in',
    'Unsafe area / No lights',
    'Other hazard'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    onSubmitReport({
      title: `${category.toUpperCase()} REPORTED`,
      location: locationAddress,
      distanceKm: 0.3,
      timeAgo: 'Just now',
      description: details.trim(),
      status: 'recent',
      category: category,
      verified: false,
      x: pinCoords.x,
      y: pinCoords.y,
      reportedBy: anonymous ? 'Anonymous resident' : 'Thandi Ndlovu',
      photos: hasPhoto
        ? ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80']
        : undefined,
      timeline: [
        { time: 'Just now', text: `Report submitted by ${anonymous ? 'community member (anonymous)' : 'Thandi Ndlovu'}` }
      ]
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-y-auto select-none">
      {/* Top Bar with Back Arrow */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-white hover:bg-[#24242B]"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="font-condensed font-extrabold uppercase text-lg text-white tracking-wider">
          REPORT AN INCIDENT
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* WHAT HAPPENED? Dropdown */}
          <div>
            <label className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1.5">
              WHAT HAPPENED?
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 bg-[#24242B] border border-[#2E2E36] rounded-xl px-3 text-sm text-white font-medium focus:outline-none focus:border-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#16161A] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* WHERE? Address + 150px interactive mini map with pin */}
          <div>
            <label className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1.5">
              WHERE?
            </label>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[#3D8BFF]">➤</span>
              <input
                type="text"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                className="flex-1 bg-transparent border-b border-[#2E2E36] pb-1 text-sm text-[#3D8BFF] font-medium focus:outline-none focus:border-[#3D8BFF]"
              />
            </div>

            {/* 150px mini map */}
            <div
              className="w-full h-[150px] rounded-xl overflow-hidden border border-[#2E2E36] relative cursor-crosshair"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                setPinCoords({ x, y });
              }}
            >
              <DarkMap
                height="100%"
                showUser={false}
                userCoords={pinCoords}
                incidents={[
                  {
                    id: 'temp-pin',
                    title: category,
                    location: locationAddress,
                    distanceKm: 0.1,
                    timeAgo: 'Now',
                    description: '',
                    status: 'recent',
                    category: category,
                    verified: false,
                    x: pinCoords.x,
                    y: pinCoords.y,
                    timeline: []
                  }
                ]}
              />
              <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[#8E8E99] pointer-events-none">
                Tap map to place exact incident pin
              </div>
            </div>
          </div>

          {/* DETAILS textarea */}
          <div>
            <label className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1.5">
              DETAILS
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what you observed (e.g. number of people, vehicle color, direction they moved)..."
              className="w-full bg-[#24242B] border border-[#2E2E36] rounded-xl p-3 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none focus:border-white resize-none"
            />
          </div>

          {/* ADD PHOTO OR VIDEO dashed box */}
          <div>
            <label className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] block mb-1.5">
              EVIDENCE / PHOTO (OPTIONAL)
            </label>
            <div
              onClick={() => setHasPhoto(!hasPhoto)}
              className="w-full h-20 border-2 border-dashed border-[#2E2E36] hover:border-white rounded-xl flex items-center justify-center gap-2 cursor-pointer bg-[#16161A] transition-colors"
            >
              {hasPhoto ? (
                <div className="flex items-center gap-2 text-[#34C759] text-xs font-bold font-condensed uppercase">
                  <Check size={16} /> Photo Attached (IMG_2819.JPG) · Tap to remove
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#8E8E99] text-xs">
                  <Camera size={16} /> Tap to attach photo or video
                </div>
              )}
            </div>
          </div>

          {/* TOGGLE ANONYMOUS */}
          <div className="p-3 rounded-xl bg-[#16161A] border border-[#2E2E36] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white uppercase font-condensed">
                REPORT ANONYMOUSLY
              </p>
              <p className="text-[10px] text-[#8E8E99]">
                Your name and profile will be hidden from the public feed.
              </p>
            </div>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-4 h-4 accent-[#FF3B30] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!details.trim()}
          className={`w-full h-14 font-condensed font-extrabold uppercase text-base tracking-wider rounded-xl transition-colors mt-4 ${
            details.trim()
              ? 'bg-[#FF3B30] hover:bg-red-600 text-white cursor-pointer shadow-lg'
              : 'bg-[#24242B] text-[#5C5C66] cursor-not-allowed'
          }`}
        >
          SUBMIT REPORT TO COMMUNITY
        </button>
      </form>
    </div>
  );
};
