import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for optimizing component rendering based on visibility
 * Uses Intersection Observer API for efficient scroll-based animations
 */
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasBeenVisible) {
            setHasBeenVisible(true);
          }
          if (defaultOptions.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(false);
        }
      },
      defaultOptions
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce, hasBeenVisible]);

  return [ref, isVisible, hasBeenVisible];
};

/**
 * Hook for debouncing values - useful for performance optimization
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for throttling function calls
 */
export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

/**
 * Hook for preloading images to improve performance
 */
export const useImagePreloader = (imageSources = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());

  useEffect(() => {
    imageSources.forEach(src => {
      if (!loadedImages.has(src) && !loadingImages.has(src)) {
        setLoadingImages(prev => new Set([...prev, src]));
        
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(src);
            return newSet;
          });
        };
        img.onerror = () => {
          setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(src);
            return newSet;
          });
        };
        img.src = src;
      }
    });
  }, [imageSources, loadedImages, loadingImages]);

  return { loadedImages, loadingImages };
};
