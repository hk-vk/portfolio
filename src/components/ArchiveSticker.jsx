import { motion } from '../lib/motion';
import { useMotionSafe } from '../utils/useMotionSafe';

const snapshots = [
  { src: '/images/archive-sticker/2026-motion-system.webp', x: 16, y: -3, rotate: 10, fanX: 26, fanY: -6, fanRotate: 16 },
  { src: '/images/archive-sticker/2025-dynamic-island.webp', x: 8, y: -1, rotate: 2, fanX: 11, fanY: -3, fanRotate: 5 },
  { src: '/images/archive-sticker/2025-foundation.webp', x: 0, y: 0, rotate: -7, fanX: -5, fanY: -3, fanRotate: -10 },
];

const ArchiveSticker = ({ className = '' }) => {
  const motionSafe = useMotionSafe();
  return (
  <span aria-hidden="true" className={`relative inline-block h-9 w-14 shrink-0 sm:w-16 ${className}`}>
    {snapshots.map(({ src, x, y, rotate, fanX, fanY, fanRotate }) => (
      <motion.span
        key={src}
        className="hero-silver-line absolute left-0 top-1.5 w-9 rounded p-px sm:left-1 sm:w-11"
        variants={{ rest: { x, y, rotate }, hover: { x: fanX, y: fanY, rotate: fanRotate } }}
        transition={{ duration: motionSafe ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={src} alt="" width={480} height={300} decoding="async" className="block w-full rounded-sm" />
      </motion.span>
    ))}
  </span>
  );
};

export default ArchiveSticker;
