import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from './lib/motion';
import { useRef } from 'react';
import './index.css';

// Only import essential components synchronously
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import MotionProvider from './components/MotionProvider';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { lazyWithRetry } from './utils/lazyWithRetry';
import Home from './pages/Home';
import SparkleIllustration from './components/SparkleIllustration';
import ScrollToTop from './utils/ScrollToTop';
import { posthog } from './utils/analytics';

// Lazy load all pages for code splitting and faster initial load
const About = lazyWithRetry(() => import('./pages/About'));
const Projects = lazyWithRetry(() => import('./pages/Projects'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage'));
const OGPreview = lazyWithRetry(() => import('./pages/OGPreview'));
const Archive = lazyWithRetry(() => import('./pages/Archive')); 

const PageLoader = () => (
  <section className="flex min-h-[60vh] items-center px-4 sm:px-6" aria-busy="true" aria-live="polite">
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-card/35 p-6 shadow-lg shadow-black/10 backdrop-blur-sm dark:shadow-black/25 sm:p-10">
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-foreground/40 to-transparent" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SparkleIllustration size={16} />
          <span>Hari works</span>
        </div>
        <h1 className="mt-5 max-w-xl text-3xl font-bold sm:text-5xl">
          Building useful web products.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          I am Harikrishnan, a full-stack developer who turns product ideas into fast, maintainable web apps.
        </p>
        <a
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="mailto:hi@hari.works"
        >
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          hi@hari.works
        </a>
        <span className="sr-only">Loading page.</span>
      </div>
    </div>
  </section>
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

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.locationKey !== this.props.locationKey) {
      this.setState({ hasError: false });
    }
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

const RouteErrorBoundaryWithLocation = ({ children }) => {
  const location = useLocation();
  return (
    <RouteErrorBoundary locationKey={location.pathname}>
      {children}
    </RouteErrorBoundary>
  );
};

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
        <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
        <Route path="/archive/:year/:slug" element={<PageTransition><Archive /></PageTransition>} />
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
  if (pathname.startsWith('/archive')) return 'archive';
  return 'other';
};

const RouteAnalytics = () => {
  const location = useLocation();
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
  }, [location.pathname, location.search]);

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

  }, []);

  return (
    <HelmetProvider>
      <MotionProvider>
        <Router>
          <SmoothScrollProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="relative">
                <RouteErrorBoundaryWithLocation>
                  <Suspense fallback={<PageLoader />}>
                    <RouteAnalytics />
                    <ScrollToTop />
                    <AnimatedRoutes />
                  </Suspense>
                </RouteErrorBoundaryWithLocation>
              </main>
            </div>
          </SmoothScrollProvider>
        </Router>
      </MotionProvider>
    </HelmetProvider>
  );
}

export default App;
