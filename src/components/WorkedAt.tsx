import React, { useState, useEffect } from 'react';
import { useSound } from './SoundContext';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, MapPin, Calendar, CheckCircle2, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import { PixelRevealTransition } from './PixelRevealTransition';

interface WorkedAtProps {
  onNavigatePage?: (page: 'home' | 'stats' | 'work' | 'experience' | 'about') => void;
}

export const WorkedAt: React.FC<WorkedAtProps> = ({ onNavigatePage }) => {
  const { playHover, playClick } = useSound();
  const [selectedKey, setSelectedKey] = useState<string>(EXPERIENCES[0].key);
  const [displayText, setDisplayText] = useState<string>('');

  const activeExp = EXPERIENCES.find(e => e.key === selectedKey) || EXPERIENCES[0];

  // Scramble / typewriter effect for the active company description
  useEffect(() => {
    const targetText = activeExp.description;
    let iteration = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 3;
    }, 20);

    return () => clearInterval(interval);
  }, [activeExp]);

  const leftColumn = EXPERIENCES.slice(0, 4);
  const rightColumn = EXPERIENCES.slice(4);

  return (
    <section id="worked-at" className="relative w-full bg-[#070707] border-t border-[#131418] py-24 px-4 md:px-8">
      {/* Top Section-to-Section Pixel Matrix Reveal from Selected Work */}
      <PixelRevealTransition mode="enter" color="#070707" className="-top-14" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-[#747785] border-b border-[#25272F] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9df133] animate-pulse"></span>
            <span className="text-[#9df133] font-bold">// EXPERIENCE TERMINAL</span>
          </div>

          <span className="text-[#747785]">03 — TRACK RECORD & ROLES</span>
        </div>

        {/* Section Heading */}
        <div className="mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12141A] border border-[#25272F] text-xs font-mono uppercase tracking-widest text-[#9df133] chamfer-sm mb-4">
            <span>I’ve been</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#F5F0EB]">
            Worked At
          </h2>
        </div>

        {/* 3-Column Layout: Left Companies - Center CRT Display - Right Companies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column of Companies */}
          <div className="lg:col-span-3 space-y-3">
            {leftColumn.map((item) => {
              const isSelected = item.key === selectedKey;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    playClick();
                    setSelectedKey(item.key);
                  }}
                  onMouseEnter={playHover}
                  className={`w-full group text-left px-5 py-4 transition-all duration-200 border flex items-center justify-between chamfer-row ${
                    isSelected
                      ? 'bg-[#12141A] border-[#9df133] shadow-[0_0_15px_rgba(157,241,51,0.15)]'
                      : 'bg-[#0A0A0A] border-[#1C1E24] hover:border-[#9df133]/40 hover:bg-[#0E0F12]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isSelected ? 'text-[#9df133]' : 'text-[#747785]'}`}>
                      {item.index}
                    </span>
                    <span className={`font-heading font-bold text-lg md:text-xl uppercase tracking-wide ${
                      isSelected ? 'text-[#9df133]' : 'text-[#F5F0EB] group-hover:text-[#9df133]'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#9df133]' : 'bg-[#25272F]'}`} />
                </button>
              );
            })}
          </div>

          {/* Center CRT HUD Display Terminal */}
          <div className="lg:col-span-6 relative bg-[#0A0A0A] border border-[#25272F] p-6 md:p-8 chamfer-button overflow-hidden shadow-2xl min-h-[380px] flex flex-col justify-between">
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-sm select-none">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-sm select-none">+</span>
            <span className="absolute bottom-2 left-2 text-[#9df133] font-mono text-sm select-none">+</span>
            <span className="absolute bottom-2 right-2 text-[#9df133] font-mono text-sm select-none">+</span>

            {/* Subtle Scanlines effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(157, 241, 51, 0.1) 2px, rgba(157, 241, 51, 0.1) 4px)'
              }}
            />

            {/* CRT Header */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#1C1E24]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#9df133] rounded-full animate-ping" />
                <span className="font-mono text-xs text-[#9df133] uppercase tracking-widest">
                  SYS.TERMINAL // {activeExp.key.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-xs text-[#747785]">
                {activeExp.index} OF 07
              </span>
            </div>

            {/* Active Company Details */}
            <div className="relative z-10 my-6 space-y-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#F5F0EB] tracking-tight">
                  {activeExp.name}
                </h3>
                <span className="text-[#9df133] font-mono text-sm">/</span>
                <span className="text-sm md:text-base font-mono text-[#9df133]">
                  {activeExp.role}
                </span>
              </div>

              {/* Metadata row */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#B0B4C0]">
                {activeExp.period && (
                  <div className="flex items-center gap-1.5 bg-[#12141A] px-2.5 py-1 border border-[#25272F]">
                    <Calendar className="w-3.5 h-3.5 text-[#9df133]" />
                    <span>{activeExp.period}</span>
                  </div>
                )}
                {activeExp.location && (
                  <div className="flex items-center gap-1.5 bg-[#12141A] px-2.5 py-1 border border-[#25272F]">
                    <MapPin className="w-3.5 h-3.5 text-[#9df133]" />
                    <span>{activeExp.location}</span>
                  </div>
                )}
              </div>

              {/* Dynamic Typewritten / Scrambled Description */}
              <div className="mt-4 p-4 bg-[#0E0F12] border border-[#1C1E24] text-sm text-[#F5F0EB] font-sans leading-relaxed min-h-[90px]">
                <p>{displayText || activeExp.description}</p>
              </div>

              {/* Core Deliverable Skills Pills */}
              {activeExp.skills && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeExp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono uppercase tracking-wider text-[#B0B4C0] bg-[#12141A] px-2 py-0.5 border border-[#25272F]"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CRT Footer */}
            <div className="relative z-10 pt-4 border-t border-[#1C1E24] flex items-center justify-between text-[11px] font-mono text-[#747785]">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#9df133]" /> Verified Experience
              </span>
              <span>CONFIDENTIAL // PORTFOLIO RECORD</span>
            </div>
          </div>

          {/* Right Column of Companies */}
          <div className="lg:col-span-3 space-y-3">
            {rightColumn.map((item) => {
              const isSelected = item.key === selectedKey;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    playClick();
                    setSelectedKey(item.key);
                  }}
                  onMouseEnter={playHover}
                  className={`w-full group text-left px-5 py-4 transition-all duration-200 border flex items-center justify-between chamfer-row ${
                    isSelected
                      ? 'bg-[#12141A] border-[#9df133] shadow-[0_0_15px_rgba(157,241,51,0.15)]'
                      : 'bg-[#0A0A0A] border-[#1C1E24] hover:border-[#9df133]/40 hover:bg-[#0E0F12]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isSelected ? 'text-[#9df133]' : 'text-[#747785]'}`}>
                      {item.index}
                    </span>
                    <span className={`font-heading font-bold text-lg md:text-xl uppercase tracking-wide ${
                      isSelected ? 'text-[#9df133]' : 'text-[#F5F0EB] group-hover:text-[#9df133]'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#9df133]' : 'bg-[#25272F]'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section Continuity Cue */}
        <div className="mt-16 pt-8 border-t border-[#25272F] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#747785]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9df133]"></span>
            <span>SYSTEM STATUS // VERIFIED REPUTATION & ROLES [2018–2025]</span>
          </div>

          <div className="flex items-center gap-2 text-[#9df133]">
            <span>SCROLL FOR CONTACT & FOOTER</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
