import React from 'react';
import { motion, useCycle } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';

// Radial progress circle calculates circumference later
const CircleProgress = ({ progress, size = 120, stroke = 4 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="hsl(var(--border))"
        strokeWidth={stroke}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="hsl(var(--primary))"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        animate={{ strokeDashoffset: offset }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
      />
    </svg>
  );
};

const LoadingScreen = ({ progress }) => {
  // Animate star pulse
  const [pulse, cyclePulse] = useCycle(1, 1.15);
  React.useEffect(() => {
    const interval = setInterval(cyclePulse, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] select-none">
      {/* Rotating star inside radial progress */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SparkleIllustration size={48} className="text-primary" />
        </motion.div>
        <CircleProgress progress={progress} size={120} />
      </div>
      {/* Name fade-in */}
      <motion.h1
        className="text-3xl md:text-5xl font-serif font-bold gradient-text mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Harikrishnan V K
      </motion.h1>
      <p className="text-muted-foreground tracking-wider text-xs">Loading {Math.round(progress)}%</p>
    </div>
  );
};

export default LoadingScreen; 