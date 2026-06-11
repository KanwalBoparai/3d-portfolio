import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useStore } from '../store'
import { HEAD_POS, HEAD_SCALE } from './lib'
import { NOISE } from './glsl'

const HEAD_URL = `${import.meta.env.BASE_URL}models/head.glb`

// Raw model-space landmarks (LeePerrySmith scan, ~8 units tall)
const EYE_L = [-0.66, 1.66, 1.55]
const EYE_R = [0.66, 1.66, 1.55]
const EYE_RADIUS = 0.42
const BRAIN_CENTER = [0, 2.3, 0.1]

// ── Skin: dark cyber-glass with fresnel rim, sweep scan, inner brain glow ────
const headVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const headFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uRimColor;
  uniform vec3 uCoreColor;
  uniform vec3 uCoreWorld;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  ${NOISE}

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(cameraPosition - vWorldPos);

    // Two-tone studio shading on a near-black shell
    float key = max(dot(n, normalize(vec3(0.55, 0.7, 0.6))), 0.0);
    float back = max(dot(n, normalize(vec3(-0.6, 0.15, -0.8))), 0.0);
    vec3 col = vec3(0.016, 0.024, 0.045);
    col += vec3(0.10, 0.16, 0.22) * pow(key, 1.6);
    col += vec3(0.22, 0.05, 0.13) * pow(back, 2.2);

    // Fresnel rim — the holographic silhouette
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.6);
    col += uRimColor * fres * (0.40 + uPulse * 1.2);

    // Tech grid etched into the shell (triplanar-ish, very faint)
    float gx = smoothstep(0.46, 0.5, abs(fract(vWorldPos.y * 9.0) - 0.5));
    float gy = smoothstep(0.46, 0.5, abs(fract((vWorldPos.x + vWorldPos.z) * 7.0) - 0.5));
    col += uRimColor * (gx + gy) * 0.022 * (1.0 + uPulse);

    // Scan band sweeping up the head
    float scanPos = fract(uTime * 0.13);
    float scan = exp(-pow((vWorldPos.y * 0.28 + 0.5 - scanPos) * 26.0, 2.0));
    col += uRimColor * scan * 0.55;

    // Brain core glow bleeding through the cranium
    float coreDist = length(vWorldPos - uCoreWorld);
    float glow = exp(-coreDist * 1.9);
    col += uCoreColor * glow * (0.4 + uPulse * 1.4);

    // Subtle living noise so the surface never looks static
    col *= 0.94 + 0.06 * vnoise(vWorldPos.xy * 6.0 + uTime * 0.4);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ── Eyes: emissive iris on +Z pole, mesh lookAt() drives the gaze ────────────
const eyeVertex = /* glsl */ `
  varying vec3 vLocal;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vLocal = normalize(position);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const eyeFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uIrisColor;
  varying vec3 vLocal;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;

  void main() {
    float z = vLocal.z;
    vec3 v = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - clamp(dot(normalize(vNormalW), v), 0.0, 1.0), 2.0);

    // Dark techno sclera
    vec3 col = vec3(0.01, 0.015, 0.03) + uIrisColor * fres * 0.25;

    // Iris disc + bright ring + dark pupil
    float iris = smoothstep(0.78, 0.86, z);
    float ring = smoothstep(0.80, 0.84, z) * (1.0 - smoothstep(0.88, 0.93, z));
    float pupil = smoothstep(0.965, 0.985, z);

    float flick = 0.85 + 0.15 * sin(uTime * 2.3) * sin(uTime * 5.1);
    col += uIrisColor * iris * (1.6 + uPulse * 2.5) * flick;
    col += uIrisColor * ring * 3.5;
    col -= vec3(1.0) * pupil * 0.9;

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`

// ── Brain: pulsing synaptic point cloud inside the cranium ───────────────────
const brainVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPulse;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    p += 0.05 * vec3(
      sin(uTime * 1.4 + aSeed * 17.0),
      sin(uTime * 1.1 + aSeed * 29.0),
      cos(uTime * 1.7 + aSeed * 11.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.6 + 0.4 * sin(uTime * (1.5 + aSeed * 3.0) + aSeed * 40.0);
    gl_PointSize = (1.6 + aSeed * 2.2) * tw * (1.0 + uPulse * 0.8) * clamp(16.0 / -mv.z, 0.4, 3.0);
    gl_Position = projectionMatrix * mv;
  }
`

const brainFragment = /* glsl */ `
  uniform float uPulse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uColorA, uColorB, vSeed) * (0.9 + uPulse * 1.8);
    gl_FragColor = vec4(col, a * 0.7);
  }
