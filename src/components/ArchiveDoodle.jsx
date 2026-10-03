import { motion } from '../lib/motion';
import { useMotionSafe } from '../utils/useMotionSafe';

// Hand-drawn scribble pointing at the archive sticker.
const ArchiveDoodle = ({ className = '' }) => {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      initial={motionSafe ? { opacity: 0, scale: 0.85, rotate: -10 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="block -rotate-6 pl-2 text-[15px] leading-none text-muted-foreground/70 sm:text-[19px]"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        the archive
      </span>
      <svg
        viewBox="0 0 110 64"
        className="mt-1 h-11 w-[4.75rem] text-muted-foreground/60 sm:h-16 sm:w-28"
        fill="none"
      >
        <path
          d="M8 6 C 36 0, 78 10, 90 32 C 96 42, 100 50, 102 57"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 8"
        />
        <path
          d="M94 50 L 103 59 L 108 47"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default ArchiveDoodle;
