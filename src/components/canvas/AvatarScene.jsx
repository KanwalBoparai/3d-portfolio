import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  ContactShadows,
  PresentationControls,
  Float,
  Preload,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const AVATAR_URL = `${import.meta.env.BASE_URL}models/avatar.glb`;

const AvatarModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(AVATAR_URL);
  const { actions, names } = useAnimations(animations, group);

  // Enable shadow casting on all meshes
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.envMapIntensity = 0.9;
        }
      }
    });
  }, [scene]);

  // Play idle animation
  useEffect(() => {
    if (!names || names.length === 0) return;
    const idle = actions["Idle"] || actions[names[0]];
    if (idle) {
      idle.reset().fadeIn(0.6).play();
    }
    return () => {
      if (idle) idle.fadeOut(0.6);
    };
  }, [actions, names]);

  // Gentle continuous rotation for visual interest
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.PI + Math.sin(t * 0.3) * 0.18;
  });

  return (
    <group
      ref={group}
      position={[0, -2.4, 0]}
      scale={1.6}
      rotation={[0, Math.PI, 0]}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
};

const AvatarScene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 3.6], fov: 32, near: 0.1, far: 50 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Cinematic three-point lighting */}
        <Environment preset="studio" background={false} />

        <ambientLight intensity={0.35} color="#FFFAEF" />

        {/* Key light — warm signal orange tint from front-right */}
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.6}
          color="#FFE8D5"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0002}
        />

        {/* Rim light — cool cobalt from back-left */}
        <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#A8C5FF" />

        {/* Subtle accent — signal orange from below */}
        <pointLight position={[0, -1, 2]} intensity={0.4} color="#EB4E1A" distance={5} decay={2} />

        {/* Fill bounce */}
        <hemisphereLight intensity={0.25} color="#FAF5EA" groundColor="#EDE6D7" />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.25, 0.15]}
          azimuth={[-0.5, 0.5]}
          config={{ mass: 2, tension: 220 }}
          snap={{ mass: 4, tension: 220 }}
        >
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
            <AvatarModel />
          </Float>
        </PresentationControls>

        {/* Soft contact shadow — grounds the avatar on cream paper */}
        <ContactShadows
          position={[0, -2.42, 0]}
          opacity={0.55}
          blur={2.6}
          far={3}
          resolution={1024}
          color="#0A0908"
        />

        {/* Cinematic post-processing */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.18}
            luminanceThreshold={0.92}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0003, 0.0003]}
            blendFunction={BlendFunction.NORMAL}
          />
          <Vignette offset={0.25} darkness={0.55} />
        </EffectComposer>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload(AVATAR_URL);

export default AvatarScene;
