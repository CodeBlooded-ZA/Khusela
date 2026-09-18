import React, { useState } from 'react';
import { Incident } from '../types';
import { ArrowLeft, MessageSquare, Share2, HandHeart, CheckCircle2, AlertCircle } from 'lucide-react';
import { DarkMap } from '../components/DarkMap';

interface IncidentDetailScreenProps {
  incident: Incident;
  onBack: () => void;
  onHelpNearby?: () => void;
}

export const IncidentDetailScreen: React.FC<IncidentDetailScreenProps> = ({
  incident,
  onBack,
  onHelpNearby
}) => {
  const [activeTab, setActiveTab] = useState<'UPDATES' | 'CHAT'>('UPDATES');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Lerato M.', text: 'Please stay safe anyone around there. Avoid the side alleys.', time: '8 mins ago' },
    { sender: 'Ayesha P.', text: 'SAPS patrol vehicle just turned onto Chris Hani Rd.', time: '3 mins ago' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [markedNearby, setMarkedNearby] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setChatMessages([...chatMessages, { sender: 'Thandi (You)', text: newComment.trim(), time: 'Just now' }]);
    setNewComment('');
  };

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-hidden relative">
      {/* Top 40%: Dark Map with glowing incident pin in center */}
      <div className="relative h-[40%] w-full shrink-0 border-b border-[#2E2E36]">
        <DarkMap
          height="100%"
          showUser={false}
          incidents={[incident]}
          userCoords={{ x: incident.x, y: incident.y }}
        />

        {/* Floating Back Arrow Top-Left */}
        <button
          onClick={onBack}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/80 border border-[#2E2E36] flex items-center justify-center text-white hover:bg-[#24242B] transition-colors z-20 shadow-md cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Live badge if live */}
        {incident.status === 'live' && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FF3B30] text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-lg z-20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            LIVE ALERT
          </div>
        )}
      </div>

      {/* Tabs: UPDATES | CHAT */}
      <div className="flex items-center px-4 bg-[#16161A] border-b border-[#2E2E36] shrink-0">
        <button
          onClick={() => setActiveTab('UPDATES')}
          className={`py-2.5 px-3 text-xs font-condensed uppercase tracking-wider font-bold transition-all relative cursor-pointer ${
            activeTab === 'UPDATES' ? 'text-white' : 'text-[#8E8E99]'
          }`}
        >
          UPDATES
          {activeTab === 'UPDATES' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('CHAT')}
          className={`py-2.5 px-3 text-xs font-condensed uppercase tracking-wider font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'CHAT' ? 'text-white' : 'text-[#8E8E99]'
          }`}
        >
          COMMUNITY CHAT
          <span className="text-[10px] px-1.5 py-0.2 bg-[#24242B] rounded-full text-[#8E8E99]">
            {chatMessages.length}
          </span>
          {activeTab === 'CHAT' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Headline & Meta Line */}
        <div>
          <h2 className="font-condensed font-extrabold text-[22px] uppercase text-white leading-tight">
            {incident.title}
          </h2>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span className="text-[#3D8BFF] font-medium">
              ➤ {incident.location}
            </span>
            <span className="text-[#FF3B30] font-bold">
              {incident.distanceKm} km
            </span>
            <span className="text-[#8E8E99]">
              · {incident.timeAgo}
            </span>
          </div>
          <p className="text-sm text-[#8E8E99] mt-2">
            {incident.description}
          </p>
        </div>

        {/* Row of Three Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1 pb-2 border-b border-[#2E2E36]">
          <button
            onClick={() => setActiveTab('CHAT')}
            className="h-10 rounded-xl bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] text-white flex items-center justify-center gap-1.5 text-xs font-condensed uppercase tracking-wider transition-colors cursor-pointer"
          >
            <MessageSquare size={14} />
            Comment
          </button>

          <button
            onClick={handleShare}
            className="h-10 rounded-xl bg-[#24242B] hover:bg-[#2E2E36] border border-[#2E2E36] text-white flex items-center justify-center gap-1.5 text-xs font-condensed uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Share2 size={14} />
            Share
          </button>

          <button
            onClick={() => {
              setMarkedNearby(!markedNearby);
              if (onHelpNearby) onHelpNearby();
            }}
            className={`h-10 rounded-xl border flex items-center justify-center gap-1 text-[11px] font-condensed uppercase tracking-wider font-bold transition-colors cursor-pointer ${
              markedNearby
                ? 'bg-[#34C759]/20 border-[#34C759] text-[#34C759]'
                : 'bg-[#24242B] hover:bg-[#2E2E36] border-[#2E2E36] text-white'
            }`}
          >
            <HandHeart size={14} />
            {markedNearby ? 'Marked Nearby' : "I'm Nearby"}
          </button>
        </div>

        {/* Share Toast */}
        {shareToast && (
          <div className="p-2 rounded-lg bg-[#24242B] text-center text-xs text-white border border-[#2E2E36]">
            Incident broadcast link copied to clipboard
          </div>
        )}

        {/* TAB 1: UPDATES TIMELINE */}
        {activeTab === 'UPDATES' ? (
          <div className="space-y-3">
            <h3 className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#8E8E99]">
              LIVE VERIFIED TIMELINE
            </h3>

            {/* Vertical Thin Line with Dots */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#2E2E36]">
              {incident.timeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-black ${
                      idx === 0
                        ? 'bg-[#FF3B30] animate-pulse'
                        : 'bg-[#5C5C66]'
                    }`}
                  />
                  <div>
                    <span
                      className={`text-[11px] font-mono font-semibold ${
                        idx === 0 ? 'text-[#FF3B30]' : 'text-[#8E8E99]'
                      }`}
                    >
                      {entry.time}
                    </span>
                    <p className="text-sm font-semibold text-white mt-0.5 leading-snug">
                      {entry.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Grey Footnote */}
            <p className="text-[11px] text-[#5C5C66] pt-3 border-t border-[#2E2E36]">
              Reported by community members. Details are moderated and forwarded to nearest SAPS / CPF units.
            </p>
          </div>
        ) : (
          /* TAB 2: CHAT */
          <div className="space-y-3 flex flex-col h-full">
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#16161A] border border-[#2E2E36] text-xs">
                  <div className="flex items-center justify-between text-[#8E8E99] text-[10px] mb-1">
                    <span className="font-semibold text-white">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-[#CCCCCC]">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Message input bar */}
            <form onSubmit={handleSendComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share eyewitness update..."
                className="flex-1 h-10 bg-[#24242B] border border-[#2E2E36] rounded-full px-4 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 h-10 bg-white text-black font-condensed uppercase font-bold text-xs rounded-full hover:bg-neutral-200 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
