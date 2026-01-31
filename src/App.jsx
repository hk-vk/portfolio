import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource-variable/syne';
import '@fontsource-variable/plus-jakarta-sans';
import './index.css';

// Only import essential components synchronously
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

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

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Optimized theme initialization with proper cleanup
  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');

      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    };

    initTheme();

    // Preload Home immediately so it's ready when loader finishes
    import('./pages/Home');

    // Animated loading progress - minimum ~2 seconds
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10 + 3;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(progressInterval);
        // Short delay after completion before hiding
        setTimeout(() => setLoading(false), 500);
      } else {
        setLoadingProgress(progress);
      }
    }, 70);

    // Preload other routes after a bit
    const preloadTimer = setTimeout(() => {
      import('./pages/About');
      import('./pages/Projects');
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(preloadTimer);
    };
  }, []);

  // Simple loading screen - blocks content until done
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999]">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Name with gradient fill animation */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display relative overflow-hidden"
            style={{ opacity: 0, animation: 'fadeIn 0.4s ease-out forwards' }}
          >
            {/* Background text (unfilled) */}
            <span className="text-muted-foreground/15">HARIKRISHNAN</span>
            {/* Foreground text with gradient (fills based on progress) */}
            <span
              className="absolute inset-0 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 40%, hsl(var(--primary)) 100%)',
                clipPath: `inset(0 ${100 - loadingProgress}% 0 0)`,
                transition: 'clip-path 0.1s ease-out',
              }}
            >
              HARIKRISHNAN
            </span>
          </h1>

          {/* Progress bar */}
          <div className="w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-foreground to-primary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="relative">
            <Suspense fallback={<PageLoader />}>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/og-preview" element={<OGPreview />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
