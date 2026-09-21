import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu as MenuIcon } from 'lucide-react';
import { AppPage } from '../types';

interface NavbarProps {
  activePage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  onOpenMenu: () => void;
  onScrollToTop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigatePage,
  onOpenMenu,
  onScrollToTop
}) => {
  const [saigonTime, setSaigonTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setSaigonTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[64px] border-b border-[#25272F]/40 bg-[#0A0A0A]/90 backdrop-blur-md px-4 md:px-8 flex items-center justify-between">
      {/* Left: Brand Logo & Desktop Page Nav */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            if (activePage !== 'home') {
              onNavigatePage('home');
            } else {
              onScrollToTop();
            }
          }}
          className="group flex items-center gap-2 text-left focus:outline-none"
          aria-label="Curtis Nguyen Portfolio"
        >
          <Logo className="h-3.5 w-auto" />
        </button>

        {/* Desktop Direct Page Links */}
        <nav className="hidden lg:flex items-center gap-1 pl-6 border-l border-[#25272F]/60 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => onNavigatePage('home')}
            className={`px-2.5 py-1.5 transition-colors ${
              activePage === 'home'
                ? 'text-[#9df133] font-bold bg-[#131418] chamfer-sm'
                : 'text-[#B0B4C0] hover:text-[#9df133]'
            }`}
          >
            01/ Intro
          </button>

          <button
            onClick={() => onNavigatePage('stats')}
            className={`px-2.5 py-1.5 transition-colors ${
              activePage === 'stats'
                ? 'text-[#9df133] font-bold bg-[#131418] chamfer-sm'
                : 'text-[#B0B4C0] hover:text-[#9df133]'
            }`}
          >
            02/ Stack
          </button>

          <button
            onClick={() => onNavigatePage('work')}
            className={`px-2.5 py-1.5 transition-colors ${
              activePage === 'work'
                ? 'text-[#9df133] font-bold bg-[#131418] chamfer-sm'
                : 'text-[#B0B4C0] hover:text-[#9df133]'
            }`}
          >
            03/ Work
          </button>

          <button
            onClick={() => onNavigatePage('certificates')}
            className={`px-2.5 py-1.5 transition-colors ${
              activePage === 'certificates' || (activePage as string) === 'experience'
                ? 'text-[#9df133] font-bold bg-[#131418] chamfer-sm'
                : 'text-[#B0B4C0] hover:text-[#9df133]'
            }`}
          >
            04/ Certificates
          </button>

          <button
            onClick={() => onNavigatePage('about')}
            className={`px-2.5 py-1.5 transition-colors ${
              activePage === 'about'
                ? 'text-[#9df133] font-bold bg-[#131418] chamfer-sm'
                : 'text-[#B0B4C0] hover:text-[#9df133]'
            }`}
          >
            05/ About
          </button>
        </nav>

        {/* Live location & time on large desktop */}
        <div className="hidden xl:flex items-center gap-3 pl-6 border-l border-[#25272F]/60 text-[11px] font-mono tracking-wider text-[#747785]">
          <span className="flex items-center gap-1.5 text-[#F5F0EB]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9df133] animate-pulse"></span>
            Ho Chi Minh, VN
          </span>
          <span className="text-[#25272F]">/</span>
          <span className="text-[#9df133] font-mono">{saigonTime || '08:48:32 PM'}</span>
        </div>
      </div>

      {/* Right: Menu button */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Menu toggle button */}
        <button
          onClick={() => {
            onOpenMenu();
          }}
          className="group relative flex items-center gap-2 h-8 px-3.5 text-[13px] font-heading font-semibold uppercase tracking-wider text-black bg-[#9df133] hover:bg-[#84c72f] transition-all chamfer-button"
          aria-label="Open Navigation Menu"
        >
          <MenuIcon className="w-3.5 h-3.5" />
          <span>/ Menu</span>
        </button>
      </div>
    </header>
  );
};
