import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'

// "Living photo" hero head: a cinematic AI-rendered portrait brought to life —
// pseudo-depth cursor parallax, breathing, pulsing glow on the bright gold
// regions (eyes / brain circuitry), a slow light sweep, and soft edges that
// dissolve into the cream stage. Activates automatically when an image exists
// at public/hero/robot.(jpg|png|webp); otherwise the procedural head renders.

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uPulse;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;

    // Pseudo-depth parallax — the subject (center) shifts more than the edges
    float bulge = exp(-dot(p, p) * 4.0);
    vec2 uv = vUv - uPointer * 0.014 * bulge + uPointer * 0.005;

    // Breathing
    uv = (uv - 0.5) * (1.0 - 0.006 * sin(uTime * 0.5)) + 0.5;

    vec4 tex = texture2D(uMap, uv);
    vec3 col = tex.rgb;

    // Pulse the warm luminous regions — eyes, brain, gold circuitry
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    float warm = smoothstep(0.5, 0.88, luma) * smoothstep(0.015, 0.16, col.r - col.b);
    col += col * warm * (0.3 + uPulse * 1.4 + 0.12 * sin(uTime * 1.9));

    // Slow diagonal light sweep
    float sweepPos = fract(uTime * 0.045) * 2.4 - 0.7;
    float sweep = exp(-pow((p.x + p.y * 0.35 - sweepPos) * 5.5, 2.0));
    col += vec3(1.0, 0.96, 0.86) * sweep * 0.05;

    // Soft rounded edges dissolving into the stage
    vec2 d2 = max(abs(p) - vec2(0.24, 0.28), 0.0);
    float edge = length(d2);
    float alpha = (1.0 - smoothstep(0.0, 0.2, edge)) * tex.a;

    gl_FragColor = vec4(col, alpha);
  }
`

export default function LivingPhoto({ texture }) {
  const meshRef = useRef()

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
    }),
    [texture]
  )

  const { width, height } = useMemo(() => {
    const img = texture.image
    const aspect = img && img.width ? img.width / img.height : 1.5
    const w = aspect >= 1 ? 5.6 : 4.4
    return { width: w, height: w / aspect }
  }, [texture])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { fx, hovered } = useStore.getState()

    const base = hovered ? 0.45 : 0.16
    fx.pulse = THREE.MathUtils.damp(fx.pulse, base, 1.6, delta)

    uniforms.uTime.value = t
    uniforms.uPulse.value = fx.pulse
    uniforms.uPointer.value.lerp(state.pointer, 1 - Math.exp(-6 * delta))

    const m = meshRef.current
    if (m) {
      // Gentle dimensional drift so the portrait never feels flat
      m.position.y = 0.55 + Math.sin(t * 0.5) * 0.04
      m.rotation.y = THREE.MathUtils.damp(m.rotation.y, state.pointer.x * 0.07, 2.5, delta)
      m.rotation.x = THREE.MathUtils.damp(m.rotation.x, -state.pointer.y * 0.045, 2.5, delta)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.55, 0.2]}>
      <planeGeometry args={[width, height, 1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
