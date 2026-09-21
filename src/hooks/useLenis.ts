import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateGlobalScrollVelocity } from './useScrollVelocity';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Provide global window reference
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();

      // Update global scroll velocity state for WebGL shaders & transforms
      const rawVelocity = e.velocity || 0;
      const progress = e.progress || 0;
      const scroll = e.scroll || 0;
      const direction = e.direction || 0;

      updateGlobalScrollVelocity({
        velocity: rawVelocity,
        scroll,
        progress,
        direction,
      });
    });

    // Inertia & Physics Interpolation ticker loop
    let smoothedVelocity = 0;
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);

      const targetVelocity = lenis.velocity || 0;
      // Smooth physics momentum interpolation with soft easing stop
      smoothedVelocity += (targetVelocity - smoothedVelocity) * 0.085;

      updateGlobalScrollVelocity({
        smoothedVelocity,
      });
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
