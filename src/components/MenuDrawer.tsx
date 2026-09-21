import React, { useEffect } from 'react';
import { useSound } from './SoundContext';
import { X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { SOCIAL_GROUPS } from '../data/portfolioData';
import { AppPage } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  activePage: AppPage;
  onClose: () => void;
  onNavigatePage: (page: AppPage) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  activePage,
  onClose,
  onNavigatePage,
}) => {
  const { enabled: soundEnabled, toggle: toggleSound, playHover, playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, playClick]);

  if (!isOpen) return null;

  const stageItems: Array<{ num: string; label: string; page: AppPage; sub: string }> = [
    { num: "01", label: "Hero & Intro", page: "home", sub: "Philosophy, Manifesto & Senior Designer Profile" },
    { num: "02", label: "Stack & Toolchain", page: "stats", sub: "Track Record Metrics & Primary Software Toolkit" },
    { num: "03", label: "Selected Work", page: "work", sub: "Case Studies & Shipped Production Apps" },
    { num: "04", label: "Certificates & Licenses", page: "certificates", sub: "Verified Credentials & Industry Accreditations" },
    { num: "05", label: "Dossier & Bio", page: "about", sub: "Personal Dossier, Hardware Setup & Principles" },
    { num: "06", label: "Photography", page: "photography", sub: "Camera Telemetry & Street Visual Diary" },
    { num: "07", label: "Archive Index", page: "archive", sub: "Chronological Index 2020—2026" }
  ];

  const stageShortcuts: Array<{ label: string; page: AppPage }> = [
    { label: "01 Hero & Intro", page: "home" },
    { label: "02 Stack & Tools", page: "stats" },
    { label: "03 Selected Work", page: "work" },
    { label: "04 Certificates", page: "certificates" },
    { label: "05 Dossier & Bio", page: "about" },
    { label: "06 Visual Diary", page: "photography" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-all duration-300">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => { playClick(); onClose(); }} />

      {/* Drawer Container */}
      <div
        className="relative w-full max-w-lg h-full bg-[#0A0A0A] border-l border-[#25272F] text-[#F5F0EB] flex flex-col justify-between p-6 md:p-10 shadow-2xl z-10 overflow-y-auto"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#25272F]">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9df133] uppercase">
            <span className="inline-block w-2 h-2 bg-[#9df133] chamfer-sm"></span>
            <span>/ Navigation Matrix</span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#747785] hover:text-[#9df133] transition-colors py-1 px-2 border border-[#25272F] hover:border-[#9df133]/40 bg-[#0E0F12] chamfer-sm"
          >
            <span>[ ESC / Close ]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Page Navigation Links */}
        <nav className="py-6 space-y-2.5">
          <div className="text-[11px] font-mono tracking-widest text-[#747785] uppercase mb-2">
            // Stages & Destinations
          </div>

          {stageItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.num}
                onClick={() => {
                  playClick();
                  onClose();
                  onNavigatePage(item.page);
                }}
                onMouseEnter={playHover}
                className={`w-full text-left group flex items-center justify-between py-2.5 px-3.5 border transition-all rounded-sm ${
                  isActive
                    ? 'border-[#9df133] bg-[#12141A]'
                    : 'border-transparent hover:border-[#9df133]/30 hover:bg-[#12141A]'
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-[#747785] group-hover:text-[#9df133] transition-colors">
                      {item.num} /
                    </span>
                    <span className={`text-xl md:text-2xl font-heading font-bold uppercase tracking-wider transition-all ${
                      isActive ? 'text-[#9df133]' : 'text-[#F5F0EB] group-hover:text-[#9df133] group-hover:translate-x-1.5'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#747785] mt-0.5 pl-8">
                    {item.sub}
                  </div>
                </div>

                <ArrowUpRight className={`w-4 h-4 transition-all ${
                  isActive
                    ? 'text-[#9df133] opacity-100'
                    : 'text-[#747785] opacity-0 group-hover:opacity-100 group-hover:text-[#9df133] -translate-x-2 group-hover:translate-x-0'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Quick Stage Shortcuts */}
        <div className="py-4 border-t border-[#25272F]/60">
          <div className="text-[11px] font-mono tracking-widest text-[#747785] uppercase mb-3">
            // Quick Jump to Stage
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stageShortcuts.map((sec) => (
              <button
                key={sec.label}
                onClick={() => {
                  playClick();
                  onClose();
                  onNavigatePage(sec.page);
                }}
                onMouseEnter={playHover}
                className="text-left text-xs font-mono text-[#B0B4C0] hover:text-[#9df133] p-2 bg-[#0E0F12] border border-[#25272F] hover:border-[#9df133]/40 transition-colors chamfer-sm truncate"
              >
                # {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social & Connect Grid */}
        <div className="pt-4 border-t border-[#25272F] space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#747785] uppercase">
            // Connected Channels
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {SOCIAL_GROUPS.flatMap(g => g.links).slice(0, 4).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                onMouseEnter={playHover}
                className="group flex items-center justify-between text-xs font-mono text-[#B0B4C0] hover:text-[#9df133] transition-colors py-1.5 px-2 bg-[#0E0F12] border border-[#25272F]/50 hover:border-[#9df133]/40"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 text-[#747785] group-hover:text-[#9df133] transition-colors" />
              </a>
            ))}
          </div>

          {/* Bottom metadata */}
          <div className="flex items-center justify-between pt-3 border-t border-[#25272F]/50 text-[11px] font-mono text-[#747785]">
            <button
              onClick={() => {
                toggleSound();
                playClick();
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 hover:text-[#9df133] transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#9df133]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>SFX: {soundEnabled ? 'On' : 'Muted'}</span>
            </button>
            <span>© 2026 Curtis Nguyen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
