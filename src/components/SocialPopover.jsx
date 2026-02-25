import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '../lib/motion';
import { Icon } from '@iconify/react';
import { usePostHog } from '@posthog/react';

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
  const posthog = usePostHog();

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
          className="absolute bottom-full right-6 mb-2 z-50 pointer-events-auto bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl px-4 py-3 flex gap-4"
          initial={{
            opacity: 0,
            scale: 0.82,
            y: 14,
            filter: 'blur(6px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 380,
              damping: 26,
              mass: 0.8,
              opacity: { duration: 0.2, ease: 'easeOut' },
              filter: { duration: 0.2, ease: 'easeOut' },
              when: 'beforeChildren',
              staggerChildren: 0.04,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.88,
            y: 8,
            filter: 'blur(3px)',
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
              onClick={() =>
                posthog?.capture('social_popover_link_clicked', {
                  link_label: l.label,
                  link_href: l.href,
                  path: window.location.pathname,
                })
              }
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
