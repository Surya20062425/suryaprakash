import React, { useEffect, useRef, useState } from 'react';

export const GridReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!done && canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const cellSize = 44;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.hypot(cx, cy);

      let progress = 0;
      let animId: number;

      const animate = () => {
        progress += 0.028;
        ctx.clearRect(0, 0, w, h);

        const currentRadius = progress * maxDist * 1.25;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = c * cellSize;
            const py = r * cellSize;
            const dist = Math.hypot(px + cellSize / 2 - cx, py + cellSize / 2 - cy);

            if (dist > currentRadius) {
              const alpha = Math.min(1, Math.max(0, (dist - currentRadius) / 160));
              ctx.fillStyle = `rgba(157, 241, 51, ${alpha * 0.85})`;
              ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
            }
          }
        }

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setDone(true);
        }
      };

      animId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animId);
    }
  }, [done]);

  if (done) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[10000]"
      aria-hidden="true"
    />
  );
};
