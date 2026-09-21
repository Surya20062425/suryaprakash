import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext';
import { STATS, TOOLS } from '../data/portfolioData';
import { Sparkles, ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import { AppPage } from '../types';

interface StatsAndToolsProps {
  onNavigatePage?: (page: AppPage) => void;
}

export const StatsAndTools: React.FC<StatsAndToolsProps> = ({ onNavigatePage }) => {
  const { playHover, playClick } = useSound();
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [countersStarted, setCountersStarted] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger odometer count-up on scroll into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stat-and-tools"
      className="relative w-full min-h-screen bg-[#9df133] text-black flex flex-col justify-center py-12 md:py-16 px-4 md:px-8 overflow-hidden z-20"
    >
      {/* Background Graphic Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b-2 border-black/80 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Snapshot / Metrics</span>
            </div>

            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black">
              Track Record & Toolchain
            </h2>
          </div>

          <span className="font-mono text-xs text-black/80 font-bold uppercase tracking-widest">
            02 — HARD STATS & REPERTOIRE
          </span>
        </div>

        {/* Bento Grid: Stats, Tools, and Core Matrix Centerpiece */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Stat Box 1: Products Shipped */}
          <div
            onMouseEnter={playHover}
            className="group relative p-6 md:p-8 bg-black text-[#F5F0EB] border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 chamfer-card flex flex-col justify-between min-h-[200px]"
          >
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none">+</span>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#747785] tracking-wider uppercase group-hover:text-[#9df133] transition-colors">
                {STATS[0].label}
              </span>
              <span className="text-[#9df133] font-mono text-xs">01</span>
            </div>

            <div className="font-heading font-black text-6xl md:text-7xl text-[#F5F0EB] group-hover:text-[#9df133] transition-colors my-2">
              {countersStarted ? STATS[0].value : '00+'}
            </div>

            <div className="font-mono text-[11px] text-[#747785] tracking-widest uppercase">
              // Web, Mobile & Enterprise
            </div>
          </div>

          {/* Stat Box 2: Years of exp */}
          <div
            onMouseEnter={playHover}
            className="group relative p-6 md:p-8 bg-black text-[#F5F0EB] border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 chamfer-card flex flex-col justify-between min-h-[200px]"
          >
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none">+</span>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#747785] tracking-wider uppercase group-hover:text-[#9df133] transition-colors">
                {STATS[1].label}
              </span>
              <span className="text-[#9df133] font-mono text-xs">02</span>
            </div>

            <div className="font-heading font-black text-6xl md:text-7xl text-[#F5F0EB] group-hover:text-[#9df133] transition-colors my-2">
              {countersStarted ? STATS[1].value : '00+'}
            </div>

            <div className="font-mono text-[11px] text-[#747785] tracking-widest uppercase">
              // Continuous Craft
            </div>
          </div>

          {/* Stat Box 3: Global Companies */}
          <div
            onMouseEnter={playHover}
            className="group relative p-6 md:p-8 bg-black text-[#F5F0EB] border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 chamfer-card flex flex-col justify-between min-h-[200px]"
          >
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none">+</span>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#747785] tracking-wider uppercase group-hover:text-[#9df133] transition-colors">
                {STATS[2].label}
              </span>
              <span className="text-[#9df133] font-mono text-xs">03</span>
            </div>

            <div className="font-heading font-black text-6xl md:text-7xl text-[#F5F0EB] group-hover:text-[#9df133] transition-colors my-2">
              {countersStarted ? STATS[2].value : '00+'}
            </div>

            <div className="font-mono text-[11px] text-[#747785] tracking-widest uppercase">
              // Distributed Teams
            </div>
          </div>

          {/* Centerpiece Interactive 3D Dithered Geometric Matrix Glyph */}
          <div className="relative p-6 bg-black text-[#F5F0EB] border-2 border-black shadow-[8px_8px_0px_#000000] chamfer-card flex flex-col items-center justify-center min-h-[200px] overflow-hidden group">
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none">+</span>

            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Rotating outer wireframe square */}
              <div className="absolute inset-0 border border-[#9df133]/40 animate-[spin_12s_linear_infinite]" />
              {/* Counter-rotating middle square */}
              <div className="absolute inset-3 border border-[#64e8ff]/50 animate-[spin_8s_linear_infinite_reverse]" />
              {/* Inner glowing diamond */}
              <div className="w-8 h-8 bg-[#9df133]/20 border border-[#9df133] rotate-45 flex items-center justify-center shadow-[0_0_15px_#9df133]">
                <div className="w-2 h-2 bg-[#9df133]" />
              </div>
            </div>
            <span className="mt-3 font-mono text-[10px] tracking-widest uppercase text-[#9df133] font-bold">
              // CORE SYSTEM MATRIX
            </span>
          </div>

          {/* Tool Boxes (Figma, Claude, Photoshop, Illustrator) */}
          {TOOLS.map((tool) => {
            const isHovered = hoveredTool === tool.logo;
            return (
              <div
                key={tool.box}
                onMouseEnter={() => {
                  playHover();
                  setHoveredTool(tool.logo);
                }}
                onMouseLeave={() => setHoveredTool(null)}
                className="group relative p-6 bg-black text-[#F5F0EB] border-2 border-black hover:border-black/60 transition-all duration-300 shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 chamfer-card flex flex-col justify-between min-h-[180px]"
              >
                <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none">+</span>
                <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none">+</span>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#747785] uppercase tracking-wider group-hover:text-[#9df133] transition-colors">
                    {tool.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#747785]">
                    {tool.box.replace('box-', '0')}
                  </span>
                </div>

                {/* Tool Icon with hover transition */}
                <div className="my-3 flex items-center justify-center h-16">
                  <img
                    src={isHovered ? `/svg/${tool.logo}-hover.svg` : `/svg/${tool.logo}-default.svg`}
                    alt={tool.alt}
                    className="h-12 w-auto max-w-[56px] object-contain transition-transform group-hover:scale-110 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="font-mono text-[10px] tracking-widest uppercase text-[#747785] group-hover:text-[#9df133] transition-colors">
                  // PRIMARY TOOLKIT
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Continuity Cue */}
        <div className="mt-14 pt-8 border-t-2 border-black/80 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-black/70">
          <span>// END OF METRICS & TOOLKIT</span>
          <div className="flex items-center gap-2 text-black font-bold">
            <span>SCROLL TO EXPLORE SELECTED WORK</span>
            <span className="text-base animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
