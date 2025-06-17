import React from 'react';
import './NameStrip.css';

const NameStrip = ({ name = "HARI KRISHNAN", className = "" }) => {
  return (
    <div className={`name-strip shadow ${className}`}>
      <div className="circle"></div>
      <span className="name-text">{name}</span>
    </div>
  );
};

export default NameStrip;
