import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext({
  lenis: null,
  isEnabled: false,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return undefined;
    }

    const instance = new Lenis({
      duration: 0.9,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoRaf: false,
      syncTouch: false,
    });

    setLenis(instance);

    let frameId = 0;
    const frame = (time) => {
      instance.raf(time);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(
    () => ({
      lenis,
      isEnabled: Boolean(lenis),
    }),
    [lenis],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
};
