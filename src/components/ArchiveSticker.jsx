import { Link } from 'react-router-dom';
import { motion } from '../lib/motion';
import { useMotionSafe } from '../utils/useMotionSafe';

// Hand-drawn film strip — each frame is a past build of the site.
const ArchiveSticker = ({ className = '' }) => {
  const motionSafe = useMotionSafe();

  return (
    <Link
      to="/archive"
      aria-label="Browse old versions of this portfolio"
      className={`group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`}
    >
      <motion.svg
        viewBox="0 0 120 96"
        className="h-[4.25rem] w-[5.25rem] text-muted-foreground sm:h-[8.625rem] sm:w-[10.75rem]"
        initial={motionSafe ? { opacity: 0, scale: 1.15, rotate: -8 } : false}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={motionSafe ? { scale: 1.06, rotate: -2 } : undefined}
        whileTap={motionSafe ? { scale: 1.06, rotate: -2 } : undefined}
        transition={{ delay: 0.9, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        fill="none"
        aria-hidden="true"
      >
        <g transform="rotate(-6 58 52)">
          <rect x="10" y="33" width="96" height="38" rx="5" fill="hsl(var(--card))" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
          {[19.5, 28, 36.5, 45, 53.5, 62, 70.5, 79, 87.5, 96].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="40" r="1.4" fill="currentColor" fillOpacity="0.3" />
              <circle cx={cx} cy="64" r="1.4" fill="currentColor" fillOpacity="0.3" />
            </g>
          ))}
          {/* frame 1 — text build */}
          <rect x="19" y="45" width="23" height="15" rx="1.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <line x1="23" y1="50" x2="38" y2="50" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="23" y1="55" x2="34" y2="55" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round" />
          {/* frame 2 — image build */}
          <rect x="46.5" y="45" width="23" height="15" rx="1.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <circle cx="64.5" cy="49" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M49 58 L54.5 50.5 L58 54.5 L61.5 51.5 L66.5 58" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          {/* frame 3 — text build */}
          <rect x="74" y="45" width="23" height="15" rx="1.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <line x1="78" y1="50" x2="93" y2="50" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="78" y1="55" x2="88" y2="55" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <path d="M94 82 L104 72" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M96.5 72 L104 72 L104 79.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </Link>
  );
};

export default ArchiveSticker;
