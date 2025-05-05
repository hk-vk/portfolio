import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { Environment, RoundedBox, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useFixedJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// --- Interactive Badge Component (The actual 3D content) ---
function BadgeContent() {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  // Physics props
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    angularDamping: 6, 
    linearDamping: 6   
  };
  const firstSegmentProps = { 
     type: 'dynamic', 
     canSleep: true, 
     colliders: false, 
     angularDamping: 4,
     linearDamping: 4
  };

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Badge dimensions
  const badgeHeight = 3.0;
  const badgeWidth = badgeHeight * (1.6 / 2.25);
  const badgeDepth = 0.15;
  const badgeRadius = 0.15;

  // Joints - Use FixedJoint for the last connection
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.1]); 
  const joint = useFixedJoint(j3, card, [
    [0, 0, 0, 1], 
    [0, badgeHeight * 0.45, 0, 1], 
  ]);

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto';
    return () => void (document.body.style.cursor = 'auto');
  }, [hovered, dragged]);

  // Theme Colors State
  const [colors, setColors] = useState({
    primary: 'hsl(349, 75%, 44%)',
    card: 'hsl(60, 9%, 98%)',
    foreground: 'hsl(240, 10%, 10%)',
    muted: 'hsl(240, 5%, 90%)'
  });

  useEffect(() => {
    const getThemeColors = () => {
      if (typeof window !== 'undefined') {
        const styles = getComputedStyle(document.documentElement);
        setColors({
          primary: styles.getPropertyValue('--primary').trim() || 'hsl(349, 75%, 44%)',
          card: styles.getPropertyValue('--card').trim() || 'hsl(60, 9%, 98%)',
          foreground: styles.getPropertyValue('--foreground').trim() || 'hsl(240, 10%, 10%)',
          muted: styles.getPropertyValue('--muted').trim() || 'hsl(240, 5%, 90%)'
        });
      }
    };
    getThemeColors();
  }, []);

  useFrame((state, delta) => {
    // Physics/Drag logic
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      const maxSpeed = 20, minSpeed = 5; 
      
      // Smoothing for joints
      [j1, j2, j3].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.05, Math.min(0.5, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      // Update the curve points
      curve.points[0].copy(j3.current?.lerped || j3.current.translation());
      curve.points[1].copy(j2.current?.lerped || j2.current.translation());
      curve.points[2].copy(j1.current?.lerped || j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      
      try {
        band.current.geometry.setPoints(curve.getPoints(24));
      } catch (error) {
        console.warn("Error updating lanyard points:", error);
      }

      // No card rotation stabilization needed due to FixedJoint
      
      // General damping when not dragged
      if (!dragged) {
         const currentVel = card.current?.linvel();
         if (currentVel && (Math.abs(currentVel.x) > 0.5 || Math.abs(currentVel.y) > 0.5)) { 
           card.current.setLinvel({
             x: currentVel.x * 0.92, 
             y: currentVel.y * 0.92,
             z: currentVel.z * 0.92
           });
         }
      }
    }
  });

  // Apply specific segment props in the return statement
  return (
    <>
      {/* Position the start of the physics simulation */}
      <group position={[0, 3, 0]}> 
        <RigidBody ref={fixed} {...firstSegmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...firstSegmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...firstSegmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

        <RigidBody
          position={[2, 0, 0]} 
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[badgeWidth / 2, badgeHeight / 2, badgeDepth / 2]} />
          
          <RoundedBox
            args={[badgeWidth, badgeHeight, badgeDepth]}
            radius={badgeRadius}
            smoothness={4}
            castShadow
            receiveShadow
            onPointerOver={(e) => { e.stopPropagation(); hover(true); }}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { e.stopPropagation(); e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e) => {
              e.stopPropagation();
              if (!card.current) return;
              e.target.setPointerCapture(e.pointerId);
              const cardPos = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(cardPos)));
            }}
            style={{ pointerEvents: 'auto' }} 
          >
            <meshPhysicalMaterial
              color={colors.card}
              roughness={0.15}
              metalness={0}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
            {/* Photo Placeholder */}
            <mesh position={[0, badgeHeight * 0.1, badgeDepth / 2 + 0.01]}>
              <planeGeometry args={[badgeWidth * 0.45, badgeWidth * 0.55]} />
              <meshStandardMaterial color={colors.muted} roughness={0.8} metalness={0} />
            </mesh>
            {/* Name Text */}
            <Text
              position={[0, badgeHeight * 0.4, badgeDepth / 2 + 0.01]}
              fontSize={badgeWidth * 0.1}
              color={colors.foreground}
              anchorX="center"
              anchorY="middle"
              maxWidth={badgeWidth * 0.85}
              textAlign="center"
            >
              Harikrishnan V K
            </Text>
            {/* Title Text */}
            <Text
              position={[0, badgeHeight * 0.28, badgeDepth / 2 + 0.01]}
              fontSize={badgeWidth * 0.06}
              color={colors.primary}
              anchorX="center"
              anchorY="middle"
              maxWidth={badgeWidth * 0.85}
              textAlign="center"
            >
              Full Stack Developer
            </Text>
            {/* Location Text */}
            <Text
              position={[0, -badgeHeight * 0.4, badgeDepth / 2 + 0.01]}
              fontSize={badgeWidth * 0.05}
              color={colors.foreground}
              anchorX="center"
              anchorY="middle"
              maxWidth={badgeWidth * 0.85}
              textAlign="center"
            >
              Kerala, India
            </Text>
          </RoundedBox>
        </RigidBody>
      </group>

      {/* Lanyard Mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={colors.primary}
          depthTest={false}
          resolution={[width, height]}
          lineWidth={3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  );
}

// --- Component wrapper specifically for the About page ---
// This creates the Canvas and sets up the environment
export const AboutPageBadge = () => {
  return (
    // Full screen, fixed container.
    <div className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 1, 9], fov: 35 }}
        dpr={[1, 1.5]} 
        style={{ pointerEvents: 'none' }} 
      >
        {/* Lighting setup */}
        <ambientLight intensity={Math.PI * 0.6} />
        <spotLight
          position={[10, 15, 10]} angle={0.3} penumbra={0.8}
          intensity={1.2} castShadow
          shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, 10, 5]} intensity={0.4} /> 

        {/* Physics world */}
        <Physics 
          interpolate 
          gravity={[0, -25, 0]} 
          timeStep={1/60}
        >
          <BadgeContent />
        </Physics>

        {/* Environment */} 
        <Environment preset="city" background={false} blur={0.7}/>
      </Canvas>
    </div>
  );
};

// ... rest of the file ...