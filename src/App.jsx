import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from './lib/motion';
import { usePostHog } from '@posthog/react';
import { useRef } from 'react';
import '@fontsource-variable/syne';
import '@fontsource-variable/plus-jakarta-sans';
import './index.css';

// Only import essential components synchronously
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import MotionProvider from './components/MotionProvider';
import { SmoothScrollProvider } from './context/SmoothScrollContext';

// Lazy load all pages for code splitting and faster initial load
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const OGPreview = lazy(() => import('./pages/OGPreview'));

// Lazy load utilities for better performance
const ScrollToTop = lazy(() => import('./utils/ScrollToTop'));

// Lightweight loading fallback component - minimal to avoid flash
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:postId" element={<PageTransition><BlogPostPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/og-preview" element={<PageTransition><OGPreview /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const getPageNameFromPath = (pathname) => {
  if (pathname === '/') return 'home';
  if (pathname === '/about') return 'about';
  if (pathname === '/projects') return 'projects';
  if (pathname === '/blog') return 'blog';
  if (pathname.startsWith('/blog/')) return 'blog_post';
  if (pathname === '/contact') return 'contact';
  return 'other';
};

const RouteAnalytics = () => {
  const location = useLocation();
  const posthog = usePostHog();
  const lastTrackedPathRef = useRef(null);

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search}`;
    if (lastTrackedPathRef.current === fullPath) return;

    posthog?.capture('page_viewed', {
      page_name: getPageNameFromPath(location.pathname),
      path: location.pathname,
      search: location.search || '',
      title: document.title || '',
    });
    lastTrackedPathRef.current = fullPath;
  }, [location.pathname, location.search, posthog]);

  return null;
};

function App() {
  // Theme initialization
  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');

      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    };

    initTheme();

    // Preload other routes after a bit for faster navigation
    const preloadTimer = setTimeout(() => {
      import('./pages/About');
      import('./pages/Projects');
      import('./pages/Blog');
      import('./pages/BlogPostPage');
    }, 500);

    return () => {
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <MotionProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <SmoothScrollProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="relative">
                <Suspense fallback={<PageLoader />}>
                  <RouteAnalytics />
                  <ScrollToTop />
                  <AnimatedRoutes />
                </Suspense>
              </main>
            </div>
          </SmoothScrollProvider>
        </Router>
      </MotionProvider>
    </HelmetProvider>
  );
}

export default App;
