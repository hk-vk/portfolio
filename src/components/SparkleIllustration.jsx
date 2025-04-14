import React from 'react';

const SparkleIllustration = ({ className = '', size = 24 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.59 8.41L20 10L13.59 11.59L12 18L10.41 11.59L4 10L10.41 8.41L12 2Z"
        fill="currentColor"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SparkleIllustration;
