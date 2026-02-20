/**
 * Theme toggle utility for switching between light and dark modes.
 * 
 * @returns {Object} Theme control functions
 */
export const themeToggle = () => {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Check for saved theme preference or use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme;
    }
    
    return prefersDarkMode ? 'dark' : 'light';
  };
  
  // Initialize theme
  const setTheme = (theme) => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  };
  
  // Toggle between light and dark
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    return newTheme;
  };
  
  // Initialize theme on load
  const initializeTheme = () => {
    setTheme(getInitialTheme());
  };
  
  return {
    initializeTheme,
    toggleTheme,
    setTheme
  };
};

export default themeToggle; 
