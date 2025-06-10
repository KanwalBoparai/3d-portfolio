import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Trophy = ({ position, scale, color }) => {
  const trophyRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (trophyRef.current) {
      trophyRef.current.rotation.y = Math.sin(t * 0.6 + position[0]) * 0.2;
      trophyRef.current.position.y = position[1] + Math.sin(t * 0.9 + position[0]) * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.3}>
      <group ref={trophyRef} position={position} scale={scale}>
        {/* Trophy Base */}
        <mesh position={[0, -1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 1, 0.3, 8]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Trophy Stem */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color="#34495E" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Trophy Cup */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.4, 0.8, 16]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Trophy Handles */}
        <mesh position={[-0.7, 0.3, 0]} castShadow>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.7, 0.3, 0]} castShadow>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Trophy Top */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
};

const Medal = ({ position, scale, color }) => {
  const medalRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (medalRef.current) {
      medalRef.current.rotation.z = Math.sin(t * 1.2 + position[0]) * 0.3;
      medalRef.current.position.y = position[1] + Math.sin(t * 1.1 + position[1]) * 0.1;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.2}>
      <group ref={medalRef} position={position} scale={scale}>
        {/* Medal Ribbon */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[0.3, 1.5, 0.05]} />
          <meshStandardMaterial color="#E74C3C" metalness={0.2} roughness={0.8} />
        </mesh>
        
        {/* Medal Circle */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Medal Center */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
        </mesh>
        
        {/* Medal Star */}
        <mesh position={[0, 0, 0.08]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 5]} />
          <meshStandardMaterial color="#FFF" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const LeadershipScene = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 6], fov: 50 }}
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
        
        {/* Underwater Trophy Display Lighting */}
        <ambientLight intensity={0.3} color="#67E8F9" />
        <directionalLight
          position={[0, 15, 8]}
          intensity={0.9}
          color="#BAE6FD"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-4, 4, 4]} intensity={0.7} color="#FDE047" distance={20} decay={2} />
        <pointLight position={[4, 4, -4]} intensity={0.6} color="#A7F3D0" distance={18} decay={2} />
        <pointLight position={[0, 2, 4]} intensity={0.5} color="#0891B2" distance={15} decay={2} />
        <spotLight
          position={[0, 12, 0]}
          intensity={0.8}
          angle={0.5}
          penumbra={1.0}
          color="#7DD3FC"
          distance={30}
          decay={2}
          castShadow
        />
        <pointLight position={[0, 6, 0]} intensity={0.4} color="#FB7185" distance={12} decay={2} />
        <pointLight position={[3, 8, 3]} intensity={0.3} color="#14B8A6" distance={15} decay={2} />
        <pointLight position={[-3, 6, -3]} intensity={0.3} color="#67E8F9" distance={15} decay={2} />
        
        {/* Trophies */}
        <Trophy position={[-2.5, 0, 0]} scale={[0.8, 0.8, 0.8]} color="#FFD700" />
        <Trophy position={[2.5, 0, 0]} scale={[0.6, 0.6, 0.6]} color="#C0C0C0" />
        
        {/* Medals */}
        <Medal position={[-1, 1.5, 1]} scale={[0.7, 0.7, 0.7]} color="#FFD700" />
        <Medal position={[1, 1.5, 1]} scale={[0.6, 0.6, 0.6]} color="#CD7F32" />
        <Medal position={[0, 2, -1]} scale={[0.5, 0.5, 0.5]} color="#30D158" />
        
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default LeadershipScene;
