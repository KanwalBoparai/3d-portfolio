import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

const DENSE_STARS   = random.inSphere(new Float32Array(6000 * 3), { radius: 1.6 });
const BLUE_STARS    = random.inSphere(new Float32Array(2500 * 3), { radius: 1.3 });
const BRIGHT_STARS  = random.inSphere(new Float32Array(600  * 3), { radius: 1.1 });
const NEBULA_HAZE   = random.inSphere(new Float32Array(1200 * 3), { radius: 1.9 });

const StarField = () => {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x -= delta / 22;
    groupRef.current.rotation.y -= delta / 35;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={DENSE_STARS} stride={3} frustumCulled>
        <PointMaterial
          transparent color="#E8F4FD" size={0.0009}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={BLUE_STARS} stride={3} frustumCulled>
        <PointMaterial
          transparent color="#93C5FD" size={0.0014}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={BRIGHT_STARS} stride={3} frustumCulled>
        <PointMaterial
          transparent color="#FEF3C7" size={0.003}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={NEBULA_HAZE} stride={3} frustumCulled>
        <PointMaterial
          transparent color="#C4B5FD" size={0.0007}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <StarField />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.85}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              offset={[0.0004, 0.0004]}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise opacity={0.03} blendFunction={BlendFunction.ADD} />
            <Vignette offset={0.12} darkness={0.65} />
          </EffectComposer>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
