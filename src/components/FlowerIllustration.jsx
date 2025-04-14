import React from 'react';

const FlowerIllustration = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="12" fill="#FFEBB3" stroke="#000000" strokeWidth="1.2" />
      <path
        d="M30 10C33 10 33 18 30 18C27 18 27 10 30 10Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M30 42C33 42 33 50 30 50C27 50 27 42 30 42Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M18 30C18 27 10 27 10 30C10 33 18 33 18 30Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M42 30C42 27 50 27 50 30C50 33 42 33 42 30Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M22 22C24 20 18 14 16 16C14 18 20 24 22 22Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M38 38C40 36 34 30 32 32C30 34 36 40 38 38Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M22 38C20 36 14 42 16 44C18 46 24 40 22 38Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d="M38 22C36 20 30 26 32 28C34 30 40 24 38 22Z"
        fill="white"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <circle cx="30" cy="30" r="4" fill="#FFCA28" stroke="#000000" strokeWidth="1" />
    </svg>
  );
};

export default FlowerIllustration;
