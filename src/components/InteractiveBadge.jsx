import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// A very simple badge component without physics
const SimpleBadge = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 3, 0.2]} />
      <meshStandardMaterial color="#9984C7" />
    </mesh>
  );
};

// Main component wrapper
const InteractiveBadge = () => {
  return (
    <div style={{ height: '400px', width: '100%', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SimpleBadge />
      </Canvas>
    </div>
  );
};

export default InteractiveBadge; 