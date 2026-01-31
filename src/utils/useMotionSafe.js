import { useEffect, useState } from 'react';

/**
 * Enhanced useMotionSafe hook
 *
 * Respects user's motion preferences and provides utilities
 * for creating accessible animations.
 *
 * @returns {Object} Motion-safe utilities
 */
export function useMotionSafe() {
  const [motionSafe, setMotionSafe] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial state (inverted because reduce = not safe for full motion)
    setMotionSafe(!mediaQuery.matches);

    // Listen for changes
    const handler = (event) => setMotionSafe(!event.matches);

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Legacy API
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return motionSafe;
}

/**
 * Hook that returns motion-safe aware animation variants
 * Automatically applies reduced motion when needed
 *
 * @param {Object} fullMotionVariant - Full animation variant
 * @param {Object} reducedMotionVariant - Reduced motion variant (optional)
 * @returns {Object} Appropriate variant based on motion preference
 */
export function useMotionVariant(fullMotionVariant, reducedMotionVariant = null) {
  const motionSafe = useMotionSafe();

  if (!motionSafe) {
    // Use provided reduced variant or default to opacity-only
    return reducedMotionVariant || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 },
    };
  }

  return fullMotionVariant;
}

/**
 * Hook for motion-safe transitions
 * Returns appropriate transition config based on motion preferences
 *
 * @param {Object} transition - Full transition config
 * @returns {Object} Motion-safe transition
 */
export function useMotionTransition(transition) {
  const motionSafe = useMotionSafe();

  if (!motionSafe) {
    return {
      duration: 0.1,
      ease: 'easeOut',
    };
  }

  return transition;
}

/**
 * Hook for conditional animation properties
 * Returns style object with or without transforms based on motion preference
 *
 * @param {Object} animatedStyles - Styles with transforms
 * @param {Object} staticStyles - Fallback styles without transforms
 * @returns {Object} Appropriate styles
 */
export function useMotionStyles(animatedStyles, staticStyles = {}) {
  const motionSafe = useMotionSafe();
  return motionSafe ? animatedStyles : staticStyles;
}

/**
 * Higher-order function to wrap variants with motion-safe logic
 *
 * @param {Object} variants - Animation variants object
 * @returns {Function} Function that returns motion-safe variants
 */
export function withMotionSafe(variants) {
  return (motionSafe = true) => {
    if (!motionSafe) {
      // Convert all variants to opacity-only
      return Object.keys(variants).reduce((acc, key) => {
        acc[key] = typeof variants[key] === 'object' && variants[key].opacity !== undefined
          ? { opacity: variants[key].opacity }
          : variants[key];
        return acc;
      }, {});
    }
    return variants;
  };
}

export default useMotionSafe;
