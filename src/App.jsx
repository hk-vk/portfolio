import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
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
import { lazyWithRetry } from './utils/lazyWithRetry';

// Lazy load all pages for code splitting and faster initial load
const Home = lazyWithRetry(() => import('./pages/Home'));
const About = lazyWithRetry(() => import('./pages/About'));
const Projects = lazyWithRetry(() => import('./pages/Projects'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage'));
const OGPreview = lazyWithRetry(() => import('./pages/OGPreview'));

// Lazy load utilities for better performance
const ScrollToTop = lazyWithRetry(() => import('./utils/ScrollToTop'));

// Lightweight loading fallback component - minimal to avoid flash
const PageLoader = () => (
  <div className="min-h-[60vh] bg-background flex items-center justify-center px-6">
    <div className="w-full max-w-3xl space-y-4 animate-pulse">
      <div className="h-10 w-1/2 bg-muted/50 rounded-md" />
      <div className="h-4 w-3/4 bg-muted/40 rounded-md" />
      <div className="h-4 w-2/3 bg-muted/40 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="h-40 bg-muted/30 rounded-xl" />
        <div className="h-40 bg-muted/30 rounded-xl" />
      </div>
    </div>
  </div>
);

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep this in console for debugging route-level crashes
    console.error('Route render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-semibold mb-3">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              A route failed to render. Try returning home or reloading this page.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="button-primary">Go Home</Link>
              <button type="button" className="button-secondary" onClick={() => window.location.reload()}>
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-6">
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-3">Page not found</h2>
      <p className="text-muted-foreground mb-6">This route does not exist.</p>
      <Link to="/" className="button-primary">Back to Home</Link>
    </div>
  </div>
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
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
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
      import('./pages/Contact');
    }, 500);

    return () => {
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <MotionProvider>
        <Router>
          <SmoothScrollProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="relative">
                <RouteErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <RouteAnalytics />
                    <ScrollToTop />
                    <AnimatedRoutes />
                  </Suspense>
                </RouteErrorBoundary>
              </main>
            </div>
          </SmoothScrollProvider>
        </Router>
      </MotionProvider>
    </HelmetProvider>
  );
}

export default App;
