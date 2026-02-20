import { motion } from '../lib/motion';
import { useLocation } from 'react-router-dom';
import { motionTransition } from '../utils/motionContract';

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
