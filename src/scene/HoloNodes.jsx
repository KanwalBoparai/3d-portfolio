import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { useStore } from '../store'
import { SECTIONS } from '../data/content'
import { nodePosition } from './lib'
import { scrollToSection } from '../scroll'
import outfitMedium from '@fontsource/outfit/files/outfit-latin-500-normal.woff'
import outfitLight from '@fontsource/outfit/files/outfit-latin-300-normal.woff'

// Glass orb emblem — soft disc, hairline gold rings, drifting dash ring
const orbVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const orbFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  #define PI 3.14159265

  float ring(float d, float r, float w) {
    return smoothstep(w, 0.0, abs(d - r));
  }

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p);
    float a = atan(p.y, p.x);

    // Frosted glass body — translucent, edge-weighted like blown glass
    float body = smoothstep(0.46, 0.12, d);
    float shell = smoothstep(0.46, 0.34, d) - smoothstep(0.30, 0.10, d) * 0.6;
    vec3 col = vec3(1.05, 1.02, 0.97) * body;
    float alpha = body * 0.15 + shell * 0.24;

    // Specular crescent up-left, like blown glass
    float hi = smoothstep(0.26, 0.0, length(p - vec2(-0.14, 0.16)));
    col += vec3(0.6, 0.54, 0.4) * hi * 0.55;
    alpha += hi * 0.25;

    vec3 gold = vec3(1.45, 1.08, 0.50);

    // Gold outer ring + drifting dashed ring
    float outer = ring(d, 0.455, 0.010);
    float dash = step(0.42, fract(a / (2.0 * PI) * 14.0 + uTime * (0.05 + uHover * 0.1)));
    float dashed = ring(d, 0.395, 0.007) * dash;

    col += gold * (outer * 1.3 + dashed * 0.9) * (1.0 + uHover * 0.8);
    alpha = max(alpha, (outer * 1.0 + dashed * 0.7) * (0.8 + uHover * 0.2));

    // Luminous gold nucleus
    float core = exp(-d * d * 200.0);
    col += gold * core * (1.7 + uHover * 1.3 + 0.12 * sin(uTime * 2.2));
    alpha = max(alpha, core * 0.95);

    gl_FragColor = vec4(col, alpha);
  }
`

function HoloNode({ section }) {
  const isMobile = useStore((s) => s.isMobile)
  const groupRef = useRef()
  const scaleRef = useRef(1)

  const position = useMemo(() => nodePosition(section, isMobile), [section, isMobile])
  // Labels sit on the outer side, away from the head; contact stacks below
  const side = position.x === 0 ? 0 : Math.sign(position.x)

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uHover: { value: 0 } }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { hovered } = useStore.getState()
    const on = hovered === section.id ? 1 : 0
    uniforms.uTime.value = t
    uniforms.uHover.value = THREE.MathUtils.damp(uniforms.uHover.value, on, 6, delta)

    const g = groupRef.current
    if (g) {
      scaleRef.current = THREE.MathUtils.damp(scaleRef.current, on ? 1.1 : 1, 6, delta)
      g.scale.setScalar(scaleRef.current * (isMobile ? 0.8 : 1))
      g.position.y = position.y + Math.sin(t * 0.8 + position.x * 2.1) * 0.06
    }
  })

  const { setHovered } = useStore.getState()

  const labelX = side === 0 ? 0 : side * 0.72
  const anchorX = side === 0 ? 'center' : side > 0 ? 'left' : 'right'

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        scrollToSection(section.id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(section.id)
      }}
      onPointerOut={() => setHovered(null)}
    >
      <Billboard>
        <mesh>
          <planeGeometry args={[0.95, 0.95]} />
          <shaderMaterial
            vertexShader={orbVertex}
            fragmentShader={orbFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* Side label stack — desktop only; mobile navigates via nav + cards */}
        {!isMobile && (
          <>
            <Text
              font={outfitMedium}
              fontSize={0.165}
              letterSpacing={0.24}
              position={[labelX, side === 0 ? -0.78 : 0.12, 0]}
              color="#faf7f1"
              anchorX={anchorX}
              anchorY="middle"
            >
              {section.label}
            </Text>
            <Text
              font={outfitLight}
              fontSize={0.105}
              letterSpacing={0.06}
              position={[labelX, side === 0 ? -0.97 : -0.08, 0]}
              color="#9db6bc"
              anchorX={anchorX}
              anchorY="middle"
            >
              {section.sub}
            </Text>
            <Text
              font={outfitLight}
              fontSize={0.095}
              letterSpacing={0.3}
              position={[labelX, side === 0 ? -1.16 : -0.28, 0]}
              color="#76e5ff"
              anchorX={anchorX}
              anchorY="middle"
            >
              {section.code}
            </Text>
          </>
        )}
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
