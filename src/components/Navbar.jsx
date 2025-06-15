import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SparkleIllustration from './SparkleIllustration';

// Simple SVG icons for the nav items (keeps bundle small – no additional deps)
const HomeIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9.75L12 3l9 6.75v9.75A1.5 1.5 0 0 1 19.5 21h-15A1.5 1.5 0 0 1 3 19.5V9.75Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 21V12h6v9"
    />
  </svg>
);

const AboutIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
    />
  </svg>
);

const BlogIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5h16M4 10h16M4 15h10"
    />
  </svg>
);

const ProjectsIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3h14a2 2 0 0 1 2 2v6H3V5a2 2 0 0 1 2-2Zm16 10H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6Z"
    />
  </svg>
);

const ContactIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4h16v16H4V4Zm8 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 6c-2.5 0-4.71 1.28-6 3.22V18h12v-0.28C16.71 15.78 14.5 14.5 12 14.5Z"
    />
  </svg>
);

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
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'About', path: '/about', icon: AboutIcon },
    { name: 'Blog', path: '/blog', icon: BlogIcon },
    { name: 'Projects', path: '/projects', icon: ProjectsIcon },
    { name: 'Contact', path: '/contact', icon: ContactIcon },
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
            return (
              <motion.div
                key={link.path}
                whileHover="hover"
                variants={navItemVariants}
                className="relative flex flex-col items-center justify-center min-w-[48px]"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Link
                  to={link.path}
                  className={`flex flex-col items-center justify-center px-2 py-1 transition-colors ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {(() => {
                    const Icon = link.icon;
                    return <Icon className="w-6 h-6 mb-0.5" />;
                  })()}
                  <span className="text-[10px] uppercase tracking-wide font-medium hidden sm:block">
                    {link.name}
                  </span>
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
