import React, { useState } from 'react';
import { ArrowLeft, Camera, ExternalLink, MapPin } from 'lucide-react';
import { useSound } from './SoundContext';

interface PhotoItem {
  id: string;
  title: string;
  location: string;
  year: string;
  camera: string;
  lens: string;
  iso: string;
  shutter: string;
  aperture: string;
  src: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Nocturnal Highway Geometry',
    location: 'Ho Chi Minh City, VN',
    year: '2024',
    camera: 'Sony A7IV',
    lens: 'FE 24-70mm F2.8 GM II',
    iso: 'ISO 100',
    shutter: '15s',
    aperture: 'f/11',
    src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'photo-2',
    title: 'Cyberpunk Alleyway Refraction',
    location: 'Shinjuku, Tokyo, JP',
    year: '2023',
    camera: 'Fujifilm X100V',
    lens: '23mm F2.0 Fixed',
    iso: 'ISO 800',
    shutter: '1/125s',
    aperture: 'f/2.0',
    src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'photo-3',
    title: 'Monolithic Concrete Facade',
    location: 'District 1, Saigon',
    year: '2024',
    camera: 'Sony A7IV',
    lens: 'FE 16-35mm F2.8 GM',
    iso: 'ISO 200',
    shutter: '1/400s',
    aperture: 'f/8.0',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'photo-4',
    title: 'Sub-zero Mist & Pine Trees',
    location: 'Dalat Plateau, VN',
    year: '2023',
    camera: 'Fujifilm X100V',
    lens: '23mm F2.0 Fixed',
    iso: 'ISO 400',
    shutter: '1/250s',
    aperture: 'f/4.0',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
  }
];

interface PhotographyViewProps {
  onBack: () => void;
}

export const PhotographyView: React.FC<PhotographyViewProps> = ({ onBack }) => {
  const { playClick, playHover } = useSound();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

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
            // SHOT TELEMETRY // 35MM & DIGITAL
          </span>
        </div>

        {/* Header Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9df133] text-black font-mono text-xs uppercase tracking-widest chamfer-sm mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Observations</span>
          </div>

          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F5F0EB] leading-none mb-4">
            Framing Light, Grain, and Time.
          </h1>

          <p className="font-sans text-base md:text-lg text-[#B0B4C0] max-w-2xl leading-relaxed">
            A visual diary of urban architecture, twilight atmosphere, and mechanical geometry captured during travels across Southeast Asia and Japan.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                playClick();
                setSelectedPhoto(photo);
              }}
              onMouseEnter={playHover}
              className="group cursor-pointer bg-[#0A0A0A] border border-[#25272F] hover:border-[#9df133] transition-all duration-300 chamfer-card overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#12141A]">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md text-[#9df133] font-mono text-[10px] tracking-wider uppercase chamfer-sm border border-[#25272F]">
                  {photo.year}
                </div>
              </div>

              {/* Photo Meta Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-xl uppercase tracking-wide group-hover:text-[#9df133] transition-colors">
                    {photo.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-[#747785] group-hover:text-[#9df133] transition-colors" />
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[#747785] mb-4">
                  <MapPin className="w-3 h-3 text-[#9df133]" />
                  <span>{photo.location}</span>
                </div>

                {/* EXIF Data Strip */}
                <div className="pt-4 border-t border-[#25272F] grid grid-cols-4 gap-2 font-mono text-[11px] text-[#B0B4C0]">
                  <div>
                    <span className="text-[#747785] block text-[9px]">BODY</span>
                    {photo.camera.split(' ')[0]}
                  </div>
                  <div>
                    <span className="text-[#747785] block text-[9px]">EXP</span>
                    {photo.shutter}
                  </div>
                  <div>
                    <span className="text-[#747785] block text-[9px]">APERTURE</span>
                    {photo.aperture}
                  </div>
                  <div>
                    <span className="text-[#747785] block text-[9px]">ISO</span>
                    {photo.iso}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
