import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, RoundedBox } from '@react-three/drei'
import { useStore } from '../store'
import { HEAD_POS } from './lib'

// ─────────────────────────────────────────────────────────────────────────────
// RobotAvatar — the living hero centerpiece.
//
//  • Drops in a premium robot: put a Draco-compressed GLB at
//    public/models/robot.glb and it takes over automatically (decoders are
//    served locally from public/draco/, so the build stays offline-safe).
//  • No file?  A clean procedural droid renders instead — the scene is never
//    blank, and this doubles as the lightweight mobile / static fallback bot.
//  • Alive: idle float + breathing, head/eyes track the cursor, drag to rotate,
//    and a cyan glow-pulse surges on hover / click (shared via store.fx.pulse,
//    so the bloom pass and section nodes react to the same energy value).
// ─────────────────────────────────────────────────────────────────────────────

const ROBOT_URL = `${import.meta.env.BASE_URL}models/robot.glb`
const DRACO_PATH = `${import.meta.env.BASE_URL}draco/`
const BOT_SCALE = 0.92
const BASE_Y = HEAD_POS[1] + 0.18

const ACCENT = new THREE.Color('#76e5ff') // holographic cyan
const CERAMIC = '#eef4f6' // warm-cool white shell
const CHROME = '#9fb3bb' // brushed metal trim
const VISOR = '#070b0e' // glossy black visor glass

// Probe for the optional GLB without throwing a 404 through Suspense — mirrors
// the project's existing useHeroPhoto() drop-in convention.
function useRobotSource() {
  const [src, setSrc] = useState('checking')
  useEffect(() => {
    let alive = true
    fetch(ROBOT_URL, { method: 'HEAD' })
      .then((r) => alive && setSrc(r.ok ? 'gltf' : 'procedural'))
      .catch(() => alive && setSrc('procedural'))
    return () => {
      alive = false
    }
  }, [])
  return src
}

function GltfRobot() {
  // Second arg = local Draco decoder path (offline, no gstatic CDN call).
  const { scene } = useGLTF(ROBOT_URL, DRACO_PATH)
  const cloned = useMemo(() => scene.clone(true), [scene])
  return <primitive object={cloned} />
}

// A restrained, Apple-meets-sci-fi droid built from primitives. Emissive cyan
// elements are toneMapped={false} so they punch past the bloom threshold (>1)
// and read as self-lit holographic light.
function ProceduralRobot({ glowRef }) {
  const eyeL = useRef()
  const eyeR = useRef()
  const core = useRef()
  const visorRim = useRef()

  useFrame(() => {
    const g = glowRef.current
    if (!g) return
    const eye = 1.6 + g * 4.2
    if (eyeL.current) eyeL.current.material.emissiveIntensity = eye
    if (eyeR.current) eyeR.current.material.emissiveIntensity = eye
    if (visorRim.current) visorRim.current.material.emissiveIntensity = 0.8 + g * 2.6
    if (core.current) core.current.material.emissiveIntensity = 1.2 + g * 5.0
  })

  return (
    <group>
      {/* ── Head ── */}
      <group position={[0, 0.62, 0]}>
        {/* Ceramic cranium */}
        <RoundedBox args={[0.96, 0.84, 0.86]} radius={0.2} smoothness={6} castShadow>
          <meshStandardMaterial color={CERAMIC} metalness={0.18} roughness={0.32} />
        </RoundedBox>

        {/* Glossy visor band */}
        <group position={[0, 0.02, 0.4]}>
          <RoundedBox args={[0.82, 0.34, 0.16]} radius={0.1} smoothness={5} position={[0, 0, 0.02]}>
            <meshStandardMaterial color={VISOR} metalness={0.85} roughness={0.12} />
          </RoundedBox>
          {/* Emissive rim around the visor */}
          <mesh ref={visorRim} position={[0, 0, 0.11]}>
            <torusGeometry args={[0.4, 0.012, 12, 64]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.1}
              toneMapped={false}
            />
          </mesh>
          {/* Eyes */}
          <mesh ref={eyeL} position={[-0.18, 0, 0.12]}>
            <capsuleGeometry args={[0.045, 0.1, 6, 16]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
          <mesh ref={eyeR} position={[0.18, 0, 0.12]}>
            <capsuleGeometry args={[0.045, 0.1, 6, 16]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Side audio pods */}
        {[-1, 1].map((s) => (
          <RoundedBox
            key={s}
            args={[0.12, 0.3, 0.32]}
            radius={0.05}
            smoothness={4}
            position={[s * 0.52, -0.02, 0.02]}
          >
            <meshStandardMaterial color={CHROME} metalness={0.7} roughness={0.3} />
          </RoundedBox>
        ))}

        {/* Antenna */}
        <mesh position={[0.26, 0.55, -0.1]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
          <meshStandardMaterial color={CHROME} metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0.3, 0.78, -0.1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      </group>

      {/* ── Neck ── */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.2, 24]} />
        <meshStandardMaterial color={CHROME} metalness={0.78} roughness={0.28} />
      </mesh>

      {/* ── Torso / bust ── */}
      <group position={[0, -0.42, 0]}>
        <RoundedBox args={[1.5, 0.9, 0.7]} radius={0.22} smoothness={6} position={[0, 0.1, 0]}>
          <meshStandardMaterial color={CERAMIC} metalness={0.2} roughness={0.34} />
        </RoundedBox>
        {/* Shoulder caps */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.78, 0.28, 0]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color={CHROME} metalness={0.72} roughness={0.3} />
          </mesh>
        ))}
        {/* Reactor core */}
        <mesh ref={core} position={[0, 0.2, 0.37]}>
          <sphereGeometry args={[0.14, 28, 28]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.2, 0.35]}>
          <torusGeometry args={[0.22, 0.018, 12, 48]} />
          <meshStandardMaterial color={CHROME} metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
    </group>
  )
}

