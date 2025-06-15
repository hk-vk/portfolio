import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource-variable/space-grotesk';
import '@fontsource/dm-serif-display';
import './index.css';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CharacterIllustration from './components/CharacterIllustration';
import GreenBallIllustration from './components/GreenBallIllustration';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';

// Utilities
import { initScrollAnimations } from './utils/scrollAnimations';
import { themeToggle } from './utils/themeToggle';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Initialize theme and animations
  useEffect(() => {
    // Initialize theme based on user preference
    const { initializeTheme } = themeToggle();
    initializeTheme();
    
    // Initialize scroll animations after the app has loaded
    let cleanupScrollAnimations;
    
    if (!loading) {
      cleanupScrollAnimations = initScrollAnimations();
    }
    
    // Cleanup function
    return () => {
      if (cleanupScrollAnimations) {
        cleanupScrollAnimations();
      }
    };
  }, [loading]);

  // Simulate loading time with progress
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadProgress(prev => {
          // Increase progress faster
          const newProgress = prev + Math.random() * 25; // Increased random step
          if (newProgress >= 100) {
            clearInterval(interval);
            setLoading(false); // Remove the setTimeout delay
            return 100;
          }
          return newProgress;
        });
      }, 100); // Decreased interval time
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  // Loading screen
  if (loading) {
    return <LoadingScreen progress={loadProgress} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pb-24 md:pb-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
