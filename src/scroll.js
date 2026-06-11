import Lenis from 'lenis'
import { useStore } from './store'

let lenis = null

export function initScroll() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenis.on('scroll', ({ scroll }) => {
      useStore.getState().fx.scroll = scroll
    })
  } else {
    window.addEventListener(
      'scroll',
      () => {
        useStore.getState().fx.scroll = window.scrollY
      },
      { passive: true }
    )
  }
  return () => lenis?.destroy()
}

/** Smooth-scroll to a section by id ('projects', 'contact', …). */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  useStore.getState().fx.pulse = 1
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'auto', block: 'start' })
}