export default function RobotAvatar() {
  const src = useRobotSource()
  const groupRef = useRef() // whole-body float / breathing / drag yaw
  const headRef = useRef() // cursor-tracking head turn
  const glowRef = useRef(0)

  // Inertial drag-to-rotate (precise pointers only; touch keeps native scroll).
  const drag = useRef({ on: false, x: 0, vel: 0, yaw: 0 })
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const down = (e) => {
      if (e.target.tagName === 'CANVAS') {
        drag.current.on = true
        drag.current.x = e.clientX
      }
    }
    const move = (e) => {
      if (!drag.current.on) return
      drag.current.vel += (e.clientX - drag.current.x) * 0.004
      drag.current.x = e.clientX
    }
    const up = () => (drag.current.on = false)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { fx, hovered, reducedMotion } = useStore.getState()

    // Shared energy bus: surges on hover/click, simmers back down. Bloom +
    // section nodes read fx.pulse, so the whole scene breathes together.
    const base = hovered ? 0.5 : 0.16
    fx.pulse = THREE.MathUtils.damp(fx.pulse, base, 1.6, delta)
    glowRef.current = fx.pulse + 0.06 * Math.sin(t * 2.0)

    const g = groupRef.current
    if (g) {
      const floatY = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.05
      g.position.y = BASE_Y + floatY
      const breathe = reducedMotion ? 1 : 1 + Math.sin(t * 1.1) * 0.012
      g.scale.setScalar(BOT_SCALE * breathe)

      // Drag yaw decays back to forward
      drag.current.yaw = THREE.MathUtils.clamp(drag.current.yaw + drag.current.vel, -0.9, 0.9)
      drag.current.vel *= Math.exp(-5 * delta)
      drag.current.yaw = THREE.MathUtils.damp(drag.current.yaw, 0, 0.4, delta)
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, drag.current.yaw, 3, delta)
    }

    // Head + eyes track the cursor (plus a slow idle sway)
    const h = headRef.current
    if (h) {
      const sway = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.06
      h.rotation.y = THREE.MathUtils.damp(h.rotation.y, state.pointer.x * 0.5 + sway, 3.2, delta)
      h.rotation.x = THREE.MathUtils.damp(h.rotation.x, -state.pointer.y * 0.3, 3.2, delta)
    }
  })

  return (
    <>
      <group
        ref={groupRef}
        position={[HEAD_POS[0], BASE_Y, HEAD_POS[2]]}
        scale={BOT_SCALE}
        onPointerDown={() => {
          // Reaction on interaction: a glow surge
          useStore.getState().fx.pulse = 1
        }}
      >
        <group ref={headRef}>
          {src === 'gltf' ? <GltfRobot /> : <ProceduralRobot glowRef={glowRef} />}
        </group>
      </group>

      {/* Cool key + cyan rim lighting so the white shell reads cinematic */}
      <directionalLight position={[2.4, 3.0, 4.0]} intensity={1.7} color="#dff6ff" />
      <directionalLight position={[-3.0, 1.6, -2.6]} intensity={1.0} color="#3aa6c8" />
      <pointLight position={[-1.6, 0.4, 3.2]} intensity={0.9} color="#76e5ff" distance={10} />
    </>
  )
}

// NOTE: no useGLTF.preload() here on purpose — the file is optional, and
// preloading a non-existent robot.glb would log a 404. The HEAD probe loads it
// lazily only when it actually exists.
