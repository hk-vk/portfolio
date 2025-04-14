import React, { useEffect, useState } from 'react';
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
  
  return (
    <button 
      onClick={handleToggle}
      className={`theme-toggle ${isDark ? 'dark' : ''}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

export default ThemeToggle; 