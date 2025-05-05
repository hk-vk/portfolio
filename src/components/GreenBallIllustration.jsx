import React from 'react';

const GreenBallIllustration = ({ className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      className={className}
      {...props}
    >
      {/* Green Ball with leaf-like patterns */}
      <g transform="translate(5, 5) scale(0.85)">
        {/* Main ball */}
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="#2a865c"
          stroke="#1e6644"
          strokeWidth="2"
        />
        
        {/* Curved lines to create a leafy/ball pattern */}
        <path
          d="M15,20 C20,15 40,15 45,20"
          fill="none"
          stroke="#1e6644"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        <path
          d="M15,40 C20,45 40,45 45,40"
          fill="none"
          stroke="#1e6644"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        <path
          d="M20,15 C15,20 15,40 20,45"
          fill="none"
          stroke="#1e6644"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        <path
          d="M40,15 C45,20 45,40 40,45"
          fill="none"
          stroke="#1e6644"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default GreenBallIllustration; 