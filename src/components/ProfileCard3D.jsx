import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text, 
  Environment, 
  MeshReflectorMaterial, 
  Float, 
  PresentationControls,
  ContactShadows,
  Html,
  useTexture,
  RoundedBox
} from '@react-three/drei';
import { easing } from 'maath';

// Main component wrapper
const ProfileCard3D = () => {
  return (
    <div className="w-full h-[600px]" style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          alpha: true
        }}
      >
        {/* <color attach="background" args={['transparent']} /> */}
        {/* Let canvas be transparent via gl.alpha and parent div background */}
        
        {/* Controls wrapper that allows for smooth dragging */}
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.4, 0.4]}
          azimuth={[-0.8, 0.8]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          {/* Scene Contents */}
          <Float
            rotationIntensity={0.4}
            floatIntensity={0.4}
            speed={1.5}
          >
            <Scene />
          </Float>
        </PresentationControls>
        
        {/* Ground reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={60}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          />
        </mesh>
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <spotLight 
          position={[-10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          color="#2d5af6" 
        />
        
        {/* Environment and post-processing */}
        <Environment preset="city" />
        <ContactShadows 
          rotation-x={Math.PI / 2}
          position={[0, -1.8, 0]}
          opacity={0.5}
          width={10}
          height={10}
          blur={1.5}
          far={1.8}
        />
      </Canvas>
    </div>
  );
};

// Main scene contents
const Scene = () => {
  const [hovered, setHovered] = useState(false);
  const card = useRef();
  const { viewport } = useThree();
  
  // Theme-aware colors
  const [colors, setColors] = useState({
    primary: '#3a86ff',
    card: '#242424',
    accent: '#f72585'
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const styles = getComputedStyle(document.documentElement);
      setColors({
        primary: styles.getPropertyValue('--primary').trim() || '#3a86ff',
        // Ensure card color is not transparent as it can cause issues with THREE.Color
        card: styles.getPropertyValue('--card').trim() && styles.getPropertyValue('--card').trim() !== 'transparent' 
              ? styles.getPropertyValue('--card').trim() 
              : '#242424',
        accent: styles.getPropertyValue('--accent').trim() || '#f72585'
      });
    }
  }, []);
  
  useFrame((state, delta) => {
    if (card.current) {
      easing.damp3(
        card.current.rotation,
        [
          (hovered ? -0.1 : 0) + state.pointer.y * 0.2,
          (hovered ? 0.1 : 0) + state.pointer.x * 0.3,
          0
        ],
        0.2,
        delta
      );
    }
  });
  
  return (
    <group>
      <group 
        ref={card}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main card using RoundedBox component */}
        <RoundedBox args={[2.5, 4, 0.1]} radius={0.1} smoothness={16} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={colors.card}
            roughness={0.1}
            metalness={0.8}
            transmission={0.1}
            clearcoat={1}
            clearcoatRoughness={0.2}
            envMapIntensity={1.5}
          />
        </RoundedBox>
        
        {/* Glowing edge using RoundedBox */}
        <RoundedBox args={[2.55, 4.05, 0.001]} radius={0.1} smoothness={16} position={[0, 0, -0.051]}>
          <meshBasicMaterial 
            color={hovered ? colors.accent : colors.primary} 
            toneMapped={false}
          />
        </RoundedBox>
        
        {/* Content */}
        <group position={[0, 0.8, 0.06]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <circleGeometry args={[0.8, 32]} />
            <meshStandardMaterial 
              color={colors.primary} 
              roughness={0.5} 
              metalness={0.3}
            />
            <ProfileImage position={[0, 0, 0.02]} />
          </mesh>
          
          <Text
            position={[0, -0.7, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            letterSpacing={0.02}
          >
            Harikrishnan V K
          </Text>
          
          <Text
            position={[0, -1.1, 0]}
            fontSize={0.15}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
          >
            Full Stack Developer
          </Text>
          
          <group position={[0, -1.6, 0]}>
            {['React', 'Next.js', 'FastAPI'].map((skill, i) => (
              <RoundedBox 
                key={i} 
                args={[0.7, 0.25, 0.05]} radius={0.05} smoothness={8}
                position={[(i - 1) * 0.8, 0, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color={colors.primary}
                  roughness={0.3}
                  metalness={0.7}
                />
                <Text
                  position={[0, 0, 0.03]}
                  fontSize={0.1}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {skill}
                </Text>
              </RoundedBox>
            ))}
          </group>
        </group>
        
        {/* Back of card text */}
        <Text
          position={[0, 0, -0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          rotation={[0, Math.PI, 0]} // Rotate text to be visible on the back
        >
          Drag to rotate
        </Text>
      </group>
      
      <Particles count={50} colors={[colors.primary, colors.accent]} />
    </group>
  );
};

// Profile image component
const ProfileImage = ({ position }) => {
  // You could use a real image with useTexture, but for now using a placeholder
  return (
    <mesh position={position}>
      <circleGeometry args={[0.75, 32]} />
      <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.4} />
      <Html
        transform
        occlude
        position={[0, 0, 0.01]}
        style={{
          width: '120px',
          height: '120px',
          fontSize: '96px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          opacity: 0.7
        }}
      >
        HK
      </Html>
    </mesh>
  );
};

// Floating particles effect
const Particles = ({ count, colors }) => {
  const mesh = useRef();
  const initialPositions = useRef(
    Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ],
      size: Math.random() * 0.03 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  );
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.05;
      mesh.current.rotation.x += delta * 0.03;
    }
  });
  
  return (
    <group ref={mesh}>
      {initialPositions.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshBasicMaterial color={particle.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

export default ProfileCard3D; 