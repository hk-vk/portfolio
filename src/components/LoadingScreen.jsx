import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Individual letter component that fills based on progress
const FillLetter = ({ letter, delay, progress, index, totalLetters }) => {
  // Calculate when this letter should start and finish filling
  const letterStartProgress = (index / totalLetters) * 100;
  const letterEndProgress = ((index + 1) / totalLetters) * 100;

  // Calculate fill percentage for this letter (0-100)
  const letterFillPercent = useMemo(() => {
    if (progress <= letterStartProgress) return 0;
    if (progress >= letterEndProgress) return 100;
    return ((progress - letterStartProgress) / (letterEndProgress - letterStartProgress)) * 100;
  }, [progress, letterStartProgress, letterEndProgress]);

  return (
    <motion.span
      className="relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4, ease: "easeOut" }}
      style={{
        fontFamily: "'DM Serif Display', serif",
      }}
    >
      {/* Background letter (unfilled) */}
      <span
        className="text-muted-foreground/20"
        style={{ WebkitTextStroke: '1px hsl(var(--muted-foreground) / 0.3)' }}
      >
        {letter}
      </span>

      {/* Foreground letter (filled with gradient) - clipped based on progress */}
      <span
        className="absolute inset-0 bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)',
          clipPath: `inset(0 ${100 - letterFillPercent}% 0 0)`,
          transition: 'clip-path 0.1s ease-out',
        }}
      >
        {letter}
      </span>
    </motion.span>
  );
};

const LoadingScreen = ({ progress }) => {
  const name = "HARIKRISHNAN";
  const letters = name.split('');

  // Exit animation controller
  const exitVariants = {
    hidden: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
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
        {/* Name with fill animation */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight flex">
            {letters.map((letter, index) => (
              <FillLetter
                key={index}
                letter={letter}
                delay={index * 0.05}
                progress={progress}
                index={index}
                totalLetters={letters.length}
              />
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground tracking-widest text-xs uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Full Stack Developer
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))',
              width: `${progress}%`,
              transition: 'width 0.15s ease-out',
            }}
          />
        </motion.div>

        {/* Progress text */}
        <motion.p
          className="text-muted-foreground/60 text-xs mt-2 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 