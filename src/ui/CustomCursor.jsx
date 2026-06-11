import { useEffect, useRef } from 'react'
import { useStore } from '../store'

// Minimal luxe cursor — ink dot, trailing hairline ring that warms on hover
export default function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (ringRef.current) {
        const hovered = useStore.getState().hovered
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${hovered ? 1.55 : 1})`
        ringRef.current.style.borderColor = hovered ? '#b08d3e' : 'rgba(44, 38, 32, 0.35)'
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      <div ref={dotRef} className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-ink rounded-full" />
      <div
        ref={ringRef}
        className="absolute -top-[14px] -left-[14px] w-7 h-7 border rounded-full transition-[border-color] duration-200"
      />
    </div>
  )
}
