import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import { SECTIONS } from '../data/content'
import { buildCableCurve } from './lib'
import { scrollToSection } from '../scroll'

// Dark filament core — gives the wire physical presence on the light backdrop
const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const coreFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(cameraPosition - vWorldPos);
    float lit = dot(n, normalize(vec3(0.45, 0.7, 0.55))) * 0.5 + 0.5;
    float spec = pow(max(dot(n, normalize(normalize(vec3(0.45, 0.7, 0.55)) + v)), 0.0), 28.0);
    vec3 col = uColor * (0.55 + 0.45 * lit) + vec3(1.0, 0.9, 0.7) * spec * 0.5;
    gl_FragColor = vec4(col, 1.0);
  }
`

// Luminous sheath — soft golden energy flowing down the strand
const glowVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const glowFragment = /* glsl */ `
  uniform float uTime;
  uniform float uActive;
  uniform float uSeed;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 v = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - abs(dot(normalize(vNormal), v)), 1.4);

    // Light packets gliding from the brain down to the node
    float speed = 0.10 + uActive * 0.14;
    float p1 = fract(vUv.x - uTime * speed - uSeed);
    float packet = exp(-pow((p1 - 0.5) * 14.0, 2.0));
    float p2 = fract(vUv.x * 3.0 - uTime * (0.5 + uActive * 0.5) - uSeed * 7.0);
    float ticks = exp(-pow((p2 - 0.5) * 30.0, 2.0)) * 0.45;

    vec3 gold = vec3(1.6, 1.22, 0.62); // >1 so bloom catches it on the cream bg
    float energy = (packet * 1.5 + ticks) * (0.55 + uActive * 1.3);
    vec3 col = gold * energy;
    float alpha = clamp(energy, 0.0, 1.0) * (0.35 + rim * 0.65);

    gl_FragColor = vec4(col, alpha);
  }
`

function Wire({ section, index }) {
  const isMobile = useStore((s) => s.isMobile)

  const { mainGeo, strandGeo, glowGeo, hitGeo, plugA, plugB } = useMemo(() => {
    const curve = buildCableCurve(section, isMobile)
    // Companion strand — same path, breathing-room offset, half the gauge
    const pts = curve.getPoints(64).map(
      (p, i) =>
        new THREE.Vector3(
          p.x + Math.sin(i * 0.4 + index * 2.1) * 0.045,
          p.y + Math.cos(i * 0.33 + index) * 0.045,
          p.z + 0.03
        )
    )
    const strand = new THREE.CatmullRomCurve3(pts)
    return {
      mainGeo: new THREE.TubeGeometry(curve, 120, 0.014, 8, false),
      strandGeo: new THREE.TubeGeometry(strand, 100, 0.006, 6, false),
      glowGeo: new THREE.TubeGeometry(curve, 120, 0.026, 8, false),
      hitGeo: new THREE.TubeGeometry(curve, 40, 0.16, 6, false),
      plugA: curve.getPointAt(0),
      plugB: curve.getPointAt(1),
    }
  }, [section, isMobile, index])

  const coreUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color('#a08055') } }),
    []
  )
  const glowUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uActive: { value: 0 }, uSeed: { value: index * 0.37 } }),
    [index]
  )

  useFrame((state, delta) => {
    const { hovered } = useStore.getState()
    const on = hovered === section.id ? 1 : 0
    glowUniforms.uTime.value = state.clock.elapsedTime
    glowUniforms.uActive.value = THREE.MathUtils.damp(glowUniforms.uActive.value, on, 5, delta)
  })

  const { setHovered } = useStore.getState()

  return (
    <group>
      <mesh geometry={mainGeo}>
        <shaderMaterial vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={coreUniforms} />
      </mesh>
      <mesh geometry={strandGeo}>
        <meshBasicMaterial color="#bfa470" transparent opacity={0.4} />
      </mesh>
      <mesh geometry={glowGeo}>
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Gold ferrules at each end of the wire */}
      <mesh position={plugA}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={[1.5, 1.15, 0.55]} toneMapped={false} />
      </mesh>
      <mesh position={plugB}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={[1.5, 1.15, 0.55]} toneMapped={false} />
      </mesh>

      {/* Fat invisible tube for easy picking */}
      <mesh
        geometry={hitGeo}
        visible={false}
        onClick={(e) => {
          e.stopPropagation()
          scrollToSection(section.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(section.id)
        }}
        onPointerOut={() => setHovered(null)}
      />
    </group>
  )
}

export default function NeuralCables() {
  return (
    <group>
      {SECTIONS.map((s, i) => (
        <Wire key={s.id} section={s} index={i} />
      ))}
    </group>
  )
}
