import { memo } from 'react';
import { motion } from 'framer-motion';
import { duration, entrance, stagger as staggerConfig } from '../utils/motionSettings';

const AnimatedSection = memo(({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  once = true,
  threshold = 0.1,
  ...props
}) => {
  // Animation variants using Temporal Precision system
  const variants = {
    fadeUp: {
      hidden: entrance.fadeUp.initial,
      visible: {
        ...entrance.fadeUp.animate,
        transition: {
          duration: duration.standard / 1000,
          ease: "easeOut",
          delay
        }
      }
    },
    fadeIn: {
      hidden: entrance.fade.initial,
      visible: {
        ...entrance.fade.animate,
        transition: {
          duration: duration.quick / 1000,
          delay
        }
      }
    },
    slideInLeft: {
      hidden: entrance.slideLeft.initial,
      visible: {
        ...entrance.slideLeft.animate,
        transition: {
          duration: duration.standard / 1000,
          ease: "easeOut",
          delay
        }
      }
    },
    slideInRight: {
      hidden: entrance.slideRight.initial,
      visible: {
        ...entrance.slideRight.animate,
        transition: {
          duration: duration.standard / 1000,
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
          duration: duration.quick / 1000,
          ease: "easeOut",
          delay
        }
      }
    },
    scale: {
      hidden: entrance.scaleUp.initial,
      visible: {
        ...entrance.scaleUp.animate,
        transition: {
          duration: duration.standard / 1000,
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

// Optimized Animated Grid Component with Temporal Precision
export const AnimatedGrid = memo(({
  children,
  className = "",
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  stagger = staggerConfig.quick.staggerChildren,
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
        delayChildren: staggerConfig.standard.delayChildren
      }
    }
  };

  const itemVariants = {
    hidden: entrance.fadeUp.initial,
    visible: {
      ...entrance.fadeUp.animate,
      transition: {
        duration: duration.standard / 1000,
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
