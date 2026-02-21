import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePostHog } from "@posthog/react";

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

  const updatePosition = useCallback(
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

      setPosition((prev) => ({
        x: prev.x + (x - prev.x) * 0.55,
        y: prev.y + (y - prev.y) * 0.55,
      }));
    },
    [cardWidth, cardHeight, cursorOffset]
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
        updatePosition(e);
        setIsVisible(true);
      }
    },
    [data, updatePosition, posthog]
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
      <div className="relative">
        {children}
        <HoverPreviewCard ref={cardRef} />
      </div>
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

// Preview Card
const HoverPreviewCard = forwardRef((_, ref) => {
  const { activePreview, position, isVisible, cardWidth, handleCardEnter, handleCardLeave } = useHoverPreview();

  if (!activePreview) return null;

  return (
    <div
      ref={ref}
      className={`fixed z-50 transition-all duration-150 ease-out will-change-transform ${
        isVisible
          ? "scale-100 opacity-100 pointer-events-auto"
          : "translate-y-2 scale-95 opacity-0 pointer-events-none"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: cardWidth,
      }}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
    >
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/95 p-2 shadow-2xl backdrop-blur-md">
        <img
          src={activePreview.image}
          alt={activePreview.title || ""}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <div className="px-2 pt-2 pb-1 flex items-start justify-between gap-2">
          <div>
            <div className="font-semibold text-foreground text-sm">
              {activePreview.title}
            </div>
            {activePreview.subtitle && (
              <div className="mt-0.5 text-muted-foreground text-xs">
                {activePreview.subtitle}
              </div>
            )}
          </div>
          {activePreview.url && (
            <a
              href={activePreview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded border border-border/50 hover:border-border transition-colors"
            >
              Visit ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

HoverPreviewCard.displayName = "HoverPreviewCard";

export { HoverPreviewContext, useHoverPreview };
