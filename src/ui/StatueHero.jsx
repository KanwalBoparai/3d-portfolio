import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// The marble-bust hero image (Lovera-style), as the centerpiece in place of the
// 3D robot. Drop your render at public/hero/statue.png. Its own grey background
// is feathered at the edges so it melts into the matching graphite stage, with
// a subtle cursor parallax for life.
export default function StatueHero() {
  const ref = useRef()

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 18
      const dy = (e.clientY / window.innerHeight - 0.5) * 12
      if (ref.current) ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.img
        ref={ref}
        src={`${import.meta.env.BASE_URL}hero/statue.png`}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-1/2 h-[60vh] w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-300 ease-out will-change-transform select-none md:h-[94vh]"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 80% at 50% 42%, #000 58%, transparent 90%)',
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 42%, #000 58%, transparent 90%)',
        }}
        draggable={false}
      />
    </div>
  )
}
