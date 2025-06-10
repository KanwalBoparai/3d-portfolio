import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Fish = ({ position, scale, color, speed = 1 }) => {
  const fishRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (fishRef.current) {
      // Swimming motion
      fishRef.current.position.x = position[0] + Math.sin(t * speed) * 2;
      fishRef.current.position.y = position[1] + Math.sin(t * speed * 0.7) * 0.5;
      fishRef.current.position.z = position[2] + Math.cos(t * speed * 0.5) * 1;
      
      // Fish rotation to follow swimming direction
      fishRef.current.rotation.y = Math.sin(t * speed) * 0.3;
      fishRef.current.rotation.z = Math.sin(t * speed * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={fishRef} position={position} scale={scale}>
        {/* Fish Body */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Fish Tail */}
        <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <coneGeometry args={[0.5, 0.8, 3]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Fish Fins */}
        <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <coneGeometry args={[0.2, 0.4, 3]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
        </mesh>
        <mesh position={[0.3, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <coneGeometry args={[0.2, 0.4, 3]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Fish Eyes */}
        <mesh position={[0.5, 0.3, 0.3]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0.5, 0.3, -0.3]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </Float>
  );
};

const Bubble = ({ position, scale }) => {
  const bubbleRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bubbleRef.current) {
      bubbleRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.5 + t * 0.5;
      bubbleRef.current.position.x = position[0] + Math.sin(t * 1.5) * 0.2;
      
      // Reset bubble position when it goes too high
      if (bubbleRef.current.position.y > 5) {
        bubbleRef.current.position.y = -3;
      }
    }
  });

  return (
    <mesh ref={bubbleRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial 
        color="#87CEEB" 
        transparent 
        opacity={0.6} 
        metalness={0.1} 
        roughness={0.1} 
      />
    </mesh>
  );
};

const Seaweed = ({ position, scale, color }) => {
  const seaweedRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (seaweedRef.current) {
      seaweedRef.current.rotation.z = Math.sin(t * 0.8 + position[0]) * 0.2;
    }
  });

  return (
    <group ref={seaweedRef} position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.9} />
      </mesh>
    </group>
  );
};

const AquaticScene = () => {
  const fish = [
    { position: [2, 1, 0], color: "#FF6B6B", speed: 0.8, scale: [0.8, 0.8, 0.8] },
    { position: [-2, -0.5, 1], color: "#4ECDC4", speed: 1.2, scale: [0.6, 0.6, 0.6] },
    { position: [0, 0.5, -1], color: "#45B7D1", speed: 1.0, scale: [0.7, 0.7, 0.7] },
    { position: [1.5, -1, 0.5], color: "#96CEB4", speed: 0.9, scale: [0.5, 0.5, 0.5] },
  ];

  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    position: [Math.random() * 4 - 2, Math.random() * 2 - 3, Math.random() * 2 - 1],
    scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5]
  }));

  const seaweeds = [
    { position: [-3, -2, 0], color: "#2E8B57", scale: [1, 1, 1] },
    { position: [3, -2, -0.5], color: "#228B22", scale: [0.8, 0.8, 0.8] },
    { position: [0, -2, 1], color: "#32CD32", scale: [1.2, 1.2, 1.2] },
  ];

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45 }}
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
        
        {/* Deep Ocean Aquarium Lighting */}
        <ambientLight intensity={0.4} color="#67E8F9" />
        <directionalLight
          position={[0, 10, 6]}
          intensity={0.8}
          color="#BAE6FD"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-4, 3, 4]} intensity={0.6} color="#0891B2" distance={20} decay={2} />
        <pointLight position={[4, 3, -4]} intensity={0.5} color="#14B8A6" distance={18} decay={2} />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#7DD3FC" distance={15} decay={2} />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.7}
          angle={0.7}
          penumbra={1.0}
          color="#A7F3D0"
          distance={25}
          decay={2}
          castShadow
        />
        <pointLight position={[0, -1, 0]} intensity={0.3} color="#FB7185" distance={12} decay={2} />
        <pointLight position={[3, 6, 3]} intensity={0.3} color="#67E8F9" distance={15} decay={2} />
        <pointLight position={[-3, 4, -3]} intensity={0.3} color="#A7F3D0" distance={15} decay={2} />
        
        {/* Fish */}
        {fish.map((fishData, index) => (
          <Fish
            key={`fish-${index}`}
            position={fishData.position}
            color={fishData.color}
            speed={fishData.speed}
            scale={fishData.scale}
          />
        ))}
        
        {/* Bubbles */}
        {bubbles.map((bubble, index) => (
          <Bubble
            key={`bubble-${index}`}
            position={bubble.position}
            scale={bubble.scale}
          />
        ))}
        
        {/* Seaweed */}
        {seaweeds.map((seaweed, index) => (
          <Seaweed
            key={`seaweed-${index}`}
            position={seaweed.position}
            color={seaweed.color}
            scale={seaweed.scale}
          />
        ))}
        
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AquaticScene;
