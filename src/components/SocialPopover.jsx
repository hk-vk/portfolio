import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

/**
 * SocialPopover – A small pop-up with social media links.
 *
 * Props:
 *  isOpen   – boolean controlling visibility
 *  onClose  – function called to close the popover
 */
const SocialPopover = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);

  // Close on outside click or ESC key
  useEffect(() => {
    if (!isOpen) return;

    // Delay adding the event listeners until after the popover is mounted
    const timeout = setTimeout(() => {
      function handleKey(e) {
        if (e.key === 'Escape') onClose();
      }
      function handleClick(e) {
        if (panelRef.current && !panelRef.current.contains(e.target)) {
          onClose();
        }
      }
      window.addEventListener('keydown', handleKey);
      window.addEventListener('mousedown', handleClick);
      // Clean up
      panelRef.current._cleanup = () => {
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('mousedown', handleClick);
      };
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (panelRef.current && panelRef.current._cleanup) {
        panelRef.current._cleanup();
        delete panelRef.current._cleanup;
      }
    };
  }, [isOpen, onClose]);

  const links = [
    { href: 'https://github.com/hk-vk', icon: 'tabler:brand-github', label: 'GitHub' },
    { href: 'https://linkedin.com/in/harikrishnanvk', icon: 'tabler:brand-linkedin', label: 'LinkedIn' },
    { href: 'mailto:hello@harikrishnan.dev', icon: 'tabler:mail', label: 'Email' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className="absolute bottom-full right-6 mb-2 z-[60] pointer-events-auto bg-background/90 backdrop-blur-md ring-1 ring-border/30 shadow-xl rounded-xl px-4 py-3 flex gap-4"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground hover:text-primary transition-colors"
            >
              <Icon icon={l.icon} aria-label={l.label} />
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialPopover; 