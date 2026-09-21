import React, { useEffect, useRef } from 'react';

interface PixelRevealTransitionProps {
  color?: string;
  className?: string;
  mode?: 'enter' | 'exit';
}

export const PixelRevealTransition: React.FC<PixelRevealTransitionProps> = ({
  color = '#9df133',
  className = '',
  mode = 'enter'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 24;
    let rows = 12;
    let thresholds: Float32Array;

    const generateThresholds = (numCells: number) => {
      thresholds = new Float32Array(numCells);
      for (let i = 0; i < numCells; i++) {
        // Center-weighted + random noise for organic pixel dissolve
        thresholds[i] = Math.random();
      }
    };

    let animId: number;
    let width = 0;
    let height = 0;
    let progress = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      const cellSize = width / cols;
      rows = Math.max(4, Math.ceil(height / cellSize));
      generateThresholds(cols * rows);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Calculate reveal progress based on scroll position
      if (mode === 'enter') {
        // Enters when top enters viewport from bottom
        const start = vh * 0.95;
        const end = vh * 0.2;
        const p = 1 - (rect.top - end) / (start - end);
        progress = Math.min(1, Math.max(0, p));
      } else {
        // Exits as section scrolls off
        const start = vh * 0.4;
        const end = -rect.height * 0.5;
        const p = 1 - (rect.top - end) / (start - end);
        progress = Math.min(1, Math.max(0, p));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (progress > 0 && width > 0 && height > 0) {
        const cellW = width / cols;
        const cellH = height / rows;

        ctx.fillStyle = color;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const threshold = thresholds[idx] ?? 0.5;

            // Bias by row so dissolve travels vertically
            const rowBias = mode === 'enter' ? (1 - r / rows) * 0.5 : (r / rows) * 0.5;
            const effectiveProgress = progress * 1.5 - rowBias;

            if (effectiveProgress > threshold) {
              ctx.fillRect(
                Math.floor(c * cellW),
                Math.floor(r * cellH),
                Math.ceil(cellW),
                Math.ceil(cellH)
              );
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [color, mode]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-x-0 h-28 z-20 overflow-hidden ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
