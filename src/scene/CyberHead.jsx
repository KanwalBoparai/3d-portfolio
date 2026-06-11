import { useEffect, useMemo, useRef } from 'react'
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
const BRAIN_CENTER = [0, 2.85, -0.1]
const CRANIUM_CUT = 2.58 // local y above which the shell opens to expose the brain

// ── Shell: warm porcelain android skin, machined seams, gold-lit cranium rim ──
const headVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const headFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform float uCut;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vLocal;
  ${NOISE}

  void main() {
    // Open cranium — slice the shell to expose the brain
    if (vLocal.y > uCut) discard;

    vec3 v = normalize(cameraPosition - vWorldPos);

    // Interior of the shell reads as dark warm bronze
    if (!gl_FrontFacing) {
      float depth = smoothstep(uCut, uCut - 2.5, vLocal.y);
      vec3 inner = mix(vec3(0.30, 0.22, 0.14), vec3(0.16, 0.12, 0.08), depth);
      gl_FragColor = vec4(inner, 1.0);
      return;
    }

    vec3 n = normalize(vNormal);

    // Soft studio lighting — warm key, cool fill, gold back rim
    float key = dot(n, normalize(vec3(0.45, 0.62, 0.62))) * 0.5 + 0.5;
    float fill = dot(n, normalize(vec3(-0.7, 0.1, 0.35))) * 0.5 + 0.5;
    float rim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.0);
    float back = max(dot(n, normalize(vec3(0.1, 0.25, -1.0))), 0.0);

    vec3 col = vec3(0.965, 0.945, 0.905);            // porcelain base
    col *= 0.62 + 0.40 * pow(key, 1.35);             // form shading
    col += vec3(0.07, 0.075, 0.085) * fill * 0.5;    // cool bounce
    col += vec3(0.85, 0.66, 0.32) * pow(back, 2.0) * 0.16; // champagne back light
    col += vec3(1.0, 0.95, 0.85) * rim * 0.14;       // satin edge sheen

    // Specular — tight porcelain glint + broad satin sheen
    vec3 h = normalize(normalize(vec3(0.45, 0.62, 0.62)) + v);
    float spec = pow(max(dot(n, h), 0.0), 90.0);
    col += vec3(1.0, 0.98, 0.92) * spec * 0.35;
    col += vec3(1.0, 0.97, 0.90) * pow(max(dot(n, h), 0.0), 7.0) * 0.06;

    // Machined center seam down the face
    float seam = smoothstep(0.022, 0.0, abs(vLocal.x)) * smoothstep(0.2, 0.7, vLocal.z);
    col *= 1.0 - seam * 0.16;

    // Faint lateral panel partings around the temples
    float panel = smoothstep(0.018, 0.0, abs(length(vLocal.xz - vec2(0.0, -0.4)) - 2.45));
    col *= 1.0 - panel * 0.10;

    // Gold machined rim where the cranium opens
    float lip = smoothstep(uCut - 0.5, uCut, vLocal.y);
    col = mix(col, vec3(0.80, 0.63, 0.33), lip * 0.6);
    col += vec3(1.2, 0.9, 0.45) * smoothstep(uCut - 0.08, uCut, vLocal.y) * (0.45 + uPulse * 0.9);

    // Inner glow bleeding softly through the upper shell
    float crown = smoothstep(0.8, 2.4, vLocal.y);
    col += vec3(1.0, 0.82, 0.46) * crown * (0.05 + uPulse * 0.16);

    // Barely-there surface life
    col *= 0.985 + 0.015 * vnoise(vLocal.xy * 5.0 + uTime * 0.25);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ── Eyes: warm luminous iris on a satin dark lens, lookAt() drives the gaze ──
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
  varying vec3 vLocal;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;

  void main() {
    float z = vLocal.z;
    vec3 v = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - clamp(dot(normalize(vNormalW), v), 0.0, 1.0), 2.2);

    // Smoked-glass lens housing
    vec3 col = vec3(0.10, 0.085, 0.07) + vec3(0.9, 0.75, 0.5) * fres * 0.22;

    float iris = smoothstep(0.60, 0.72, z);
    float ring = smoothstep(0.63, 0.68, z) * (1.0 - smoothstep(0.82, 0.90, z));
    float pupil = smoothstep(0.955, 0.98, z);

    float breathe = 0.9 + 0.1 * sin(uTime * 1.7);
    vec3 gold = vec3(1.0, 0.78, 0.40);
    col += gold * iris * (2.1 + uPulse * 1.8) * breathe;
    col += gold * ring * 3.2;
    col -= vec3(1.0) * pupil * 0.9;

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`

// ── Brain: warm synaptic cloud rising out of the open cranium ────────────────
const brainVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPulse;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    p += 0.045 * vec3(
      sin(uTime * 1.2 + aSeed * 17.0),
      sin(uTime * 0.9 + aSeed * 29.0),
      cos(uTime * 1.5 + aSeed * 11.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.6 + 0.4 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 40.0);
    gl_PointSize = (2.0 + aSeed * 2.6) * tw * (1.0 + uPulse * 0.7) * clamp(16.0 / -mv.z, 0.4, 3.0);
    gl_Position = projectionMatrix * mv;
  }
`

