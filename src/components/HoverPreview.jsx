import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePostHog } from "@posthog/react";
import { motion, AnimatePresence } from "../lib/motion";

// Context
const HoverPreviewContext = createContext(null);

function useHoverPreview() {
  const context = useContext(HoverPreviewContext);
  if (!context) {
    throw new Error("HoverPreviewLink must be used within a HoverPreviewProvider");
  }
  return context;
}

// Provider
export function HoverPreviewProvider({
  data,
  children,
  cardWidth = 280,
  cursorOffset = 20,
  preloadImages = true,
}) {
  const posthog = usePostHog();
  const [activePreview, setActivePreview] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  const cardHeight = 200;
  const trackedPreviewKeysRef = useRef(new Set());

  // Preload all images on mount
  useEffect(() => {
    if (!preloadImages) return;
    Object.values(data).forEach((item) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.image;
    });
  }, [data, preloadImages]);

  const clampPosition = useCallback(
    (e) => {
      let x = e.clientX - cardWidth / 2;
      let y = e.clientY - cardHeight - cursorOffset;

      // Boundary checks
      if (x + cardWidth > window.innerWidth - 20) {
        x = window.innerWidth - cardWidth - 20;
      }
      if (x < 20) {
        x = 20;
      }
      if (y < 20) {
        y = e.clientY + cursorOffset;
      }

      return { x, y };
    },
    [cardWidth, cardHeight, cursorOffset]
  );

  // Snap directly to correct position (no lerp) — used on initial hover
  const snapPosition = useCallback(
    (e) => {
      setPosition(clampPosition(e));
    },
    [clampPosition]
  );

  // Smoothly follow cursor during move
  const updatePosition = useCallback(
    (e) => {
      const { x, y } = clampPosition(e);
      setPosition((prev) => ({
        x: prev.x + (x - prev.x) * 0.55,
        y: prev.y + (y - prev.y) * 0.55,
      }));
    },
    [clampPosition]
  );

  const handleHoverStart = useCallback(
    (key, e) => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      const previewData = data[key];
      if (previewData) {
        if (!trackedPreviewKeysRef.current.has(key)) {
          posthog?.capture("hover_preview_opened", {
            preview_key: key,
            preview_title: previewData.title || null,
            path: window.location.pathname,
          });
          trackedPreviewKeysRef.current.add(key);
        }
        setActivePreview(previewData);
        snapPosition(e); // snap directly — no lerp from stale/zero coords
        setIsVisible(true);
      }
    },
    [data, snapPosition, posthog]
  );

  const handleHoverMove = useCallback(
    (e) => {
      if (isVisible) {
        updatePosition(e);
      }
    },
    [isVisible, updatePosition]
  );

  const hideTimeout = useRef(null);

  const handleHoverEnd = useCallback(() => {
    hideTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 110);
  }, []);

  const handleCardEnter = useCallback(() => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
  }, []);

  const handleCardLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const contextValue = {
    data,
    activePreview,
    position,
    isVisible,
    cardWidth,
    handleHoverStart,
    handleHoverMove,
    handleHoverEnd,
    handleCardEnter,
    handleCardLeave,
  };

  return (
    <HoverPreviewContext.Provider value={contextValue}>
      {children}
      <HoverPreviewCard ref={cardRef} />
    </HoverPreviewContext.Provider>
  );
}

// Link component
export function HoverPreviewLink({ previewKey, children, className = "" }) {
  const { handleHoverStart, handleHoverMove, handleHoverEnd } = useHoverPreview();

  return (
    <span
      className={`relative inline-block cursor-pointer text-primary font-medium transition-colors hover:text-primary/80 ${className}`}
      onMouseEnter={(e) => handleHoverStart(previewKey, e)}
      onMouseMove={handleHoverMove}
      onMouseLeave={handleHoverEnd}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-primary/50 transition-all duration-300 group-hover:w-full" />
    </span>
  );
}

// Preview Card — rendered via portal at document.body to escape ancestor CSS transforms
const HoverPreviewCard = forwardRef((_, ref) => {
  const { activePreview, position, isVisible, cardWidth, handleCardEnter, handleCardLeave } = useHoverPreview();

  return createPortal(
    <AnimatePresence>
      {isVisible && activePreview && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.84, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, y: 8, filter: "blur(3px)" }}
          transition={{
            opacity: { duration: 0.2, ease: "easeOut" },
            scale: { type: "spring", stiffness: 380, damping: 26, mass: 0.8 },
            y: { type: "spring", stiffness: 380, damping: 26, mass: 0.8 },
            filter: { duration: 0.2, ease: "easeOut" },
          }}
          className="fixed z-[9999] pointer-events-auto"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: cardWidth,
            transformOrigin: "center bottom",
          }}
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
        >
          <div className="overflow-hidden rounded-xl border border-border/50 bg-card/95 p-2 shadow-2xl backdrop-blur-md ring-1 ring-white/[0.08]">
            {/* Image with subtle zoom-out settle */}
            <motion.div
              initial={{ scale: 1.07, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={activePreview.image}
                alt={activePreview.title || ""}
                className="aspect-video w-full object-cover"
              />
            </motion.div>

            {/* Text staggered in after image */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
              className="px-2 pt-2 pb-1 flex items-start justify-between gap-2"
            >
              <div>
                <div className="font-semibold text-foreground text-sm leading-snug">
                  {activePreview.title}
                </div>
                {activePreview.subtitle && (
                  <div className="mt-0.5 text-muted-foreground text-xs">
                    {activePreview.subtitle}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
});

HoverPreviewCard.displayName = "HoverPreviewCard";

export { HoverPreviewContext, useHoverPreview };
