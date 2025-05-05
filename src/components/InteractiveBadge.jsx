import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const InteractiveBadge = () => {
  return (
    <div style={{ height: '400px', width: '100%', background: 'transparent', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 30 }}>
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

function Band({ maxSpeed = 50, minSpeed = 10 }) {
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
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], false, 'catmullrom', 0.5));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto';
    return () => void (document.body.style.cursor = 'auto');
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  const badgeWidth = 1.6;
  const badgeHeight = 2.25;
  const badgeDepth = 0.1;

  // Get current theme colors (requires access to CSS variables)
  // This is a simplified approach; robust solution might need context or props
  const [colors, setColors] = useState({ primary: '#000000', card: '#ffffff' });

  useEffect(() => {
    // Function to read CSS variables
    const getThemeColors = () => {
      if (typeof window !== 'undefined') {
        const styles = getComputedStyle(document.documentElement);
        setColors({
          primary: styles.getPropertyValue('--primary').trim() || '#8A2BE2', // Fallback primary (adjust if needed)
          card: styles.getPropertyValue('--card').trim() || '#F5F5F5' // Fallback card bg (adjust if needed)
        });
      }
    };

    getThemeColors();

    // Optional: Add listener for theme changes if using dynamic theme switching
    // const observer = new MutationObserver(getThemeColors);
    // observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    // return () => observer.disconnect();

  }, []);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[badgeWidth / 2, badgeHeight / 2, badgeDepth / 2]} />
          <mesh
            castShadow
            receiveShadow
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => {
              if (!card.current) return;
              e.target.setPointerCapture(e.pointerId);
              // Calculate offset relative to the card's center
              const cardPos = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(cardPos));
            }}
          >
            <boxGeometry args={[badgeWidth, badgeHeight, badgeDepth]} />
            <meshStandardMaterial
              color={colors.card} // Use state variable for card color
              roughness={0.3}
              metalness={0.2}
             />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
           color={colors.primary} // Use state variable for primary color
           depthTest={false}
           resolution={[width, height]}
           lineWidth={3}
         />
      </mesh>
    </>
  );
}

export default InteractiveBadge; // Ensure default export is present 