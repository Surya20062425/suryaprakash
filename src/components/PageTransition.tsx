import React, { useEffect, useRef } from 'react';

interface PageTransitionProps {
  status: 'idle' | 'exiting' | 'entering';
  onExited?: () => void;
  onEntered?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  status,
  onExited,
  onEntered
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (status === 'idle') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.max(1, Math.round(w / 36));
    const rows = Math.max(1, Math.round(h / 36));
    const cellW = w / cols;
    const cellH = h / rows;
    const centerX = w / 2;
    const centerY = h / 2;
    const maxRadius = Math.hypot(centerX, centerY);

    interface Cell {
      cx: number;
      cy: number;
      dist: number;
      active: boolean;
      threshold: number;
    }

    const isExiting = status === 'exiting'; // filling with green
    const cells: Cell[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = (c + 0.5) * cellW;
        const cy = (r + 0.5) * cellH;
        cells.push({
          cx,
          cy,
          dist: Math.hypot(cx - centerX, cy - centerY),
          active: !isExiting, // if entering, all start active
          threshold: Math.random()
        });
      }
    }

    const primaryGreen = '#9df133';
    let currentR = 0;
    const duration = isExiting ? 380 : 500; // ms
    const startTime = performance.now();
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = primaryGreen;
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.active) {
          ctx.fillRect(
            cell.cx - cellW / 2 - 0.5,
            cell.cy - cellH / 2 - 0.5,
            cellW + 1,
            cellH + 1
          );
        }
      }
    };

    draw();

    const loop = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));
      
      // Easing: power2.out / power2.in
      const ease = isExiting 
        ? progress * progress // easeIn
        : 1 - Math.pow(1 - progress, 2); // easeOut

      currentR = ease * maxRadius * 1.05;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const diff = cell.dist - currentR;
        const ratio = diff <= 0 ? 1 : diff >= 160 ? 0 : 1 - (diff / 160) * 0.95;

        if (isExiting) {
          // Filling with green blocks towards center or from center
          if (ratio > cell.threshold) {
            cell.active = true;
          }
        } else {
          // Dissolving away green blocks outwards
          if (ratio > cell.threshold) {
            cell.active = false;
          }
        }
      }

      draw();

      if (progress < 1) {
        animId = requestAnimationFrame(loop);
      } else {
        if (isExiting) {
          // Screen completely covered in green
          ctx.fillRect(0, 0, w, h);
          onExited?.();
        } else {
          // Completely dissolved
          ctx.clearRect(0, 0, w, h);
          onEntered?.();
        }
      }
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [status, onExited, onEntered]);

  if (status === 'idle') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
};
