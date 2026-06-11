import { motion } from 'framer-motion'
import { profile, projects, proficiency } from '../data/content'

const panel = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
}

const compactProjects = projects.slice(0, 3)
const compactSkills = proficiency.slice(0, 4)

function StatusDot({ active = true }) {
  return (
    <span
      className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-cyan' : 'bg-gold'} shadow-[0_0_14px_currentColor]`}
    />
  )
}

function GlassPanel({ className = '', delay = 0, children }) {
  return (
    <motion.div
      {...panel}
      transition={{ ...panel.transition, delay }}
      className={`pointer-events-auto relative overflow-hidden rounded-lg border border-cyan/18 bg-ink/42 shadow-neon backdrop-blur-md ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/75 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(118,229,255,0.055)_1px,transparent_1px)] bg-[length:100%_10px] opacity-50" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

export default function HeroDashboard() {
  return (
    <>
      <GlassPanel delay={1.0} className="absolute left-6 bottom-[14vh] hidden w-[18rem] p-5 lg:block">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] font-semibold tracking-[0.28em] text-cyan">ACTIVE BUILDS</span>
          <StatusDot />
        </div>
        <div className="mt-5 space-y-4">
          {compactProjects.map((project, index) => (
            <div key={project.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-body text-xs font-medium tracking-[0.16em] text-ivory">
                  {project.name.toUpperCase()}
                </span>
                <span className="font-body text-[10px] tracking-[0.18em] text-gold">{project.status}</span>
              </div>
              <div className="mt-2 h-px bg-ivory/10">
                <motion.div
                  className="h-px bg-gradient-to-r from-cyan to-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${92 - index * 12}%` }}
                  transition={{ duration: 1.3, delay: 1.25 + index * 0.14, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel delay={1.12} className="absolute right-6 top-[16vh] hidden w-[17rem] p-5 xl:block">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] font-semibold tracking-[0.28em] text-cyan">CORE SIGNAL</span>
          <span className="font-body text-[10px] tracking-[0.22em] text-ivory/60">LIVE</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-ivory/10 bg-ivory/[0.035] p-3">
            <div className="font-body text-[10px] tracking-[0.22em] text-gold">FOCUS</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-ivory">AI</div>
          </div>
          <div className="rounded-md border border-ivory/10 bg-ivory/[0.035] p-3">
            <div className="font-body text-[10px] tracking-[0.22em] text-gold">BASE</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-ivory">UW</div>
          </div>
        </div>
        <p className="mt-4 font-body text-xs font-light leading-relaxed text-ivory/68">
          {profile.title} operating across agents, full-stack products, and immersive interfaces.
        </p>
      </GlassPanel>

      <GlassPanel delay={1.24} className="absolute right-6 bottom-[15vh] hidden w-[19rem] p-5 lg:block">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] font-semibold tracking-[0.28em] text-cyan">STACK MATRIX</span>
          <StatusDot active={false} />
        </div>
        <div className="mt-5 space-y-3">
          {compactSkills.map((skill) => (
            <div key={skill.skill} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <span className="font-body text-[11px] font-medium tracking-[0.16em] text-ivory/80">
                {skill.skill.toUpperCase()}
              </span>
              <span className="font-body text-[10px] tracking-[0.18em] text-cyan">{skill.level}%</span>
              <div className="col-span-2 h-1 overflow-hidden rounded-full bg-ivory/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-aqua to-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.25, delay: 1.36, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.9, duration: 1.2 }}
        className="absolute left-1/2 top-[50%] hidden h-[54vh] w-[54vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10 lg:block"
      >
        <div className="absolute inset-7 rounded-full border border-gold/10" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      </motion.div>
    </>
  )
}
