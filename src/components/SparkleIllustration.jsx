import React from 'react';

const STAR_PATH = 'M12 1L9 9L1 12L9 15L12 23L15 15L23 12L15 9L12 1Z';

const SparkleIllustration = ({ className = '', size = 24 }) => {
  const gradientId = React.useId();
  const shineId = React.useId();
  const clipId = React.useId();

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
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={STAR_PATH} />
        </clipPath>
      </defs>
      <path
        d={STAR_PATH}
        fill={`url(#${gradientId})`}
        stroke="hsl(var(--foreground) / 0.18)"
        strokeWidth="0.35"
      />
      <g clipPath={`url(#${clipId})`}>
        <g className="sparkle-specular">
          <rect x="-18" y="-8" width="8" height="40" rx="4" fill={`url(#${shineId})`} transform="rotate(20 12 12)" />
        </g>
      </g>
    </svg>
  );
};

export default SparkleIllustration;
