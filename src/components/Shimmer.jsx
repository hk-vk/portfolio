import React from 'react';

const Shimmer = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <div className="relative overflow-hidden rounded-[inherit]">
      <div
        className="[&_*]:!text-transparent [&_*]:!border-transparent [&_img]:opacity-0 [&_svg]:opacity-0"
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-muted/40" />
      <div className="pointer-events-none absolute inset-0 animate-shimmer" />
    </div>
  );
};

export default Shimmer;
