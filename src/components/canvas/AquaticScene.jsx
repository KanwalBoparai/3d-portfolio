import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// A small planet/moon with a glowing atmosphere
const Planet = ({ position, radius, color, emissive, orbitSpeed = 0, orbitRadius = 0 }) => {
  const planetRef = useRef();
  const originRef = useRef({ ...position });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current && orbitRadius > 0) {
      planetRef.current.position.x = originRef.current[0] + Math.cos(t * orbitSpeed) * orbitRadius;
      planetRef.current.position.z = originRef.current[2] + Math.sin(t * orbitSpeed) * orbitRadius;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={planetRef} position={position}>
        {/* Core */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.15}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
        {/* Atmosphere glow */}
        <mesh>
          <sphereGeometry args={[radius * 1.18, 32, 32]} />
          <meshStandardMaterial
            color={emissive}
            transparent
            opacity={0.06}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Tumbling asteroid
const Asteroid = ({ position, scale, color }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x += 0.006;
      ref.current.rotation.y += 0.004;
      ref.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.25;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.9} />
    </mesh>
  );
};

// Orbiting ring particle
const OrbitRing = ({ radius, color, speed }) => {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

const AquaticScene = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 9], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Space lighting */}
        <ambientLight intensity={0.2} color="#C4B5FD" />
        <directionalLight position={[5, 12, 8]} intensity={1.0} color="#93C5FD" castShadow />
        <pointLight position={[-5, 5, 4]}  intensity={0.7} color="#4A9EFF"  distance={22} decay={2} />
        <pointLight position={[5, 3, -4]}  intensity={0.5} color="#8B5CF6"  distance={20} decay={2} />
        <pointLight position={[0, 8, 0]}   intensity={0.4} color="#00D4AA"  distance={18} decay={2} />
        <pointLight position={[0, -2, 5]}  intensity={0.3} color="#FEF3C7"  distance={14} decay={2} />

        {/* Orbiting rings */}
        <OrbitRing radius={2.5} color="#4A9EFF" speed={0.18} />
        <OrbitRing radius={3.8} color="#8B5CF6" speed={-0.12} />

        {/* Central planet */}
        <Planet
          position={[0, 0, 0]}
          radius={0.9}
          color="#1A2A5E"
          emissive="#4A9EFF"
        />

        {/* Orbiting moons */}
        <Planet
          position={[2.5, 0.5, 0]}
          radius={0.35}
          color="#2D1F6E"
          emissive="#8B5CF6"
          orbitSpeed={0.4}
          orbitRadius={0.3}
        />
        <Planet
          position={[-2.2, -0.3, 0.8]}
          radius={0.25}
          color="#1A3A2A"
          emissive="#00D4AA"
          orbitSpeed={0.55}
          orbitRadius={0.2}
        />

        {/* Asteroids */}
        <Asteroid position={[-3.5, 1, -0.5]} scale={[0.5, 0.5, 0.5]} color="#1A2540" />
        <Asteroid position={[3.2, -0.8, 1]}  scale={[0.4, 0.4, 0.4]} color="#0F1A30" />
        <Asteroid position={[0.5, 2, -2]}    scale={[0.3, 0.3, 0.3]} color="#1C2A40" />
        <Asteroid position={[-1.5, -1.5, 1.5]} scale={[0.35, 0.35, 0.35]} color="#16213A" />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AquaticScene;
