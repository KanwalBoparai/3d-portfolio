import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'

// Champagne dust — fine motes drifting up through the warm light
const dustVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    p.y = mod(p.y + uTime * (0.05 + aSeed * 0.10), 11.0) - 3.5;
    p.x += sin(uTime * 0.22 + aSeed * 31.0) * 0.4;
    p.z += cos(uTime * 0.18 + aSeed * 47.0) * 0.3;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.5 + 0.5 * sin(uTime * (0.6 + aSeed * 1.6) + aSeed * 90.0);
    gl_PointSize = (1.1 + aSeed * 2.2) * tw * clamp(7.0 / -mv.z, 0.3, 1.8);
    gl_Position = projectionMatrix * mv;
  }
`

const dustFragment = /* glsl */ `
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d);
    // Mostly soft gold sparks (bloom catches the bright ones), a few bronze motes
    vec3 col = mix(vec3(1.5, 1.18, 0.62), vec3(0.62, 0.50, 0.34), step(0.6, vSeed));
    gl_FragColor = vec4(col, a * 0.4);
  }
`

function makeCloud(count, spread) {
  const pos = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() * 2 - 1) * spread[0]
    pos[i * 3 + 1] = Math.random() * 11 - 3.5
    pos[i * 3 + 2] = (Math.random() * 2 - 1) * spread[1] + 1
    seed[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
  return g
}

export default function Particles() {
  const isMobile = useStore((s) => s.isMobile)
  const dustGeo = useMemo(() => makeCloud(isMobile ? 280 : 700, [10, 6]), [isMobile])
  const dustUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state) => {
    dustUniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points geometry={dustGeo}>
      <shaderMaterial
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={dustUniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}
