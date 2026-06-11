import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import { NOISE } from './glsl'

// ── Stage floor: soft contact shadow + engraved rings + gold pulse on click ──
const floorFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * 26.0;
    float r = length(p);

    // Soft contact shadow pooling beneath the head
    float shadow = exp(-r * r * 0.055) * 0.30;

    // Engraved concentric hairlines, fading outward
    float rings = smoothstep(0.05, 0.0, abs(fract(r * 0.5) - 0.5) - 0.42);
    float fade = smoothstep(12.0, 2.0, r);

    // Gold ripple expanding when a node is engaged
    float wave = fract(uTime * 0.08);
    float ripple = exp(-pow((r - wave * 13.0) * 1.1, 2.0)) * (1.0 - wave);

    vec3 base = vec3(0.0);
    float alpha = shadow + rings * fade * 0.10;
    vec3 col = mix(base, vec3(0.45, 0.34, 0.16), rings * fade * 0.55);
    col += vec3(1.3, 1.0, 0.5) * ripple * (0.10 + uPulse * 0.55) * fade;
    alpha += ripple * (0.06 + uPulse * 0.30) * fade;

    gl_FragColor = vec4(col, alpha);
  }
`

// ── Sky dome: cool command-room gradient with faint energy noise ─────────────
const domeFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vDir;
  ${NOISE}

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y * 0.5 + 0.5;
    vec3 col = mix(vec3(0.018, 0.045, 0.055), vec3(0.055, 0.105, 0.118), pow(h, 1.25));
    // Cool halo behind and above the head
    float halo = exp(-pow(length(d.xy - vec2(0.0, 0.18)) * 2.2, 2.0)) * step(0.0, d.z * -1.0 + 1.0);
    col += vec3(0.05, 0.16, 0.18) * halo;
    col += vec3(0.02, 0.07, 0.075) * fbm(d.xz * 2.2 + uTime * 0.004);
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function EnvironmentFX() {
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
      {/* Ivory dome */}
      <mesh>
        <sphereGeometry args={[42, 32, 16]} />
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

      {/* Stage floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <circleGeometry args={[14, 64]} />
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
        />
      </mesh>

      <ambientLight intensity={0.45} color="#9eefff" />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#c8f8ff" />
      <directionalLight position={[-5, 2, -4]} intensity={0.85} color="#ffcf74" />
    </group>
  )
}