const brainFragment = /* glsl */ `
  uniform float uPulse;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.06, d);
    vec3 warm = mix(vec3(1.25, 0.92, 0.45), vec3(1.15, 0.62, 0.45), step(0.7, vSeed));
    gl_FragColor = vec4(warm * (1.3 + uPulse * 1.6), a * 0.85);
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
      uCut: { value: CRANIUM_CUT },
    }),
    []
  )

  const eyeUniformsL = useMemo(() => ({ uTime: { value: 0 }, uPulse: { value: 0 } }), [])
  const eyeUniformsR = useMemo(() => ({ uTime: { value: 0 }, uPulse: { value: 0 } }), [])
  const brainUniforms = useMemo(() => ({ uTime: { value: 0 }, uPulse: { value: 0 } }), [])

  // Synaptic cloud cresting through the cranium opening (raw model space)
  const brainGeo = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const radii = [1.45, 1.05, 1.25]
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

  // Drag-to-rotate (precise pointers only — touch keeps native scrolling)
  const drag = useRef({ on: false, x: 0, vel: 0, yaw: 0 })
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const down = (e) => {
      if (e.target.tagName === 'CANVAS') {
        drag.current.on = true
        drag.current.x = e.clientX
      }
    }
    const move = (e) => {
      if (!drag.current.on) return
      drag.current.vel += (e.clientX - drag.current.x) * 0.0035
      drag.current.x = e.clientX
    }
    const up = () => {
      drag.current.on = false
    }
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { fx, hovered } = useStore.getState()

    // Energy: spikes on node click, simmers on hover, settles low
    const base = hovered ? 0.45 : 0.16
    fx.pulse = THREE.MathUtils.damp(fx.pulse, base, 1.6, delta)
    const pulse = fx.pulse + 0.05 * Math.sin(t * 1.8)

    headUniforms.uTime.value = t
    headUniforms.uPulse.value = pulse
    eyeUniformsL.uTime.value = t
    eyeUniformsL.uPulse.value = pulse
    eyeUniformsR.uTime.value = t
    eyeUniformsR.uPulse.value = pulse
    brainUniforms.uTime.value = t
    brainUniforms.uPulse.value = pulse

    if (lightRef.current) lightRef.current.intensity = 0.8 + pulse * 2.2

    const g = groupRef.current
    if (g) {
      // Inertial drag yaw, slowly relaxing back to center.
      // Range stays tight — the wires are anchored in world space, so a wide
      // turn would clip the shell through them.
      drag.current.yaw = THREE.MathUtils.clamp(drag.current.yaw + drag.current.vel, -0.5, 0.5)
      drag.current.vel *= Math.exp(-5 * delta)
      drag.current.yaw = THREE.MathUtils.damp(drag.current.yaw, 0, 0.35, delta)

      // Slow living rotation + breathing float + cursor attention
      g.position.y = HEAD_POS[1] + Math.sin(t * 0.5) * 0.045
      const sway = Math.sin(t * 0.16) * 0.12
      g.rotation.y = THREE.MathUtils.damp(
        g.rotation.y,
        sway + state.pointer.x * 0.15 + drag.current.yaw,
        2.2,
        delta
      )
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.08, 2.2, delta)
    }

    // Eyes track the cursor through a virtual plane near the camera
    gaze.tmp.set(state.pointer.x * 5.0, 0.65 + state.pointer.y * 3.0, 7.5)
    gaze.target.lerp(gaze.tmp, 1 - Math.exp(-7 * delta))
    if (eyeLRef.current) eyeLRef.current.lookAt(gaze.target)
    if (eyeRRef.current) eyeRRef.current.lookAt(gaze.target)
  })

  if (!geometry) return null

  return (
    <group ref={groupRef} position={HEAD_POS} scale={HEAD_SCALE}>
      <mesh geometry={geometry}>
        <shaderMaterial
          vertexShader={headVertex}
          fragmentShader={headFragment}
          uniforms={headUniforms}
          side={THREE.DoubleSide}
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

      {/* Soft warm light source inside the open cranium */}
      <pointLight ref={lightRef} position={BRAIN_CENTER} color="#ffc26e" intensity={1} distance={8} />
    </group>
  )
}

useGLTF.preload(HEAD_URL)
