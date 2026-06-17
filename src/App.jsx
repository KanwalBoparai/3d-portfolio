import { Suspense, lazy, useEffect, useState } from 'react'
import { useStore } from './store'
import { initScroll } from './scroll'
import StaticHero from './ui/StaticHero'
import StatueHero from './ui/StatueHero'
import LoadingScreen from './ui/LoadingScreen'
import Navbar from './ui/Navbar'
import Hero from './ui/Hero'
import Cards from './ui/Cards'
import { Projects, Resume, Experience, Skills, Contact, Footer } from './ui/sections'
import CustomCursor from './ui/CustomCursor'

// 3D stage is code-split: zero WebGL/three in the initial bundle.
const Stage3D = lazy(() => import('./scene/Stage3D'))

// One cheap probe — some devices/browsers have no WebGL at all.
function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export default function App() {
  const isMobile = useStore((s) => s.isMobile)
  const [canRender3D, setCanRender3D] = useState(false)
  // null = checking, true = statue image present (replaces the robot), false = robot
  const [hasStatue, setHasStatue] = useState(null)

  useEffect(() => {
    const { setIsMobile, setReducedMotion, setReady } = useStore.getState()

    const mqMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMobile = () => setIsMobile(mqMobile.matches)
    const syncMotion = () => setReducedMotion(mqMotion.matches)
    syncMobile()
    syncMotion()
    mqMobile.addEventListener('change', syncMobile)
    mqMotion.addEventListener('change', syncMotion)

    const ok = !mqMotion.matches && webglAvailable()
    setCanRender3D(ok)
    if (!ok) setReady()

    const destroyScroll = initScroll()
    return () => {
      mqMobile.removeEventListener('change', syncMobile)
      mqMotion.removeEventListener('change', syncMotion)
      destroyScroll()
    }
  }, [])

  // Look for the marble-bust hero image. Present → it's the centerpiece and the
  // 3D canvas is skipped entirely (clean, image-based hero). Absent → robot.
  useEffect(() => {
    let alive = true
    fetch(`${import.meta.env.BASE_URL}hero/statue.png`, { method: 'HEAD' })
      .then((r) => {
        if (!alive) return
        setHasStatue(r.ok)
        if (r.ok) useStore.getState().setReady()
      })
      .catch(() => alive && setHasStatue(false))
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      {/* Pinned stage — metallic poster + ghosted wordmark, then the hero subject */}
      <div className="fixed inset-0 z-0">
        <StaticHero />
        {hasStatue && <StatueHero />}
        {canRender3D && hasStatue === false && (
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <Stage3D isMobile={isMobile} />
            </Suspense>
          </div>
        )}
        {/* Bottom vignette — anchors the subject and keeps hero copy legible */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      </div>

      <Navbar />

      {/* Hero copy — transparent window onto the stage */}
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
