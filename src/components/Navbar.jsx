import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import ThemeToggle from './ThemeToggle';
import SocialPopover from './SocialPopover';
import { useSocialPopover } from '../context/SocialPopoverContext';

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
    { name: 'Home', path: '/', icon: 'tabler:home' },
    { name: 'Work', path: '/projects', icon: 'tabler:code' },
    { name: 'Blog', path: '/blog', icon: 'tabler:pencil' },
    { name: 'Connect', path: '/contact', icon: 'tabler:at' },
  ];

  // Track hover to move star smoothly like the provided example
  const [hoverIndex, setHoverIndex] = useState(null);
  // Use context for social popover state
  const { socialOpen, toggleSocialPopover, closeSocialPopover, triggerRef } = useSocialPopover();

  // Determine which link should be marked active (supports nested URLs)
  const activeIndex = mainLinks.findIndex(({ path }) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );

  // Animation variants (slide in from bottom instead of top)
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      },
    },
    hidden: {
      y: 60,
      opacity: 0,
    },
  };

  const navItemVariants = {
    hover: {
      scale: 1.04,
      y: -3,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.6,
      }
    },
    tap: {
      scale: 0.96,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-auto px-4 sm:px-0"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '0',
        right: '0',
        zIndex: 50
      }}
    >
      {/* Floating pill wrapper */}
      <div className="relative inline-flex items-center bg-background/70 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 ring-1 ring-border/30 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 gap-x-1.5 sm:gap-x-4 pointer-events-auto">
        {/* Navigation Links */}
        <div className="grid grid-flow-col auto-cols-max gap-1 sm:gap-2 md:gap-3">
          {mainLinks.map((link, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoverIndex;
            return (
              <motion.div
                key={link.path}
                ref={link.name === 'Connect' ? triggerRef : null}
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
                className={`relative flex flex-col items-center justify-center min-w-[48px] sm:min-w-[56px] md:min-w-[64px] cursor-pointer ${link.name === 'Connect' && socialOpen ? 'z-20' : ''}`}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => {
                  if (link.name === 'Connect') {
                    toggleSocialPopover();
                  }
                }}
                style={{
                  perspective: '400px',
                }}
              >
                <div
                  className="relative block overflow-hidden w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-12"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front face with icon */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      isActive || (link.name === 'Connect' && socialOpen) 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'bg-muted/40 text-foreground hover:bg-muted/60'
                    } backdrop-blur-sm border border-border/10 rounded-xl`}
                    style={{
                      transformOrigin: 'center center -24px',
                      backfaceVisibility: 'hidden',
                    }}
                    animate={{
                      rotateX: isHovered ? -90 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 18,
                      mass: 0.7,
                      restDelta: 0.001,
                    }}
                  >
                    <Icon
                      icon={link.icon}
                      className="text-base sm:text-lg md:text-xl"
                    />
                  </motion.div>

                  {/* Back face with label */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      isActive || (link.name === 'Connect' && socialOpen) 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'bg-accent/60 text-accent-foreground'
                    } backdrop-blur-sm border border-border/10 rounded-xl`}
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
                      stiffness: 180,
                      damping: 18,
                      mass: 0.7,
                      restDelta: 0.001,
                    }}
                  >
                    <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider leading-none text-center px-1">
                      {link.name}
                    </span>
                  </motion.div>

                  {/* Clickable overlay */}
                  {link.name !== 'Connect' && (
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className="absolute inset-0 z-10"
                    />
                  )}
                </div>

                {/* Social popover is no longer here */}
              </motion.div>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 5,
            y: -2
          }}
          whileTap={{ scale: 0.92, rotate: 0 }}
          transition={{
            duration: 0.25,
            type: 'spring',
            stiffness: 350,
            damping: 20
          }}
          className="ml-1 sm:ml-2 flex-shrink-0"
        >
          <ThemeToggle />
        </motion.div>

        {/* Social Popover is now a direct child of the main pill */}
        <SocialPopover
          isOpen={socialOpen}
          onClose={closeSocialPopover}
          triggerRef={triggerRef}
        />
      </div>
    </motion.header>
  );
};

export default Navbar;
