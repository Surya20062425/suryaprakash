import React, { useState, useEffect } from 'react';
import { useSound } from './SoundContext';
import { HERO_INTRO_WORDS } from '../data/portfolioData';
import { ArrowRight, Mail, Phone, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { HeroPortraitShader } from './HeroPortraitShader';

interface HeroProps {
  onExploreWork: () => void;
  onNextStage?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onNextStage }) => {
  const { playHover, playClick } = useSound();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets
  const curtisOffset = Math.min(180, scrollY * 0.22);
  const nguyenOffset = Math.min(180, scrollY * 0.22);
  const portraitOffset = Math.min(80, scrollY * 0.12);
  const scrollPromptOpacity = Math.max(0, 1 - scrollY / 160);

  return (
    <section className="relative w-full min-h-screen pt-20 pb-16 overflow-hidden bg-[#000000] flex flex-col justify-between">
      {/* Background Vertical Guidelines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 max-w-7xl mx-auto px-4 md:px-8 border-x border-[#131418]/60">
        <div className="border-r border-[#131418]/50 h-full"></div>
        <div className="border-r border-[#131418]/50 h-full"></div>
        <div className="border-r border-[#131418]/50 h-full"></div>
        <div className="border-r border-[#131418]/50 h-full"></div>
        <div className="border-r border-[#131418]/50 h-full"></div>
      </div>

      {/* Hero Top Layer: Contact info and Personal intro */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 md:px-8 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Block with Neon Green Bar */}
        <div className="lg:col-span-4 flex items-start gap-3">
          <div className="w-1.5 h-14 bg-[#9df133] rounded-none shadow-[0_0_12px_#9df133] mt-1 shrink-0" />
          <div className="space-y-1 font-mono text-[13px] tracking-wide text-[#B0B4C0]">
            <a
              href="tel:+84906801000"
              onMouseEnter={playHover}
              className="flex items-center gap-2 hover:text-[#9df133] transition-colors py-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#9df133]" />
              <span>+84 906 801 000</span>
            </a>
            <a
              href="mailto:curtis.designr@gmail.com"
              onMouseEnter={playHover}
              className="flex items-center gap-2 hover:text-[#9df133] transition-colors py-0.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#9df133]" />
              <span>curtis.designr@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Right: Personal Manifesto / Intro */}
        <div className="lg:col-span-8 lg:text-right">
          <p className="max-w-2xl lg:ml-auto text-sm md:text-base leading-relaxed text-[#B0B4C0] font-sans">
            {HERO_INTRO_WORDS.map((w, i) => (
              <span key={i} className={`${w.className || ''} inline-block mr-1`}>
                {w.text}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Hero Center Layer: Portrait Photo + Massive Typography with Scroll Parallax */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 md:px-8 my-auto py-8 md:py-12">
        <div className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center">
          {/* Curtis Nguyen Cutout Portrait with Interactive Glitch & Scanline Shader */}
          <div
            className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto flex items-center justify-center transition-transform duration-75"
            style={{ transform: `translate3d(0, ${portraitOffset}px, 0)` }}
          >
            <HeroPortraitShader />
          </div>

          {/* Foreground / Background Overlay Headings with Parallax */}
          {/* CURTIS - drifts left on scroll */}
          <h1
            className="absolute top-4 md:top-8 left-0 md:left-4 z-20 font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F0EB] pointer-events-none select-none transition-transform duration-75 will-change-transform"
            style={{ transform: `translate3d(-${curtisOffset}px, 0, 0)` }}
          >
            CURTIS
          </h1>

          {/* NGUYEN - drifts right on scroll */}
          <h1
            className="absolute bottom-6 md:bottom-10 right-0 md:right-4 z-20 font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F0EB] pointer-events-none select-none transition-transform duration-75 will-change-transform"
            style={{ transform: `translate3d(${nguyenOffset}px, 0, 0)` }}
          >
            NGUYEN
          </h1>

          {/* VN country code */}
          <div className="absolute top-12 right-2 md:right-8 z-20 font-heading font-bold text-5xl md:text-7xl text-[#25272F]/80 select-none">
            VN
          </div>

          {/* Sub-labels floating with precision */}
          <div className="absolute top-1/3 left-0 md:left-6 z-20 font-mono text-xs md:text-sm text-[#747785] tracking-widest uppercase">
            <span className="text-[#9df133]">01 /</span> from 93’
          </div>

          <div className="absolute top-2/3 left-0 md:left-8 z-20 font-mono text-xs md:text-sm text-[#747785] tracking-widest uppercase">
            a dad <span className="text-[#9df133]">/</span> of a corgi and 5 cats
          </div>
        </div>

        {/* Floating chamfered badge and Scroll Cue */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#9df133] text-black font-heading font-bold text-sm md:text-base uppercase tracking-widest chamfer-badge shadow-[0_0_20px_rgba(157,241,51,0.25)]"
            >
              <span className="w-2 h-2 bg-black chamfer-sm"></span>
              <span>senior product designer</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-[#12141A] border border-[#25272F] text-[#747785] font-mono text-xs uppercase tracking-widest chamfer-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9df133] animate-pulse"></span>
              <span>SF BAY AREA // REMOTE WORLDWIDE</span>
            </div>
          </div>

          {/* Action and Scroll Down Cue */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClick();
                onExploreWork();
              }}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 px-4 py-2 bg-[#12141A] hover:bg-[#9df133] text-[#F5F0EB] hover:text-black border border-[#25272F] hover:border-[#9df133] font-mono text-xs uppercase tracking-wider transition-all chamfer-sm"
            >
              <Layers className="w-3.5 h-3.5 text-[#9df133] group-hover:text-black transition-colors" />
              <span>Explore Selected Work</span>
            </button>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-[#0E0F12] border border-[#25272F] text-[#747785] font-mono text-xs uppercase tracking-widest chamfer-sm animate-bounce">
              <span>Scroll to explore</span>
              <ChevronRight className="w-3.5 h-3.5 rotate-90 text-[#9df133]" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Cluster / Manifesto Quote */}
      <div id="manifesto" className="relative z-10 w-full border-t border-[#131418] bg-[#070707] py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 font-mono text-xs md:text-sm tracking-wide text-[#747785] leading-relaxed">
            // PHILOSOPHY & CRAFT
            <p className="mt-2 text-[#B0B4C0] font-sans text-sm md:text-base">
              I believe <strong className="text-[#F5F0EB]">Great work</strong> isn’t made by talent alone. It’s forged through late nights, bad drafts, & one too many:
            </p>
          </div>

          {/* Just ONE MORE tweak display headline */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-end gap-6">
            <div className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#F5F0EB] text-center lg:text-right">
              &quot;JUST <span className="text-[#9df133]">ONE MORE</span> TWEAK&quot;
            </div>

            <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#12141A] border border-[#25272F] font-mono text-[11px] uppercase tracking-widest text-[#747785] chamfer-sm">
              <span className="text-[#9df133]">↓</span>
              <span>SCROLL FOR TOOLCHAIN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
