import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import { useStore } from '../store'

// Quiet, luxury veil — lifts on its own once the scene is ready
export default function LoadingScreen() {
  const ready = useStore((s) => s.ready)
  const setReady = useStore((s) => s.setReady)
  const { progress, active } = useProgress()
  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMinTimePassed(true), 1400)
    // Hard safety ceiling: never trap the user behind the veil, even if the
    // loading manager reports nothing (e.g. a fully procedural scene).
    const ceiling = setTimeout(setReady, 4500)
    return () => {
      clearTimeout(id)
      clearTimeout(ceiling)
    }
  }, [setReady])

  useEffect(() => {
    // Lift once the min time has passed and nothing is actively streaming.
    // progress===0 means the manager saw no assets (procedural scene); >=100
    // means real assets (a dropped-in GLB) finished — wait through the middle.
    const settled = !active && (progress >= 100 || progress === 0)
    if (!ready && minTimePassed && settled) {
      const id = setTimeout(setReady, 300)
      return () => clearTimeout(id)
    }
  }, [ready, minTimePassed, active, progress, setReady])

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0, transition: { duration: 1.1, ease: 'easeInOut' } }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="font-display text-2xl sm:text-3xl text-ivory pl-[0.45em]"
          >
            KANWAL BOPARAI
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-3 font-body text-[10px] font-medium tracking-[0.5em] text-cyan pl-[0.5em]"
          >
            SOFTWARE · AI · INTERFACES
          </motion.span>

          <div className="mt-10 w-44 h-px bg-ivory/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-cyan"
              animate={{ width: `${Math.max(progress, minTimePassed ? 40 : 10)}%` }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
