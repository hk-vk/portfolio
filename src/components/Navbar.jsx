import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // Animation variants
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    hidden: {
      y: -50,
      opacity: 0
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/98 backdrop-blur-md py-3 shadow-lg border-b border-border/50' : 'bg-background py-5'
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-[60]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <span className="font-bold tracking-tighter text-2xl relative">
                <span className="text-gradient bg-gradient-to-r from-primary to-accent">HARI</span>
                <span className="text-primary absolute -top-1 -right-3 rotate-12">
                  <SparkleIllustration size={14} />
                </span>
                <br />
                <span className="text-foreground font-semibold">KRISHNAN</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {mainLinks.map((link) => (
              <motion.div key={link.path} whileHover="hover" variants={navItemVariants}>
                <Link
                  to={link.path}
                  className={`font-medium text-sm uppercase tracking-wide transition-colors relative group ${
                    location.pathname === link.path ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute -left-5 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <SparkleIllustration className="text-primary" size={16} />
                    </motion.div>
                  )}
                  {link.name}
                  <motion.div 
                    className={`h-0.5 bg-gradient-to-r from-primary to-accent absolute -bottom-1.5 left-0 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    initial={{ width: location.pathname === link.path ? "100%" : "0%" }}
                    animate={{ width: location.pathname === link.path ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle */}
            <motion.div 
              whileHover={{ y: -2, rotate: 5 }} 
              className="z-[60] ml-2"
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Navigation - Scrollable Inline */}
          <div className="md:hidden flex-1 overflow-hidden ml-4">
            <div className="flex items-center space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-2 pr-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-sm uppercase tracking-wide flex-shrink-0 transition-colors relative pb-1 ${
                    location.pathname === link.path ? 'text-primary font-bold' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-primary to-accent w-full absolute bottom-0 left-0 rounded-t-md"
                      layoutId="mobile-active-link"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              ))}
              <div className="flex-shrink-0 pl-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
