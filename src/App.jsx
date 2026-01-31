import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import '@fontsource-variable/syne';
import '@fontsource-variable/plus-jakarta-sans';
import './index.css';

// Only import essential components synchronously
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

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
    }, 500);

    return () => {
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="relative">
            <Suspense fallback={<PageLoader />}>
              <ScrollToTop />
              <AnimatedRoutes />
            </Suspense>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