`

export default function CyberHead() {
  const { nodes } = useGLTF(HEAD_URL)
  const geometry = useMemo(
    () => Object.values(nodes).find((n) => n.isMesh)?.geometry,
    [nodes]
  )

  const groupRef = useRef()
  const eyeLRef = useRef()
  const eyeRRef = useRef()
  const lightRef = useRef()

  const headUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uRimColor: { value: new THREE.Color('#00e5ff') },
      uCoreColor: { value: new THREE.Color('#2a7fff') },
      uCoreWorld: {
        value: new THREE.Vector3(
          BRAIN_CENTER[0] * HEAD_SCALE + HEAD_POS[0],
          BRAIN_CENTER[1] * HEAD_SCALE + HEAD_POS[1],
          BRAIN_CENTER[2] * HEAD_SCALE + HEAD_POS[2]
        ),
      },
    }),
    []
  )

  const eyeUniformsL = useMemo(
    () => ({ uTime: { value: 0 }, uPulse: { value: 0 }, uIrisColor: { value: new THREE.Color('#00e5ff') } }),
    []
  )
  const eyeUniformsR = useMemo(
    () => ({ uTime: { value: 0 }, uPulse: { value: 0 }, uIrisColor: { value: new THREE.Color('#00e5ff') } }),
    []
  )

  const brainUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uColorA: { value: new THREE.Color('#00e5ff') },
      uColorB: { value: new THREE.Color('#9d6bff') },
    }),
    []
  )

  // Synaptic cloud filling the upper cranium (raw model space)
  const brainGeo = useMemo(() => {
    const count = 750
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const radii = [1.55, 1.25, 1.35]
    for (let i = 0; i < count; i++) {
      let x, y, z
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
      } while (x * x + y * y + z * z > 1)
      pos[i * 3] = BRAIN_CENTER[0] + x * radii[0]
      pos[i * 3 + 1] = BRAIN_CENTER[1] + y * radii[1]
      pos[i * 3 + 2] = BRAIN_CENTER[2] + z * radii[2]
      seed[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    return g
  }, [])

  const gaze = useMemo(
    () => ({ target: new THREE.Vector3(0, 0.6, 8), tmp: new THREE.Vector3() }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { fx, hovered, phase } = useStore.getState()

    // Energy: spikes on section open (fx.pulse=1), simmers on hover, decays
    const base = hovered ? 0.42 : 0.14
    fx.pulse = THREE.MathUtils.damp(fx.pulse, base, 1.6, delta)
    const pulse = fx.pulse + 0.06 * Math.sin(t * 2.1)

    headUniforms.uTime.value = t
    headUniforms.uPulse.value = pulse
    eyeUniformsL.uTime.value = t
    eyeUniformsL.uPulse.value = pulse
    eyeUniformsR.uTime.value = t
    eyeUniformsR.uPulse.value = pulse
    brainUniforms.uTime.value = t
    brainUniforms.uPulse.value = pulse

    if (lightRef.current) lightRef.current.intensity = 1.4 + pulse * 5.0

    const g = groupRef.current
    if (g) {
      // Breathing float + subtle attention turn toward the cursor
      g.position.y = HEAD_POS[1] + Math.sin(t * 0.55) * 0.05
      const lookX = phase === 'idle' || phase === 'intro' ? state.pointer.x : 0
      const lookY = phase === 'idle' || phase === 'intro' ? state.pointer.y : 0
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, lookX * 0.26, 2.6, delta)
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -lookY * 0.13, 2.6, delta)
    }

    // Eyes track the cursor through a virtual plane near the camera
    gaze.tmp.set(state.pointer.x * 5.0, 0.7 + state.pointer.y * 3.2, 7.5)
    gaze.target.lerp(gaze.tmp, 1 - Math.exp(-7 * delta))
    if (eyeLRef.current) eyeLRef.current.lookAt(gaze.target)
    if (eyeRRef.current) eyeRRef.current.lookAt(gaze.target)
  })

  if (!geometry) return null

  return (
    <group ref={groupRef} position={HEAD_POS} scale={HEAD_SCALE}>
      <mesh geometry={geometry}>
        <shaderMaterial vertexShader={headVertex} fragmentShader={headFragment} uniforms={headUniforms} />
      </mesh>

      {/* Faint wireframe ghost over the shell */}
      <mesh geometry={geometry} scale={1.002}>
        <meshBasicMaterial
          color="#00e5ff"
          wireframe
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={eyeLRef} position={EYE_L}>
        <sphereGeometry args={[EYE_RADIUS, 32, 32]} />
        <shaderMaterial vertexShader={eyeVertex} fragmentShader={eyeFragment} uniforms={eyeUniformsL} />
      </mesh>
      <mesh ref={eyeRRef} position={EYE_R}>
        <sphereGeometry args={[EYE_RADIUS, 32, 32]} />
        <shaderMaterial vertexShader={eyeVertex} fragmentShader={eyeFragment} uniforms={eyeUniformsR} />
      </mesh>

      <points geometry={brainGeo}>
        <shaderMaterial
          vertexShader={brainVertex}
          fragmentShader={brainFragment}
          uniforms={brainUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight ref={lightRef} position={BRAIN_CENTER} color="#3da8ff" intensity={2} distance={9} />
    </group>
  )
}

useGLTF.preload(HEAD_URL)
