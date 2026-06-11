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
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!ready && minTimePassed && !active && progress >= 100) {
      const id = setTimeout(setReady, 300)
      return () => clearTimeout(id)
    }
  }, [ready, minTimePassed, active, progress, setReady])

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
          exit={{ opacity: 0, transition: { duration: 1.1, ease: 'easeInOut' } }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="font-display text-2xl sm:text-3xl text-ink pl-[0.45em]"
          >
            KANWAL BOPARAI
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-3 font-body text-[10px] font-medium tracking-[0.5em] text-gold pl-[0.5em]"
          >
            CYBER MIND
          </motion.span>

          <div className="mt-10 w-44 h-px bg-ink/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold"
              animate={{ width: `${Math.max(progress, minTimePassed ? 40 : 10)}%` }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
