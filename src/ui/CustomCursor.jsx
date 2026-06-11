import { useEffect, useRef } from 'react'
import { useStore } from '../store'
import { sectionById } from '../scene/lib'

// Crosshair cursor — dot snaps to pointer, ring trails it. Desktop only.
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
        const color = hovered ? sectionById(hovered)?.color ?? '#00e5ff' : 'rgba(0,229,255,0.5)'
        const scale = hovered ? 1.6 : 1
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${scale})`
        ringRef.current.style.borderColor = color
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
      <div
        ref={dotRef}
        className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-cyber-cyan rounded-full shadow-[0_0_6px_#00e5ff]"
      />
      <div
        ref={ringRef}
        className="absolute -top-[14px] -left-[14px] w-7 h-7 border rounded-full transition-[border-color] duration-200"
      />
    </div>
  )
}
