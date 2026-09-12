import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from '../lib/motion';
import { themeToggle } from '../utils/themeToggle';
import { motionInteraction } from '../utils/motionContract';
import { useMotionSafe } from '../utils/useMotionSafe';
import { posthog } from '../utils/analytics';

/**
 * Theme toggle button component that allows switching between light and dark mode
 */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const motionSafe = useMotionSafe();
  const { toggleTheme } = themeToggle();
  
  useEffect(() => {
    // Set initial state based on current theme
    const currentTheme = document.documentElement.classList.contains('dark');
    setIsDark(currentTheme);
  }, []);
  
  const handleToggle = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const performToggle = () => {
      const previousTheme = isDark ? 'dark' : 'light';
      const newTheme = toggleTheme();
      setIsDark(newTheme === 'dark');
      posthog?.capture('theme_toggled', {
        from_theme: previousTheme,
        to_theme: newTheme,
        path: window.location.pathname,
      });
    };

    if (!motionSafe || !document.startViewTransition) {
      performToggle();
      return;
    }

    const transition = document.startViewTransition(() => {
      performToggle();
    });

    transition.ready.then(() => {
      document.documentElement.style.setProperty('--x', `${x}px`);
      document.documentElement.style.setProperty('--y', `${y}px`);
    });
  };
  
  return (
    <motion.button
      whileTap={motionSafe ? motionInteraction.press : undefined}
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative grid size-10 place-items-center overflow-hidden rounded-2xl text-foreground transition-colors hover:text-primary sm:size-12"
    >
      <motion.span
        className="block"
        animate={{
          opacity: isDark ? 1 : 0,
          scale: motionSafe ? (isDark ? 1 : 0.82) : 1,
        }}
        transition={{ duration: motionSafe ? 0.18 : 0, ease: [0.19, 1, 0.22, 1] }}
      >
        <Icon icon="hugeicons:sun-03" className="size-[18px]" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isDark ? 0 : 1,
          scale: motionSafe ? (isDark ? 0.82 : 1) : 1,
        }}
        transition={{ duration: motionSafe ? 0.18 : 0, ease: [0.19, 1, 0.22, 1] }}
      >
        <Icon icon="hugeicons:moon-02" className="size-[18px]" />
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle; 
