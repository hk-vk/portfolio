import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import ThemeToggle from './ThemeToggle';
import SparkleIllustration from './SparkleIllustration';

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
    { name: 'Home', path: '/', icon: 'uil:estate' },
    { name: 'About', path: '/about', icon: 'uil:user-circle' },
    { name: 'Blog', path: '/blog', icon: 'uil:document-layout-left' },
    { name: 'Projects', path: '/projects', icon: 'uil:apps' },
    { name: 'Contact', path: '/contact', icon: 'uil:message' },
  ];

  // Track hover to move star smoothly like the provided example
  const [hoverIndex, setHoverIndex] = useState(null);

  const activeIndex = mainLinks.findIndex((l) => l.path === location.pathname);
  const highlightIndex = hoverIndex != null ? hoverIndex : activeIndex;

  // Animation variants (slide in from bottom instead of top)
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 22,
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
    },
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
      className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none"
    >
      {/* Floating pill wrapper */}
      <div className="relative inline-flex items-center bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border/40 rounded-full px-6 py-3 gap-x-2 divide-x divide-border/30 pointer-events-auto">
        {/* Navigation Links */}
        <div className="grid grid-flow-col auto-cols-max gap-3 sm:gap-4">
          {mainLinks.map((link, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoverIndex;
            return (
              <motion.div
                key={link.path}
                whileHover="hover"
                variants={navItemVariants}
                className="relative flex flex-col items-center justify-center min-w-[64px]"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  perspective: '400px',
                }}
              >
                <Link
                  to={link.path}
                  className="relative block overflow-hidden"
                  style={{
                    width: '64px',
                    height: '48px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front face with icon */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-background/50 text-foreground hover:text-primary hover:bg-background'
                    } backdrop-blur-sm border border-border/20 rounded-xl`}
                    style={{
                      transformOrigin: 'center center -24px',
                    }}
                    animate={{
                      rotateX: isHovered ? -90 : 0,
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  >
                    <Icon 
                      icon={link.icon} 
                      className="text-2xl"
                    />
                  </motion.div>

                  {/* Back face with full name */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-accent/80 text-accent-foreground'
                    } backdrop-blur-sm border border-border/20 rounded-xl`}
                    style={{
                      transformOrigin: 'center center -24px',
                    }}
                    animate={{
                      rotateX: isHovered ? 0 : 90,
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider leading-none text-center px-1 break-words max-w-full">
                      {link.name}
                    </span>
                  </motion.div>
                </Link>

                {/* Star indicator */}
                {highlightIndex === idx && (
                  <motion.div
                    layoutId="active-star"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                    >
                      <SparkleIllustration className="text-primary drop-shadow" size={18} />
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <span className="hidden sm:inline-block w-px h-6 bg-border/40 mx-2"></span>

        {/* Theme Toggle */}
        <motion.div
          whileHover={{ y: -2, rotate: 5 }}
          className="ml-2 flex-shrink-0"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
