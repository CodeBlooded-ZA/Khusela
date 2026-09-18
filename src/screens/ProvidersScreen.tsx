import React, { useState } from 'react';
import { ServiceProvider } from '../types';
import { DarkMap } from '../components/DarkMap';
import { Search, Shield, Star, CheckCircle2, ChevronRight, Phone, Globe, X } from 'lucide-react';

interface ProvidersScreenProps {
  providers: ServiceProvider[];
  onOpenRegisterPortal: () => void;
}

export const ProvidersScreen: React.FC<ProvidersScreenProps> = ({
  providers,
  onOpenRegisterPortal
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'Police' | 'Ambulance' | 'Security' | 'Fire'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  const filteredProviders = providers.filter((p) => {
    if (filterType !== 'ALL' && p.type !== filterType) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featuredProviders = providers.filter((p) => p.isSponsored || p.rating >= 4.7);

  return (
    <div className="relative w-full h-full flex flex-col bg-black text-white overflow-hidden select-none">
      {/* A. Top Bar: PROVIDERS on left, search icon on right */}
      <div className="w-full h-12 bg-black border-b border-[#2E2E36] px-4 flex items-center justify-between shrink-0">
        <h2 className="font-condensed font-extrabold uppercase text-xl text-white tracking-wider">
          ACCREDITED PROVIDERS
        </h2>
        <div className="w-8 h-8 rounded-full bg-[#16161A] border border-[#2E2E36] flex items-center justify-center text-[#8E8E99]">
          <Search size={16} />
        </div>
      </div>

      {/* B. Filter Chips: ALL | POLICE | AMBULANCE | SECURITY | FIRE */}
      <div className="px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto shrink-0 border-b border-[#2E2E36] bg-[#16161A]">
        {(['ALL', 'Police', 'Ambulance', 'Security', 'Fire'] as const).map((t) => {
          const isActive = filterType === t;
          return (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-condensed uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#24242B] text-[#8E8E99] hover:text-white border border-[#2E2E36]'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* C. FEATURED NEAR YOU (Advertising carousel, 300px wide cards) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99]">
              FEATURED EMERGENCY FLEETS
            </span>
            <span className="text-[10px] text-[#5C5C66] uppercase font-mono">
              POPIA & PSIRA CERTIFIED
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {featuredProviders.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p)}
                className="w-[280px] shrink-0 rounded-2xl bg-[#16161A] border border-[#2E2E36] overflow-hidden cursor-pointer hover:border-white transition-all shadow-xl"
              >
                {/* Dark Photo Banner with gradient & SPONSORED badge */}
                <div className="relative h-28 w-full bg-[#24242B] overflow-hidden">
                  <img
                    src={p.bannerUrl || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80'}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-black/60" />

                  {/* SPONSORED Badge */}
                  {p.isSponsored && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded border border-[#5C5C66] bg-black/60 text-[#8E8E99] font-mono text-[9px] uppercase tracking-wider">
                      SPONSORED
                    </span>
                  )}

                  {/* Overlapping Logo */}
                  <div className="absolute bottom-2 left-3 w-11 h-11 rounded-xl bg-black border-2 border-white flex items-center justify-center font-condensed font-extrabold text-sm text-white shadow-lg">
                    {p.logoText}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 pt-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-condensed font-extrabold uppercase text-white text-base truncate">
                      {p.name}
                    </h3>
                    <CheckCircle2 size={15} className="text-[#34C759] shrink-0" />
                  </div>

                  <p className="text-xs text-[#8E8E99] mt-0.5">
                    {p.type} · <span className="text-[#3D8BFF]">Avg response {p.stats.avgResponse}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2E2E36] text-xs">
                    <span className="text-[#FFC400] flex items-center gap-1 font-bold">
                      <Star size={13} className="fill-[#FFC400]" /> {p.rating}
                      <span className="text-[#8E8E99] font-normal">({p.reviewsCount})</span>
                    </span>
                    <span className="text-[#FF3B30] font-bold">
                      {p.distanceKm} km away
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* D. ALL PROVIDERS LIST */}
        <div className="space-y-2">
          <h3 className="text-[11px] font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99]">
            ALL ACCREDITED RESPONDERS ({filteredProviders.length})
          </h3>

          <div className="space-y-2">
            {filteredProviders.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p)}
                className="p-3 rounded-2xl bg-[#16161A] hover:bg-[#24242B] border border-[#2E2E36] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#24242B] border border-[#2E2E36] flex items-center justify-center font-condensed font-extrabold text-white text-xs shrink-0">
                    {p.logoText}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-condensed font-extrabold uppercase text-white text-sm truncate">
                        {p.name}
                      </h4>
                      <CheckCircle2 size={13} className="text-[#34C759] shrink-0" />
                    </div>

                    <p className="text-[11px] text-[#8E8E99]">
                      {p.type} · {p.distanceKm} km · <span className="text-[#34C759] font-medium">{p.stats.avgResponse}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#FFC400] font-bold flex items-center gap-0.5">
                    <Star size={12} className="fill-[#FFC400]" /> {p.rating}
                  </span>
                  <ChevronRight size={16} className="text-[#8E8E99]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* F. JOIN BANNER AT END OF LIST (Advertising & Partner Onboarding) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#24242B] to-[#16161A] border-l-4 border-l-[#FF3B30] border border-[#2E2E36] space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-[#FF3B30]">
            <Shield size={18} />
            <h4 className="font-condensed font-extrabold uppercase text-base text-white tracking-wider">
              ARE YOU A SERVICE PROVIDER?
            </h4>
          </div>

          <p className="text-xs text-[#8E8E99] leading-relaxed">
            PSIRA registered private security companies, ambulance services, and community patrols can register, advertise, and receive live emergency dispatch requests.
          </p>

          <button
            onClick={onOpenRegisterPortal}
            className="w-full py-2.5 bg-white text-black font-condensed font-extrabold uppercase tracking-wider text-xs rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            REGISTER ORGANISATION / PORTAL
          </button>
        </div>
      </div>

      {/* E. PROVIDER PROFILE MODAL / SHEET */}
      {selectedProvider && (
        <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-md flex items-end justify-center p-0 sm:p-4 select-none">
          <div className="w-full max-w-[380px] bg-[#16161A] border border-[#2E2E36] rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2E2E36] pb-2">
              <span className="text-xs font-mono text-[#8E8E99] uppercase">
                ACCREDITATION: PSIRA #29481
              </span>
              <button
                onClick={() => setSelectedProvider(null)}
                className="w-7 h-7 rounded-full bg-[#24242B] flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Profile banner & logo */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#24242B] border-2 border-[#34C759] flex items-center justify-center text-lg font-condensed font-extrabold text-white shrink-0">
                {selectedProvider.logoText}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-condensed font-extrabold uppercase text-xl text-white leading-tight">
                    {selectedProvider.name}
                  </h3>
                  <CheckCircle2 size={18} className="text-[#34C759]" />
                </div>
                <p className="text-xs text-[#8E8E99]">{selectedProvider.address}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#FFC400]">
                  <span className="font-bold">★ {selectedProvider.rating}</span>
                  <span className="text-[#8E8E99]">({selectedProvider.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Three Stat Boxes: Avg response / Responses this month / Coverage km */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#24242B] border border-[#2E2E36]">
                <p className="text-[10px] text-[#8E8E99] uppercase font-condensed">AVG RESPONSE</p>
                <p className="text-sm font-extrabold text-[#34C759] font-condensed mt-0.5">
                  {selectedProvider.stats.avgResponse}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#24242B] border border-[#2E2E36]">
                <p className="text-[10px] text-[#8E8E99] uppercase font-condensed">MONTHLY DISPATCH</p>
                <p className="text-sm font-extrabold text-white font-condensed mt-0.5">
                  {selectedProvider.stats.monthlyResponses}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#24242B] border border-[#2E2E36]">
                <p className="text-[10px] text-[#8E8E99] uppercase font-condensed">COVERAGE</p>
                <p className="text-sm font-extrabold text-[#3D8BFF] font-condensed mt-0.5">
                  {selectedProvider.stats.coverageRadius}
                </p>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] mb-1">
                ABOUT UNIT
              </h4>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                {selectedProvider.about}
              </p>
            </div>

            {/* Service Chips */}
            <div>
              <h4 className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#8E8E99] mb-1.5">
                CAPABILITIES
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvider.services.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#24242B] border border-[#2E2E36] text-[11px] text-white font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Dark coverage map */}
            <div className="h-28 rounded-xl overflow-hidden border border-[#2E2E36] relative">
              <DarkMap height="100%" showUser={false} userCoords={{ x: 50, y: 50 }} />
              <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[#8E8E99]">
                Area Coverage: {selectedProvider.coverageKm}km Radius
              </div>
            </div>

            {/* Action Buttons: CALL & WEBSITE */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${selectedProvider.phone}`}
                className="py-3 bg-[#34C759] hover:bg-green-600 text-black font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Phone size={14} className="fill-black" />
                CALL PROVIDER
              </a>

              <button
                onClick={() => setSelectedProvider(null)}
                className="py-3 bg-[#24242B] hover:bg-[#2E2E36] text-white font-condensed font-extrabold uppercase text-xs tracking-wider rounded-xl border border-[#2E2E36]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
