import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { makeGold } from './materials'

// Layered mechanical eyes: gold socket ring → glossy dark-glass eyeball →
// blade-iris emitter → glass lens cap → ceramic eyelid that blinks.

const irisVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const irisFragment = /* glsl */ `
  uniform float uTime;
  uniform float uGlow;
  varying vec2 vUv;
  #define PI 3.14159265

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p) * 2.0;          // 0 center → 1 edge
    float a = atan(p.y, p.x);

    // Mechanical aperture blades radiating from the pupil
    float blades = 0.62 + 0.38 * cos(a * 22.0 + sin(d * 9.0) * 1.2);
    float lattice = 0.85 + 0.15 * cos(a * 60.0);

    float pupil = smoothstep(0.30, 0.42, d);          // dark center
    float irisBody = 1.0 - smoothstep(0.82, 0.98, d); // fade at edge
    float innerRing = smoothstep(0.40, 0.46, d) * (1.0 - smoothstep(0.50, 0.58, d));
    float outerRing = smoothstep(0.84, 0.90, d) * (1.0 - smoothstep(0.94, 1.0, d));

    vec3 gold = vec3(1.0, 0.72, 0.34);
    vec3 col = gold * blades * lattice * pupil * irisBody * 1.7;
    col += gold * innerRing * 2.6;
    col += vec3(1.0, 0.85, 0.55) * outerRing * 1.9;
    col += gold * (1.0 - smoothstep(0.0, 0.34, d)) * 0.25; // ember in the pupil

    col *= uGlow;
    float alpha = clamp(irisBody + outerRing, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`

function Eye({ position, uniforms, registerEye, registerLid }) {
  const eyeballMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0c0b0d',
        metalness: 0.4,
        roughness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
      }),
    []
  )
  const lensMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#fff7e0',
        transparent: true,
        opacity: 0.10,
        metalness: 0,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        depthWrite: false,
      }),
    []
  )
  const socketMat = useMemo(() => makeGold({ roughness: 0.28 }), [])
  const lidMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e8e1d2',
        metalness: 0.05,
        roughness: 0.4,
        clearcoat: 0.7,
        clearcoatRoughness: 0.3,
        side: THREE.DoubleSide,
      }),
    []
  )

  return (
    <group position={position}>
      {/* Machined gold socket bezel, half-set into the shell */}
      <mesh rotation={[0.06, 0, 0]} position={[0, 0, 0.18]}>
        <torusGeometry args={[0.42, 0.028, 16, 48]} />
        <primitive object={socketMat} attach="material" />
      </mesh>

      {/* Eyeball — lookAt() drives this group */}
      <group ref={registerEye}>
        <mesh>
          <sphereGeometry args={[0.40, 32, 32]} />
          <primitive object={eyeballMat} attach="material" />
        </mesh>
        {/* Blade iris emitter — proud of the eyeball, under the lens */}
        <mesh position={[0, 0, 0.408]}>
          <circleGeometry args={[0.225, 48]} />
          <shaderMaterial
            vertexShader={irisVertex}
            fragmentShader={irisFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
        {/* Gold iris bezel */}
        <mesh position={[0, 0, 0.402]}>
          <torusGeometry args={[0.235, 0.02, 12, 40]} />
          <primitive object={socketMat} attach="material" />
        </mesh>
        {/* Glass lens cap */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.425, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.40]} />
          <primitive object={lensMat} attach="material" />
        </mesh>
      </group>

      {/* Ceramic eyelid — rotates down over the lens to blink */}
      <group ref={registerLid}>
        <mesh rotation={[Math.PI * 0.52, 0, 0]}>
          <sphereGeometry args={[0.46, 32, 12, 0, Math.PI * 2, 0, Math.PI * 0.34]} />
          <primitive object={lidMat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

export default function Eyes({ left, right, gazeRef, pulseRef }) {
  const eyeL = useRef()
  const eyeR = useRef()
  const lidL = useRef()
  const lidR = useRef()

  const irisL = useMemo(() => ({ uTime: { value: 0 }, uGlow: { value: 1 } }), [])
  const irisR = useMemo(() => ({ uTime: { value: 0 }, uGlow: { value: 1 } }), [])

  // Blink state machine — occasional, sometimes double. phase: 1 = open.
  const blink = useRef({ state: 'open', next: 2.5, until: 0, phase: 1 })

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (eyeL.current && gazeRef.current) eyeL.current.lookAt(gazeRef.current)
    if (eyeR.current && gazeRef.current) eyeR.current.lookAt(gazeRef.current)

    const b = blink.current
    if (b.state === 'open') {
      if (t > b.next) b.state = 'closing'
    } else if (b.state === 'closing') {
      b.phase -= delta / 0.13
      if (b.phase <= 0) {
        b.phase = 0
        b.state = 'hold'
        b.until = t + 0.06
      }
    } else if (b.state === 'hold') {
      if (t > b.until) b.state = 'opening'
    } else {
      b.phase += delta / 0.18
      if (b.phase >= 1) {
        b.phase = 1
        b.state = 'open'
        // occasional quick double-blink
        b.next = t + (Math.random() < 0.2 ? 0.35 : 3.2 + Math.random() * 3.8)
      }
    }
    const closed = 1 - b.phase
    // Lid swings from parked (up inside the socket) to covering the lens
    const lidAngle = -1.45 + closed * 1.5
    if (lidL.current) lidL.current.rotation.x = lidAngle
    if (lidR.current) lidR.current.rotation.x = lidAngle

    const pulse = pulseRef?.current ?? 0
    const glow = (0.95 + 0.14 * Math.sin(t * 1.35) + pulse * 0.85) * (0.35 + 0.65 * b.phase)
    irisL.uTime.value = t
    irisR.uTime.value = t
    irisL.uGlow.value = glow * 1.6
    irisR.uGlow.value = glow * 1.6
  })

  return (
    <>
      <Eye position={left} uniforms={irisL} registerEye={eyeL} registerLid={lidL} />
      <Eye position={right} uniforms={irisR} registerEye={eyeR} registerLid={lidR} />
    </>
  )
}
