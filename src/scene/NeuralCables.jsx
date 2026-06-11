import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import { SECTIONS } from '../data/content'
import { buildCableCurve } from './lib'

const cableVertex = /* glsl */ `
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

const cableFragment = /* glsl */ `
  uniform float uTime;
  uniform float uActive;
  uniform float uSeed;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 v = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - abs(dot(normalize(vNormal), v)), 1.5);

    // Idle glow along the wire
    vec3 col = uColor * (0.16 + rim * 0.30);

    // Primary energy packet racing toward the node
    float speed = 0.16 + uActive * 0.30;
    float p1 = fract(vUv.x - uTime * speed - uSeed);
    float packet = exp(-pow((p1 - 0.5) * 18.0, 2.0));

    // Fast secondary data ticks
    float p2 = fract(vUv.x * 4.0 - uTime * (0.9 + uActive) - uSeed * 7.0);
    float ticks = exp(-pow((p2 - 0.5) * 26.0, 2.0)) * 0.5;

    col += uColor * (packet * 2.2 + ticks) * (0.7 + uActive * 1.8);
    col += vec3(1.0) * packet * uActive * 0.35;

    gl_FragColor = vec4(col, 0.9);
  }
`

function Cable({ section, index }) {
  const isMobile = useStore((s) => s.isMobile)
  const matRef = useRef()
  const plugRef = useRef()

  const { tubeGeo, hitGeo, anchorPos } = useMemo(() => {
    const curve = buildCableCurve(section, isMobile)
    return {
      tubeGeo: new THREE.TubeGeometry(curve, 100, 0.032, 8, false),
      hitGeo: new THREE.TubeGeometry(curve, 40, 0.16, 6, false),
      anchorPos: curve.getPointAt(0),
    }
  }, [section, isMobile])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActive: { value: 0 },
      uSeed: { value: index * 0.37 },
      uColor: { value: new THREE.Color(section.color) },
    }),
    [section, index]
  )

  useFrame((state, delta) => {
    const { hovered, section: active } = useStore.getState()
    const on = hovered === section.id || active === section.id ? 1 : 0
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uActive.value = THREE.MathUtils.damp(uniforms.uActive.value, on, 5, delta)
    if (plugRef.current) {
      const s = 1 + 0.25 * Math.sin(state.clock.elapsedTime * 3 + index) + uniforms.uActive.value * 0.5
      plugRef.current.scale.setScalar(s)
    }
  })

  const { openSection, setHovered } = useStore.getState()

  return (
    <group>
      <mesh geometry={tubeGeo} ref={matRef}>
        <shaderMaterial
          vertexShader={cableVertex}
          fragmentShader={cableFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing plug where the cable enters the skull */}
      <mesh ref={plugRef} position={anchorPos}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={section.color} toneMapped={false} />
      </mesh>

      {/* Fat invisible tube for easy picking */}
      <mesh
        geometry={hitGeo}
        visible={false}
        onClick={(e) => {
          e.stopPropagation()
          openSection(section.id)
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
        <Cable key={s.id} section={s} index={i} />
      ))}
    </group>
  )
}
