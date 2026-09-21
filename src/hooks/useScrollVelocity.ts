import { useState, useEffect, useRef } from 'react';

export interface ScrollVelocityState {
  velocity: number;
  smoothedVelocity: number;
  scroll: number;
  progress: number;
  direction: number;
}

// Global scroll state store so multiple components can read without overhead
let globalScrollState: ScrollVelocityState = {
  velocity: 0,
  smoothedVelocity: 0,
  scroll: 0,
  progress: 0,
  direction: 0,
};

const listeners = new Set<(state: ScrollVelocityState) => void>();

export function updateGlobalScrollVelocity(state: Partial<ScrollVelocityState>) {
  globalScrollState = { ...globalScrollState, ...state };
  listeners.forEach((listener) => listener(globalScrollState));
}

export function getGlobalScrollVelocity(): ScrollVelocityState {
  return globalScrollState;
}

/**
 * Hook to access real-time scroll velocity and smoothed inertia
 */
export function useScrollVelocity() {
  const [state, setState] = useState<ScrollVelocityState>(globalScrollState);

  useEffect(() => {
    const handleUpdate = (newState: ScrollVelocityState) => {
      setState(newState);
    };

    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return state;
}

/**
 * Hook to access smoothed velocity via ref without triggering React re-renders
 * (Optimal for WebGL animation loops / Three.js requestAnimationFrame)
 */
export function useScrollVelocityRef() {
  const stateRef = useRef<ScrollVelocityState>(globalScrollState);

  useEffect(() => {
    const handleUpdate = (newState: ScrollVelocityState) => {
      stateRef.current = newState;
    };

    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return stateRef;
}
