import { useEffect, useState } from 'react';

export function useMotionSafe() {
  const [motionSafe, setMotionSafe] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionSafe(!mq.matches);
    const handler = () => setMotionSafe(!mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return motionSafe;
} 