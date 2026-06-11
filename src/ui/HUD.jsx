import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import { SECTIONS, profile } from '../data/content'

function Clock() {
  const [now, setNow] = useState('')
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toISOString().slice(11, 19) + ' UTC')
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{now}</span>
}

function Fps() {
  const [fps, setFps] = useState(60)
  const frames = useRef(0)
  useEffect(() => {
    let raf
    let last = performance.now()
    const loop = (t) => {
      frames.current++
      if (t - last >= 1000) {
        setFps(frames.current)
        frames.current = 0
        last = t
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <span>{String(fps).padStart(3, '0')} FPS</span>
}

const HINTS = {
  idle: '[ SELECT A NEURAL NODE TO JACK IN ]',
  dive: '>> ESTABLISHING UPLINK <<',
  focus: '[ ESC TO DISCONNECT ]',
  return: '<< SEVERING LINK >>',
  intro: '',
}

export default function HUD() {
  const phase = useStore((s) => s.phase)
  const section = useStore((s) => s.section)
  const visited = useStore((s) => s.visited)
  const openSection = useStore((s) => s.openSection)
  const closeSection = useStore((s) => s.closeSection)

  if (phase === 'boot') return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.6 }}
      className="fixed inset-0 z-20 pointer-events-none select-none"
    >
      {/* corner frame */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t border-l border-cyber-cyan/30" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-cyber-cyan/30" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-cyber-cyan/30" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-cyber-cyan/30" />

      {/* top-left identity */}
      <div className="absolute top-6 left-7 sm:top-8 sm:left-10">
        <div className="font-display text-base sm:text-lg font-bold tracking-[0.3em] text-white">
          KB<span className="text-cyber-cyan">▮</span>
        </div>
        <div className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-ghost">
          NEURAL//LINK v2.077
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-faint">
          {profile.name.toUpperCase()} — {profile.title.toUpperCase()}
        </div>
      </div>

      {/* top-right telemetry */}
      <div className="absolute top-6 right-7 sm:top-8 sm:right-10 text-right font-mono text-[9px] sm:text-[10px] leading-relaxed text-ghost">
        <div><Clock /></div>
        <div className="hidden sm:block"><Fps /></div>
        <div>
          LINK: <span className={phase === 'focus' ? 'text-cyber-green' : 'text-cyber-cyan'}>
            {phase === 'focus' ? 'JACKED-IN' : phase === 'idle' ? 'STABLE' : 'SYNCING'}
          </span>
        </div>
        <div className="text-faint">SECTORS {visited.length}/5</div>
      </div>

      {/* left nav rail */}
      <nav className="absolute left-7 sm:left-10 top-1/2 -translate-y-1/2 pointer-events-auto hidden md:flex flex-col gap-3">
        {SECTIONS.map((s) => {
          const active = section === s.id
          return (
            <button
              key={s.id}
              onClick={() => openSection(s.id)}
              className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-faint hover:text-white transition-colors"
              style={active ? { color: s.color } : undefined}
            >
              <span
                className="w-1.5 h-1.5 rotate-45 transition-all duration-300 group-hover:scale-150"
                style={{
                  backgroundColor: active || visited.includes(s.id) ? s.color : 'rgba(120,160,200,0.4)',
                  boxShadow: active ? `0 0 8px ${s.color}` : 'none',
                }}
              />
              {s.label}
            </button>
          )
        })}
      </nav>

      {/* bottom-center hint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 w-max max-w-[92vw] text-center font-mono text-[9px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.3em] text-ghost"
        >
          {HINTS[phase] ?? ''}
        </motion.div>
      </AnimatePresence>

      {/* mobile nav — bottom chips */}
      <nav className="absolute bottom-14 inset-x-4 pointer-events-auto flex md:hidden flex-wrap justify-center gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => openSection(s.id)}
            className="px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] border rounded-sm transition-colors"
            style={{
              borderColor: `${s.color}55`,
              color: section === s.id ? s.color : 'rgba(190,222,255,0.75)',
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* bottom-right channels */}
      <div className="absolute bottom-7 right-7 sm:right-10 pointer-events-auto hidden sm:flex gap-5 font-mono text-[10px] tracking-[0.2em]">
        <a className="text-faint hover:text-cyber-cyan transition-colors" href={profile.github} target="_blank" rel="noreferrer">GITHUB</a>
        <a className="text-faint hover:text-cyber-cyan transition-colors" href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
        <a className="text-faint hover:text-cyber-cyan transition-colors" href={`mailto:${profile.email}`}>EMAIL</a>
      </div>

      {/* disconnect button while focused */}
      <AnimatePresence>
        {phase === 'focus' && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={closeSection}
            className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 pointer-events-auto px-5 py-2 font-mono text-[10px] tracking-[0.3em] text-cyber-magenta border border-cyber-magenta/40 hover:bg-cyber-magenta/10 hover:shadow-[0_0_20px_rgba(255,46,136,0.3)] transition-all"
          >
            ✕ DISCONNECT
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
