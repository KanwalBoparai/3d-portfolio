import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useStore } from './store'
import { initScroll } from './scroll'
import SceneRoot from './scene/SceneRoot'
import LoadingScreen from './ui/LoadingScreen'
import Navbar from './ui/Navbar'
import Hero from './ui/Hero'
import Cards from './ui/Cards'
import { Projects, Resume, Experience, Skills, Contact, Footer } from './ui/sections'
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

    const destroyScroll = initScroll()

    return () => {
      mqMobile.removeEventListener('change', syncMobile)
      mqMotion.removeEventListener('change', syncMotion)
      destroyScroll()
    }
  }, [])

  return (
    <>
      {/* The living scene — pinned behind the page */}
      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={[1, isMobile ? 1.75 : 2]}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0.9, 10.8] }}
        >
          <SceneRoot />
        </Canvas>
      </div>

      <Navbar />

      {/* Hero — transparent window onto the scene */}
      <div className="relative z-10 h-screen pointer-events-none">
        <Hero />
      </div>

      {/* Content scrolls up over the stage */}
      <main className="relative z-10">
        <div className="bg-gradient-to-b from-transparent via-cream/88 to-cream h-28 -mt-28 pointer-events-none" />
        <div className="bg-cream">
          <Cards />
          <Projects />
          <Resume />
          <Experience />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </main>

      <LoadingScreen />
      <CustomCursor />
    </>
  )
}
