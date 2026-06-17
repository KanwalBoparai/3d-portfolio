import { Suspense } from 'react'
import * as THREE from 'three'
import { Preload, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing'
import RobotAvatar from './RobotAvatar'
import HoloNodes from './HoloNodes'
import CameraRig from './CameraRig'
import Particles from './Particles'

export default function SceneRoot() {
  return (
    <>
      {/* Transparent canvas — the editorial wordmark/grid (DOM) shows behind. */}
      <fog attach="fog" args={[new THREE.Color('#0a0a0a'), 9, 30]} />
      <Suspense fallback={null}>
        <RobotAvatar />
        <HoloNodes />
        <Particles />
        {/* Procedural studio reflections for the PBR shell — neutral monochrome
            so the robot reads like the grayscale editorial subject. */}
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2.6} position={[0, 5, 4]} scale={[12, 6, 1]} color="#ffffff" />
          <Lightformer intensity={1.5} position={[-6, 2, 2]} rotation-y={Math.PI / 2.6} scale={[8, 4, 1]} color="#d8d8d8" />
          <Lightformer intensity={1.1} position={[6, 1, -2]} rotation-y={-Math.PI / 2.4} scale={[8, 5, 1]} color="#ff9a55" />
          <Lightformer intensity={0.7} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} color="#555555" />
        </Environment>
        <Preload all />
      </Suspense>
      <CameraRig />
      <EffectComposer multisampling={0}>
        <SMAA />
        {/* High threshold: only the >1 emissives glow (eyes, core, antenna, orbs) */}
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.82} luminanceSmoothing={0.16} radius={0.8} />
        <Vignette eskil={false} offset={0.2} darkness={0.62} />
      </EffectComposer>
    </>
  )
}
