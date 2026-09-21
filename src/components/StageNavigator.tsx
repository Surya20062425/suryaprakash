import React from 'react';
import { useSound } from './SoundContext';
import { ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';

export type StageId = 'home' | 'stats' | 'work' | 'certificates' | 'about';

interface StageConfig {
  id: StageId;
  number: string;
  shortLabel: string;
  fullName: string;
}

export const STAGES: StageConfig[] = [
  { id: 'home', number: '01', shortLabel: 'Hero', fullName: 'Hero & Intro' },
  { id: 'stats', number: '02', shortLabel: 'Stack', fullName: 'Track Record & Toolchain' },
  { id: 'work', number: '03', shortLabel: 'Work', fullName: 'Selected Work' },
  { id: 'certificates', number: '04', shortLabel: 'Certs', fullName: 'Accreditation Terminal' },
  { id: 'about', number: '05', shortLabel: 'About', fullName: 'Dossier & Bio' },
];

interface StageNavigatorProps {
  currentStage: string;
  onNavigateStage: (stage: StageId) => void;
}

export const StageNavigator: React.FC<StageNavigatorProps> = ({
  currentStage,
  onNavigateStage,
}) => {
  const { playHover, playClick } = useSound();

  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const isKnownStage = currentIndex !== -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      playClick();
      onNavigateStage(STAGES[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < STAGES.length - 1) {
      playClick();
      onNavigateStage(STAGES[currentIndex + 1].id);
    }
  };

  return (
    <nav
      aria-label="Portfolio Stage Navigation"
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-full px-3"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#090A0E]/95 backdrop-blur-md border border-[#25272F] p-1.5 sm:p-2 chamfer-card shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        {/* Prev Stage Button */}
        <button
          onClick={handlePrev}
          disabled={!isKnownStage || currentIndex === 0}
          onMouseEnter={playHover}
          aria-label="Previous Stage"
          className="flex items-center justify-center h-8 px-2.5 bg-[#12141A] hover:bg-[#1A1D24] text-[#F5F0EB] hover:text-[#9df133] disabled:opacity-25 disabled:pointer-events-none border border-[#25272F] transition-all chamfer-sm text-xs font-mono"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
          <span className="hidden md:inline uppercase text-[11px] font-bold">Prev</span>
        </button>

        {/* Stage Pips */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1">
          {STAGES.map((stage, idx) => {
            const isActive = stage.id === currentStage;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  playClick();
                  onNavigateStage(stage.id);
                }}
                onMouseEnter={playHover}
                aria-label={`Jump to stage ${stage.number}: ${stage.fullName}`}
                className={`group relative flex items-center gap-1.5 h-8 px-2.5 sm:px-3 text-xs font-mono uppercase tracking-wider transition-all chamfer-sm font-bold ${
                  isActive
                    ? 'bg-[#9df133] text-black shadow-[0_0_15px_rgba(157,241,51,0.3)] ring-1 ring-[#9df133]'
                    : 'bg-[#12141A] text-[#747785] hover:text-[#F5F0EB] hover:bg-[#181B22] border border-[#25272F]/70'
                }`}
              >
                <span className={isActive ? 'text-black font-black' : 'text-[#9df133]/80'}>
                  {stage.number}
                </span>
                <span className="hidden sm:inline">
                  {stage.shortLabel}
                </span>

                {/* Subtle active pip indicator */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black ml-0.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Stage Button */}
        <button
          onClick={handleNext}
          disabled={!isKnownStage || currentIndex === STAGES.length - 1}
          onMouseEnter={playHover}
          aria-label="Next Stage"
          className="flex items-center justify-center h-8 px-2.5 bg-[#9df133] hover:bg-[#85cc2b] text-black disabled:opacity-25 disabled:pointer-events-none transition-all chamfer-sm text-xs font-heading font-bold uppercase tracking-wider shadow-sm"
        >
          <span className="hidden md:inline text-[11px]">
            {currentIndex < STAGES.length - 1 ? `Next: ${STAGES[currentIndex + 1].shortLabel}` : 'Next'}
          </span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-black" />
        </button>

        {/* Keyboard shortcut indicator */}
        <div className="hidden xl:flex items-center pl-2 pr-1 text-[10px] font-mono text-[#747785] border-l border-[#25272F] tracking-widest uppercase">
          <span>[ ← / → / 1-5 ]</span>
        </div>
      </div>
    </nav>
  );
};
