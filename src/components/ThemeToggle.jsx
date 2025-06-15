import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themeToggle } from '../utils/themeToggle';

/**
 * Theme toggle button component that allows switching between light and dark mode
 */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const { initializeTheme, toggleTheme } = themeToggle();
  
  useEffect(() => {
    // Initialize theme on component mount
    initializeTheme();
    
    // Set initial state based on current theme
    const currentTheme = localStorage.getItem('theme');
    setIsDark(currentTheme === 'dark');
  }, []);
  
  const handleToggle = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === 'dark');
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
      whileHover={{ rotate: isDark ? -20 : 20, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="text-foreground hover:text-primary transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: -10, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <MoonIcon className="w-6 h-6" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: -10, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: -90 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <SunIcon className="w-6 h-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle; 