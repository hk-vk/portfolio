import React from 'react';

const SparkleIllustration = ({ className = '', size = 24 }) => {
  const gradientId = React.useId();

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="21" y2="21">
          <stop stopColor="hsl(var(--muted-foreground))" />
          <stop offset="0.32" stopColor="hsl(var(--primary))" />
          <stop offset="0.48" stopColor="hsl(var(--foreground))" />
          <stop offset="0.62" stopColor="hsl(var(--muted-foreground))" />
          <stop offset="1" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>
      <path
        d="M12 1L9 9L1 12L9 15L12 23L15 15L23 12L15 9L12 1Z"
        fill={`url(#${gradientId})`}
        stroke="hsl(var(--foreground) / 0.18)"
        strokeWidth="0.35"
      />
    </svg>
  );
};

export default SparkleIllustration;
