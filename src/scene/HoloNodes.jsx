import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { useStore } from '../store'
import { SECTIONS } from '../data/content'
import { nodePosition } from './lib'
import orbitronWoff from '@fontsource/orbitron/files/orbitron-latin-700-normal.woff'
import monoWoff from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff'

// One quad per node renders the whole holo emblem: rings, dashes, hex core.
const holoVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const holoFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColor;
  varying vec2 vUv;
  #define PI 3.14159265

  float ring(float d, float r, float w) {
    return smoothstep(w, 0.0, abs(d - r));
  }

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p);
    float a = atan(p.y, p.x);

    float glow = 0.0;

    // Outer fine ring
    glow += ring(d, 0.46, 0.006) * 0.9;

    // Rotating dashed ring
    float dash = step(0.32, fract(a / (2.0 * PI) * 10.0 + uTime * (0.12 + uHover * 0.25)));
    glow += ring(d, 0.40, 0.010) * dash * 1.4;

    // Counter-rotating tick marks
    float tick = step(0.82, fract(a / (2.0 * PI) * 24.0 - uTime * 0.1));
    glow += ring(d, 0.30, 0.014) * tick * 1.1;

    // Hexagonal core
    float hexA = mod(a + PI / 6.0, PI / 3.0) - PI / 6.0;
    float hexD = d * cos(hexA);
    glow += smoothstep(0.012, 0.0, abs(hexD - 0.16)) * 1.2;
    glow += (1.0 - smoothstep(0.0, 0.16, hexD)) * 0.10;

    // Bright nucleus
    glow += exp(-d * d * 220.0) * 2.2;

    // Compass spokes
    float spoke = max(
      smoothstep(0.004, 0.0, abs(p.x)) * step(0.20, abs(p.y)),
      smoothstep(0.004, 0.0, abs(p.y)) * step(0.20, abs(p.x))
    ) * step(d, 0.47);
    glow += spoke * 0.5;

    float boost = 1.0 + uHover * 0.9 + 0.08 * sin(uTime * 3.0);
    vec3 col = uColor * glow * boost;
    float alpha = clamp(glow, 0.0, 1.0) * 0.95;
    gl_FragColor = vec4(col, alpha);
  }
`

function HoloNode({ section }) {
  const isMobile = useStore((s) => s.isMobile)
  const groupRef = useRef()
  const scaleRef = useRef(1)

  const position = useMemo(() => nodePosition(section, isMobile), [section, isMobile])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uColor: { value: new THREE.Color(section.color) },
    }),
    [section]
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { hovered, section: active } = useStore.getState()
    const on = hovered === section.id || active === section.id ? 1 : 0
    uniforms.uTime.value = t
    uniforms.uHover.value = THREE.MathUtils.damp(uniforms.uHover.value, on, 6, delta)

    const g = groupRef.current
    if (g) {
      scaleRef.current = THREE.MathUtils.damp(scaleRef.current, on ? 1.16 : 1, 6, delta)
      const breathe = isMobile ? 0.78 : 1
      g.scale.setScalar(scaleRef.current * breathe)
      g.position.y = position.y + Math.sin(t * 0.9 + position.x * 2.1) * 0.07
    }
  })

  const { openSection, setHovered } = useStore.getState()

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        openSection(section.id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(section.id)
      }}
      onPointerOut={() => setHovered(null)}
    >
      <Billboard>
        <mesh>
          <planeGeometry args={[1.5, 1.5]} />
          <shaderMaterial
            vertexShader={holoVertex}
            fragmentShader={holoFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <Text
          font={orbitronWoff}
          fontSize={0.20}
          letterSpacing={0.22}
          position={[0, -0.92, 0]}
          color={section.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor={section.color}
          outlineOpacity={0.4}
        >
          {section.label}
        </Text>
        <Text
          font={monoWoff}
          fontSize={0.085}
          letterSpacing={0.3}
          position={[0, -1.14, 0]}
          color="#9fc4e8"
          fillOpacity={0.75}
          anchorX="center"
          anchorY="middle"
        >
          {`${section.code} · ${section.sub}`}
        </Text>
      </Billboard>
    </group>
  )
}

export default function HoloNodes() {
  return (
    <group>
      {SECTIONS.map((s) => (
        <HoloNode key={s.id} section={s} />
      ))}
    </group>
  )
}
