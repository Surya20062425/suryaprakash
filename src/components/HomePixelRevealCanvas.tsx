import React, { useEffect, useRef } from 'react';
import { cellThreshold, revealRows, REVEAL_COLS } from '../utils/pixelReveal';

interface HomePixelRevealCanvasProps {
  progress: number;
  color?: string; // e.g. '#9df133'
  inverted?: boolean;
  className?: string;
}

export const HomePixelRevealCanvas: React.FC<HomePixelRevealCanvasProps> = ({
  progress,
  color = '#9df133',
  inverted = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;

    // Use dpr for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    if (progress <= 0 && !inverted) {
      ctx.restore();
      return;
    }
    if (progress >= 1 && inverted) {
      ctx.restore();
      return;
    }

    const cols = w > 768 ? 20 : 14;
    const rows = revealRows(w, h, cols);
    const cellW = w / cols;
    const cellH = h / rows;

    ctx.fillStyle = color;

    // Full solid cover when progress is near 1
    if (progress >= 0.98 && !inverted) {
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      return;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const threshold = cellThreshold(c, r, cols, rows, 0.55);
        const isOpen = progress > 0 && threshold <= progress;
        const shouldDraw = inverted ? !isOpen : isOpen;

        if (shouldDraw) {
          ctx.fillRect(
            Math.floor(c * cellW),
            Math.floor(r * cellH),
            Math.ceil(cellW),
            Math.ceil(cellH)
          );
        }
      }
    }

    ctx.restore();
  }, [progress, color, inverted]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-20 ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
