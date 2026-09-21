import React, { useId } from 'react';

interface CardFluidDistortionProps {
  imageSrc: string;
  altText: string;
  className?: string;
  horizontalVelocity?: number;
}

export const CardFluidDistortion: React.FC<CardFluidDistortionProps> = ({
  imageSrc,
  altText,
  className = '',
  horizontalVelocity = 0,
}) => {
  const filterId = useId().replace(/:/g, '');
  const speed = Math.abs(horizontalVelocity);
  
  // Dynamic fluid displacement scale linked to horizontal scroll velocity
  const displacementScale = Math.min(speed * 2.8, 24);
  const chromaticShift = Math.min(speed * 0.45, 6);
  const hasMotion = speed > 0.3;

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* SVG Fluid Turbulence & Displacement Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`fluid-filter-${filterId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="2"
              result="fluidNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="fluidNoise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Base Imagery Container with Fluid Warp Filter applied on motion */}
      <div
        className="w-full h-full relative"
        style={{
          filter: hasMotion ? `url(#fluid-filter-${filterId})` : 'none',
          transform: hasMotion ? `skewX(${-horizontalVelocity * 0.15}deg)` : 'none',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Chromatic Aberration: Red channel offset */}
        {hasMotion && chromaticShift > 0.8 && (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-40 filter brightness-110"
            style={{
              transform: `translate3d(${chromaticShift}px, 0, 0)`,
              filter: 'hue-rotate(330deg)',
            }}
          />
        )}

        {/* Chromatic Aberration: Cyan / Blue channel offset */}
        {hasMotion && chromaticShift > 0.8 && (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-40 filter brightness-110"
            style={{
              transform: `translate3d(${-chromaticShift}px, 0, 0)`,
              filter: 'hue-rotate(150deg)',
            }}
          />
        )}

        {/* Primary Crisp Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Reactive Scanlines on Velocity */}
        {hasMotion && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7) 51%)',
              backgroundSize: '100% 4px',
            }}
          />
        )}

        {/* Cyber Neon Edge Highlight on high velocity */}
        {speed > 2.5 && (
          <div className="absolute inset-0 border border-[#9df133]/60 pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
};
