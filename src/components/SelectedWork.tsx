import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ProjectItem, AppPage } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ArrowUpRight, ChevronRight, ChevronLeft, Sparkles, ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import { CardFluidDistortion } from './CardFluidDistortion';
import { HorizontalFluidCanvas } from './HorizontalFluidCanvas';
import { useSound } from './SoundContext';

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
  onNavigatePage?: (page: AppPage) => void;
  glideProgress?: number;
  exitProgress?: number;
  viewportWidth?: number;
  viewportHeight?: number;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onNavigatePage,
  glideProgress,
}) => {
  const { playHover, playClick } = useSound();
  const [filter, setFilter] = useState<'all' | 'case-study' | 'web-design' | 'app-design'>('all');
  
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [horizontalVelocity, setHorizontalVelocity] = useState(0);
  const [allProjectsViewed, setAllProjectsViewed] = useState(false);

  // Position offset state
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tag === filter);

  // Calculate maximum horizontal travel
  const getMaxTranslate = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 0;
    const cards = track.children;
    const lastCard = cards[cards.length - 1] as HTMLElement;
    const rightMargin = window.innerWidth < 768 ? 40 : 120;
    return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - window.innerWidth + rightMargin);
  }, []);

  // Update card 3D tilt & active card index
  const updateCardTransforms = useCallback((x: number, maxTranslate: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.children;
    const cardCount = cards.length;
    if (cardCount === 0) return;

    const vCenter = window.innerWidth / 2;
    for (let i = 0; i < cardCount; i++) {
      const cardEl = cards[i] as HTMLElement;
      const rect = cardEl.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distFromCenter = (cardCenter - vCenter) / (vCenter || 1);

      const rotY = -distFromCenter * 14;
      const rotX = -Math.abs(distFromCenter) * 4;
      const scale = Math.max(0.9, 1 - Math.abs(distFromCenter) * 0.08);

      cardEl.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
      cardEl.style.transformOrigin = 'center center';
    }

    const progress = maxTranslate > 0 ? Math.min(1, Math.max(0, -x / maxTranslate)) : 0;
    setScrollProgress(progress);
    if (progress >= 0.95) {
      setAllProjectsViewed(true);
    }

    const activeIdx = Math.min(cardCount - 1, Math.max(0, Math.round(progress * (cardCount - 1))));
    setCurrentCardIndex(activeIdx);
  }, []);

  // Animation loop with smooth damping
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(64, time - lastTime);
      lastTime = time;

      const maxTranslate = getMaxTranslate();
      // Bound target within limits
      targetXRef.current = Math.min(0, Math.max(-maxTranslate, targetXRef.current));

      // Damped interpolation
      const prevX = currentXRef.current;
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.12;

      const track = trackRef.current;
      if (track) {
        gsap.set(track, { x: currentXRef.current });
      }

      // Compute velocity for fluid shaders
      const vel = (currentXRef.current - prevX) / (dt || 16);
      velocityRef.current = vel * 25;
      setHorizontalVelocity(velocityRef.current);

      updateCardTransforms(currentXRef.current, maxTranslate);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [getMaxTranslate, updateCardTransforms]);

  // Respond to external glideProgress (driven by vertical scroll runway)
  useEffect(() => {
    if (glideProgress !== undefined) {
      const maxTranslate = getMaxTranslate();
      targetXRef.current = -glideProgress * maxTranslate;
    }
  }, [glideProgress, getMaxTranslate]);

  // Handle Wheel on Section -> Glides the horizontal track directly when not controlled by scroll runway
  useEffect(() => {
    if (glideProgress !== undefined) return;

    const el = outerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If modal is active or meta key is down, let default happen
      if (e.ctrlKey || e.metaKey) return;

      const maxTranslate = getMaxTranslate();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Scrolling DOWN/RIGHT
      if (delta > 0) {
        // If we haven't reached the end of the cards, absorb the scroll to move the carousel
        if (targetXRef.current > -maxTranslate + 20) {
          e.preventDefault();
          targetXRef.current -= delta * 1.4;
        }
        // If we are at the end, let it scroll naturally down to the next section!
      } else if (delta < 0) {
        // Scrolling UP/LEFT
        if (targetXRef.current < -20) {
          e.preventDefault();
          targetXRef.current -= delta * 1.4;
        }
        // If we are at card 0, let it scroll naturally up to Stats & Tools!
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [getMaxTranslate]);

  // Keyboard arrow listener for projects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        scrollToCard(Math.min(filteredProjects.length - 1, currentCardIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        scrollToCard(Math.max(0, currentCardIndex - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, filteredProjects.length]);

  const scrollToCard = (index: number) => {
    playClick();
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    if (!cards[index]) return;

    const cardEl = cards[index] as HTMLElement;
    const maxTranslate = getMaxTranslate();
    const targetOffset = cardEl.offsetLeft - (window.innerWidth / 2 - cardEl.offsetWidth / 2);
    targetXRef.current = -Math.min(maxTranslate, Math.max(0, targetOffset));
  };

  return (
    <section
      ref={outerRef}
      id="selected-work"
      className="relative w-full min-h-screen bg-[#9df133] text-black overflow-hidden flex flex-col justify-between py-6 md:py-8 px-4 md:px-8 select-none z-20"
    >
      {/* WebGL Fluid Distortion Canvas for the Horizontal Track */}
      <HorizontalFluidCanvas
        velocity={horizontalVelocity}
        progress={scrollProgress}
        className="z-0 opacity-85"
      />

      {/* Background Graphic Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Header Cluster with Stage Breadcrumbs */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col gap-4 pb-4 border-b-2 border-black/80">
        {/* Stage Progress & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-black/80 font-bold">
          {onNavigatePage ? (
            <button
              onClick={() => {
                playClick();
                onNavigatePage('stats');
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 hover:text-black transition-colors px-2 py-1 bg-black/10 hover:bg-black/20 chamfer-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← [02] Stack & Tools</span>
            </button>
          ) : <div />}

          <span className="bg-black text-[#9df133] px-3 py-1 chamfer-sm">
            STAGE 03 / 04 // SELECTED WORK
          </span>

          {onNavigatePage ? (
            <button
              onClick={() => {
                playClick();
                onNavigatePage('certificates');
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 text-black hover:text-black transition-colors px-2.5 py-1 bg-black text-[#9df133] hover:bg-black/80 chamfer-sm font-bold shadow-md"
            >
              <span>[04] Certificates →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : <div />}
        </div>

        {/* Section Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scroll Wheel or Drag to Explore</span>
            </div>

            <div className="flex items-baseline gap-4">
              <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black leading-none">
                Selected Work
              </h2>
              <span className="hidden sm:inline font-mono text-sm text-black/70 font-bold">
                [{String(currentCardIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}]
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'case-study', 'web-design', 'app-design'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playClick();
                  setFilter(tag);
                  targetXRef.current = 0;
                  currentXRef.current = 0;
                  setScrollProgress(0);
                  setCurrentCardIndex(0);
                }}
                onMouseEnter={playHover}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all chamfer-sm font-bold ${
                  filter === tag
                    ? 'bg-black text-[#9df133] shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
              >
                {tag === 'all' ? 'All Works' : tag.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Horizontally Scrolling Project Track with 3D Perspective */}
      <div
        className="relative z-10 w-full flex-1 flex items-center overflow-hidden my-4 min-h-[380px]"
        style={{ perspective: '1400px' }}
      >
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-6 md:gap-8 px-4 md:px-12 w-max will-change-transform [transform-style:preserve-3d]"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                playClick();
                onSelectProject(project);
              }}
              onMouseEnter={playHover}
              className="group cursor-pointer relative bg-black text-[#F5F0EB] p-4 md:p-5 flex flex-col justify-between border-2 border-black hover:border-black/50 transition-[box-shadow,border-color] duration-300 shadow-[8px_8px_0px_#000000] hover:shadow-[14px_14px_0px_#000000] chamfer-card w-[290px] sm:w-[360px] md:w-[440px] lg:w-[480px] shrink-0 will-change-transform [transform-style:preserve-3d]"
            >
              {/* Corner Plus Crosshairs */}
              <span className="absolute top-2 left-2 text-[#9df133] font-mono text-xs select-none z-20">+</span>
              <span className="absolute top-2 right-2 text-[#9df133] font-mono text-xs select-none z-20">+</span>
              <span className="absolute bottom-2 left-2 text-[#9df133] font-mono text-xs select-none z-20">+</span>
              <span className="absolute bottom-2 right-2 text-[#9df133] font-mono text-xs select-none z-20">+</span>

              {/* Card Image with Fluid Distortion Filter */}
              <div className="relative aspect-[16/10] w-full bg-[#131418] overflow-hidden mb-4">
                <CardFluidDistortion
                  imageSrc={project.image}
                  altText={project.title}
                  horizontalVelocity={horizontalVelocity}
                  className="w-full h-full"
                />

                {/* Project Tag Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 bg-black/90 backdrop-blur-sm text-[#9df133] font-mono text-[10px] uppercase tracking-widest border border-[#9df133]/40 chamfer-sm">
                    {project.tag}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="px-4 py-2 bg-[#9df133] text-black font-heading font-bold text-xs uppercase tracking-wider chamfer-sm flex items-center gap-1.5 shadow-lg">
                    <span>{project.tag === 'case-study' ? 'View Case Study' : 'Explore Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Info */}
              <div className="px-2 pb-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xl md:text-2xl uppercase tracking-wide text-[#F5F0EB] group-hover:text-[#9df133] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#747785] group-hover:text-[#9df133] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <div className="mt-2 flex items-center justify-between font-mono text-xs text-[#747785]">
                  <span>{project.year}</span>
                  <span className="text-[#9df133] group-hover:underline">
                    {project.tag === 'case-study' ? 'Interactive Case Study' : 'Product Design'}
                  </span>
                </div>
              </div>

              {/* Card Numbering */}
              <div className="absolute top-3 right-3 font-mono text-xs text-[#747785] group-hover:text-[#9df133] transition-colors">
                #{String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stage Controls & Navigation */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black/80 font-mono text-xs">
        {/* Active indicator bar */}
        <div className="flex items-center gap-1.5">
          {filteredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              onMouseEnter={playHover}
              aria-label={`Jump to project ${i + 1}`}
              className={`h-2 transition-all rounded-none ${
                currentCardIndex === i
                  ? 'w-8 bg-black'
                  : 'w-2 bg-black/30 hover:bg-black/60'
              }`}
            />
          ))}
        </div>

        {/* Center: Stage progression action */}
        {onNavigatePage && (
          <button
            onClick={() => {
              playClick();
              onNavigatePage('certificates');
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider chamfer-sm transition-all shadow-md ${
              allProjectsViewed
                ? 'bg-black text-[#9df133] animate-pulse ring-2 ring-black'
                : 'bg-black/80 hover:bg-black text-[#9df133]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Proceed to Stage 04 // Accreditation Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Prev / Next Card arrows & percentage */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToCard(Math.max(0, currentCardIndex - 1))}
            disabled={currentCardIndex === 0}
            onMouseEnter={playHover}
            className="p-1.5 border border-black text-black hover:bg-black hover:text-[#9df133] disabled:opacity-30 disabled:pointer-events-none transition-colors chamfer-sm"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-black whitespace-nowrap">
            {Math.round(scrollProgress * 100)}% EXPLORED
          </span>
          <button
            onClick={() => scrollToCard(Math.min(filteredProjects.length - 1, currentCardIndex + 1))}
            disabled={currentCardIndex === filteredProjects.length - 1}
            onMouseEnter={playHover}
            className="p-1.5 border border-black text-black hover:bg-black hover:text-[#9df133] disabled:opacity-30 disabled:pointer-events-none transition-colors chamfer-sm"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
