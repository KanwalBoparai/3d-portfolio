import { Canvas } from '@react-three/fiber'
import SceneRoot from './SceneRoot'

// The whole WebGL stage, isolated so App can React.lazy() it — no 3D code is
// in the initial bundle; it streams in only when we decide to render it.
export default function Stage3D({ isMobile }) {
  return (
    <Canvas
      dpr={[1, isMobile ? 1.75 : 2]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0.9, 10.8] }}
    >
      <SceneRoot />
    </Canvas>
  )
}
