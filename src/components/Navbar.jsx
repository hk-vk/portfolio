import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';
import FlowerIllustration from './FlowerIllustration';
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

  const categories = [
    { name: 'UI DESIGN', path: '/ui-design' },
    { name: 'FRONTEND', path: '/frontend' },
    { name: 'BACKEND', path: '/backend' },
    { name: 'ANIMATION', path: '/animation' },
    { name: 'DATABASES', path: '/databases' },
    { name: 'DEPLOYMENT', path: '/deployment' },
  ];

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md py-3 shadow-sm' : 'bg-background py-6'
      }`}
    >
      <div className="content-container flex flex-col">
        {/* Top Row: Logo and Info */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <span className="font-bold tracking-tighter text-2xl relative">
                PORT
                <span className="text-primary absolute -top-1 -right-3 rotate-12">
                  <SparkleIllustration size={16} />
                </span>
                <br />
                FOLIO
                <span className="text-primary text-xs align-top ml-1">©</span>
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest">
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <span className="text-muted-foreground">ANNÉE</span>
              {' '}
              <span className="font-bold">2024</span>
              <motion.div
                className="absolute -top-2 -right-5 opacity-70"
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 10
                }}
              >
                <FlowerIllustration className="w-4 h-4" />
              </motion.div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="text-primary font-medium"
            >
              DÉVELOPPEUR FULL STACK
            </motion.div>
            
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

        {/* Bottom Row: Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex justify-between items-center pb-2 border-b border-border"
        >
          {categories.map((category) => (
            <motion.div key={category.path} variants={childVariants}>
              <Link
                to={category.path}
                className="nav-category relative"
              >
                <motion.span
                  className="animated-underline"
                  variants={navItemVariants}
                  whileHover="hover"
                >
                  {category.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-border w-60 flex flex-col space-y-4"
            >
              <div className="text-center text-xs uppercase tracking-widest font-medium text-muted-foreground mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.path}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <Link
                      to={category.path}
                      className="text-xs font-medium text-center uppercase tracking-widest block py-2 px-3 border border-border rounded-md hover:border-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
