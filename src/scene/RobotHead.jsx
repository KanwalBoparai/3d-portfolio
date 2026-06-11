import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useStore } from '../store'
import { HEAD_POS, HEAD_SCALE } from './lib'
import { makeShellMaterial, makeInnerSkullMaterial } from './head/materials'
import Eyes from './head/Eyes'
import BrainCore from './head/BrainCore'
import Halo from './head/Halo'

const HEAD_URL = `${import.meta.env.BASE_URL}models/head.glb`

// Raw model-space landmarks (LeePerrySmith scan, ~8 units tall)
const EYE_L = [-0.66, 1.66, 1.74]
const EYE_R = [0.66, 1.66, 1.74]
const BRAIN_CENTER = [0, 2.85, -0.1]
const SHELL_CUT = 2.58 // ceramic shell opens here
const INNER_CUT = 2.3 // gunmetal skull cut lower — layered depth at the rim

export default function RobotHead() {
  const { nodes } = useGLTF(HEAD_URL)
  const geometry = useMemo(
    () => Object.values(nodes).find((n) => n.isMesh)?.geometry,
    [nodes]
  )

  // True shell inset: displace along vertex normals (uniform scaling would
  // push the inner skull through thin regions like the chest plate).
  const innerGeometry = useMemo(() => {
    if (!geometry) return null
    const g = geometry.clone()
    const pos = g.attributes.position
    const nor = g.attributes.normal
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) - nor.getX(i) * 0.09,
        pos.getY(i) - nor.getY(i) * 0.09,
        pos.getZ(i) - nor.getZ(i) * 0.09
      )
    }
    pos.needsUpdate = true
    return g
  }, [geometry])

  const groupRef = useRef()
  const pulseRef = useRef(0)
  const gazeRef = useRef(new THREE.Vector3(0, 1.0, 8))

  const shellMat = useMemo(() => makeShellMaterial({ cut: SHELL_CUT }), [])
  const innerMat = useMemo(() => makeInnerSkullMaterial({ cut: INNER_CUT }), [])
  useEffect(
    () => () => {
      shellMat.dispose()
      innerMat.dispose()
    },
    [shellMat, innerMat]
  )

  const gazeTmp = useMemo(() => new THREE.Vector3(), [])

  // Drag-to-rotate (precise pointers only — touch keeps native scrolling)
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
      drag.current.vel += (e.clientX - drag.current.x) * 0.0035
      drag.current.x = e.clientX
    }
    const up = () => {
      drag.current.on = false
    }
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
    const { fx, hovered } = useStore.getState()

    // Energy: spikes on node click, simmers on hover, settles low
    const base = hovered ? 0.45 : 0.16
    fx.pulse = THREE.MathUtils.damp(fx.pulse, base, 1.6, delta)
    const pulse = fx.pulse + 0.05 * Math.sin(t * 1.8)
    pulseRef.current = pulse

    const shellShader = shellMat.userData.shader
    if (shellShader) shellShader.uniforms.uPulse.value = pulse

    const g = groupRef.current
    if (g) {
      // Inertial drag yaw, slowly relaxing back to center.
      // Range stays tight — the wires are anchored in world space, so a wide
      // turn would clip the shell through them.
      drag.current.yaw = THREE.MathUtils.clamp(drag.current.yaw + drag.current.vel, -0.5, 0.5)
      drag.current.vel *= Math.exp(-5 * delta)
      drag.current.yaw = THREE.MathUtils.damp(drag.current.yaw, 0, 0.35, delta)

      // Slow living rotation + breathing float + cursor attention
      g.position.y = HEAD_POS[1] + Math.sin(t * 0.5) * 0.045
      const sway = Math.sin(t * 0.16) * 0.12
      g.rotation.y = THREE.MathUtils.damp(
        g.rotation.y,
        sway + state.pointer.x * 0.15 + drag.current.yaw,
        2.2,
        delta
      )
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.08, 2.2, delta)
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, state.pointer.x * 0.02, 2.2, delta)
    }

    // Eyes track the cursor through a virtual plane near the camera.
    // Gaze target lives in the head's local space (eyes are children).
    gazeTmp.set(state.pointer.x * 11.0, 1.4 + state.pointer.y * 7.0, 17.0)
    gazeRef.current.lerp(gazeTmp, 1 - Math.exp(-7 * delta))
  })

  if (!geometry) return null

  return (
    <>
      <group ref={groupRef} position={HEAD_POS} scale={HEAD_SCALE}>
        {/* Ceramic shell with zoned metal sections and the open cranium */}
        <mesh geometry={geometry}>
          <primitive object={shellMat} attach="material" />
        </mesh>

        {/* Gunmetal inner skull, visible through the opening and seams */}
        <mesh geometry={innerGeometry}>
          <primitive object={innerMat} attach="material" />
        </mesh>

        <Eyes left={EYE_L} right={EYE_R} gazeRef={gazeRef} pulseRef={pulseRef} />
        <BrainCore center={BRAIN_CENTER} pulseRef={pulseRef} />
        <Halo position={[0, 4.85, -0.15]} />
      </group>

      {/* Portrait lighting rig — fixed in world space so the face stays lit */}
      <directionalLight position={[2.2, 2.6, 4.2]} intensity={1.5} color="#fff1da" />
      <directionalLight position={[-2.6, 2.8, -3.6]} intensity={1.6} color="#ffd9a0" />
      <pointLight position={[-1.8, 0.3, 3.4]} intensity={0.55} color="#e9eeff" distance={9} />
    </>
  )
}

useGLTF.preload(HEAD_URL)
