import React from 'react';
import { motion } from '../lib/motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroHighlightLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Define the SVG path based on the layout in Home.jsx
  // This path is an estimation and might need fine-tuning based on exact element positions and responsiveness
  const linePath = `
    M 50 130
    L 150 130
    L 150 200
    L 300 200
    L 350 180
    L 550 180
    L 550 250
    L 600 300
    L 500 350
    L 500 400
    L 650 420
  `;

  return (
    <motion.svg
      ref={ref}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" // Position over content
      viewBox="0 0 800 500" // Adjust viewBox based on layout scale
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.path
        d={linePath}
        stroke="var(--color-primary)" // Use primary color variable
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { type: "spring", duration: 3, bounce: 0 },
              opacity: { duration: 0.1 }
            }
          }
        }}
      />
    </motion.svg>
  );
};

export default HeroHighlightLine; 
