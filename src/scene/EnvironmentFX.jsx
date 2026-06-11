import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import { NOISE } from './glsl'

// ── Holographic floor: polar grid + radar pulse, fading into the void ────────
const floorFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  varying vec2 vUv;
  #define PI 3.14159265

  void main() {
    vec2 p = (vUv - 0.5) * 32.0;
    float r = length(p);
    float a = atan(p.y, p.x);

    float rings = smoothstep(0.045, 0.0, abs(fract(r * 0.55) - 0.5) - 0.44);
    float spokes = smoothstep(0.02, 0.0, abs(fract(a / (2.0 * PI) * 28.0) - 0.5) - 0.46);

    // Radar pulse expanding from beneath the head
    float wave = fract(uTime * 0.10);
    float radar = exp(-pow((r - wave * 16.0) * 0.9, 2.0)) * (1.0 - wave);

    float fade = smoothstep(15.5, 2.5, r);
    float center = exp(-r * r * 0.06) * 0.5;

    vec3 cyan = vec3(0.0, 0.9, 1.0);
    vec3 col = cyan * (rings * 0.16 + spokes * 0.05) * fade;
    col += cyan * radar * (0.35 + uPulse * 0.9) * fade;
    col += cyan * center * (0.25 + uPulse * 0.6);

    gl_FragColor = vec4(col, fade * 0.85);
  }
`

// ── Volumetric light shafts: additive open cones, edge-faded ─────────────────
const shaftVertex = /* glsl */ `
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

const shaftFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  ${NOISE}

  void main() {
    vec3 v = normalize(cameraPosition - vWorldPos);
    float edge = pow(abs(dot(normalize(vNormal), v)), 1.6);
    float vert = pow(vUv.y, 1.8);
    float dust = 0.75 + 0.25 * fbm(vUv * vec2(3.0, 8.0) + vec2(uSeed, -uTime * 0.06));
    float flicker = 0.9 + 0.1 * sin(uTime * 0.7 + uSeed * 20.0);
    float a = edge * vert * dust * flicker * 0.16;
    gl_FragColor = vec4(uColor, a);
  }
`

// ── Sky dome: vertical gradient + drifting nebula tint ───────────────────────
const domeFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vDir;
  ${NOISE}

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y * 0.5 + 0.5;
    vec3 col = mix(vec3(0.004, 0.008, 0.020), vec3(0.012, 0.025, 0.055), pow(h, 1.4));
    float neb = fbm(d.xz * 2.4 + d.y * 1.2 + uTime * 0.006);
    col += vec3(0.04, 0.015, 0.09) * neb * (1.0 - h) * 0.9;
    col += vec3(0.0, 0.04, 0.06) * fbm(d.xy * 3.1 - uTime * 0.004) * 0.5;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Shaft({ position, color, seed, scale = 1 }) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uTime: { value: 0 }, uSeed: { value: seed } }),
    [color, seed]
  )
  const target = useMemo(() => new THREE.Vector3(0, -2.7, 0), [])
  const groupRef = useRef()
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    if (groupRef.current) groupRef.current.lookAt(target)
  })
  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 6 * scale]}>
        <coneGeometry args={[3.1 * scale, 12 * scale, 24, 1, true]} />
        <shaderMaterial
          vertexShader={shaftVertex}
          fragmentShader={shaftFragment}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default function EnvironmentFX() {
  const isMobile = useStore((s) => s.isMobile)

  const floorUniforms = useMemo(() => ({ uTime: { value: 0 }, uPulse: { value: 0 } }), [])
  const domeUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    floorUniforms.uTime.value = t
    floorUniforms.uPulse.value = useStore.getState().fx.pulse
    domeUniforms.uTime.value = t
  })

  return (
    <group>
      {/* Sky dome */}
      <mesh>
        <sphereGeometry args={[44, 32, 16]} />
        <shaderMaterial
          vertexShader={/* glsl */ `
            varying vec3 vDir;
            void main() {
              vDir = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={domeFragment}
          uniforms={domeUniforms}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Holo floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.7, 0]}>
        <circleGeometry args={[16, 64]} />
        <shaderMaterial
          vertexShader={/* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={floorFragment}
          uniforms={floorUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Volumetric shafts raking the head from above-behind */}
      <Shaft position={[-5.5, 8, -4.5]} color="#0a4a66" seed={1.7} />
      {!isMobile && <Shaft position={[5.8, 8.5, -4]} color="#3a1a5e" seed={4.2} />}
      {!isMobile && <Shaft position={[0.5, 9.5, -6.5]} color="#5e1038" seed={8.9} scale={1.2} />}

      {/* Minimal conventional lighting for any standard materials */}
      <ambientLight intensity={0.35} color="#7fb4d8" />
      <directionalLight position={[4, 6, 5]} intensity={1.0} color="#bfe9ff" />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#ff2e88" />
    </group>
  )
}
