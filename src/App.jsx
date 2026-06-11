import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useStore } from './store'
import SceneRoot from './scene/SceneRoot'
import LoadingScreen from './ui/LoadingScreen'
import HUD from './ui/HUD'
import SectionOverlay from './ui/SectionOverlay'
import CustomCursor from './ui/CustomCursor'

export default function App() {
  const isMobile = useStore((s) => s.isMobile)

  useEffect(() => {
    const { setIsMobile, setReducedMotion } = useStore.getState()

    const mqMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMobile = () => setIsMobile(mqMobile.matches)
    const syncMotion = () => setReducedMotion(mqMotion.matches)
    syncMobile()
    syncMotion()
    mqMobile.addEventListener('change', syncMobile)
    mqMotion.addEventListener('change', syncMotion)

    const onKey = (e) => {
      if (e.key === 'Escape') useStore.getState().closeSection()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      mqMobile.removeEventListener('change', syncMobile)
      mqMotion.removeEventListener('change', syncMotion)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-void">
      <Canvas
        dpr={[1, isMobile ? 1.75 : 2]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 55, near: 0.1, far: 120, position: [0, 1.7, 16] }}
      >
        <SceneRoot />
      </Canvas>

      <HUD />
      <SectionOverlay />
      <LoadingScreen />

      {/* CRT layer above everything */}
      <div className="scanlines pointer-events-none fixed inset-0 z-40 opacity-60" aria-hidden />

      <CustomCursor />
    </div>
  )
}
