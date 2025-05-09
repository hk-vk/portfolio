import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = "", 
  animation = "fadeUp", 
  delay = 0, 
  once = true, 
  threshold = 0.1,
  ...props 
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Reset animation state when animation type changes
    setHasAnimated(false);
  }, [animation]);

  // Animation variants
  const variants = {
    fadeUp: {
      hidden: { y: 30, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.7, 
          ease: [0.25, 0.1, 0.25, 1.0],
          delay 
        }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.5,
          delay 
        }
      }
    },
    slideInLeft: {
      hidden: { x: -40, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay 
        }
      }
    },
    slideInRight: {
      hidden: { x: 40, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay 
        }
      }
    },
    zoomIn: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay 
        }
      }
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          duration: 0.5,
          delay 
        }
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial={hasAnimated && once ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={variants[animation]}
      onAnimationComplete={() => setHasAnimated(true)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated Grid Component
export const AnimatedGrid = ({ 
  children, 
  className = "", 
  columns = { sm: 1, md: 2, lg: 3 }, 
  gap = 6,
  stagger = 0.05,
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
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
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
      viewport={{ once, threshold }}
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
};

export default AnimatedSection;
