/**
 * TEMPORAL PRECISION - Animation System
 *
 * A systematic approach to motion design with:
 * - Duration harmonics (150ms/300ms/600ms ratios)
 * - Consistent easing curves
 * - Spring configurations
 * - Accessibility-first design
 */

// === DURATION HARMONICS ===
// Base timing system following harmonic ratios
export const duration = {
  instant: 100,    // Immediate feedback (hover, focus)
  quick: 160,      // Micro-interactions (buttons, toggles)
  standard: 220,   // Content transitions (cards, modals)
  moderate: 260,   // Section reveals
  slow: 280,       // Major state changes (page transitions)
  prolonged: 300,  // Decorative animations
  extended: 300,   // Hero animations
};

// Convert to seconds for CSS
export const durationSec = Object.entries(duration).reduce((acc, [key, val]) => {
  acc[key] = `${val / 1000}s`;
  return acc;
}, {});

// === EASING CURVES ===
// Consistent easing functions for emotional language
export const easing = {
  // Standard easings
  easeOut: [0.33, 1, 0.68, 1],           // Natural deceleration (most common)
  easeIn: [0.32, 0, 0.67, 0],            // Acceleration
  easeInOut: [0.45, 0, 0.55, 1],         // Smooth symmetry

  // Expressive easings
  easeOutQuart: [0.25, 1, 0.5, 1],       // Sharp deceleration
  easeOutExpo: [0.16, 1, 0.3, 1],        // Dramatic deceleration
  easeInOutBack: [0.68, -0.6, 0.32, 1.6], // Anticipation + overshoot

  // Utility
  linear: [0, 0, 1, 1],                  // Constant velocity (for infinite loops)
};

// Framer Motion format
export const easingFramer = {
  easeOut: 'easeOut',
  easeIn: 'easeIn',
  easeInOut: 'easeInOut',
  linear: 'linear',
};

// CSS cubic-bezier strings
export const easingCSS = {
  easeOut: `cubic-bezier(${easing.easeOut.join(', ')})`,
  easeIn: `cubic-bezier(${easing.easeIn.join(', ')})`,
  easeInOut: `cubic-bezier(${easing.easeInOut.join(', ')})`,
  easeOutQuart: `cubic-bezier(${easing.easeOutQuart.join(', ')})`,
  easeOutExpo: `cubic-bezier(${easing.easeOutExpo.join(', ')})`,
  easeInOutBack: `cubic-bezier(${easing.easeInOutBack.join(', ')})`,
  linear: 'linear',
};

// === SPRING CONFIGURATIONS ===
// Physics-based animations for interactive elements
export const spring = {
  // Snappy (buttons, toggles)
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },

  // Smooth (modals, dropdowns)
  smooth: {
    type: 'spring',
    stiffness: 200,
    damping: 24,
    mass: 1,
  },

  // Gentle (cards, sections)
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 18,
    mass: 1.2,
  },

  // Bouncy (playful interactions)
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 0.8,
  },

  // Wobbly (attention-grabbing)
  wobbly: {
    type: 'spring',
    stiffness: 180,
    damping: 12,
    mass: 1,
  },
};

// === ANIMATION VARIANTS ===
// Pre-configured animation patterns

/**
 * Entrance animations - elements appearing on screen
 */
export const entrance = {
  // Fade up (most common)
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
      duration: duration.quick / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Fade in (simple)
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: duration.quick / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Scale up (attention-grabbing)
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      duration: duration.standard / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Slide from left
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: {
      duration: duration.standard / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: {
      duration: duration.standard / 1000,
      ease: easingFramer.easeOut,
    },
  },
};

/**
 * Hover animations - interactive feedback
 */
export const hover = {
  // Lift (cards, buttons)
  lift: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Scale (images, icons)
  scale: {
    scale: 1.05,
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Glow (highlights)
  glow: {
    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.3)',
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    },
  },

  // Subtle scale (minimal)
  subtle: {
    scale: 1.02,
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    },
  },
};

/**
 * Tap/Click animations - press feedback
 */
export const tap = {
  // Scale down (buttons)
  press: {
    scale: 0.97,
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeInOut,
    },
  },

  // Subtle press
  subtle: {
    scale: 0.99,
    transition: {
      duration: duration.instant / 1000,
      ease: easingFramer.easeInOut,
    },
  },
};

/**
 * Stagger configurations - sequential animations
 */
export const stagger = {
  // Quick succession (skill tags, list items)
  quick: {
    staggerChildren: 0.03,  // 30ms between items
    delayChildren: 0,
  },

  // Standard succession (cards)
  standard: {
    staggerChildren: 0.04,  // 40ms between items
    delayChildren: 0.04,
  },

  // Slow succession (major sections)
  slow: {
    staggerChildren: 0.05,   // 50ms between items
    delayChildren: 0.05,
  },
};

/**
 * Container variants - for staggered children
 */
export const container = {
  hidden: { opacity: 0 },
  visible: (staggerConfig = stagger.standard) => ({
    opacity: 1,
    transition: {
      ...staggerConfig,
      when: 'beforeChildren',
    },
  }),
};

/**
 * Exit animations - elements leaving screen
 */
export const exit = {
  // Fade out
  fade: {
    opacity: 0,
    transition: {
      duration: duration.quick / 1000,
      ease: easingFramer.easeIn,
    },
  },

  // Scale down
  scaleDown: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: duration.quick / 1000,
      ease: easingFramer.easeIn,
    },
  },

  // Slide down
  slideDown: {
    opacity: 0,
    y: 20,
    transition: {
      duration: duration.quick / 1000,
      ease: easingFramer.easeIn,
    },
  },
};

/**
 * Page transition variants
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.moderate / 1000,
      ease: easingFramer.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: duration.standard / 1000,
      ease: easingFramer.easeIn,
    },
  },
};

/**
 * Utility function to create custom variants with motion-safe support
 */
export const createVariant = (config, motionSafe = true) => {
  if (!motionSafe) {
    // Reduced motion: only animate opacity
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: duration.instant / 1000,
        ease: easingFramer.easeOut,
      },
    };
  }
  return config;
};

/**
 * Helper to get transition with motion-safe consideration
 */
export const getTransition = (durationKey = 'standard', easingKey = 'easeOut', motionSafe = true) => {
  if (!motionSafe) {
    return {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    };
  }

  return {
    duration: duration[durationKey] / 1000,
    ease: easingFramer[easingKey],
  };
};

/**
 * Helper to get spring with motion-safe consideration
 */
export const getSpring = (type = 'smooth', motionSafe = true) => {
  if (!motionSafe) {
    return {
      duration: duration.instant / 1000,
      ease: easingFramer.easeOut,
    };
  }

  return spring[type];
};
