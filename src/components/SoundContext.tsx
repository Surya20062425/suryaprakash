import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  playHover: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  playHover: () => {},
  playClick: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toggle = useCallback(() => {}, []);
  const playHover = useCallback(() => {}, []);
  const playClick = useCallback(() => {}, []);

  return (
    <SoundContext.Provider value={{ enabled: false, toggle, playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
