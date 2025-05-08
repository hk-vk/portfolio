import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
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
      y: -2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  // New variants for mobile menu overlay and items
  const mobileMenuOverlayVariants = {
    open: {
      clipPath: `circle(150% at 50% 50%)`,
      transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.7 }
    },
    closed: {
      clipPath: `circle(0% at 90% 10%)`,
      transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.3, delay: 0.3 }
    }
  };

  const mobileMenuItemContainerVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const mobileMenuItemVariants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md py-3 shadow-sm' : 'bg-background py-4'
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
                HARI
                <span className="text-primary absolute -top-1 -right-3 rotate-12">
                  <SparkleIllustration size={14} />
                </span>
                <br />
                KRISHNAN
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {mainLinks.map((link) => (
              <motion.div key={link.path} whileHover="hover" variants={navItemVariants}>
                <Link
                  to={link.path}
                  className={`font-medium text-sm transition-colors relative ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute -left-5 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <SparkleIllustration className="text-primary" size={16} />
                    </motion.div>
                  )}
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="h-0.5 bg-primary w-full absolute -bottom-1 left-0"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle */}
            <motion.div whileHover={{ y: -2 }} className="z-[60]">
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button - New Design */}
          <div className="md:hidden relative z-[60]">
            <motion.button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -3,
                }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="block absolute h-0.5 w-5 bg-primary rounded-full"
              />
              <motion.span
                animate={{ 
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 3,
                }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="block absolute h-0.5 w-5 bg-primary rounded-full"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - New Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-background/80 backdrop-blur-lg md:hidden z-50 flex flex-col items-center justify-center space-y-10 p-8"
          >
            <motion.nav 
              variants={mobileMenuItemContainerVariants}
              className="flex flex-col space-y-8 text-center"
            >
              {mainLinks.map((link) => (
                <motion.div key={link.path} variants={mobileMenuItemVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)} // Ensure menu closes on click
                    className={`text-4xl font-semibold transition-colors hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div variants={mobileMenuItemVariants} className="pt-8">
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
