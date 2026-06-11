import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import { useStore } from '../store'

const BOOT_LINES = [
  '> NEURAL-LINK BIOS v2.077 — KB SYSTEMS',
  '> MOUNTING CORTEX............... OK',
  '> CALIBRATING OPTIC TRACKERS.... OK',
  '> SPLICING NEURAL CABLES [5/5].. OK',
  '> SYNAPTIC MESH: 9,279 VERTICES ONLINE',
  '> MEMORY SECTORS INDEXED: PROJECTS / EXPERIENCE / SKILLS / RESUME / CONTACT',
]

export default function LoadingScreen() {
  const phase = useStore((s) => s.phase)
  const boot = useStore((s) => s.boot)
  const { progress, active } = useProgress()
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    if (lineCount >= BOOT_LINES.length) return
    const id = setTimeout(() => setLineCount((c) => c + 1), 260 + Math.random() * 240)
    return () => clearTimeout(id)
  }, [lineCount])

  const assetsReady = !active && progress >= 100
  const bootDone = lineCount >= BOOT_LINES.length
  const ready = assetsReady && bootDone
  // Blend real asset progress with the staged boot sequence
  const shown = Math.min(progress * 0.6 + (lineCount / BOOT_LINES.length) * 40, 100)

  return (
    <AnimatePresence>
      {phase === 'boot' && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void px-6"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl"
          >
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[0.25em] text-cyber-cyan animate-flicker">
              KANWAL<span className="text-white/80">.SYS</span>
            </h1>
            <p className="mt-2 font-mono text-[11px] sm:text-xs tracking-[0.4em] text-ghost">
              NEURAL INTERFACE PORTFOLIO
            </p>

            <div className="mt-10 min-h-[150px] font-mono text-[10px] sm:text-xs leading-relaxed text-cyber-cyan/70">
              {BOOT_LINES.slice(0, lineCount).map((l) => (
                <div key={l}>{l}</div>
              ))}
              {!ready && <span className="inline-block w-2 h-3.5 bg-cyber-cyan/80 animate-pulse align-middle" />}
            </div>

            <div className="mt-6 h-px w-full bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-cyber-cyan shadow-[0_0_12px_#00e5ff]"
                animate={{ width: `${shown}%` }}
                transition={{ ease: 'easeOut', duration: 0.4 }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-faint">
              <span>SYS.BOOT</span>
              <span>{Math.round(shown)}%</span>
            </div>

            <div className="mt-10 h-14 flex items-center">
              {ready && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={boot}
                  className="group relative px-8 py-3 font-display text-sm tracking-[0.3em] text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] transition-all duration-300"
                >
                  <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-cyber-cyan" />
                  <span className="absolute -top-px -right-px w-2 h-2 border-t border-r border-cyber-cyan" />
                  <span className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-cyber-cyan" />
                  <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-cyber-cyan" />
                  ESTABLISH LINK ▸
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
