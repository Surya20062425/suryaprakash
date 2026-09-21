import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './Hero';
import { StatsAndTools } from './StatsAndTools';
import { SelectedWork } from './SelectedWork';
import { CertificatesSection } from './CertificatesSection';
import { ProjectItem } from '../types';
import { WebGLSectionMesh } from './WebGLSectionMesh';
import { HomePixelRevealCanvas } from './HomePixelRevealCanvas';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import { useSound } from './SoundContext';

gsap.registerPlugin(ScrollTrigger);

interface HomeStagesProps {
  onSelectProject: (project: ProjectItem) => void;
  onExploreWork: () => void;
}

export const HomeStages: React.FC<HomeStagesProps> = ({
  onSelectProject,
  onExploreWork
}) => {
  const { playClick } = useSound();

  // Scroll velocity for organic physical tilt
  const { smoothedVelocity } = useScrollVelocity();

  // ---------------------------------------------------------------------------
  // TRANSITION 1: HERO → STATS & TOOLS
  // ---------------------------------------------------------------------------
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const [heroRevealProgress, setHeroRevealProgress] = useState(0);
  const soundHeroTriggeredRef = useRef(false);

  useEffect(() => {
    const heroTrack = heroTrackRef.current;
    let heroTrigger: ScrollTrigger | null = null;

    if (heroTrack) {
      heroTrigger = ScrollTrigger.create({
        trigger: heroTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          const startT = 0.15;
          const endT = 0.92;
          const rawReveal = p <= startT ? 0 : (p - startT) / (endT - startT);
          const clamped = Math.min(1, Math.max(0, rawReveal));
          setHeroRevealProgress(clamped);

          if (clamped > 0.08 && !soundHeroTriggeredRef.current) {
            soundHeroTriggeredRef.current = true;
            try { playClick(); } catch { /* silent */ }
          } else if (clamped < 0.02) {
            soundHeroTriggeredRef.current = false;
          }
        },
      });
    }

    return () => {
      if (heroTrigger) heroTrigger.kill();
    };
  }, [playClick]);

  // Perspective math: Hero -> Stats
  const heroTiltX = -heroRevealProgress * 15 + Math.min(Math.max(smoothedVelocity * 0.15, -4), 4);
  const heroScale = 1 - heroRevealProgress * 0.08;
  const heroTranslateZ = -heroRevealProgress * 120;
  const heroOpacity = 1 - heroRevealProgress * 0.45;

  const statsIncomingTiltX = (1 - heroRevealProgress) * 10;
  const statsIncomingScale = 0.94 + heroRevealProgress * 0.06;

  // ---------------------------------------------------------------------------
  // TRANSITION 2: STATS & TOOLS → SELECTED WORK
  // ---------------------------------------------------------------------------
  const toolsTrackRef = useRef<HTMLDivElement>(null);
  const toolsInnerRef = useRef<HTMLDivElement>(null);
  const [toolsRevealProgress, setToolsRevealProgress] = useState(0);
  const soundToolsTriggeredRef = useRef(false);

  useEffect(() => {
    const toolsTrack = toolsTrackRef.current;
    let toolsTrigger: ScrollTrigger | null = null;

    if (toolsTrack) {
      toolsTrigger = ScrollTrigger.create({
        trigger: toolsTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          const startT = 0.15;
          const endT = 0.92;
          const rawReveal = p <= startT ? 0 : (p - startT) / (endT - startT);
          const clamped = Math.min(1, Math.max(0, rawReveal));
          setToolsRevealProgress(clamped);

          if (clamped > 0.08 && !soundToolsTriggeredRef.current) {
            soundToolsTriggeredRef.current = true;
            try { playClick(); } catch { /* silent */ }
          } else if (clamped < 0.02) {
            soundToolsTriggeredRef.current = false;
          }
        },
      });
    }

    return () => {
      if (toolsTrigger) toolsTrigger.kill();
    };
  }, [playClick]);

  // Perspective math: Stats -> Work
  const toolsTiltX = -toolsRevealProgress * 15 + Math.min(Math.max(smoothedVelocity * 0.15, -4), 4);
  const toolsScale = 1 - toolsRevealProgress * 0.08;
  const toolsTranslateZ = -toolsRevealProgress * 120;
  const toolsOpacity = 1 - toolsRevealProgress * 0.45;

  const workIncomingTiltX = (1 - toolsRevealProgress) * 10;
  const workIncomingScale = 0.94 + toolsRevealProgress * 0.06;

  // ---------------------------------------------------------------------------
  // TRANSITION 3: SELECTED WORK → CERTIFICATES & LICENSES
  // ---------------------------------------------------------------------------
  const workTrackRef = useRef<HTMLDivElement>(null);
  const workInnerRef = useRef<HTMLDivElement>(null);
  const [workRevealProgress, setWorkRevealProgress] = useState(0);
  const soundWorkTriggeredRef = useRef(false);

  useEffect(() => {
    const workTrack = workTrackRef.current;
    let workTrigger: ScrollTrigger | null = null;

    if (workTrack) {
      workTrigger = ScrollTrigger.create({
        trigger: workTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const p = self.progress;
          const startT = 0.15;
          const endT = 0.92;
          const rawReveal = p <= startT ? 0 : (p - startT) / (endT - startT);
          const clamped = Math.min(1, Math.max(0, rawReveal));
          setWorkRevealProgress(clamped);

          if (clamped > 0.08 && !soundWorkTriggeredRef.current) {
            soundWorkTriggeredRef.current = true;
            try { playClick(); } catch { /* silent */ }
          } else if (clamped < 0.02) {
            soundWorkTriggeredRef.current = false;
          }
        },
      });
    }

    return () => {
      if (workTrigger) workTrigger.kill();
    };
  }, [playClick]);

  // Perspective math: Work -> Certificates
  const workTiltX = -workRevealProgress * 15 + Math.min(Math.max(smoothedVelocity * 0.15, -4), 4);
  const workScale = 1 - workRevealProgress * 0.08;
  const workTranslateZ = -workRevealProgress * 120;
  const workOpacity = 1 - workRevealProgress * 0.45;

  const certIncomingTiltX = (1 - workRevealProgress) * 10;
  const certIncomingScale = 0.94 + workRevealProgress * 0.06;

  return (
    <div className="w-full relative bg-[#000000] overflow-x-clip">
      {/* 
        ========================================================================
        PORTION 01: HERO (PINNED 3D RUNWAY)
        ========================================================================
        Transitions into Portion 02 (Stats & Tools) via 3D plane tilt,
        inertial scale down, lime pixel wipe, and WebGL fluid distortion shaders.
      */}
      <div
        ref={heroTrackRef}
        className="relative w-full h-[220vh] md:h-[240vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
          <div
            ref={heroInnerRef}
            className="w-full h-full will-change-transform origin-bottom"
            style={{
              transform: `perspective(1200px) rotateX(${heroTiltX}deg) scale(${heroScale}) translateZ(${heroTranslateZ}px)`,
              opacity: heroOpacity,
              transition: 'transform 0.05s linear',
            }}
          >
            <Hero onExploreWork={onExploreWork} />
          </div>

          {/* WebGL Fluid Distortion Mesh Layer: Hero -> Stats */}
          {heroRevealProgress > 0 && heroRevealProgress < 1 && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <WebGLSectionMesh
                progress={heroRevealProgress}
                activeTransition="hero-to-stats"
                intensity={1.5}
              />
            </div>
          )}

          {/* Signature Lime Green Pixel Reveal Canvas Wipe */}
          {heroRevealProgress > 0 && (
            <HomePixelRevealCanvas
              progress={heroRevealProgress}
              color="#9df133"
              className="z-30 pointer-events-none"
            />
          )}

          {/* Cyber Stage Transition Status HUD */}
          {heroRevealProgress > 0.04 && heroRevealProgress < 0.98 && (
            <div className="absolute inset-x-0 bottom-16 flex justify-center z-40 pointer-events-none">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-black/90 border border-[#9df133] text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm shadow-[0_0_25px_rgba(157,241,51,0.35)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#9df133] animate-ping" />
                <span>TRANSITION // HERO → TOOLCHAIN [{Math.round(heroRevealProgress * 100)}%]</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 
        ========================================================================
        PORTION 02: STATS & TOOLS (PINNED 3D RUNWAY)
        ========================================================================
        Slides & scales in with 3D perspective from Hero, then directly
        transitions into Portion 03 (Selected Work) using the exact same
        3D plane tilt, WebGL fluid distortion, and pixel canvas dissolve.
      */}
      <div
        id="stats-tools-anchor"
        ref={toolsTrackRef}
        className="relative z-20 w-full h-[220vh] md:h-[240vh] bg-[#9df133]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
          <div
            ref={toolsInnerRef}
            className="w-full h-full will-change-transform origin-bottom"
            style={{
              transform: heroRevealProgress > 0 && heroRevealProgress < 1
                ? `perspective(1200px) rotateX(${statsIncomingTiltX}deg) scale(${statsIncomingScale})`
                : `perspective(1200px) rotateX(${toolsTiltX}deg) scale(${toolsScale}) translateZ(${toolsTranslateZ}px)`,
              opacity: toolsOpacity,
              transition: 'transform 0.05s linear',
            }}
          >
            <StatsAndTools />
          </div>

          {/* WebGL Fluid Distortion Mesh Layer: Stats -> Work */}
          {toolsRevealProgress > 0 && toolsRevealProgress < 1 && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <WebGLSectionMesh
                progress={toolsRevealProgress}
                activeTransition="stats-to-work"
                intensity={1.5}
              />
            </div>
          )}

          {/* Dark Pixel Canvas Wipe: Green surface dissolving into Dark Cinema */}
          {toolsRevealProgress > 0 && (
            <HomePixelRevealCanvas
              progress={toolsRevealProgress}
              color="#070707"
              className="z-30 pointer-events-none"
            />
          )}

          {/* Cyber Stage Transition Status HUD */}
          {toolsRevealProgress > 0.04 && toolsRevealProgress < 0.98 && (
            <div className="absolute inset-x-0 bottom-16 flex justify-center z-40 pointer-events-none">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-black/90 border border-[#9df133] text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm shadow-[0_0_25px_rgba(157,241,51,0.35)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#9df133] animate-ping" />
                <span>TRANSITION // TOOLCHAIN → SELECTED WORK [{Math.round(toolsRevealProgress * 100)}%]</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 
        ========================================================================
        PORTION 03: SELECTED WORK (PINNED 3D RUNWAY)
        ========================================================================
        Contains the interactive carousel on the green stage. When finishing
        or scrolling through, it transitions into Portion 04 (Certificates)
        using the exact same 3D tilt, WebGL ripples, and pixel reveal canvas.
      */}
      <div
        id="selected-work-wrapper"
        ref={workTrackRef}
        className="relative z-30 w-full"
      >
        <div
          ref={workInnerRef}
          className="w-full will-change-transform origin-bottom"
          style={{
            transform: toolsRevealProgress > 0 && toolsRevealProgress < 1
              ? `perspective(1200px) rotateX(${workIncomingTiltX}deg) scale(${workIncomingScale})`
              : workRevealProgress > 0 && workRevealProgress < 1
              ? `perspective(1200px) rotateX(${workTiltX}deg) scale(${workScale}) translateZ(${workTranslateZ}px)`
              : 'none',
            opacity: workOpacity,
            transition: 'transform 0.05s linear',
          }}
        >
          <SelectedWork onSelectProject={onSelectProject} />
        </div>

        {/* WebGL Fluid Distortion Mesh Layer: Work -> Certificates */}
        {workRevealProgress > 0 && workRevealProgress < 1 && (
          <div className="absolute inset-0 z-40 pointer-events-none">
            <WebGLSectionMesh
              progress={workRevealProgress}
              activeTransition="work-to-workedat"
              intensity={1.5}
            />
          </div>
        )}

        {/* Signature Lime Green Pixel Reveal Canvas Wipe */}
        {workRevealProgress > 0 && (
          <HomePixelRevealCanvas
            progress={workRevealProgress}
            color="#9df133"
            className="z-50 pointer-events-none"
          />
        )}

        {/* Cyber Stage Transition Status HUD */}
        {workRevealProgress > 0.04 && workRevealProgress < 0.98 && (
          <div className="fixed inset-x-0 bottom-16 flex justify-center z-50 pointer-events-none">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-black/90 border border-[#9df133] text-[#9df133] font-mono text-xs uppercase tracking-widest chamfer-sm shadow-[0_0_25px_rgba(157,241,51,0.35)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#9df133] animate-ping" />
              <span>TRANSITION // SELECTED WORK → CERTIFICATES [{Math.round(workRevealProgress * 100)}%]</span>
            </div>
          </div>
        )}
      </div>

      {/* 
        ========================================================================
        PORTION 04: CERTIFICATES & LICENSES (REPLACING EXPERIENCE)
        ========================================================================
        Revealed via the transition, presenting verified credentials, digital badges,
        skills tested, and accreditation verification modals.
      */}
      <div
        id="certificates-anchor"
        className="relative z-20 w-full bg-[#070707] will-change-transform origin-top"
        style={{
          transform: workRevealProgress > 0 && workRevealProgress < 1
            ? `perspective(1200px) rotateX(${certIncomingTiltX}deg) scale(${certIncomingScale})`
            : 'none',
        }}
      >
        <CertificatesSection />
      </div>
    </div>
  );
};
