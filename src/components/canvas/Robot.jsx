import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Robot = () => {
  const groupRef    = useRef();
  const headRef     = useRef();
  const leftArmRef  = useRef();
  const rightArmRef = useRef();
  const eyeLeftRef  = useRef();
  const eyeRightRef = useRef();
  const antennaRef  = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.18;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.28;
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.09;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.2 + 0.3;
      leftArmRef.current.rotation.x = Math.sin(t * 1.8) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 1.5 + Math.PI) * 0.2 - 0.3;
      rightArmRef.current.rotation.x = Math.sin(t * 1.8 + Math.PI) * 0.1;
    }
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.max(0.3, Math.sin(t * 3) * 0.5 + 0.5);
      eyeLeftRef.current.material.emissiveIntensity  = blink;
      eyeRightRef.current.material.emissiveIntensity = blink;
    }
    if (antennaRef.current) {
      antennaRef.current.material.emissiveIntensity = Math.sin(t * 4) * 0.3 + 0.8;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.8, 0.8]} />
          <meshStandardMaterial color="#1E3A6E" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Head */}
        <mesh ref={headRef} position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#2D1F6E" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Eye L */}
        <mesh ref={eyeLeftRef} position={[-0.2, 1.3, 0.41]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#4A9EFF" emissive="#4A9EFF" emissiveIntensity={0.6} />
        </mesh>
        {/* Eye R */}
        <mesh ref={eyeRightRef} position={[0.2, 1.3, 0.41]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#4A9EFF" emissive="#4A9EFF" emissiveIntensity={0.6} />
        </mesh>

        {/* Left arm */}
        <mesh ref={leftArmRef} position={[-0.8, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#1A2A4A" metalness={0.75} roughness={0.25} />
        </mesh>
        {/* Right arm */}
        <mesh ref={rightArmRef} position={[0.8, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#1A2A4A" metalness={0.75} roughness={0.25} />
        </mesh>

        {/* Left leg */}
        <mesh position={[-0.3, -1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0F1E3A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.3, -1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0F1E3A" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Chest panel */}
        <mesh position={[0, 0.2, 0.41]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#0D2040" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Antenna pole */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.4} />
        </mesh>
        {/* Antenna tip */}
        <mesh ref={antennaRef} position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
};

const RobotCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{
        position: window.innerWidth < 768 ? [6, 2, 6] : [4, 2, 5],
        fov:      window.innerWidth < 768 ? 60 : 50,
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Space lighting setup */}
        <ambientLight intensity={0.25} color="#C4B5FD" />

        {/* Primary key light — cool blue from above-front */}
        <directionalLight
          position={[0, 10, 8]}
          intensity={1.4}
          color="#93C5FD"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Nebula purple fill from the side */}
        <pointLight position={[-6, 3, 4]} intensity={0.7} color="#8B5CF6" distance={22} decay={2} />

        {/* Teal rim light from behind */}
        <pointLight position={[0, 0, -8]} intensity={0.5} color="#00D4AA" distance={18} decay={2} />

        {/* Subtle star-blue bounce from below */}
        <pointLight position={[0, -4, 6]} intensity={0.3} color="#4A9EFF" distance={14} decay={2} />

        <Robot />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default RobotCanvas;
