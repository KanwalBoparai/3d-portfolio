import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'

const dustVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    // Endless upward drift with lateral wander, wrapped in a 14-unit band
    p.y = mod(p.y + uTime * (0.10 + aSeed * 0.22), 14.0) - 4.5;
    p.x += sin(uTime * 0.3 + aSeed * 31.0) * 0.5;
    p.z += cos(uTime * 0.22 + aSeed * 47.0) * 0.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 90.0);
    gl_PointSize = (1.2 + aSeed * 2.4) * tw * clamp(7.0 / -mv.z, 0.3, 1.8);
    gl_Position = projectionMatrix * mv;
  }
`

const dustFragment = /* glsl */ `
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d);
    vec3 col = mix(vec3(0.0, 0.75, 0.95), vec3(0.65, 0.55, 1.0), step(0.72, vSeed));
    col = mix(col, vec3(0.9), step(0.92, vSeed));
    gl_FragColor = vec4(col * 0.85, a * 0.34);
  }
`

function makeCloud(count, spread) {
  const pos = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() * 2 - 1) * spread[0]
    pos[i * 3 + 1] = Math.random() * 14 - 4.5
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

  const dustGeo = useMemo(() => makeCloud(isMobile ? 420 : 1100, [11, 7]), [isMobile])
  const dustUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  // Distant static starfield
  const starGeo = useMemo(() => {
    const count = 650
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 1.6 - 0.4,
        Math.random() * 2 - 1
      ).normalize().multiplyScalar(30 + Math.random() * 9)
      pos.set([v.x, v.y, v.z], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((state) => {
    dustUniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <group>
      <points geometry={dustGeo}>
        <shaderMaterial
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          uniforms={dustUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={starGeo}>
        <pointsMaterial
          color="#7fb4d8"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
