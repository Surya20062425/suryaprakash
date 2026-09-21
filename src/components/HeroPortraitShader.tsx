import React, { useRef, useEffect, useState } from 'react';

export const HeroPortraitShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/images/self-portrait-1.webp';
    let animId: number;
    let hoverAmount = 0;
    let targetHover = 0;

    const onPointerEnter = () => {
      targetHover = 1;
      setIsGlitching(true);
    };
    const onPointerLeave = () => {
      targetHover = 0;
      setIsGlitching(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointerenter', onPointerEnter);
      container.addEventListener('pointerleave', onPointerLeave);
    }

    img.onload = () => {
      const render = (time: number) => {
        // Adjust canvas resolution to display bounds
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          animId = requestAnimationFrame(render);
          return;
        }

        const width = Math.floor(rect.width * dpr);
        const height = Math.floor(rect.height * dpr);
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        hoverAmount += (targetHover - hoverAmount) * 0.1;

        ctx.clearRect(0, 0, width, height);

        // Calculate aspect contain positioning
        const imgAspect = img.width / img.height;
        let drawHeight = height;
        let drawWidth = drawHeight * imgAspect;
        if (drawWidth > width) {
          drawWidth = width;
          drawHeight = drawWidth / imgAspect;
        }
        const drawX = (width - drawWidth) / 2;
        const drawY = height - drawHeight; // bottom aligned

        // Periodic glitch trigger
        const glitchCycle = Math.sin(time * 0.003);
        const autoGlitch = glitchCycle > 0.94 ? 0.6 : 0;
        const totalGlitch = Math.max(hoverAmount, autoGlitch);

        if (totalGlitch > 0.05) {
          // Chromatic aberration pass
          const shift = totalGlitch * 6 * dpr;

          // Red Channel
          ctx.save();
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(img, drawX - shift, drawY, drawWidth, drawHeight);

          // Cyan / Green Channel
          ctx.globalCompositeOperation = 'screen';
          ctx.drawImage(img, drawX + shift, drawY, drawWidth, drawHeight);
          ctx.restore();

          // Glitch Horizontal Slices
          if (totalGlitch > 0.3) {
            const numSlices = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < numSlices; i++) {
              const sliceY = drawY + Math.random() * (drawHeight * 0.7);
              const sliceH = Math.random() * 20 * dpr + 4;
              const sliceShift = (Math.random() - 0.5) * 16 * dpr * totalGlitch;

              ctx.drawImage(
                img,
                0, (sliceY - drawY) * (img.height / drawHeight),
                img.width, sliceH * (img.height / drawHeight),
                drawX + sliceShift, sliceY,
                drawWidth, sliceH
              );
            }
          }
        } else {
          // Normal clean rendering
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }

        // Subtle CRT scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        for (let y = 0; y < height; y += 4 * dpr) {
          ctx.fillRect(0, y, width, 1.5 * dpr);
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    };

    return () => {
      if (container) {
        container.removeEventListener('pointerenter', onPointerEnter);
        container.removeEventListener('pointerleave', onPointerLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] max-h-[500px] cursor-pointer group select-none"
    >
      {/* Corner crosshairs in neon green */}
      <span className="absolute -top-3 -left-3 text-[#9df133] font-mono text-sm select-none z-20">+</span>
      <span className="absolute -top-3 -right-3 text-[#9df133] font-mono text-sm select-none z-20">+</span>
      <span className="absolute -bottom-3 -left-3 text-[#9df133] font-mono text-sm select-none z-20">+</span>
      <span className="absolute -bottom-3 -right-3 text-[#9df133] font-mono text-sm select-none z-20">+</span>

      {/* Real WebGL / Interactive Glitch CRT Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block"
      />

      {/* Cyberpunk HUD Badge Overlay on hover */}
      <div
        className={`absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 border border-[#9df133] text-[#9df133] font-mono text-[10px] uppercase tracking-widest transition-opacity duration-200 ${
          isGlitching ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>GLITCH.EXE // ACTIVE</span>
      </div>
    </div>
  );
};
