import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import ThemeToggle from './ThemeToggle';
import SparkleIllustration from './SparkleIllustration';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navItemsRef = useRef([]);
  const flipTimelinesRef = useRef({});
  useEffect(() => {
    // Register multiple custom eases for ultra-smooth natural movement
    gsap.registerEase("naturalFlip", "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    gsap.registerEase("smoothOut", "cubic-bezier(0.165, 0.84, 0.44, 1)");
    gsap.registerEase("smoothIn", "cubic-bezier(0.55, 0.085, 0.68, 0.53)");
    gsap.registerEase("silkySmooth", "cubic-bezier(0.23, 1, 0.32, 1)");
    gsap.registerEase("ultraSmooth", "cubic-bezier(0.19, 1, 0.22, 1)");
    
    // Set GSAP global defaults for better performance
    gsap.defaults({
      force3D: true,
      transformOrigin: "center center",
      ease: "silkySmooth"
    });

    return () => {
      // Clean up all timelines
      Object.values(flipTimelinesRef.current).forEach(tl => tl?.kill());
    };
  }, []);

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

  // Determine which link should be marked active (handles nested URLs)
  const activeIndex = mainLinks.findIndex(({ path }) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );
  const highlightIndex = hoverIndex != null ? hoverIndex : activeIndex;  // Ultra-smooth GSAP flip animation with natural physics
  const handleFlipIn = (index) => {
    const frontFace = navItemsRef.current[index]?.querySelector('.front-face');
    const backFace = navItemsRef.current[index]?.querySelector('.back-face');
    const container = navItemsRef.current[index]?.querySelector('.flip-container');
    
    if (frontFace && backFace && container) {
      // Kill any existing animation for this item
      if (flipTimelinesRef.current[index]) {
        flipTimelinesRef.current[index].kill();
      }

      // Create new ultra-smooth timeline with overlapping animations
      const tl = gsap.timeline({
        defaults: { 
          force3D: true,
          transformStyle: "preserve-3d",
          ease: "silkySmooth"
        }
      });      // Subtle container lift with ultra-smooth easing
      tl.to(container, {
        y: -2,
        scale: 1.01,
        duration: 0.4,
        ease: "ultraSmooth"
      }, 0)

      // Front face ultra-smooth flip out
      .to(frontFace, {
        rotationX: -90,
        duration: 0.25,
        ease: "power1.out",
        transformOrigin: "center center -30px"
      }, 0.05)

      // Back face ultra-smooth flip in with gentle spring
      .fromTo(backFace, 
        {
          rotationX: 90,
          transformOrigin: "center center -30px"
        },
        {
          rotationX: 0,
          duration: 0.3,
          ease: "back.out(0.5)",
          transformOrigin: "center center -30px"
        }, 
        0.15
      );

      flipTimelinesRef.current[index] = tl;
    }
  };

  const handleFlipOut = (index) => {
    const frontFace = navItemsRef.current[index]?.querySelector('.front-face');
    const backFace = navItemsRef.current[index]?.querySelector('.back-face');
    const container = navItemsRef.current[index]?.querySelector('.flip-container');
    
    if (frontFace && backFace && container) {
      // Kill any existing animation for this item
      if (flipTimelinesRef.current[index]) {
        flipTimelinesRef.current[index].kill();
      }

      // Create ultra-smooth return timeline
      const tl = gsap.timeline({
        defaults: { 
          force3D: true,
          transformStyle: "preserve-3d",
          ease: "silkySmooth"
        }
      });      // Container return to normal with gentle easing
      tl.to(container, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "ultraSmooth"
      }, 0)

      // Back face ultra-smooth flip out
      .to(backFace, {
        rotationX: 90,
        duration: 0.22,
        ease: "power1.in",
        transformOrigin: "center center -30px"
      }, 0.03)

      // Front face ultra-smooth flip in with gentle bounce
      .fromTo(frontFace,
        {
          rotationX: -90,
          transformOrigin: "center center -30px"
        },
        {
          rotationX: 0,
          duration: 0.28,
          ease: "back.out(0.4)",
          transformOrigin: "center center -30px"
        },
        0.13
      );

      flipTimelinesRef.current[index] = tl;
    }
  };

  // Animation variants
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
      scale: 1.01,
      y: -1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35,
        mass: 0.5
      }
    },
    tap: {
      scale: 0.99,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        mass: 0.3
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
      <div className="relative inline-flex items-center bg-background/80 backdrop-blur-md shadow-lg ring-1 ring-border/40 rounded-full px-6 py-3 gap-x-2 divide-x divide-border/30 pointer-events-auto">
        {/* Navigation Links */}
        <div className="grid grid-flow-col auto-cols-max gap-3 sm:gap-4">
          {mainLinks.map((link, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={link.path}
                ref={(el) => (navItemsRef.current[idx] = el)}
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
                className="relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px]"                onMouseEnter={() => {
                  setHoverIndex(idx);
                  handleFlipIn(idx);
                }}
                onMouseLeave={() => {
                  setHoverIndex(null);
                  handleFlipOut(idx);
                }}
                style={{
                  perspective: '500px',
                }}
              >                <div
                  className="flip-container relative block overflow-hidden w-14 h-12 sm:w-16 sm:h-12"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front face with icon */}
                  <div
                    className={`front-face absolute inset-0 flex flex-col items-center justify-center ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20' 
                        : 'bg-background/60 text-foreground hover:bg-background/80'
                    } backdrop-blur-sm border border-border/30 rounded-xl transition-colors duration-300`}
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <Icon 
                      icon={link.icon} 
                      className="text-lg sm:text-xl drop-shadow-sm"
                    />
                  </div>

                  {/* Back face with label */}
                  <div
                    className={`back-face absolute inset-0 flex flex-col items-center justify-center ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20' 
                        : 'bg-accent/90 text-accent-foreground shadow-md'
                    } backdrop-blur-sm border border-border/30 rounded-xl`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(90deg)',
                    }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none text-center px-1 drop-shadow-sm">
                      {link.name}
                    </span>
                  </div>

                  {/* Clickable Link overlay */}
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className="absolute inset-0 z-10"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <span className="hidden sm:inline-block w-px h-6 bg-border/40 mx-2"></span>        {/* Enhanced Theme Toggle */}
        <motion.div
          whileHover={{ 
            scale: 1.03, 
            rotate: 6,
            y: -1
          }}
          whileTap={{ 
            scale: 0.97, 
            rotate: 0 
          }}
          transition={{ 
            duration: 0.3,
            type: 'spring',
            stiffness: 300,
            damping: 35,
            mass: 0.5
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
