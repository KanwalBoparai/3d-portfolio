import { Suspense, lazy, useEffect, useState } from 'react'
import { useStore } from './store'
import { initScroll } from './scroll'
import StaticHero from './ui/StaticHero'
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
  const reducedMotion = useStore((s) => s.reducedMotion)
  const [canRender3D, setCanRender3D] = useState(false)

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

    // Render the canvas only when motion is allowed AND WebGL exists; otherwise
    // the static poster is the hero and we lift the loading veil immediately.
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

  return (
    <>
      {/* Pinned stage — static poster first paint, 3D streams in over it */}
      <div className="fixed inset-0 z-0">
        <StaticHero />
        {canRender3D && (
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <Stage3D isMobile={isMobile} />
            </Suspense>
          </div>
        )}
      </div>

      <Navbar />

      {/* Hero copy — transparent window onto the stage */}
      <div className="relative z-10 h-screen pointer-events-none">
        <Hero showDragHint={canRender3D && !reducedMotion} />
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
