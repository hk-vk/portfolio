import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '../lib/motion';
import { Icon } from '@iconify/react';
import { posthog } from '../utils/analytics';
import { useMotionSafe } from '../utils/useMotionSafe';

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
  const motionSafe = useMotionSafe();
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
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={id}
          role="dialog"
          aria-label="Social links"
          ref={panelRef}
          className="pointer-events-auto absolute bottom-full right-12 z-50 flex gap-1.5 rounded-2xl border border-border/40 bg-background/95 p-1.5 shadow-xl shadow-black/20 backdrop-blur-xl"
          initial={motionSafe ? { opacity: 0, transform: 'translateY(8px) scale(0.96)', filter: 'blur(2px)' } : { opacity: 0 }}
          animate={motionSafe ? { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' } : { opacity: 1 }}
          exit={motionSafe ? { opacity: 0, transform: 'translateY(4px) scale(0.98)', filter: 'blur(1px)' } : { opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
          style={{ transformOrigin: 'bottom right' }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              title={l.label}
              onClick={() =>
                posthog?.capture('social_popover_link_clicked', {
                  link_label: l.label,
                  link_href: l.href,
                  path: window.location.pathname,
                })
              }
              className="grid size-10 place-items-center rounded-xl text-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-muted/70 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Icon icon={l.icon} className="size-5" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialPopover; 
