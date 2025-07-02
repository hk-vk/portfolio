import React, { useEffect, useState } from 'react';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
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

const generateMiniStars = (count) => {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: 60 + Math.random() * 30 // between 60-90px
  }));
};

const LoadingScreen = ({ progress }) => {
  // Simplified animations for better performance
  const [pulse, cyclePulse] = useCycle(1, 1.08); // Reduced pulse amount
  const [miniStars, setMiniStars] = useState(generateMiniStars(3)); // Fewer stars

  // Reduced constellation regeneration frequency
  useEffect(() => {
    const i = setInterval(() => setMiniStars(generateMiniStars(3)), 2500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const interval = setInterval(cyclePulse, 800); // Slower pulse
    return () => clearInterval(interval);
  }, [cyclePulse]);

  // Exit animation controller
  const exitVariants = {
    hidden: { scale: 1, opacity: 1 },
    exit: { scale: 8, opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loader-wrapper"
        variants={exitVariants}
        initial="hidden"
        animate="hidden"
        exit="exit"
        className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] select-none"
      >
        {/* Constellation area */}
        <div className="relative mb-8" style={{ width: 180, height: 180 }}>
          {/* lines */}
          <svg className="absolute inset-0" width="180" height="180">
            {miniStars.map((s, idx) => {
              const cx = 90 + s.distance * Math.cos(s.angle);
              const cy = 90 + s.distance * Math.sin(s.angle);
              return (
                <motion.line
                  key={idx}
                  x1={90}
                  y1={90}
                  x2={cx}
                  y2={cy}
                  stroke="hsl(var(--primary) / .4)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              );
            })}
          </svg>

          {/* mini stars */}
          {miniStars.map((s, idx) => {
            const style = {
              left: 90 + s.distance * Math.cos(s.angle) - 4,
              top: 90 + s.distance * Math.sin(s.angle) - 4
            };
            return (
              <motion.div
                key={"mini-" + idx}
                className="absolute"
                style={style}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SparkleIllustration size={8} className="text-primary" />
              </motion.div>
            );
          })}

          {/* Center star rotates */}
          <motion.div
            animate={{ rotate: 360, scale: pulse }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SparkleIllustration size={48} className="text-primary" />
          </motion.div>

          {/* Progress Circle */}
          <CircleProgress progress={progress} size={180} stroke={3} />
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
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 