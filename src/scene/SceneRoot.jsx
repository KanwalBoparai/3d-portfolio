import { Suspense } from 'react'
import * as THREE from 'three'
import { Preload, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing'
import RobotHead from './RobotHead'
import NeuralCables from './NeuralCables'
import HoloNodes from './HoloNodes'
import CameraRig from './CameraRig'
import Particles from './Particles'
import EnvironmentFX from './EnvironmentFX'

export default function SceneRoot() {
  return (
    <>
      <color attach="background" args={['#071116']} />
      <fog attach="fog" args={[new THREE.Color('#071116'), 9, 30]} />
      <Suspense fallback={null}>
        <RobotHead />
        <NeuralCables />
        <HoloNodes />
        <Particles />
        <EnvironmentFX />
        {/* Procedural studio reflections for the PBR ceramic/gold — no network assets */}
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2.4} position={[0, 5, 4]} scale={[12, 6, 1]} color="#c7f7ff" />
          <Lightformer intensity={1.4} position={[-6, 2, 2]} rotation-y={Math.PI / 2.6} scale={[8, 4, 1]} color="#ffffff" />
          <Lightformer intensity={1.8} position={[6, 1, -2]} rotation-y={-Math.PI / 2.4} scale={[8, 5, 1]} color="#ffcf74" />
          <Lightformer intensity={0.7} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} color="#2fe6c8" />
        </Environment>
        <Preload all />
      </Suspense>
      <CameraRig />
      <EffectComposer multisampling={0}>
        <SMAA />
        {/* High threshold: only >1 emissives glow (eyes, wire packets, orbs, brain) */}
        <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.86} luminanceSmoothing={0.16} radius={0.78} />
        <Vignette eskil={false} offset={0.22} darkness={0.55} />
      </EffectComposer>
    </>
  )
}
