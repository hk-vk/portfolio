import React, { useEffect, useState } from 'react';
import { motion } from '../lib/motion';
import { themeToggle } from '../utils/themeToggle';
import { spring } from '../utils/motionSettings';
import { motionInteraction } from '../utils/motionContract';

/**
 * Theme toggle button component that allows switching between light and dark mode
 */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
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
      const newTheme = toggleTheme();
      setIsDark(newTheme === 'dark');
    };

    if (!document.startViewTransition) {
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
  
  // Sun and moon icons (inline SVG)
  const SunIcon = ({ className = '' }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  const MoonIcon = ({ className = '' }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      />
    </svg>
  );
  
  return (
    <motion.button
      whileHover={{ rotate: isDark ? -12 : 12, ...motionInteraction.hoverIcon }}
      whileTap={motionInteraction.press}
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative text-foreground hover:text-primary transition-colors"
    >
      <motion.span
        className="block"
        animate={{
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          y: isDark ? 8 : 0,
          scale: isDark ? 0.9 : 1,
        }}
        transition={spring.snappy}
      >
        <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          y: isDark ? 0 : -8,
          scale: isDark ? 1 : 0.9,
        }}
        transition={spring.snappy}
      >
        <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle; 
