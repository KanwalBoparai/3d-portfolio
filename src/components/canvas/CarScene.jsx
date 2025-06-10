import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Car = () => {
  const carGroupRef = useRef();
  const frontWheelLeftRef = useRef();
  const frontWheelRightRef = useRef();
  const backWheelLeftRef = useRef();
  const backWheelRightRef = useRef();
  const headlightLeftRef = useRef();
  const headlightRightRef = useRef();
  const orbitalRadius = 4;
  const orbitalSpeed = 0.3;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth orbital motion around center point
    if (carGroupRef.current) {
      // Circular path with consistent speed
      const angle = t * orbitalSpeed;
      const x = Math.cos(angle) * orbitalRadius;
      const z = Math.sin(angle) * orbitalRadius;

      // Gentle elevation changes - slower and more elegant
      const y = Math.sin(t * 0.4) * 0.3 + Math.cos(t * 0.2) * 0.15;

      carGroupRef.current.position.x = x;
      carGroupRef.current.position.z = z;
      carGroupRef.current.position.y = y;

      // Car always faces direction of travel (tangent to circle)
      carGroupRef.current.rotation.y = angle + Math.PI / 2;

      // Subtle banking into turns for realism
      carGroupRef.current.rotation.z = Math.sin(angle) * 0.05;
    }

    // Realistic wheel rotation based on actual movement speed
    const wheelRotationSpeed = orbitalSpeed * orbitalRadius;
    const wheelRotation = t * wheelRotationSpeed * 2;
    if (frontWheelLeftRef.current) frontWheelLeftRef.current.rotation.x = wheelRotation;
    if (frontWheelRightRef.current) frontWheelRightRef.current.rotation.x = wheelRotation;
    if (backWheelLeftRef.current) backWheelLeftRef.current.rotation.x = wheelRotation;
    if (backWheelRightRef.current) backWheelRightRef.current.rotation.x = wheelRotation;

    // Subtle, elegant headlight pulsing
    if (headlightLeftRef.current && headlightRightRef.current) {
      const intensity = Math.sin(t * 1.2) * 0.15 + 0.85;
      headlightLeftRef.current.material.emissiveIntensity = intensity;
      headlightRightRef.current.material.emissiveIntensity = intensity;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={carGroupRef} position={[0, 0, 0]}>
        {/* Car Body - Main */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.8, 1.5]} />
          <meshStandardMaterial
            color="#0A84FF"
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Car Body - Cabin */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.8, 1.3]} />
          <meshStandardMaterial
            color="#5E5CE6"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Car Hood */}
        <mesh position={[1.2, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.3, 1.5]} />
          <meshStandardMaterial
            color="#0A84FF"
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Car Trunk */}
        <mesh position={[-1.2, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.3, 1.5]} />
          <meshStandardMaterial
            color="#0A84FF"
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Windshield */}
        <mesh position={[0.5, 1.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 1.25]} />
          <meshStandardMaterial
            color="#E6F3FF"
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>

        {/* Rear Window */}
        <mesh position={[-0.5, 1.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 1.25]} />
          <meshStandardMaterial
            color="#E6F3FF"
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Front Wheels */}
        <mesh ref={frontWheelLeftRef} position={[1, -0.2, 0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh ref={frontWheelRightRef} position={[1, -0.2, -0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Back Wheels */}
        <mesh ref={backWheelLeftRef} position={[-1, -0.2, 0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh ref={backWheelRightRef} position={[-1, -0.2, -0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial
            color="#1A1A1A"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        
        {/* Wheel Rims */}
        <mesh position={[1, -0.2, 0.9]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial
            color="#E8E8E8"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        <mesh position={[1, -0.2, -0.9]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial
            color="#E8E8E8"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        <mesh position={[-1, -0.2, 0.9]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial
            color="#E8E8E8"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        <mesh position={[-1, -0.2, -0.9]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial
            color="#E8E8E8"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Headlights */}
        <mesh ref={headlightLeftRef} position={[1.6, 0.5, 0.5]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.7} />
        </mesh>
        <mesh ref={headlightRightRef} position={[1.6, 0.5, -0.5]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.7} />
        </mesh>
        
        {/* Taillights */}
        <mesh position={[-1.6, 0.5, 0.5]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-1.6, 0.5, -0.5]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Side Mirrors */}
        <mesh position={[0.8, 1.4, 1]} castShadow>
          <boxGeometry args={[0.1, 0.1, 0.2]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.8, 1.4, -1]} castShadow>
          <boxGeometry args={[0.1, 0.1, 0.2]} />
          <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Roof Details */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 1]} />
          <meshStandardMaterial color="#30D158" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

const CarScene = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{
        position: [10, 6, 10],
        fov: 40,
        near: 0.1,
        far: 100
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        shadowMap: {
          enabled: true,
          type: 2 // PCFSoftShadowMap
        }
      }}
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
        <ambientLight intensity={0.3} color="#67E8F9" />

        {/* Filtered sunlight from above */}
        <directionalLight
          position={[0, 20, 5]}
          intensity={1.0}
          color="#BAE6FD"
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
        />

        {/* Aquarium side lighting */}
        <pointLight
          position={[-8, 8, 6]}
          intensity={0.8}
          color="#0891B2"
          distance={25}
          decay={2}
        />

        {/* Coral reef glow */}
        <pointLight
          position={[8, 6, -6]}
          intensity={0.6}
          color="#FB7185"
          distance={20}
          decay={2}
        />

        {/* Sea foam lighting */}
        <spotLight
          position={[0, 20, 0]}
          intensity={0.7}
          angle={0.5}
          penumbra={1.0}
          color="#A7F3D0"
          distance={30}
          decay={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Underwater ambient glow */}
        <pointLight
          position={[0, 3, 0]}
          intensity={0.4}
          color="#14B8A6"
          distance={15}
          decay={2}
        />

        {/* Moving caustic effects */}
        <pointLight
          position={[5, 12, 5]}
          intensity={0.3}
          color="#7DD3FC"
          distance={20}
          decay={2}
        />
        <pointLight
          position={[-5, 10, -5]}
          intensity={0.3}
          color="#67E8F9"
          distance={20}
          decay={2}
        />
        
        {/* Ocean Floor */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            color="#083344"
            metalness={0.1}
            roughness={0.9}
            envMapIntensity={0.2}
          />
        </mesh>

        {/* Sandy circular area under car path */}
        <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[3, 5, 32]} />
          <meshStandardMaterial
            color="#164E63"
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Coral reef decorations */}
        <mesh position={[8, -0.5, 8]} receiveShadow>
          <coneGeometry args={[0.5, 1.5, 8]} />
          <meshStandardMaterial
            color="#FB7185"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[-8, -0.3, -8]} receiveShadow>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshStandardMaterial
            color="#A7F3D0"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        
        <Car />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default CarScene;
