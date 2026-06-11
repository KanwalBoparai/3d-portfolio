import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import { sectionById } from '../scene/lib'
import { ProjectsPanel, ExperiencePanel, SkillsPanel, ResumePanel, ContactPanel } from './panels'

const PANELS = {
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  resume: ResumePanel,
  contact: ContactPanel,
}

export default function SectionOverlay() {
  const phase = useStore((s) => s.phase)
  const section = useStore((s) => s.section)
  const closeSection = useStore((s) => s.closeSection)

  const sec = section ? sectionById(section) : null
  const Panel = sec ? PANELS[sec.id] : null
  const show = phase === 'focus' && sec && Panel

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={sec.id}
          className="fixed inset-0 z-30 flex items-center justify-center px-4 sm:px-8 pt-28 sm:pt-32 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* click-out backdrop, edges darkened only — the scene stays visible */}
          <button
            aria-label="Close section"
            onClick={closeSection}
            className="absolute inset-0 cursor-default"
            style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,4,10,0.8) 100%)' }}
          />

          <motion.section
            initial={{ opacity: 0, y: 26, scale: 0.975 }}
            animate={{
              opacity: [0, 1, 0.65, 1],
              y: 0,
              scale: 1,
              transition: { duration: 0.55, times: [0, 0.4, 0.55, 1], ease: 'easeOut' },
            }}
            exit={{ opacity: 0, y: 18, scale: 0.985, transition: { duration: 0.28 } }}
            className="relative w-full max-w-3xl max-h-full flex flex-col bg-[rgba(4,8,18,0.93)] backdrop-blur-xl border border-white/10"
            style={{ boxShadow: `0 0 60px ${sec.color}22, 0 30px 80px rgba(0,0,0,0.6)` }}
          >
            {/* corner brackets */}
            <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2" style={{ borderColor: sec.color }} />
            <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2" style={{ borderColor: sec.color }} />
            <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2" style={{ borderColor: sec.color }} />
            <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2" style={{ borderColor: sec.color }} />

            <header className="flex items-center gap-4 px-5 sm:px-7 py-4 border-b border-white/10 shrink-0">
              <span className="font-mono text-[9px] tracking-[0.3em] text-faint">{sec.code}</span>
              <h2
                className="font-display text-base sm:text-xl font-bold tracking-[0.25em]"
                style={{ color: sec.color, textShadow: `0 0 18px ${sec.color}88` }}
              >
                {sec.label}
              </h2>
              <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <button
                onClick={closeSection}
                aria-label="Disconnect"
                className="ml-auto font-mono text-[11px] tracking-[0.2em] text-faint hover:text-cyber-magenta transition-colors"
              >
                [ESC]
              </button>
            </header>

            <div className="panel-scroll overflow-y-auto px-5 sm:px-7 py-6">
              <Panel color={sec.color} />
            </div>

            <footer className="px-5 sm:px-7 py-2.5 border-t border-white/10 font-mono text-[8px] tracking-[0.3em] text-faint shrink-0">
              {`MEMORY SECTOR ${sec.code.split(' ')[1]} // DECRYPTED // KB.NEURAL-LINK`}
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
