import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useFixedJoint } from '@react-three/rapier';

export const AboutPageBadge = () => {
  // ... existing state and effect ...
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  // Physics props
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    // Set higher damping initially for j3 and card
    angularDamping: 6, 
    linearDamping: 6   
  };
  const firstSegmentProps = { // Keep lower damping for the upper parts of the rope
     type: 'dynamic', 
     canSleep: true, 
     colliders: false, 
     angularDamping: 4,
     linearDamping: 4
  };

  // ... existing state, badge dimensions, etc. ...
  
  // Joints - Use FixedJoint for the last connection
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.1]); // Keep length 1.1 for rope flexibility above
  // Replace SphericalJoint with FixedJoint
  const joint = useFixedJoint(j3, card, [
    // Anchor point on j3 body (local)
    [0, 0, 0, 1], 
    // Anchor point on card body (local), using the lower 0.45 position
    [0, badgeHeight * 0.45, 0, 1], 
  ]);

  // ... existing useEffects ...

  useFrame((state, delta) => {
    // Physics/Drag logic (keep existing)
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // REMOVED frame-based damping overrides for j3 and card
      
      const maxSpeed = 20, minSpeed = 5; // Use original speeds 
      
      // Smoothing for joints (include j3, FixedJoint provides stability)
      [j1, j2, j3].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.05, Math.min(0.5, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      // REMOVED the separate lerp logic for j3

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

      // REMOVED/COMMENTED card rotation stabilization as FixedJoint handles it
      /*
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ 
        x: ang.x * 0.9,
        y: ang.y - rot.y * 0.15, 
        z: ang.z * 0.9
      });
      */
      
      // Add general damping when not dragged (keep existing)
      if (!dragged) {
         const currentVel = card.current.linvel();
         if (Math.abs(currentVel.x) > 0.5 || Math.abs(currentVel.y) > 0.5) { 
           card.current.setLinvel({
             x: currentVel.x * 0.92, 
             y: currentVel.y * 0.92,
             z: currentVel.z * 0.92
           });
         }
      }
    }
  });

  // Apply specific segment props
  return (
    <div className="absolute top-[80px] left-[5%] w-[350px] h-[550px] z-30 pointer-events-auto"> 
      <Canvas
        shadows
        camera={{ position: [0, 0, 11], fov: 30 }} 
        dpr={[1, 1.5]}
      >
       {/* ... rest of Canvas content ... */}
      </Canvas>
    </div>
  );
};

// ... rest of the file ...