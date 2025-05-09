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

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Blog from './pages/Blog';

// Utilities
import { initScrollAnimations } from './utils/scrollAnimations';
import { themeToggle } from './utils/themeToggle';

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
    return (
      <div className="h-screen w-full flex items-center justify-center loading-screen-bg overflow-hidden relative">
        {/* Animated blob backgrounds */}
        <div className="blob-bg" style={{ top: '20%', left: '15%' }}></div>
        <div className="blob-bg" style={{ bottom: '10%', right: '10%', animationDelay: '2s' }}></div>
        
        {/* Green ball */}
        <motion.div 
          className="absolute bottom-1/4 left-1/4"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <GreenBallIllustration className="w-16 h-16" />
        </motion.div>
        
        {/* Cute character with playful movement */}
        <motion.div 
          className="absolute z-20"
          initial={{ x: -100, y: 300 }}
          animate={{
            x: [
              -100, // Start off-screen left
              100,  // Move to left side
              200,  // Middle left
              300,  // Center
              450,  // Middle right
              550,  // Right side
              650   // Off-screen right
            ],
            y: [
              300,  // Start position
              280,  // Hop up a bit
              320,  // Dip down
              260,  // Hop up higher
              290,  // Come down a bit
              270,  // Small hop
              300   // End position
            ],
            rotate: [0, -5, 5, -7, 5, -3, 0],
            scale: [1, 1.1, 1, 1.05, 1, 1.1, 1]
          }}
          transition={{
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut"
          }}
        >
          <CharacterIllustration className="w-40 h-40" />
        </motion.div>

        <div className="text-center relative z-10">
          {/* Name animation with Framer Motion */}
          <motion.div 
            className="mb-4" 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {'HARIKRISHNAN'.split('').map((letter, index) => (
              <motion.span 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8, rotate: -5 },
                  visible: {
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotate: 0,
                    transition: { type: "spring", damping: 15, stiffness: 100 }
                  }
                }}
                className="inline-block text-5xl md:text-7xl font-serif loading-letter-fm"
                style={{
                  // Add gradient effect to match the screenshot
                  background: 'linear-gradient(90deg, #e94e77, #a393d8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-48 md:w-64 h-2 bg-muted mx-auto mt-6 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-300 ease-out shadow-md"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-foreground font-medium mt-2">{Math.round(loadProgress)}%</p>
          
          {/* Portfolio text */}
          <p className="text-foreground text-sm mt-6 tracking-widest animate-pulse font-medium">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
