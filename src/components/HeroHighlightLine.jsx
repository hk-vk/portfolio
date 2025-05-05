import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const HeroHighlightLine = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Define the SVG path based on the layout in Home.jsx
  // This path is an estimation and might need fine-tuning based on exact element positions and responsiveness
  const linePath = `
    M 50 130  // Start near 'HARI'
    L 150 130 // Across 'HARI'
    L 150 200 // Down towards 'KRISHNAN'
    L 300 200 // Across 'KRISHNAN'
    L 350 180 // Angle up towards right column
    L 550 180 // Across top of right column (near HELLO!)
    L 550 250 // Down past description
    L 600 300 // Angled towards buttons
    L 500 350 // Across buttons area
    L 500 400 // Down towards skills
    L 650 420 // Across skills area
  `;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.svg
      ref={ref}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" // Position over content
      viewBox="0 0 800 500" // Adjust viewBox based on layout scale
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={controls}
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