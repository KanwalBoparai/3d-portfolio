import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { makeGold } from './materials'

// Floating gold halo above the crown — a wide brushed ring, a thin luminous
// band, and a counter-rotating inner ring.
export default function Halo({ position }) {
  const groupRef = useRef()
  const innerRef = useRef()

  const gold = useMemo(() => makeGold({ roughness: 0.3 }), [])
  const lume = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color(1.45, 1.1, 0.5), toneMapped: false }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const g = groupRef.current
    if (g) {
      g.rotation.y += delta * 0.18
      g.position.y = position[1] + Math.sin(t * 0.6) * 0.09
      g.rotation.z = Math.sin(t * 0.3) * 0.045
    }
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.42
  })

  return (
    <group ref={groupRef} position={position} rotation={[0.12, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.045, 14, 96]} />
        <primitive object={gold} attach="material" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <torusGeometry args={[1.85, 0.008, 6, 96]} />
        <primitive object={lume} attach="material" />
      </mesh>
      <group ref={innerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.02, 10, 72]} />
          <primitive object={gold} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
