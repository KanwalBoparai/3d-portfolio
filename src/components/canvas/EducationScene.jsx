import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Book = ({ position, rotation, scale, color, title }) => {
  const bookRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(t * 0.5 + position[0]) * 0.1;
      bookRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={bookRef} position={position} rotation={rotation} scale={scale}>
        {/* Book Cover */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 2, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Book Pages */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[1.4, 1.9, 0.15]} />
          <meshStandardMaterial color="#f8f8f8" metalness={0.1} roughness={0.9} />
        </mesh>
        
        {/* Book Spine */}
        <mesh position={[-0.75, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 2, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
        </mesh>
        
        {/* Book Title */}
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {title}
        </Text>
      </group>
    </Float>
  );
};

const EducationScene = () => {
  const books = [
    { 
      title: "Algorithms & Data Structures", 
      position: [-3, 0, 0], 
      color: "#0A84FF",
      rotation: [0, 0.2, 0]
    },
    { 
      title: "Linear Algebra", 
      position: [-1, 0.5, -1], 
      color: "#5E5CE6",
      rotation: [0, -0.3, 0]
    },
    { 
      title: "Machine Learning", 
      position: [1, -0.3, 0.5], 
      color: "#30D158",
      rotation: [0, 0.4, 0]
    },
    { 
      title: "Database Systems", 
      position: [3, 0.2, -0.5], 
      color: "#FF375F",
      rotation: [0, -0.2, 0]
    },
    { 
      title: "Statistics", 
      position: [0, 1, 1], 
      color: "#44598C",
      rotation: [0, 0.1, 0]
    },
  ];

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 8], fov: 45 }}
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
        
        {/* Space library lighting */}
        <ambientLight intensity={0.3} color="#C4B5FD" />
        <directionalLight
          position={[0, 12, 8]}
          intensity={0.9}
          color="#93C5FD"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-6, 4, 6]}  intensity={0.6} color="#4A9EFF" distance={20} decay={2} />
        <pointLight position={[6, 4, -6]}  intensity={0.5} color="#8B5CF6" distance={18} decay={2} />
        <pointLight position={[0, 6, 0]}   intensity={0.4} color="#00D4AA" distance={15} decay={2} />
        <spotLight
          position={[0, 12, 0]}
          intensity={0.5}
          angle={0.6}
          penumbra={1.0}
          color="#93C5FD"
          distance={25}
          decay={2}
          castShadow
        />
        <pointLight position={[3, 8, 3]}   intensity={0.25} color="#FEF3C7" distance={12} decay={2} />
        <pointLight position={[-3, 6, -3]} intensity={0.25} color="#C4B5FD" distance={12} decay={2} />
        
        {books.map((book, index) => (
          <Book
            key={index}
            title={book.title}
            position={book.position}
            rotation={book.rotation}
            scale={[0.6, 0.6, 0.6]}
            color={book.color}
          />
        ))}
        
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EducationScene;
