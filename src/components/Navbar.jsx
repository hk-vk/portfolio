import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    { name: 'Blog', path: '/blog', icon: 'uil:document-layout-left' },
    { name: 'Work', path: '/projects', icon: 'uil:apps' },
    { name: 'Contact', path: '/contact', icon: 'uil:message' },
  ];

  // Track hover to move star smoothly like the provided example
  const [hoverIndex, setHoverIndex] = useState(null);

  // Determine which link should be marked active (supports nested URLs)
  const activeIndex = mainLinks.findIndex(({ path }) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );
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
  };  const navItemVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      }
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 30,
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none"
    >
      {/* Floating pill wrapper */}
      <div className="relative inline-flex items-center bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border/40 rounded-full px-6 py-3 gap-x-2 divide-x divide-border/30 pointer-events-auto">
        {/* Navigation Links */}
        <div className="grid grid-flow-col auto-cols-max gap-3 sm:gap-4">
          {mainLinks.map((link, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoverIndex;
            return (              <motion.div
                key={link.path}
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
                className="relative flex flex-col items-center justify-center min-w-[64px]"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  perspective: '400px',
                }}
              >
                <div
                  className="relative block overflow-hidden"
                  style={{
                    width: '64px',
                    height: '48px',
                    transformStyle: 'preserve-3d',
                  }}
                >                  {/* Front face with icon */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-background/50 text-foreground'
                    } backdrop-blur-sm border border-border/20 rounded-xl`}
                    style={{
                      transformOrigin: 'center center -24px',
                      backfaceVisibility: 'hidden',
                    }}
                    animate={{
                      rotateX: isHovered ? -90 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      mass: 0.8,
                      restDelta: 0.01,
                    }}
                  >
                    <Icon 
                      icon={link.icon} 
                      className="text-xl"
                    />
                  </motion.div>

                  {/* Back face with label */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-accent/80 text-accent-foreground'
                    } backdrop-blur-sm border border-border/20 rounded-xl`}
                    style={{
                      transformOrigin: 'center center -24px',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(90deg)',
                    }}
                    animate={{
                      rotateX: isHovered ? 0 : 90,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      mass: 0.8,
                      restDelta: 0.01,
                    }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider leading-none text-center px-1">
                      {link.name}
                    </span>
                  </motion.div>

                  {/* Clickable Link overlay */}
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className="absolute inset-0 z-10"
                  />
                </div>

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
        <span className="hidden sm:inline-block w-px h-6 bg-border/40 mx-2"></span>        {/* Theme Toggle */}
        <motion.div
          whileHover={{ 
            scale: 1.05, 
            rotate: 3,
            y: -1
          }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ 
            duration: 0.3,
            type: 'spring',
            stiffness: 300,
            damping: 25
          }}
          className="ml-2 flex-shrink-0"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
