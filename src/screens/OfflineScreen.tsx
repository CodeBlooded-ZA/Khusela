import React, { useState } from 'react';
import { ArrowLeft, Send, Check } from 'lucide-react';

interface OfflineScreenProps {
  onBack: () => void;
}

export const OfflineScreen: React.FC<OfflineScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'USSD' | 'SMS'>('USSD');

  // 13a. USSD State
  const [ussdInput, setUssdInput] = useState('');
  const [ussdScreenText, setUssdScreenText] = useState<string>(
    `KHUSELA SAFETY *120*7233#\n\n1. Send SOS to my network\n2. Check in — I'm safe\n3. Report incident near me\n4. Find closest police / help\n5. Add friend to network\n0. Exit`
  );
  const [isAlertSent, setIsAlertSent] = useState(false);

  // 13b. SMS State
  const [smsMessages, setSmsMessages] = useState<Array<{ sender: string; text: string; isUser: boolean; time: string }>>([
    {
      sender: 'KHUSELA',
      text: '[KHUSELA ALERT] NALEDI NEEDS HELP. Location: near Alexandra Taxi Rank (-26.1042, 28.0931). Reply 1 to call her, 2 to dispatch SAPS, 3 to mark yourself responding.',
      isUser: false,
      time: '21:14'
    },
    {
      sender: 'You',
      text: '2',
      isUser: true,
      time: '21:15'
    },
    {
      sender: 'KHUSELA',
      text: '[KHUSELA] SAPS Alexandra notified. Ref: AX-4421. Officer dispatched. Naledi has been told help is coming.',
      isUser: false,
      time: '21:15'
    }
  ]);
  const [userSmsInput, setUserSmsInput] = useState('');

  const handleUssdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ussdInput.trim()) return;

    if (ussdInput.trim() === '1') {
      setIsAlertSent(true);
      setUssdScreenText(
        `ALERT SENT to Lerato, Ayesha, Zanele, Naledi, Busi via SMS with your cell tower location (Alexandra area). Help is being notified.\n\nReply 1 to cancel (enter PIN).\nReply 2 to call 10111.`
      );
    } else if (ussdInput.trim() === '2') {
      setUssdScreenText(
        `CHECK-IN CONFIRMED:\nSMS broadcast sent to your 5 contacts: "Thandi is safe (Checked in at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})."`
      );
    } else if (ussdInput.trim() === '4') {
      setUssdScreenText(
        `CLOSEST RESPONDERS:\n1. SAPS Alexandra (0.9km) - 011 321 7600\n2. Sentinel Security (1.4km) - 011 888 2400\n3. MedAssist (2.1km) - 082 911 0000\n\nReply number to auto-dial.`
      );
    } else if (ussdInput.trim() === '0') {
      setUssdScreenText(
        `Session ended. Khusela Safety background protection remains active on cell tower link.`
      );
    } else {
      setUssdScreenText(`Command "${ussdInput}" received.\nReturning to menu...\n\n1. Send SOS\n2. Check-in\n0. Exit`);
    }
    setUssdInput('');
  };

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSmsInput.trim()) return;

    const input = userSmsInput.trim();
    const newMsgs = [
      ...smsMessages,
      { sender: 'You', text: input, isUser: true, time: 'Just now' }
    ];

    if (input === '3') {
      newMsgs.push({
        sender: 'KHUSELA',
        text: '[KHUSELA] Status updated: You are recorded as RESPONDING. Naledi and your network have been alerted.',
        isUser: false,
        time: 'Just now'
      });
    } else if (input === '1') {
      newMsgs.push({
        sender: 'KHUSELA',
        text: '[KHUSELA] Connecting voice call to Naledi (+27 83 456 7890)...',
        isUser: false,
        time: 'Just now'
      });
    } else {
      newMsgs.push({
        sender: 'KHUSELA',
        text: `[KHUSELA] Received "${input}". Type 1 (Call), 2 (Dispatch SAPS), or 3 (Responding).`,
        isUser: false,
        time: 'Just now'
      });
    }

    setSmsMessages(newMsgs);
    setUserSmsInput('');
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
            OFFLINE EMERGENCY MODE
          </h2>
        </div>

        {/* Mode Switcher Pill */}
        <div className="flex items-center bg-[#16161A] border border-[#2E2E36] rounded-lg p-0.5 text-[11px] font-condensed uppercase font-bold">
          <button
            onClick={() => setActiveTab('USSD')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'USSD' ? 'bg-white text-black' : 'text-[#8E8E99]'
            }`}
          >
            USSD (*120*7233#)
          </button>
          <button
            onClick={() => setActiveTab('SMS')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'SMS' ? 'bg-white text-black' : 'text-[#8E8E99]'
            }`}
          >
            SMS ALERTS
          </button>
        </div>
      </div>

      {/* 13a. USSD INTERFACE SIMULATOR */}
      {activeTab === 'USSD' ? (
        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#8E8E99]">
              <span>GSM NETWORK: MTN SA / VODACOM</span>
              <span className="font-mono text-[#34C759]">ZERO AIRTIME RATE</span>
            </div>

            {/* Feature phone green-on-black or white-mono terminal window */}
            <div className="w-full min-h-[260px] bg-[#0A0A0C] border-2 border-[#33333D] rounded-2xl p-4 font-mono text-xs text-[#34C759] shadow-2xl whitespace-pre-line leading-relaxed selection:bg-[#34C759] selection:text-black">
              {ussdScreenText}
            </div>

            <p className="text-[11px] text-[#8E8E99] leading-tight">
              In deep load-shedding or when mobile data is exhausted, dial <span className="text-white font-mono font-bold">*120*7233#</span> to trigger SOS using GSM cellular towers.
            </p>
          </div>

          {/* Keypad / USSD Input Bar */}
          <div className="pt-2 space-y-2">
            <form onSubmit={handleUssdSubmit} className="flex gap-2">
              <input
                type="text"
                value={ussdInput}
                onChange={(e) => setUssdInput(e.target.value)}
                placeholder="Enter option number (e.g. 1)..."
                className="flex-1 h-12 bg-[#16161A] border border-[#2E2E36] rounded-xl px-4 font-mono text-sm text-white focus:outline-none focus:border-[#34C759]"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 h-12 bg-[#34C759] hover:bg-green-600 text-black font-condensed font-extrabold uppercase text-sm rounded-xl cursor-pointer"
              >
                SEND
              </button>
            </form>

            <button
              onClick={() => {
                setUssdScreenText(
                  `KHUSELA SAFETY *120*7233#\n\n1. Send SOS to my network\n2. Check in — I'm safe\n3. Report incident near me\n4. Find closest police / help\n5. Add friend to network\n0. Exit`
                );
                setIsAlertSent(false);
              }}
              className="w-full py-2 bg-[#16161A] border border-[#2E2E36] text-[#8E8E99] text-xs font-condensed uppercase font-bold rounded-xl"
            >
              RESET USSD MENU
            </button>
          </div>
        </div>
      ) : (
        /* 13b. SMS ALERTS SIMULATOR */
        <div className="flex-1 flex flex-col justify-between bg-[#16161A] overflow-hidden">
          {/* SMS Contact Header */}
          <div className="px-4 py-2 bg-black border-b border-[#2E2E36] flex items-center justify-between">
            <div>
              <p className="font-condensed font-extrabold uppercase text-white text-sm">
                KHUSELA SAFETY EMERGENCY SMS GATEWAY
              </p>
              <p className="text-[10px] text-[#34C759] font-mono">Shortcode: 32099 (Toll-Free)</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] animate-pulse" />
          </div>

          {/* SMS Chat Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {smsMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.isUser
                      ? 'bg-[#3D8BFF] text-white rounded-br-sm'
                      : 'bg-[#24242B] border border-[#2E2E36] text-[#E0E0E0] rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-[#5C5C66] mt-0.5 px-1 font-mono">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* SMS Input Bar */}
          <form onSubmit={handleSendSms} className="p-3 bg-black border-t border-[#2E2E36] flex items-center gap-2">
            <input
              type="text"
              value={userSmsInput}
              onChange={(e) => setUserSmsInput(e.target.value)}
              placeholder="Reply 1, 2, or 3..."
              className="flex-1 h-11 bg-[#16161A] border border-[#2E2E36] rounded-full px-4 text-xs text-white placeholder:text-[#8E8E99] focus:outline-none"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center cursor-pointer shadow-md"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
