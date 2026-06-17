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
      <color attach="background" args={['#05090d']} />
      <fog attach="fog" args={[new THREE.Color('#05090d'), 9, 30]} />
      <Suspense fallback={null}>
        <RobotAvatar />
        <HoloNodes />
        <Particles />
        {/* Procedural studio reflections for the PBR shell — no network assets.
            Cool/cyan-weighted for the cinematic dark look. */}
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2.6} position={[0, 5, 4]} scale={[12, 6, 1]} color="#c7f7ff" />
          <Lightformer intensity={1.5} position={[-6, 2, 2]} rotation-y={Math.PI / 2.6} scale={[8, 4, 1]} color="#9fd8ff" />
          <Lightformer intensity={1.2} position={[6, 1, -2]} rotation-y={-Math.PI / 2.4} scale={[8, 5, 1]} color="#4f7f99" />
          <Lightformer intensity={0.8} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} color="#2fe6c8" />
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
