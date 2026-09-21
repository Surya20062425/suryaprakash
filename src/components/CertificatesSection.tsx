import React, { useState } from 'react';
import { useSound } from './SoundContext';
import { CERTIFICATES } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Copy, 
  Check, 
  X,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PixelRevealTransition } from './PixelRevealTransition';

interface CertificatesSectionProps {
  onNavigatePage?: (page: any) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = () => {
  const { playHover, playClick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCertModal, setActiveCertModal] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category filter items
  const categories = [
    { id: 'all', label: 'All Licenses', count: CERTIFICATES.length },
    { id: 'ux', label: 'UX & Research', count: CERTIFICATES.filter(c => c.category === 'ux').length },
    { id: 'enterprise', label: 'Enterprise Systems', count: CERTIFICATES.filter(c => c.category === 'enterprise').length },
    { id: 'architecture', label: 'Cloud Architecture', count: CERTIFICATES.filter(c => c.category === 'architecture').length },
    { id: 'leadership', label: 'Agile & Strategy', count: CERTIFICATES.filter(c => c.category === 'leadership').length },
  ];

  const filteredCertificates = CERTIFICATES.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesQuery = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates-section" className="relative w-full bg-[#070707] border-t border-[#131418] py-24 px-4 md:px-8">
      {/* Top Section-to-Section Pixel Matrix Reveal from Selected Work */}
      <PixelRevealTransition mode="enter" color="#070707" className="-top-14" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-[#747785] border-b border-[#25272F] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9df133] animate-pulse"></span>
            <span className="text-[#9df133] font-bold">// ACCREDITATION TERMINAL</span>
          </div>

          <span className="text-[#747785]">04 — VERIFIED CREDENTIALS & LICENSES</span>
        </div>

        {/* Section Heading & Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#F5F0EB]">
              Certified <span className="text-[#9df133]">Mastery</span> & Licenses
            </h2>
            <p className="mt-4 font-mono text-sm text-[#B0B4C0] leading-relaxed">
              Formally verified credentials spanning enterprise design system governance, quantitative cognitive heuristics, human-computer interaction, and cloud frontend architecture.
            </p>
          </div>

          {/* Quick Credential Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#12141A] border border-[#25272F] p-3 chamfer-sm">
              <div className="font-mono text-xs text-[#747785] uppercase">Total Licenses</div>
              <div className="font-heading font-bold text-xl text-[#9df133] mt-0.5">06 Active</div>
            </div>
            <div className="bg-[#12141A] border border-[#25272F] p-3 chamfer-sm">
              <div className="font-mono text-xs text-[#747785] uppercase">Status</div>
              <div className="font-heading font-bold text-xl text-[#F5F0EB] mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9df133]" />
                <span>100% Valid</span>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#12141A] border border-[#25272F] p-3 chamfer-sm">
              <div className="font-mono text-xs text-[#747785] uppercase">Issuing Bodies</div>
              <div className="font-heading font-bold text-xl text-[#64e8ff] mt-0.5">Global Tier 1</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#25272F]/50">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat.id);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all chamfer-sm ${
                    active
                      ? 'bg-[#9df133] text-black font-bold shadow-[0_0_12px_rgba(157,241,51,0.25)]'
                      : 'bg-[#12141A] text-[#747785] hover:text-[#F5F0EB] hover:bg-[#181B22] border border-[#25272F]'
                  }`}
                >
                  {cat.label} <span className={active ? 'text-black/70' : 'text-[#9df133]'}>[{cat.count}]</span>
                </button>
              );
            })}
          </div>

          {/* Keyword Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#747785] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, issuer, or ID..."
              className="w-full bg-[#12141A] border border-[#25272F] text-[#F5F0EB] pl-9 pr-3 py-1.5 font-mono text-xs placeholder:text-[#747785] focus:outline-none focus:border-[#9df133] chamfer-sm"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => {
            const isCopied = copiedId === cert.credentialId;
            return (
              <div
                key={cert.id}
                onClick={() => {
                  playClick();
                  setActiveCertModal(cert);
                }}
                onMouseEnter={playHover}
                className="group relative bg-[#0E1015] hover:bg-[#12141A] border border-[#25272F] hover:border-[#9df133]/60 p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer chamfer-card shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:-translate-y-1"
              >
                {/* Header row: Index & Verified Seal */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                    <span className="text-[#9df133] font-bold">[{cert.index}] // {cert.issuerOrg.toUpperCase()}</span>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#9df133]/10 text-[#9df133] border border-[#9df133]/30 chamfer-sm text-[11px] font-bold">
                      <ShieldCheck className="w-3 h-3 text-[#9df133]" />
                      <span>{cert.status}</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-heading font-black text-xl text-[#F5F0EB] group-hover:text-[#9df133] transition-colors leading-tight mb-2">
                    {cert.title}
                  </h3>

                  <div className="font-mono text-xs text-[#747785] mb-4">
                    Issued by <span className="text-[#B0B4C0] font-semibold">{cert.issuer}</span> • {cert.issueDate}
                  </div>

                  {/* Summary */}
                  <p className="font-mono text-xs text-[#747785] group-hover:text-[#B0B4C0] transition-colors leading-relaxed line-clamp-3 mb-6">
                    {cert.summary}
                  </p>
                </div>

                {/* Bottom metadata: Skills and Credential ID */}
                <div>
                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-[#171920] border border-[#25272F] text-[#B0B4C0] font-mono text-[10px] uppercase chamfer-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[#747785] font-mono text-[10px]">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-[#25272F]/60 flex items-center justify-between">
                    <button
                      onClick={(e) => handleCopyId(cert.credentialId, e)}
                      title="Copy Credential ID"
                      className="flex items-center gap-1.5 font-mono text-[11px] text-[#747785] hover:text-[#9df133] transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#9df133]" />
                          <span className="text-[#9df133]">ID Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>ID: {cert.credentialId}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#9df133] group-hover:translate-x-1 transition-transform">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Continuity Cue */}
        <div className="mt-16 pt-8 border-t border-[#25272F] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#747785]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9df133]"></span>
            <span>SYSTEM STATUS // VERIFIED CREDENTIALS & LICENSES [2020–2025]</span>
          </div>

          <div className="flex items-center gap-2 text-[#9df133]">
            <span>SCROLL FOR CONTACT & FOOTER</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Credential Detail Modal */}
      {activeCertModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCertModal(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0E1015] border border-[#9df133]/40 p-6 md:p-8 chamfer-card shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClick();
                setActiveCertModal(null);
              }}
              className="absolute top-4 right-4 p-2 bg-[#171920] hover:bg-[#9df133] text-[#747785] hover:text-black transition-colors chamfer-sm"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#9df133] uppercase tracking-widest mb-3">
              <Award className="w-4 h-4" />
              <span>OFFICIAL ACCREDITATION RECORD // {activeCertModal.credentialId}</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F0EB] mb-2 leading-tight">
              {activeCertModal.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[#747785] mb-6 pb-4 border-b border-[#25272F]">
              <span>Issued by: <strong className="text-[#F5F0EB]">{activeCertModal.issuer}</strong></span>
              <span>Year: <strong className="text-[#9df133]">{activeCertModal.issueDate}</strong></span>
              <span>Status: <strong className="text-[#9df133]">{activeCertModal.status} (Valid)</strong></span>
            </div>

            {/* Scope / Summary */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#9df133] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Certification Curriculum & Scope</span>
              </h4>
              <p className="font-mono text-xs sm:text-sm text-[#B0B4C0] leading-relaxed bg-[#12141A] p-4 border border-[#25272F] chamfer-sm">
                {activeCertModal.summary}
              </p>
            </div>

            {/* Tested Core Competencies */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#9df133] mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Verified Core Competencies</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCertModal.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-[#12141A] border border-[#25272F] text-xs font-mono text-[#F5F0EB] chamfer-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9df133] shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Credential ID copy and verification action */}
            <div className="pt-6 border-t border-[#25272F] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={(e) => handleCopyId(activeCertModal.credentialId, e)}
                className="flex items-center gap-2 px-3 py-2 bg-[#12141A] hover:bg-[#181B22] border border-[#25272F] text-[#F5F0EB] font-mono text-xs uppercase tracking-wider chamfer-sm transition-colors"
              >
                {copiedId === activeCertModal.credentialId ? (
                  <>
                    <Check className="w-4 h-4 text-[#9df133]" />
                    <span className="text-[#9df133]">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#747785]" />
                    <span>Copy Credential ID</span>
                  </>
                )}
              </button>

              {activeCertModal.verificationUrl && (
                <a
                  href={activeCertModal.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#9df133] hover:bg-[#85cc2b] text-black font-heading font-bold text-xs uppercase tracking-wider chamfer-sm transition-all shadow-[0_0_15px_rgba(157,241,51,0.3)]"
                >
                  <span>Verify Registry Record</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
