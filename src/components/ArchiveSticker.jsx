import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from '../lib/motion';
import { useMotionSafe } from '../utils/useMotionSafe';

// Back to front: the oldest build sits on top of the pile.
const SNAPSHOTS = [
  { src: '/images/archive-sticker/2026-motion-system.webp', rest: { x: 46, y: -14, rotate: 10 }, hover: { x: 60, y: -24, rotate: 15 } },
  { src: '/images/archive-sticker/2025-dynamic-island.webp', rest: { x: 22, y: -6, rotate: 2 }, hover: { x: 30, y: -14, rotate: 5 } },
  { src: '/images/archive-sticker/2025-foundation.webp', rest: { x: 0, y: 0, rotate: -7 }, hover: { x: -4, y: -6, rotate: -2 } },
];

const spring = { type: 'spring', stiffness: 380, damping: 30 };

const ArchiveSticker = ({ className = '' }) => {
  const motionSafe = useMotionSafe();

  return (
    <Link
      to="/archive"
      aria-label="Browse old versions of this portfolio"
      className={`group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`}
    >
      <motion.div
        className="relative h-[8.5rem] w-[12.5rem]"
        initial={motionSafe ? { opacity: 0, scale: 1.15, rotate: -8 } : false}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial="rest"
          animate="rest"
          whileHover={motionSafe ? 'hover' : undefined}
          whileTap={motionSafe ? 'hover' : undefined}
        >
          {SNAPSHOTS.map((snapshot, index) => {
            const isTop = index === SNAPSHOTS.length - 1;
            return (
              <motion.div
                key={snapshot.src}
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-[8.5rem] rounded-[5px] border border-border/60 bg-card p-[5px] pb-0 shadow-[0_1px_2px_rgba(0,0,0,0.25),0_6px_8px_-4px_rgba(0,0,0,0.35)]"
                variants={{ rest: snapshot.rest, hover: snapshot.hover }}
                transition={spring}
              >
                <img
                  src={snapshot.src}
                  alt=""
                  width={480}
                  height={300}
                  decoding="async"
                  className="block aspect-[16/10] w-full rounded-[2px] object-cover object-top"
                />
                <span className="flex h-7 items-center justify-between px-1 text-[11px] font-semibold text-muted-foreground">
                  {isTop && (
                    <>
                      back in 2025
                      <Icon
                        icon="tabler:arrow-up-right"
                        className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none"
                      />
                    </>
                  )}
                </span>
                {isTop && (
                  <span className="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-3 border border-border/40 bg-muted/70 shadow-[0_1px_1px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ArchiveSticker;
