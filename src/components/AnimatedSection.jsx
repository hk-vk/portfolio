import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({
  children,
  className = "",
  delay = 0.2,
  threshold = 0.1,
  animation = "fadeUp", // options: fadeUp, fadeIn, slideInRight, slideInLeft, zoom
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: threshold, triggerOnce: true });

  // Define animation variants
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Composite component for creating a grid of animated items
export const AnimatedGrid = ({
  children,
  className = "",
  itemClassName = "",
  columns = { sm: 1, md: 2, lg: 3 },
  stagger = 0.1,
  animation = "fadeUp",
}) => {
  const gridClass = `grid gap-6 ${className} ${
    columns.sm === 1 ? 'grid-cols-1' : `grid-cols-${columns.sm}`
  } ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${
    columns.lg ? `lg:grid-cols-${columns.lg}` : ''
  }`;

  return (
    <div className={gridClass}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <AnimatedSection
              key={index}
              delay={index * stagger}
              animation={animation}
              className={itemClassName}
            >
              {child}
            </AnimatedSection>
          ))
        : children}
    </div>
  );
};

export default AnimatedSection;
