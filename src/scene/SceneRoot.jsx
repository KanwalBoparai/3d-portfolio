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
      <color attach="background" args={['#f4efe6']} />
      <fog attach="fog" args={[new THREE.Color('#efe9dc'), 12, 38]} />
      <Suspense fallback={null}>
        <RobotHead />
        <NeuralCables />
        <HoloNodes />
        <Particles />
        <EnvironmentFX />
        {/* Procedural studio reflections for the PBR ceramic/gold — no network assets */}
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={1.8} position={[0, 5, 4]} scale={[12, 6, 1]} color="#fff6e4" />
          <Lightformer intensity={1.0} position={[-6, 2, 2]} rotation-y={Math.PI / 2.6} scale={[8, 4, 1]} color="#ffffff" />
          <Lightformer intensity={1.3} position={[6, 1, -2]} rotation-y={-Math.PI / 2.4} scale={[8, 5, 1]} color="#ffdfae" />
          <Lightformer intensity={0.5} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} color="#f4e9d2" />
        </Environment>
        <Preload all />
      </Suspense>
      <CameraRig />
      <EffectComposer multisampling={0}>
        <SMAA />
        {/* High threshold: only >1 emissives glow (eyes, wire packets, orbs, brain) */}
        <Bloom mipmapBlur intensity={0.75} luminanceThreshold={1.0} luminanceSmoothing={0.12} radius={0.72} />
        <Vignette eskil={false} offset={0.28} darkness={0.32} />
      </EffectComposer>
    </>
  )
}
