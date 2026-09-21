import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HorizontalFluidCanvasProps {
  velocity: number;
  progress: number;
  className?: string;
}

export const HorizontalFluidCanvas: React.FC<HorizontalFluidCanvasProps> = ({
  velocity,
  progress,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(velocity);
  velocityRef.current = velocity;
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('HorizontalFluidCanvas: WebGL unavailable', e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 3.5;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Segmented plane for wave curvature
    const planeGeo = new THREE.PlaneGeometry(8, 4.5, 96, 64);

    const vertexShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform float uProgress;
      varying vec2 vUv;
      varying float vWave;

      void main() {
        vUv = uv;

        vec3 pos = position;

        // Horizontal velocity wave displacement
        float speed = clamp(uVelocity * 0.05, -1.2, 1.2);
        float wave = sin(pos.x * 3.0 + uTime * 2.5 + uProgress * 6.0) * cos(pos.y * 2.0);
        pos.z += wave * speed * 0.4;
        pos.y += sin(pos.x * 2.0) * speed * 0.15;

        vWave = wave * speed;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform float uProgress;
      uniform vec2 uResolution;
      varying vec2 vUv;
      varying float vWave;

      void main() {
        vec2 uv = vUv;
        float speed = abs(uVelocity);

        // Horizontal fluid shear
        float fluidShear = sin(uv.y * 18.0 + uTime * 2.0 + uv.x * 8.0) * (speed * 0.02);
        vec2 distortedUv = uv + vec2(fluidShear, 0.0);

        // Cyber phosphor dot grid
        vec2 gridUv = fract(distortedUv * vec2(40.0, 24.0));
        float dotDist = length(gridUv - vec2(0.5));
        float dotGrid = smoothstep(0.35, 0.25, dotDist);

        // Horizontal speed streak lines
        float speedLines = step(0.94, fract(distortedUv.y * 32.0 + uTime * 4.0 * sign(uVelocity)));
        float speedLineAlpha = speedLines * clamp(speed * 0.08, 0.0, 0.4);

        // Neon color highlight
        vec3 neonColor = vec3(0.0, 0.0, 0.0);
        vec3 accentGreen = vec3(0.615, 0.945, 0.2);

        // Pulse wave highlight
        float waveHighlight = abs(vWave) * 1.5;
        
        vec3 finalColor = mix(neonColor, accentGreen, clamp(waveHighlight + speed * 0.04, 0.0, 0.8));
        finalColor += speedLineAlpha * neonColor;

        // Alpha calculation: subtle when calm, dynamic when scrolling fast
        float alpha = (dotGrid * 0.08) + (waveHighlight * 0.25) + speedLineAlpha;
        alpha *= clamp(0.1 + speed * 0.08, 0.05, 0.6);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(planeGeo, material);
    scene.add(mesh);

    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      uniforms.uTime.value += delta;
      uniforms.uVelocity.value = velocityRef.current;
      uniforms.uProgress.value = progressRef.current;

      // Soft plane tilt with horizontal velocity
      const targetTiltY = -velocityRef.current * 0.02;
      mesh.rotation.y += (targetTiltY - mesh.rotation.y) * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniforms.uResolution.value.set(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};
