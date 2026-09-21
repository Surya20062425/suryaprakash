import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScrollVelocityRef } from '../hooks/useScrollVelocity';

interface WebGLSectionMeshProps {
  progress?: number; // GSAP ScrollTrigger progress 0.0 -> 1.0
  activeTransition?: 'hero-to-stats' | 'stats-to-work' | 'work-to-workedat' | 'work-to-certs' | 'certs-to-contact' | 'idle';
  className?: string;
  intensity?: number;
}

export const WebGLSectionMesh: React.FC<WebGLSectionMeshProps> = ({
  progress = 0,
  activeTransition = 'idle',
  className = '',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useScrollVelocityRef();
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const transitionRef = useRef(activeTransition);
  transitionRef.current = activeTransition;

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
      console.warn('WebGLSectionMesh: WebGL unavailable', e);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Custom Shader Plane Geometry
    // Segmented plane (128x128) to allow vertex wave deformation along Z and Y
    const planeGeo = new THREE.PlaneGeometry(6.2, 3.8, 128, 128);

    // Vertex Shader: Inelastic & elastic displacement driven by velocity & progress
    const vertexShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform float uProgress;
      uniform float uTiltX;
      uniform float uTiltY;
      uniform float uScale;

      varying vec2 vUv;
      varying float vDistortion;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;

        vec3 pos = position;

        // Inertial 3D wave deformation based on scroll velocity
        float wave1 = sin(pos.x * 2.4 + uTime * 2.2) * cos(pos.y * 1.8 + uTime * 1.5);
        float wave2 = sin(pos.y * 3.5 - uTime * 1.2) * 0.5;
        float totalWave = wave1 + wave2;

        // Vertex bending along Z based on scroll momentum (inertial flex)
        float zFlex = totalWave * clamp(uVelocity * 0.035, -0.6, 0.6);
        pos.z += zFlex;

        // Directional shear along Y
        pos.y += sin(pos.x * 1.6) * clamp(uVelocity * 0.012, -0.25, 0.25);

        // Perspective shift & plane rotation simulation directly on vertices
        float angleX = uTiltX;
        mat3 rotX = mat3(
          1.0, 0.0, 0.0,
          0.0, cos(angleX), -sin(angleX),
          0.0, sin(angleX), cos(angleX)
        );

        float angleY = uTiltY;
        mat3 rotY = mat3(
          cos(angleY), 0.0, sin(angleY),
          0.0, 1.0, 0.0,
          -sin(angleY), 0.0, cos(angleY)
        );

        pos = rotX * rotY * pos;
        pos *= uScale;

        vDistortion = zFlex;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment Shader: Fluid distortion ripples, chromatic aberration, neon phosphor scanlines
    const fragmentShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform float uProgress;
      uniform vec2 uResolution;
      uniform vec3 uAccentColor;
      uniform float uTransitionMode; // 0 = hero-to-stats, 1 = stats-to-work, 2 = work-to-workedat, 3 = ambient

      varying vec2 vUv;
      varying float vDistortion;
      varying vec3 vNormal;

      // Pseudo noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      void main() {
        vec2 uv = vUv;

        // Fluid distortion flow calculation
        float speed = abs(uVelocity);
        float fluidDistort = sin(uv.y * 14.0 + uTime * 3.0 + uv.x * 6.0) * (speed * 0.015);
        vec2 distortedUv = uv + vec2(fluidDistort, fluidDistort * 0.5);

        // Chromatic aberration shift based on scroll velocity
        float chromaticSpread = clamp(speed * 0.008, 0.0, 0.04);
        vec2 rUv = distortedUv + vec2(chromaticSpread, 0.0);
        vec2 bUv = distortedUv - vec2(chromaticSpread, 0.0);

        // Cybernetic Phosphor Grid / Scanline pattern
        float gridX = step(0.96, fract(rUv.x * 28.0));
        float gridY = step(0.96, fract(rUv.y * 28.0));
        float grid = max(gridX, gridY);

        // Scanlines
        float scanline = sin(distortedUv.y * uResolution.y * 0.25) * 0.15 + 0.85;

        // Ambient noise grain
        float grain = (noise(distortedUv * 80.0 + uTime * 4.0) - 0.5) * 0.08;

        // Color palette computation
        vec3 darkBg = vec3(0.0, 0.0, 0.0);
        vec3 neonGreen = uAccentColor; // #9df133
        vec3 darkCyan = vec3(0.08, 0.45, 0.35);

        // Dynamic transition color ramp
        vec3 baseColor;
        if (uTransitionMode < 0.5) {
          // Hero to Stats (Black to Neon Green flush)
          baseColor = mix(darkBg, neonGreen, clamp(uProgress * 1.3, 0.0, 1.0));
        } else if (uTransitionMode < 1.5) {
          // Stats to Work (Neon Green into High-Contrast Work Plane)
          baseColor = mix(neonGreen, vec3(0.06, 0.06, 0.08), clamp(uProgress, 0.0, 1.0));
        } else if (uTransitionMode < 2.5) {
          // Work to Certs (Work into Black CRT)
          baseColor = mix(neonGreen, darkBg, clamp(uProgress, 0.0, 1.0));
        } else if (uTransitionMode < 3.5) {
          // Certs to Contact (Dark CRT into Neon Green flush)
          baseColor = mix(darkBg, neonGreen, clamp(uProgress * 1.3, 0.0, 1.0));
        } else {
          // Ambient idle state with subtle velocity glow
          baseColor = mix(darkBg, neonGreen * 0.25, clamp(speed * 0.03, 0.0, 0.6));
        }

        // Phosphor grid highlight glow
        vec3 finalColor = baseColor;
        finalColor += grid * neonGreen * (0.2 + speed * 0.08);

        // Add subtle chromatic RGB channel edge highlights
        finalColor.r += (sin(rUv.x * 40.0) * 0.5 + 0.5) * chromaticSpread * 2.0;
        finalColor.b += (cos(bUv.y * 40.0) * 0.5 + 0.5) * chromaticSpread * 2.0;

        // Apply scanline and grain
        finalColor *= scanline;
        finalColor += grain;

        // Edge vignette fade
        float vig = 1.0 - smoothstep(0.4, 0.98, length(vUv - 0.5) * 1.4);
        
        // Alpha calculation: subtle when stationary, dynamic on velocity & progress
        float alpha = mix(0.15, 0.92, clamp(abs(uVelocity) * 0.05 + uProgress * 0.8, 0.0, 0.95));

        gl_FragColor = vec4(finalColor, alpha * vig);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uProgress: { value: progress },
      uTiltX: { value: 0 },
      uTiltY: { value: 0 },
      uScale: { value: 1.0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uAccentColor: { value: new THREE.Color('#9df133') },
      uTransitionMode: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(planeGeo, material);
    scene.add(mesh);

    // Mouse pointer interactive fluid drag
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 3. Animation Loop with Physics Inertia
    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Read real-time smoothed inertia velocity from Lenis
      const scrollState = velocityRef.current;
      const smoothVel = scrollState.smoothedVelocity;
      const currentProg = progressRef.current;
      const transMode = transitionRef.current;

      // Mouse soft lerp
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Uniforms update
      uniforms.uTime.value += delta;
      uniforms.uVelocity.value = smoothVel * intensity;
      uniforms.uProgress.value = currentProg;

      let modeVal = 4; // ambient
      if (transMode === 'hero-to-stats') modeVal = 0;
      else if (transMode === 'stats-to-work') modeVal = 1;
      else if (transMode === 'work-to-workedat' || transMode === 'work-to-certs') modeVal = 2;
      else if (transMode === 'certs-to-contact') modeVal = 3;
      uniforms.uTransitionMode.value = modeVal;

      // 4. Perspective Shift & Plane Rotation:
      // Outgoing frame tilts backward in 3D space (rotationX / rotationY)
      // while scaling down slightly. Incoming frame scales up from background.
      const targetTiltX = -currentProg * 0.35 + (smoothVel * 0.008) + mouseY * 0.1;
      const targetTiltY = mouseX * 0.12 - (smoothVel * 0.003);
      const targetScale = (1.0 - currentProg * 0.1) + Math.abs(smoothVel) * 0.005;

      // Soft inertia lerp
      mesh.rotation.x += (targetTiltX - mesh.rotation.x) * 0.1;
      mesh.rotation.y += (targetTiltY - mesh.rotation.y) * 0.1;
      mesh.scale.set(targetScale, targetScale, targetScale);

      uniforms.uTiltX.value = mesh.rotation.x;
      uniforms.uTiltY.value = mesh.rotation.y;
      uniforms.uScale.value = targetScale;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Resize Handler
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none w-full h-full overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};
