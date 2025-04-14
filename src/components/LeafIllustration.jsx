import React from 'react';

const LeafIllustration = ({ className = '', fill = '#4CAF50' }) => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 25C10 15 15 5 25 5C35 5 40 15 40 25C40 35 35 45 25 45C15 45 10 35 10 25Z"
        fill={fill}
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M25 5C25 5 15 15 15 25C15 35 25 45 25 45"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 15C15 15 25 25 35 15"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 35C15 35 25 25 35 35"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LeafIllustration;
