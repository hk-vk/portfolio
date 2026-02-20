import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../context/SmoothScrollContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
