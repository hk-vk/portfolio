import { useEffect, useState } from 'react';
import { motion } from '../lib/motion';
import { useLocation } from 'react-router-dom';
import { motionTransition } from '../utils/motionContract';

// The first page of a visit appears at once; only navigation between pages crossfades. Fading the
// landing page in would hold back its first paint until the JavaScript runs the animation.
let firstPageShown = false;

/**
 * PageTransition Component
 *
 * Provides smooth, consistent page transitions following Temporal Precision principles.
 * Uses a crossfade approach for seamless, professional transitions.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isFirstPage] = useState(() => !firstPageShown);

  useEffect(() => {
    firstPageShown = true;
  }, []);

  return (
    <motion.div
      key={location.pathname}
      initial={isFirstPage ? false : { opacity: 0 }}
      animate={{
        opacity: 1,
        transition: motionTransition.pageEnter,
      }}
      exit={{
        opacity: 0,
        transition: motionTransition.pageExit,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
