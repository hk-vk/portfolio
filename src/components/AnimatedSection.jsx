import { memo } from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = memo(({ 
  children, 
  className = "", 
  animation = "fadeUp", 
  delay = 0, 
  once = true, 
  threshold = 0.1,
  ...props 
}) => {
  // Simplified and optimized animation variants
  const variants = {
    fadeUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.3, 
          ease: "easeOut",
          delay 
        }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.25,
          delay 
        }
      }
    },
    slideInLeft: {
      hidden: { x: -30, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration: 0.3,
          ease: "easeOut",
          stiffness: 180,
          damping: 25,
          delay 
        }
      }
    },
    slideInRight: {
      hidden: { x: 30, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration: 0.3,
          ease: "easeOut",
          delay 
        }
      }
    },
    zoomIn: {
      hidden: { scale: 0.98, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          duration: 0.25,
          ease: "easeOut",
          delay 
        }
      }
    },
    scale: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          duration: 0.3,
          ease: "easeOut",
          delay 
        }
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold, margin: "-50px" }}
      variants={variants[animation]}
      {...props}
    >
      {children}
    </motion.div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

// Optimized Animated Grid Component
export const AnimatedGrid = memo(({ 
  children, 
  className = "", 
  columns = { sm: 1, md: 2, lg: 3 }, 
  gap = 6,
  stagger = 0.03,
  once = true,
  threshold = 0.1,
  ...props 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Create grid classes based on columns prop
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={gridClasses}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {Array.isArray(children) && children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
      {!Array.isArray(children) && children}
    </motion.div>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

export default AnimatedSection;
