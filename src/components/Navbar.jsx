import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
          <Link to="/" className="relative z-10">
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
              <motion.div 
                key={link.path}
                whileHover="hover"
                variants={navItemVariants}
              >
                <Link
                  to={link.path}
                  className={`font-medium text-sm transition-colors relative ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.div 
                      className="absolute -left-4 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <SparkleIllustration className="text-primary" size={12} />
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
            <motion.div whileHover={{ y: -2 }}>
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 flex items-center"
            aria-label="Toggle menu"
          >
            {/* Theme Toggle - Mobile */}
            <div className="mr-4">
              <ThemeToggle />
            </div>
            
            <div className="w-6 flex flex-col items-end justify-center">
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 7 : 0,
                  width: isMobileMenuOpen ? 24 : 24
                }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 bg-foreground mb-1.5"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  width: isMobileMenuOpen ? 0 : 16
                }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 bg-foreground mb-1.5"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -7 : 0,
                  width: isMobileMenuOpen ? 24 : 20
                }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 bg-foreground"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 bg-background/95 md:hidden z-0 flex flex-col items-center justify-center"
        >
          <nav className="flex flex-col space-y-6 items-center">
            {mainLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-medium flex items-center ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {location.pathname === link.path && (
                    <SparkleIllustration className="text-primary mr-2" size={16} />
                  )}
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
