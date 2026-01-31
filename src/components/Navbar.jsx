import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import ThemeToggle from "./ThemeToggle";
import SocialPopover from "./SocialPopover";
import { useSocialPopover } from "../context/SocialPopoverContext";
import { spring, hover, tap as tapAnim } from "../utils/motionSettings";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wait for document to be fully loaded before showing navbar
  useEffect(() => {
    const showNavbar = () => {
      // Use requestIdleCallback if available, otherwise use requestAnimationFrame
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setIsReady(true);
        }, { timeout: 500 });
      } else {
        // Double requestAnimationFrame ensures DOM is painted
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        });
      }
    };

    // If document is already complete, show immediately with slight delay
    if (document.readyState === 'complete') {
      showNavbar();
    } else {
      // Wait for load event
      window.addEventListener('load', showNavbar);
      return () => window.removeEventListener('load', showNavbar);
    }
  }, []);

  const mainLinks = [
    { name: "Home", path: "/", icon: "tabler:home" },
    { name: "Work", path: "/projects", icon: "tabler:code" },
    { name: "Blog", path: "/blog", icon: "tabler:pencil" },
    { name: "Connect", path: "/contact", icon: "tabler:at" },
  ];

  // Track hover to move star smoothly like the provided example
  const [hoverIndex, setHoverIndex] = useState(null);
  // Use context for social popover state
  const { socialOpen, toggleSocialPopover, closeSocialPopover, triggerRef } =
    useSocialPopover();

  // Determine which link should be marked active (supports nested URLs)
  const activeIndex = mainLinks.findIndex(({ path }) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path),
  );

  // Animation variants using Temporal Precision system
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.05,
      },
    },
    hidden: {
      y: 60,
      opacity: 0,
    },
  };

  const navItemVariants = {
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        duration: 0.08,
        ease: "easeInOut",
      },
    },
  };

  // Don't render until ready
  if (!isReady) {
    return null;
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-auto px-4 sm:px-0"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "0",
        right: "0",
        zIndex: 50,
      }}
    >
      {/* Floating pill wrapper */}
      <div className="relative inline-flex items-center bg-background/80 backdrop-blur-xl shadow-xl ring-1 ring-border/20 rounded-full px-4 py-2.5 sm:px-5 sm:py-2.5 gap-x-2.5 sm:gap-x-3 pointer-events-auto">
        {/* Navigation Links */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
          {mainLinks.map((link, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoverIndex;
            return (
              <motion.div
                key={link.path}
                ref={link.name === "Connect" ? triggerRef : null}
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
                className={`relative cursor-pointer ${link.name === "Connect" && socialOpen ? "z-20" : ""}`}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => {
                  if (link.name === "Connect") {
                    toggleSocialPopover();
                  }
                }}
                style={{
                  perspective: "400px",
                }}
              >
                {link.name !== "Connect" ? (
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className="relative block w-11 h-10 sm:w-14 sm:h-11 md:w-16 md:h-12"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "600px",
                    }}
                  >
                    {/* 3D Cube container */}
                    <motion.div
                      className="relative w-full h-full pointer-events-none"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        rotateX: isHovered ? -90 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 1,
                      }}
                    >
                      {/* Front face with icon */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/40 text-foreground"
                        } border border-border/10 rounded-xl`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "translateZ(20px)",
                        }}
                      >
                        <Icon
                          icon={link.icon}
                          className="text-base sm:text-lg md:text-xl"
                        />
                      </div>

                      {/* Top face with label (rotates into view) */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent/60 text-accent-foreground"
                        } border border-border/10 rounded-xl`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateX(90deg) translateZ(20px)",
                        }}
                      >
                        <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider">
                          {link.name}
                        </span>
                      </div>
                    </motion.div>
                  </NavLink>
                ) : (
                  <div
                    className="relative block w-11 h-10 sm:w-14 sm:h-11 md:w-16 md:h-12 cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "600px",
                    }}
                  >
                    {/* 3D Cube container */}
                    <motion.div
                      className="relative w-full h-full pointer-events-none"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        rotateX: isHovered ? -90 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 1,
                      }}
                    >
                      {/* Front face with icon */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          socialOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/40 text-foreground"
                        } border border-border/10 rounded-xl`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "translateZ(20px)",
                        }}
                      >
                        <Icon
                          icon={link.icon}
                          className="text-base sm:text-lg md:text-xl"
                        />
                      </div>

                      {/* Top face with label (rotates into view) */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          socialOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent/60 text-accent-foreground"
                        } border border-border/10 rounded-xl`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateX(90deg) translateZ(20px)",
                        }}
                      >
                        <span className="text-[7px] sm:text-[10px] font-semibold uppercase tracking-wider">
                          {link.name}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                )}

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
            y: -1,
          }}
          whileTap={{ scale: 0.96, rotate: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
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
