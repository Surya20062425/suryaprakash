import React from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Heart, Camera, Monitor, Code } from 'lucide-react';
import { useSound } from './SoundContext';
import { AppPage } from '../types';

interface AboutViewProps {
  onBack: () => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack, onNavigatePage }) => {
  const { playClick, playHover } = useSound();

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F0EB] pt-24 pb-28 px-4 md:px-8">
      {/* Background Graphic Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, #131418 1px, transparent 1px), linear-gradient(to bottom, #131418 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Back Navigation Bar & Stage Info */}
        <div className="flex items-center justify-between pb-6 border-b border-[#25272F]/60 mb-10">
          <button
            onClick={() => {
              playClick();
              if (onNavigatePage) {
                onNavigatePage('experience');
              } else {
                onBack();
              }
            }}
            onMouseEnter={playHover}
            className="group flex items-center gap-2 px-3.5 py-1.5 bg-[#0E0F12] border border-[#25272F] hover:border-[#9df133] text-xs font-mono tracking-wider uppercase text-[#B0B4C0] hover:text-[#9df133] transition-all chamfer-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>← [04] Experience</span>
          </button>

          <span className="font-mono text-xs text-[#9df133] tracking-widest uppercase bg-[#12141A] border border-[#9df133]/30 px-3 py-1 chamfer-sm">
            STAGE 05 / 05 // DOSSIER & BIO
          </span>

          {onNavigatePage ? (
            <button
              onClick={() => {
                playClick();
                onNavigatePage('home');
              }}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 px-3.5 py-1.5 bg-[#12141A] hover:bg-[#9df133] hover:text-black border border-[#25272F] text-xs font-mono tracking-wider uppercase text-[#B0B4C0] transition-all chamfer-sm"
            >
              <span>[01] Return to Hero</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : <div />}
        </div>

        {/* Hero Headline */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9df133] text-black font-mono text-xs uppercase tracking-widest chamfer-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Senior Product Designer</span>
          </div>

          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F5F0EB] leading-none mb-6">
            Designing for Humans, Crafting for Machines.
          </h1>

          <p className="font-sans text-lg md:text-xl text-[#B0B4C0] leading-relaxed max-w-3xl">
            Born in 1993, based in Ho Chi Minh City. Over the past decade, I’ve worked with global engineering teams to shape software systems, enterprise fintech platforms, and consumer digital interfaces.
          </p>
        </div>

        {/* Bento Grid Story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Core Philosophy */}
          <div className="md:col-span-2 p-6 md:p-8 bg-[#0A0A0A] border border-[#25272F] chamfer-card relative">
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9df133] uppercase tracking-wider mb-4">
              <Code className="w-4 h-4" />
              <span>Philosophy</span>
            </div>

            <h3 className="font-heading font-bold text-2xl uppercase tracking-wide mb-3">
              Design Systems as Shared Language
            </h3>
            <p className="font-sans text-sm md:text-base text-[#747785] leading-relaxed">
              I view code and design as two lenses on the same truth. When a designer understands layout engines, CSS flexbox, and API contracts, and an engineer understands optical alignment and rhythm, software stops feeling like compromises and starts feeling like precision craftsmanship.
            </p>
          </div>

          {/* Card 2: Dad of 1 Corgi & 5 Cats */}
          <div className="p-6 md:p-8 bg-[#0A0A0A] border border-[#25272F] chamfer-card relative flex flex-col justify-between">
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs">+</span>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9df133] uppercase tracking-wider mb-4">
                <Heart className="w-4 h-4" />
                <span>Life Outside Work</span>
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide mb-2">
                1 Corgi, 5 Cats
              </h3>
              <p className="font-sans text-sm text-[#747785] leading-relaxed">
                When I’m away from Figma and code, I am managing a household zoo of high-energy pets and brewing third-wave pour-overs.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#25272F] font-mono text-xs text-[#9df133]">
              // Pet Parent Status: Certified
            </div>
          </div>

          {/* Card 3: Photography Passion */}
          <div className="p-6 md:p-8 bg-[#0A0A0A] border border-[#25272F] chamfer-card relative">
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9df133] uppercase tracking-wider mb-4">
              <Camera className="w-4 h-4" />
              <span>Lens Craft</span>
            </div>

            <h3 className="font-heading font-bold text-xl uppercase tracking-wide mb-2">
              Street & Travel Photography
            </h3>
            <p className="font-sans text-sm text-[#747785] leading-relaxed">
              Observing urban geometries, neon night markets in Asia, and natural lighting teaches the eye patience and negative space that directly feeds back into digital layout design.
            </p>
          </div>

          {/* Card 4: Daily Rig & Hardware Setup */}
          <div className="md:col-span-2 p-6 md:p-8 bg-[#0A0A0A] border border-[#25272F] chamfer-card relative">
            <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs">+</span>
            <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9df133] uppercase tracking-wider mb-4">
              <Monitor className="w-4 h-4" />
              <span>Hardware & Desk Rig</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">MACHINE</div>
                <div className="text-[#F5F0EB] font-bold mt-1">Apple M3 Max MBP</div>
              </div>
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">MONITOR</div>
                <div className="text-[#F5F0EB] font-bold mt-1">Studio Display 5K</div>
              </div>
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">INPUT</div>
                <div className="text-[#F5F0EB] font-bold mt-1">HHKB Hybrid Type-S</div>
              </div>
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">CAMERA</div>
                <div className="text-[#F5F0EB] font-bold mt-1">Fujifilm X100V / Sony A7IV</div>
              </div>
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">AUDIO</div>
                <div className="text-[#F5F0EB] font-bold mt-1">Sennheiser HD660S</div>
              </div>
              <div className="p-3 bg-[#12141A] border border-[#25272F] chamfer-sm">
                <div className="text-[#747785]">CHAIR</div>
                <div className="text-[#F5F0EB] font-bold mt-1">Herman Miller Embody</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 bg-[#9df133] text-black chamfer-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight">
              Ready to create something iconic?
            </h3>
            <p className="font-mono text-xs text-black/80 font-bold mt-1">
              Currently accepting selected design advising and product roles.
            </p>
          </div>

          <a
            href="mailto:curtis.designr@gmail.com"
            onMouseEnter={playHover}
            className="px-6 py-3 bg-black text-[#9df133] font-heading font-bold text-xs uppercase tracking-widest hover:bg-[#131418] transition-all chamfer-sm shrink-0"
          >
            Initiate Contact
          </a>
        </div>
      </div>
    </div>
  );
};
