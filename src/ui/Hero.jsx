import { motion } from 'framer-motion'
import { useStore } from '../store'
import { profile } from '../data/content'
import { scrollToSection } from '../scroll'
import HeroDashboard from './HeroDashboard'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ready = useStore((s) => s.ready)
  if (!ready) return null

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <HeroDashboard />

      {/* Copy block */}
      <div className="absolute left-6 sm:left-10 lg:left-16 top-[13vh] max-w-md">
        <motion.p
          {...fadeUp(0.5)}
          className="font-body text-[11px] sm:text-xs font-medium tracking-[0.45em] text-cyan"
        >
          FULL-STACK ENGINEER
        </motion.p>
        <motion.h1
          {...fadeUp(0.65)}
          className="mt-2 font-display text-5xl sm:text-6xl lg:text-7xl tracking-[0.04em] text-ivory leading-none drop-shadow-[0_0_24px_rgba(118,229,255,0.18)]"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          {...fadeUp(0.85)}
          className="mt-5 font-body text-sm sm:text-[15px] font-light leading-relaxed text-ivory/72 max-w-xs"
        >
          {profile.summary.split('.')[0]}. {profile.tagline}.
        </motion.p>
        <motion.div {...fadeUp(1.0)} className="mt-3 w-12 rule" />
        <motion.button
          {...fadeUp(1.15)}
          onClick={() => scrollToSection('projects')}
          className="pointer-events-auto mt-7 group inline-flex items-center gap-3 rounded-lg border border-cyan/28 bg-ink/35 px-6 py-3 font-body text-[11px] font-medium tracking-[0.26em] text-ivory backdrop-blur-md hover:border-cyan hover:text-cyan transition-colors duration-300"
        >
          ENTER EXPERIENCE
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </motion.button>
      </div>

      {/* Drag hint — lower right */}
      <motion.div
        {...fadeUp(1.5)}
        className="absolute right-6 sm:right-10 lg:right-16 bottom-[9vh] hidden md:flex items-center gap-2 font-body text-[10px] font-medium tracking-[0.3em] text-ivory/54"
      >
        DRAG TO ROTATE
        <span className="text-cyan text-sm">⟲</span>
      </motion.div>

      {/* Scroll cue — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] font-medium tracking-[0.4em] text-ivory/58">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </div>
  )
}
