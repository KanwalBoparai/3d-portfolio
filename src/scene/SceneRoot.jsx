import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, SMAA } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useStore } from '../store'
import CyberHead from './CyberHead'
import NeuralCables from './NeuralCables'
import HoloNodes from './HoloNodes'
import CameraRig from './CameraRig'
import Particles from './Particles'
import EnvironmentFX from './EnvironmentFX'

function PostFX() {
  const isMobile = useStore((s) => s.isMobile)
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0004), [])

  useFrame(() => {
    // Chromatic aberration surges while flying through a cable
    const { fx } = useStore.getState()
    const k = 0.0006 + fx.ca * 0.004
    caOffset.set(k, k * 0.6)
  })

  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom
        mipmapBlur
        intensity={1.15}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.3}
        radius={0.8}
      />
      {!isMobile && (
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={caOffset} />
      )}
      {!isMobile && <Noise opacity={0.055} blendFunction={BlendFunction.OVERLAY} />}
      <Vignette eskil={false} offset={0.16} darkness={0.86} />
    </EffectComposer>
  )
}

export default function SceneRoot() {
  return (
    <>
      <color attach="background" args={['#02040a']} />
      <fog attach="fog" args={[new THREE.Color('#02040a'), 10, 42]} />
      <Suspense fallback={null}>
        <CyberHead />
        <NeuralCables />
        <HoloNodes />
        <Particles />
        <EnvironmentFX />
        <Preload all />
      </Suspense>
      <CameraRig />
      <PostFX />
    </>
  )
}
