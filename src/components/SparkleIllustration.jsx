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
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.82 8.63 12 2 9.18 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SparkleIllustration;
