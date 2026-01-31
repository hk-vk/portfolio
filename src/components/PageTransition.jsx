import { motion } from 'framer-motion';
import { duration } from '../utils/motionSettings';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition Component
 *
 * Provides smooth, consistent page transitions following Temporal Precision principles.
 * Uses a crossfade approach for seamless, professional transitions.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: duration.quick / 1000,
        ease: [0.4, 0, 0.2, 1], // Material Design easing
      }}
      style={{
        willChange: 'opacity',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
