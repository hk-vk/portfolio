/**
 * Theme toggle utility for switching between light and dark modes.
 * 
 * @returns {Object} Theme control functions
 */
export const themeToggle = () => {
  // Default to dark; only a saved light preference overrides it.
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    return savedTheme === 'light' ? 'light' : 'dark';
  };
  
  // Initialize theme
  const setTheme = (theme) => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  };
  
  // Toggle between light and dark
  const toggleTheme = () => {
    const currentTheme = getInitialTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    return newTheme;
  };
  
  // Initialize theme on load
  const initializeTheme = () => {
    const theme = getInitialTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  };
  
  return {
    initializeTheme,
    toggleTheme,
    setTheme
  };
};

export default themeToggle; 
