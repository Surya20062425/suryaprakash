import React from 'react';
import { useSound } from './SoundContext';
import { SOCIAL_GROUPS } from '../data/portfolioData';
import { ArrowUp, ArrowUpRight, Mail, FileText } from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onScrollToTop }) => {
  const { playHover, playClick } = useSound();

  return (
    <footer id="contact" className="relative w-full bg-[#9df133] text-black pt-20 pb-12 px-4 md:px-8 border-t-2 border-black overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Call to Action Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b-2 border-black/80">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-black text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm">
              // Available for Contract & Product Roles
            </span>
            <h2 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-black leading-none">
              Let&apos;s CREATE <br className="hidden sm:inline" />
              GOOD STUFF together
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:curtis.designr@gmail.com"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-black text-[#9df133] font-heading font-bold text-base uppercase tracking-wider chamfer-button shadow-[6px_6px_0px_#000000]/30 hover:bg-[#12141A] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Shoot a message</span>
            </a>

            <a
              href="https://drive.google.com/file/d/14_T6l8wKq3uE4Yp4_y2G5A0z/view"
              target="_blank"
              rel="noreferrer noopener"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-transparent border-2 border-black text-black font-heading font-bold text-base uppercase tracking-wider chamfer-button hover:bg-black hover:text-[#9df133] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Direct Contacts */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-black/70 mb-4 font-bold">
              // Direct Line
            </h4>
            <div className="space-y-2 font-mono text-sm">
              <a
                href="mailto:curtis.designr@gmail.com"
                onMouseEnter={playHover}
                className="block hover:underline font-bold"
              >
                curtis.designr@gmail.com
              </a>
              <a
                href="tel:+84906801000"
                onMouseEnter={playHover}
                className="block hover:underline font-bold"
              >
                +84 906 801 000
              </a>
              <p className="text-black/70 text-xs pt-2">
                Ho Chi Minh City, Vietnam (UTC+7)
              </p>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-black/70 mb-4 font-bold">
              // Navigation
            </h4>
            <ul className="space-y-1.5 font-mono text-sm font-bold">
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('home'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>01 / Hero & Intro</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('stats'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>02 / Stack & Toolchain</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('work'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>03 / Selected Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('experience'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>04 / Experience Terminal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('about'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>05 / About Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { playClick(); onNavigatePage('photography'); }}
                  onMouseEnter={playHover}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>06 / Visual Diary</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Social Groups */}
          {SOCIAL_GROUPS.map((group) => (
            <div key={group.label}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/70 mb-4 font-bold">
                // {group.label}
              </h4>
              <ul className="space-y-2 font-mono text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      onMouseEnter={playHover}
                      className="group inline-flex items-center gap-1.5 font-bold hover:underline"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Massive Display Signature: PORTFOLIO/CURTIS */}
        <div className="pt-8 border-t-2 border-black/80">
          <div className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-none tracking-tighter text-black select-none opacity-90">
            PORTFOLIO/CURTIS
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-black/80">
          <div>
            © 2026 Curtis Nguyen — Built with pristine typography & clean execution.
          </div>

          <button
            onClick={() => {
              playClick();
              onScrollToTop();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-[#9df133] hover:bg-[#12141A] transition-colors chamfer-sm font-semibold uppercase tracking-wider"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
