import React from 'react';

const HandIllustration = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path
        d="M20 30 Q50 10 80 30 T80 70 Q50 90 20 70 T20 30 Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 40 Q50 30 65 40 T65 60 Q50 70 35 60 T35 40 Z"
        strokeOpacity="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HandIllustration;
