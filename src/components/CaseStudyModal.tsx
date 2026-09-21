import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { useSound } from './SoundContext';
import { X, ExternalLink, Check, Calendar, User, Layers } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, playClick]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => { playClick(); onClose(); }} />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#0A0A0A] border border-[#25272F] text-[#F5F0EB] p-6 md:p-10 my-8 chamfer-button shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#25272F]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#9df133] chamfer-sm"></span>
            <span className="font-mono text-xs text-[#9df133] uppercase tracking-widest">
              CASE STUDY // {project.tag.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#747785] hover:text-[#9df133] transition-colors py-1 px-3 border border-[#25272F] hover:border-[#9df133]/40 bg-[#0E0F12] chamfer-sm"
          >
            <span>[ ESC / Close ]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Title & Tag */}
        <div className="mt-8 space-y-3">
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[#F5F0EB] tracking-tight">
              {project.title}
            </h2>
            <span className="font-mono text-sm text-[#9df133] px-2.5 py-0.5 bg-[#12141A] border border-[#25272F]">
              {project.year}
            </span>
          </div>
          <p className="text-base md:text-lg text-[#B0B4C0] font-sans leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Hero Preview Image with CRT border and corner crosshairs */}
        <div className="relative my-8 aspect-[16/10] w-full bg-[#050505] border border-[#1C1E24] overflow-hidden group">
          <span className="absolute top-2 left-2 text-[#9df133] font-mono text-sm select-none z-10">+</span>
          <span className="absolute top-2 right-2 text-[#9df133] font-mono text-sm select-none z-10">+</span>
          <span className="absolute bottom-2 left-2 text-[#9df133] font-mono text-sm select-none z-10">+</span>
          <span className="absolute bottom-2 right-2 text-[#9df133] font-mono text-sm select-none z-10">+</span>

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-105"
          />
        </div>

        {/* Details Overview */}
        {project.details && (
          <div className="space-y-8">
            <div className="p-6 bg-[#0E0F12] border border-[#1C1E24]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#9df133] mb-3">
                // Problem Statement & Solution
              </h4>
              <p className="text-sm md:text-base text-[#F5F0EB] leading-relaxed font-sans">
                {project.details.overview}
              </p>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#070707] border border-[#1C1E24]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#747785] uppercase mb-2">
                  <User className="w-3.5 h-3.5 text-[#9df133]" /> Role
                </div>
                <div className="text-sm font-sans font-semibold text-[#F5F0EB]">
                  {project.details.role}
                </div>
              </div>

              <div className="p-4 bg-[#070707] border border-[#1C1E24]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#747785] uppercase mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9df133]" /> Duration
                </div>
                <div className="text-sm font-sans font-semibold text-[#F5F0EB]">
                  {project.details.period}
                </div>
              </div>
            </div>

            {/* Key Deliverables & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#747785] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#9df133]" /> Deliverables
                </h4>
                <ul className="space-y-2 font-sans text-sm text-[#B0B4C0]">
                  {project.details.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#9df133] font-mono text-xs mt-0.5">&gt;</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#747785] flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#9df133]" /> Impact Metrics
                </h4>
                <ul className="space-y-2 font-sans text-sm text-[#F5F0EB]">
                  {project.details.highlights.map((high, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9df133] mt-2 shrink-0"></span>
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-10 pt-6 border-t border-[#25272F] flex items-center justify-between">
          <span className="font-mono text-xs text-[#747785]">
            © CURTIS NGUYEN // CONFIDENTIAL
          </span>

          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9df133] text-black font-heading font-bold uppercase tracking-wider text-sm chamfer-button hover:bg-[#84c72f] transition-colors"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => { playClick(); onClose(); }}
              className="px-5 py-2.5 bg-[#12141A] border border-[#25272F] text-xs font-mono uppercase text-[#F5F0EB] hover:border-[#9df133] transition-colors chamfer-sm"
            >
              Close Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
