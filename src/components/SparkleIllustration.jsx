import React from 'react';

/**
 * SparkleIllustration - Clean 4-point shimmer with elegant gradient
 */
const SparkleIllustration = ({ className = '', size = 24 }) => {
  // Generate unique ID for gradient (prevents conflicts with multiple instances)
  const id = React.useId?.() || `sparkle-${Math.random().toString(36).slice(2, 9)}`;
  
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Elegant red/rose gradient */}
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#EE5A5A" />
          <stop offset="100%" stopColor="#DC3545" />
        </linearGradient>
      </defs>
      
      {/* Main sparkle with gradient */}
      <path
        d="M12 1L9 9L1 12L9 15L12 23L15 15L23 12L15 9L12 1Z"
        fill={`url(#gradient-${id})`}
      />
    </svg>
  );
};

export default SparkleIllustration;
