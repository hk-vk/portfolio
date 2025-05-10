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
    { name: 'Blog', path: '/blog' },
    { name: 'Projects', path: '/projects' },
    // { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  // Animation variants
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 22
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
        isScrolled ? 'bg-background/98 backdrop-blur-md shadow-lg border-b border-border/50' : 'bg-background'
      } ${isScrolled ? 'py-3' : 'py-5'} md:py-5`}
    >
      <div className="content-container">
        {/* Top row: Logo and Desktop Nav/Mobile Theme Toggle */}
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
          <div className="hidden md:flex items-center space-x-10 relative">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div key={link.path} whileHover="hover" variants={navItemVariants} className="relative">
                  <Link
                    to={link.path}
                    className={`font-medium text-sm uppercase tracking-wide transition-colors relative group py-2 ${
                      isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      className="absolute -left-5 top-1/2 -translate-y-1/2"
                      layoutId="desktop-active-sparkle"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                      <SparkleIllustration className="text-primary" size={16} />
                    </motion.div>
                  )}
                  <motion.div
                    className={`h-0.5 bg-gradient-to-r from-primary to-accent absolute -bottom-0 left-0 right-0`}
                    layoutId="desktop-active-underline"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </motion.div>
              );
            })}
            
            {/* Theme Toggle for Desktop */}
            <motion.div
              whileHover={{ y: -2, rotate: 5 }}
              className="z-[60] ml-2"
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Theme Toggle (visible on mobile, part of the first row) */}
          <div className="md:hidden z-[60]">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Links (Second Row - visible only on mobile) */}
        <div className="md:hidden flex flex-wrap items-center justify-center space-x-4 pt-3 mt-2 border-t border-border/30">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium text-xs uppercase tracking-wide transition-colors relative py-1.5 ${
                location.pathname === link.path ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-primary to-accent w-full absolute bottom-0 left-0 rounded-t-sm"
                  layoutId="mobile-active-link"
                  transition={{ type: "spring", stiffness: 180, damping: 25 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
