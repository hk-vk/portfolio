import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource-variable/space-grotesk';
import '@fontsource/dm-serif-display';
import './index.css';

// Only import essential components synchronously
import Navbar from './components/Navbar_GSAP';
import LoadingScreen from './components/LoadingScreen';

// Lazy load all pages for code splitting and faster initial load
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Lazy load utilities for better performance
const ScrollToTop = lazy(() => import('./utils/ScrollToTop'));

// Lightweight loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Optimized theme initialization
  useEffect(() => {
    // Initialize theme immediately without dynamic import for better performance
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    };
    
    initTheme();
    
    // Fast loading simulation - much quicker
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Ultra-fast loading screen
  if (loading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  return (
    <Router>
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
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
