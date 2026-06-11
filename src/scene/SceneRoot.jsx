import { Suspense } from 'react'
import * as THREE from 'three'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing'
import CyberHead from './CyberHead'
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
        <CyberHead />
        <NeuralCables />
        <HoloNodes />
        <Particles />
        <EnvironmentFX />
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
