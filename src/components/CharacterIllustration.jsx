import React from 'react';

const CharacterIllustration = ({ className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      {...props}
    >
      {/* Cute Purple blob character */}
      <g transform="translate(10, 10) scale(0.8)">
        {/* Body - made rounder */}
        <path
          d="M30,20 C10,25 5,50 15,70 C25,90 60,85 70,65 C80,45 75,25 60,20 C45,15 40,18 30,20Z"
          fill="#a393d8"
          stroke="#8a7cb8"
          strokeWidth="2"
        />
        {/* Arm/Wing - made cuter/rounder */}
        <path
          d="M65,40 C80,35 85,50 75,60 C65,70 60,60 65,40Z"
          fill="#a393d8"
          stroke="#8a7cb8"
          strokeWidth="2"
        />
        
        {/* Eyes - made bigger and cuter */}
        <circle cx="30" cy="35" r="4" fill="#332941" /> {/* Main eye */}
        <circle cx="30" cy="34" r="1" fill="white" /> {/* Eye highlight */}
        
        {/* Cute blush marks */}
        <circle cx="40" cy="45" r="5" fill="#e4a3c3" opacity="0.4" />
        
        {/* Small pink accent */}
        <ellipse cx="25" cy="65" rx="10" ry="6" fill="#ffcccc" opacity="0.8" />
        
        {/* Smile - adding a cute subtle smile */}
        <path
          d="M35,45 C38,48 45,48 48,45"
          fill="none"
          stroke="#332941"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default CharacterIllustration; 