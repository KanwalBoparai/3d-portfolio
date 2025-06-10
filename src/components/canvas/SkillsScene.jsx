import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text, Float } from "@react-three/drei";
import { MotionConfig } from "framer-motion";

import CanvasLoader from "../Loader";

const SkillModel = ({ position, rotation, scale, name, color }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) / 8;
    groupRef.current.position.y = Math.sin(t / 2) / 10;
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.8} />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Float>
    </group>
  );
};

const SkillsScene = () => {
  const skills = [
    { name: "React", position: [-4, 0, 0], color: "#61DAFB" },
    { name: "Node.js", position: [-1.5, 0, 0], color: "#68A063" },
    { name: "TypeScript", position: [1.5, 0, 0], color: "#3178C6" },
    { name: "Three.js", position: [4, 0, 0], color: "#000000" },
  ];

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <MotionConfig transition={{ duration: 0.5 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          {skills.map((skill, index) => (
            <SkillModel
              key={index}
              name={skill.name}
              position={skill.position}
              rotation={[0, 0, 0]}
              scale={[0.8, 0.8, 0.8]}
              color={skill.color}
            />
          ))}
        </Suspense>
        <Preload all />
      </MotionConfig>
    </Canvas>
  );
};

export default SkillsScene;