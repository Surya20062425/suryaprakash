import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, FolderGit2 } from 'lucide-react';
import { useSound } from './SoundContext';

interface ArchiveItem {
  year: string;
  title: string;
  client: string;
  category: string;
  platform: string;
  link?: string;
}

const ARCHIVE_DATA: ArchiveItem[] = [
  { year: '2024', title: 'Aegis Sentinel Protocol', client: 'Aegis Security', category: 'Cybersecurity OS', platform: 'Web / Desktop', link: '#' },
  { year: '2024', title: 'Kroma Digital Banking', client: 'Fintech Corp', category: 'Core Banking', platform: 'iOS / Android', link: '#' },
  { year: '2024', title: 'Quantum Neural Analytics', client: 'Quantum Labs', category: 'AI Visualizer', platform: 'Web Application', link: '#' },
  { year: '2023', title: 'Veloce Carbon Design System', client: 'Automotive Design', category: 'Design Tokens', platform: 'Figma / Code', link: '#' },
  { year: '2023', title: 'Nexus Enterprise Telemetry', client: 'Global Cloud Co', category: 'SaaS Dashboard', platform: 'Web App', link: '#' },
  { year: '2023', title: 'Hyperion Mobile Health', client: 'BioTrack Systems', category: 'Health Tech', platform: 'iOS App', link: '#' },
  { year: '2022', title: 'Orbit Decentralized Exchange', client: 'Web3 Protocol', category: 'Crypto Platform', platform: 'Web / Mobile', link: '#' },
  { year: '2022', title: 'Aura Spatial Audio Studio', client: 'SoundCraft', category: 'Audio Production', platform: 'macOS / iPad', link: '#' },
  { year: '2021', title: 'Strata Geospatial GIS', client: 'Terran Dynamics', category: 'Cartography Tool', platform: 'Desktop Electron', link: '#' },
  { year: '2021', title: 'Prism Multi-Channel CRM', client: 'Retail Omnichannel', category: 'Commerce Engine', platform: 'Web Portal', link: '#' },
  { year: '2020', title: 'Zenith Logistics Hub', client: 'Cargo Global', category: 'Supply Chain', platform: 'Tablet / Web', link: '#' }
];

interface ArchiveViewProps {
  onBack: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onBack }) => {
  const { playClick, playHover } = useSound();
  const [search, setSearch] = useState('');

  const filtered = ARCHIVE_DATA.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.client.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F0EB] pt-24 pb-20 px-4 md:px-8">
      {/* Background Graphic Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, #131418 1px, transparent 1px), linear-gradient(to bottom, #131418 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between pb-8 border-b border-[#25272F]/60 mb-12">
          <button
            onClick={() => {
              playClick();
              onBack();
            }}
            onMouseEnter={playHover}
            className="group flex items-center gap-2 px-3.5 py-1.5 bg-[#0E0F12] border border-[#25272F] hover:border-[#9df133] text-xs font-mono tracking-wider uppercase text-[#B0B4C0] hover:text-[#9df133] transition-all chamfer-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>[ Return to Home ]</span>
          </button>

          <span className="font-mono text-xs text-[#747785] tracking-widest uppercase">
            // COMPLETE DIRECTORY // 2020 — 2024
          </span>
        </div>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9df133] text-black font-mono text-xs uppercase tracking-widest chamfer-sm mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Full Project Index</span>
            </div>

            <h1 className="font-heading font-black text-5xl sm:text-6xl uppercase tracking-tight text-[#F5F0EB] leading-none">
              Project Archive
            </h1>
          </div>

          {/* Search Filter Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#747785] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="FILTER REPERTOIRE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0E0F12] border border-[#25272F] focus:border-[#9df133] text-xs font-mono text-[#F5F0EB] placeholder-[#747785] outline-none chamfer-sm transition-colors"
            />
          </div>
        </div>

        {/* Tabular Archive List */}
        <div className="border border-[#25272F] bg-[#0A0A0A] chamfer-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#12141A] border-b border-[#25272F] font-mono text-[11px] text-[#747785] uppercase tracking-wider">
            <span className="col-span-2">Year</span>
            <span className="col-span-4">Project Name</span>
            <span className="col-span-3 hidden md:block">Client / Company</span>
            <span className="col-span-2 hidden lg:block">Category</span>
            <span className="col-span-1 text-right">Link</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#25272F]/40">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#12141A] transition-colors"
              >
                <span className="col-span-2 font-mono text-xs text-[#9df133]">
                  {item.year}
                </span>

                <span className="col-span-4 font-heading font-bold text-sm sm:text-base text-[#F5F0EB] group-hover:text-[#9df133] transition-colors">
                  {item.title}
                </span>

                <span className="col-span-3 hidden md:block font-sans text-xs text-[#B0B4C0]">
                  {item.client}
                </span>

                <span className="col-span-2 hidden lg:block font-mono text-[11px] text-[#747785] uppercase">
                  {item.category}
                </span>

                <span className="col-span-1 text-right">
                  <a
                    href={item.link}
                    onClick={playClick}
                    className="inline-flex items-center justify-center w-7 h-7 bg-[#0E0F12] border border-[#25272F] group-hover:border-[#9df133] text-[#747785] group-hover:text-[#9df133] transition-all chamfer-sm"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
