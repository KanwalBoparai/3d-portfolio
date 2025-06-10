import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Robot = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const antennaRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Main body floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.2;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }

    // Head rotation
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.3;
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.1;
    }

    // Arms movement
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.2 + 0.3;
      leftArmRef.current.rotation.x = Math.sin(t * 1.8) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 1.5 + Math.PI) * 0.2 - 0.3;
      rightArmRef.current.rotation.x = Math.sin(t * 1.8 + Math.PI) * 0.1;
    }

    // Eyes blinking effect
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blinkIntensity = Math.max(0.3, Math.sin(t * 3) * 0.5 + 0.5);
      eyeLeftRef.current.material.emissiveIntensity = blinkIntensity;
      eyeRightRef.current.material.emissiveIntensity = blinkIntensity;
    }

    // Antenna pulsing
    if (antennaRef.current) {
      const pulseIntensity = Math.sin(t * 4) * 0.3 + 0.8;
      antennaRef.current.material.emissiveIntensity = pulseIntensity;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Robot Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.8, 0.8]} />
          <meshStandardMaterial color="#0A84FF" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Robot Head */}
        <mesh ref={headRef} position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#5E5CE6" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.2, 1.3, 0.41]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#30D158" emissive="#30D158" emissiveIntensity={0.5} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.2, 1.3, 0.41]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#30D158" emissive="#30D158" emissiveIntensity={0.5} />
        </mesh>

        {/* Left Arm */}
        <mesh ref={leftArmRef} position={[-0.8, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#44598C" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef} position={[0.8, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#44598C" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Left Leg */}
        <mesh position={[-0.3, -1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#174E4F" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Right Leg */}
        <mesh position={[0.3, -1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#174E4F" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Chest Panel */}
        <mesh position={[0, 0.2, 0.41]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#C8D5B9" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#FF375F" emissive="#FF375F" emissiveIntensity={0.3} />
        </mesh>

        {/* Antenna Tip */}
        <mesh ref={antennaRef} position={[0, 2.1, 0]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FF375F" emissive="#FF375F" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const RobotCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{
        position: window.innerWidth < 768 ? [6, 2, 6] : [4, 2, 5],
        fov: window.innerWidth < 768 ? 60 : 50
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

        {/* Underwater Aquarium Lighting Setup */}
        <ambientLight intensity={0.4} color="#67E8F9" />
        <directionalLight
          position={[0, 15, 8]}
          intensity={1.2}
          color="#BAE6FD"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-6, 3, 6]} intensity={0.8} color="#0891B2" distance={20} decay={2} />
        <pointLight position={[6, 3, -6]} intensity={0.6} color="#14B8A6" distance={18} decay={2} />
        <pointLight position={[0, -2, 8]} intensity={0.5} color="#A7F3D0" distance={15} decay={2} />
        <spotLight
          position={[0, 12, 0]}
          intensity={0.8}
          angle={0.5}
          penumbra={1.0}
          color="#7DD3FC"
          distance={25}
          decay={2}
          castShadow
        />
        <pointLight position={[0, 0, 0]} intensity={0.4} color="#FB7185" distance={12} decay={2} />

        {/* Underwater caustic light effect */}
        <pointLight position={[3, 8, 3]} intensity={0.3} color="#67E8F9" distance={15} decay={2} />
        <pointLight position={[-3, 6, -3]} intensity={0.3} color="#A7F3D0" distance={15} decay={2} />

        <Robot />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default RobotCanvas;
