import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { makeGold, makeGunmetal } from './materials'

// Advanced AI hardware in the open cranium: glowing nucleus inside a glass
// dome, rotating gold micro-rings, a circuit deck, orbiting energy arcs and
// a fine synaptic particle cloud.

const cloudVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPulse;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    p += 0.04 * vec3(
      sin(uTime * 1.2 + aSeed * 17.0),
      sin(uTime * 0.9 + aSeed * 29.0),
      cos(uTime * 1.5 + aSeed * 11.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.6 + 0.4 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 40.0);
    gl_PointSize = (1.6 + aSeed * 2.0) * tw * (1.0 + uPulse * 0.7) * clamp(16.0 / -mv.z, 0.4, 3.0);
    gl_Position = projectionMatrix * mv;
  }
`

const cloudFragment = /* glsl */ `
  uniform float uPulse;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.06, length(c));
    vec3 warm = mix(vec3(1.25, 0.92, 0.45), vec3(1.1, 0.6, 0.42), step(0.75, vSeed));
    gl_FragColor = vec4(warm * (1.25 + uPulse * 1.5), a * 0.8);
  }
`

export default function BrainCore({ center, pulseRef }) {
  const ringA = useRef()
  const ringB = useRef()
  const ringC = useRef()
  const arcsRef = useRef()
  const coreRef = useRef()
  const lightRef = useRef()

  const gold = useMemo(() => makeGold(), [])
  const goldDark = useMemo(() => makeGold({ color: '#8d6f3e', roughness: 0.4 }), [])
  const gunmetal = useMemo(() => makeGunmetal(), [])
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#fff8ea',
        transparent: true,
        opacity: 0.13,
        roughness: 0.06,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  )
  const emberMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color(2.0, 1.45, 0.62), toneMapped: false }),
    []
  )
  const arcMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color(1.7, 1.25, 0.55), toneMapped: false }),
    []
  )

  const cloudUniforms = useMemo(() => ({ uTime: { value: 0 }, uPulse: { value: 0 } }), [])
  const cloudGeo = useMemo(() => {
    const count = 550
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const radii = [1.05, 0.8, 0.95]
    for (let i = 0; i < count; i++) {
      let x, y, z
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
      } while (x * x + y * y + z * z > 1)
      pos[i * 3] = x * radii[0]
      pos[i * 3 + 1] = y * radii[1]
      pos[i * 3 + 2] = z * radii[2]
      seed[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    return g
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const pulse = pulseRef?.current ?? 0

    cloudUniforms.uTime.value = t
    cloudUniforms.uPulse.value = pulse

    if (ringA.current) ringA.current.rotation.y += delta * 0.45
    if (ringB.current) {
      ringB.current.rotation.y -= delta * 0.3
      ringB.current.rotation.x = 0.45 + Math.sin(t * 0.4) * 0.08
    }
    if (ringC.current) ringC.current.rotation.z += delta * 0.6
    if (arcsRef.current) arcsRef.current.rotation.y -= delta * 0.85

    if (coreRef.current) {
      const s = 1 + 0.05 * Math.sin(t * 2.1) + pulse * 0.12
      coreRef.current.scale.setScalar(s)
    }
    if (lightRef.current) lightRef.current.intensity = 1.1 + pulse * 2.4
  })

  return (
    <group position={center}>
      {/* Circuit deck the hardware sits on */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[1.06, 1.18, 0.16, 48]} />
        <primitive object={gunmetal} attach="material" />
      </mesh>
      <mesh position={[0, -0.70, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.014, 8, 64]} />
        <primitive object={arcMat} attach="material" />
      </mesh>

      {/* Glowing nucleus in a faceted gold cage */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.34, 1]} />
          <primitive object={emberMat} attach="material" />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial color="#8d6f3e" metalness={1} roughness={0.35} wireframe />
        </mesh>
      </group>

      {/* Glass dome over the nucleus */}
      <mesh>
        <sphereGeometry args={[0.78, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <primitive object={glass} attach="material" />
      </mesh>

      {/* Rotating micro-rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0, 0.2]}>
        <torusGeometry args={[0.92, 0.026, 12, 64]} />
        <primitive object={gold} attach="material" />
      </mesh>
      <mesh ref={ringB} rotation={[0.45, 0, -0.3]}>
        <torusGeometry args={[1.12, 0.018, 12, 64]} />
        <primitive object={goldDark} attach="material" />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2, 0.35, 0]}>
        <torusGeometry args={[0.62, 0.014, 10, 48]} />
        <primitive object={gold} attach="material" />
      </mesh>

      {/* Orbiting energy arcs — light racing around the hardware */}
      <group ref={arcsRef} rotation={[0.18, 0, 0.06]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.012, 8, 48, Math.PI * 0.55]} />
          <primitive object={arcMat} attach="material" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, Math.PI]}>
          <torusGeometry args={[0.85, 0.010, 8, 40, Math.PI * 0.35]} />
          <primitive object={arcMat} attach="material" />
        </mesh>
      </group>

      {/* Synaptic cloud */}
      <points geometry={cloudGeo}>
        <shaderMaterial
          vertexShader={cloudVertex}
          fragmentShader={cloudFragment}
          uniforms={cloudUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight ref={lightRef} color="#ffc26e" intensity={1.1} distance={9} />
    </group>
  )
}
