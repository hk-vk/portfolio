import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Extend R3F to recognize MeshLine components
extend({ MeshLineGeometry, MeshLineMaterial });

// Main component containing the Canvas and Physics world
const InteractiveBadge = () => {
  return (
    <div style={{ height: '400px', width: '100%', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI * 0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment preset="studio" background={false} />
      </Canvas>
    </div>
  );
};

// Component handling the lanyard (band) and the card physics
function Band({ maxSpeed = 50, minSpeed = 10 }) {
  // References to physics bodies
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  // Math helpers
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  // Physics props for rigidbodies
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    angularDamping: 2, 
    linearDamping: 2 
  };
  
  // Canvas size for meshline
  const { width, height } = useThree((state) => state.size);
  
  // Create curve for the lanyard
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3()
  ]));
  
  // Interaction states
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Define physics joints between bodies (lanyard segments)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  // Update cursor style when hovering/dragging
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Physics simulation and animation loop
  useFrame((state, delta) => {
    // Handle dragging
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      // Wake up all physics bodies
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      // Move the card based on pointer position
      card.current.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }

    // Update the lanyard curve and physics
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // Apply smoothing lerp to the joints for more stable movement
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(), 
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      
      // Update curve points from physics joints
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      // Update meshline geometry with the curve points
      band.current.geometry.setPoints(curve.getPoints(32));
      
      // Apply force to keep the card facing forward
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ 
        x: ang.x, 
        y: ang.y - rot.y * 0.25, 
        z: ang.z 
      });
    }
  });

  // Badge dimensions
  const badgeWidth = 1.6;
  const badgeHeight = 2.25;
  const badgeDepth = 0.1;

  // Get theme colors for light/dark mode from CSS variables
  const [colors, setColors] = useState({ 
    primary: '#9984C7',  // Default purple color (from the Hand illustration)
    card: '#fafafa'      // Default card color
  });

  // Read CSS variables for theme-aware colors
  useEffect(() => {
    const getThemeColors = () => {
      if (typeof window !== 'undefined') {
        const styles = getComputedStyle(document.documentElement);
        
        // Try to read CSS variables or use defaults
        const primaryRaw = styles.getPropertyValue('--primary').trim();
        const cardRaw = styles.getPropertyValue('--card').trim();
        
        setColors({
          primary: primaryRaw || '#9984C7',
          card: cardRaw || '#fafafa'
        });
      }
    };

    getThemeColors();
  }, []);

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed point the lanyard hangs from */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        
        {/* First joint */}
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Second joint */}
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Third joint */}
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card rigidbody */}
        <RigidBody 
          position={[2, 0, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          {/* Card collider */}
          <CuboidCollider args={[badgeWidth / 2, badgeHeight / 2, badgeDepth / 2]} />
          
          {/* Card mesh with interactions */}
          <mesh
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              if (!card.current) return;
              e.target.setPointerCapture(e.pointerId);
              
              // Calculate offset relative to the card's center
              const cardPos = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(cardPos)));
            }}
          >
            <boxGeometry args={[badgeWidth, badgeHeight, badgeDepth]} />
            <meshPhysicalMaterial
              color={colors.card}
              roughness={0.3}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.15}
            />
            
            {/* Optional: Add a name/text to the front of the card */}
            {/* This would require Text from drei or a texture approach */}
          </mesh>
        </RigidBody>
      </group>

      {/* Lanyard mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={colors.primary}
          depthTest={false}
          resolution={[width, height]}
          lineWidth={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
}

export default InteractiveBadge; 