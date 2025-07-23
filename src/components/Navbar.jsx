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
      <div className="relative inline-flex items-center bg-background/80 backdrop-blur-md shadow-lg ring-1 ring-border/40 rounded-full px-3 py-2 sm:px-6 sm:py-3 gap-x-2 sm:gap-x-6 pointer-events-auto">
        {/* Navigation Links */}
        <div className="grid grid-flow-col auto-cols-max gap-1 sm:gap-3 md:gap-4">
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
                      isActive || (link.name === 'Connect' && socialOpen) ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-background/50 text-foreground'
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
                      className="text-base sm:text-lg md:text-xl"
                    />
                  </motion.div>

                  {/* Back face with label */}
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      isActive || (link.name === 'Connect' && socialOpen) ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-accent/80 text-accent-foreground'
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
