import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '../lib/motion';
import { Icon } from '@iconify/react';

/**
 * SocialPopover – A small pop-up with social media links.
 *
 * Props:
 *  isOpen   – boolean controlling visibility
 *  onClose  – function called to close the popover
 *  triggerRef – React ref to the element that triggered the popover
 */
const SocialPopover = ({ id, isOpen, onClose, triggerRef }) => {
  const panelRef = useRef(null);

  // Close on outside click or ESC key
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }

    function handlePointerDown(e) {
      if (triggerRef.current && triggerRef.current.contains(e.target)) {
        return;
      }
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const links = [
    { href: 'https://github.com/hk-vk', icon: 'tabler:brand-github', label: 'GitHub' },
    { href: 'https://linkedin.com/in/harikrishnanvk', icon: 'tabler:brand-linkedin', label: 'LinkedIn' },
    { href: 'mailto:vkharikrishnan45@gmail.com', icon: 'tabler:mail', label: 'Email' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          role="dialog"
          aria-label="Social links"
          ref={panelRef}
          className="absolute bottom-full right-6 mb-2 z-50 pointer-events-auto bg-background/90 backdrop-blur-md ring-1 ring-border/30 shadow-xl rounded-xl px-4 py-3 flex gap-4"
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.84,
            borderRadius: 999,
            clipPath: 'inset(42% 36% 0% 36% round 999px)',
            filter: 'blur(6px) saturate(0.92)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            borderRadius: 16,
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            filter: 'blur(0px) saturate(1)',
            transition: {
              type: 'spring',
              stiffness: 380,
              damping: 30,
              mass: 0.72,
              when: 'beforeChildren',
              staggerChildren: 0.035,
            },
          }}
          exit={{
            opacity: 0,
            y: 6,
            scale: 0.92,
            borderRadius: 999,
            clipPath: 'inset(36% 34% 0% 34% round 999px)',
            filter: 'blur(3px) saturate(0.95)',
            transition: {
              duration: 0.14,
              ease: 'easeIn',
            },
          }}
          style={{ transformOrigin: 'bottom right' }}
        >
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground hover:text-primary active:scale-95 transition-[color,transform] duration-150 ease-out"
              initial={{ opacity: 0, y: 6, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 3, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 460, damping: 28, mass: 0.5 }}
            >
              <Icon icon={l.icon} aria-label={l.label} />
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialPopover; 
