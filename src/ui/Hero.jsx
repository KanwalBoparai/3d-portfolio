import { motion } from 'framer-motion'
import { useStore } from '../store'
import { profile } from '../data/content'
import { scrollToSection } from '../scroll'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

const SERVICES = [
  'Frontend engineering',
  'AI & LLM systems',
  'Full-stack products',
  'Interface & motion',
]

const Eyebrow = () => (
  <p className="font-body text-[11px] font-medium uppercase tracking-[0.4em] text-cyan">
    {profile.name} <span className="text-ivory/40">™</span>
  </p>
)

const Headline = ({ size }) => (
  <h1
    className="font-display font-black uppercase leading-[0.9] tracking-tightest text-ivory"
    style={{ fontSize: size }}
  >
    AI products
    <br />
    <span className="text-cyan">that ship.</span>
  </h1>
)

const Copy = () => (
  <p className="font-body text-sm font-light leading-relaxed text-ivory/70">
    CS @ Waterloo shipping production AI products and interactive web — from LLM
    agents to 3D interfaces. Open to Summer 2026 co-op.
  </p>
)

const Actions = ({ className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <button
      onClick={() => scrollToSection('contact')}
      className="pointer-events-auto font-body text-[11px] font-medium uppercase tracking-[0.25em] text-ivory/70 transition-colors hover:text-ivory"
    >
      Contact
    </button>
    <button
      onClick={() => scrollToSection('projects')}
      className="pointer-events-auto group inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-aqua"
    >
      See work
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
  </div>
)

export default function Hero() {
  const ready = useStore((s) => s.ready)
  if (!ready) return null

  return (
    <div className="absolute inset-0 select-none">
      {/* ── Desktop: editorial split layout ── */}
      <div className="hidden md:block">
        <motion.ul {...fadeUp(0.5)} className="absolute left-10 top-[15vh] space-y-1 lg:left-16">
          {SERVICES.map((s) => (
            <li key={s} className="font-body text-[15px] font-light text-ivory/80">{s}</li>
          ))}
        </motion.ul>

        <div className="absolute bottom-[13vh] left-10 max-w-[12ch] lg:left-16">
          <motion.div {...fadeUp(0.4)} className="mb-4">
            <Eyebrow />
          </motion.div>
          <motion.div {...fadeUp(0.6)}>
            <Headline size="clamp(2.6rem, 6.4vw, 6.6rem)" />
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.9)} className="absolute bottom-[14vh] right-10 max-w-xs text-right lg:right-16">
          <div className="ml-auto">
            <Copy />
          </div>
          <Actions className="mt-6 justify-end" />
        </motion.div>
      </div>

      {/* ── Mobile: stacked at the bottom with a readability scrim ── */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pb-10 pt-24 md:hidden">
        <motion.div {...fadeUp(0.4)} className="mb-3">
          <Eyebrow />
        </motion.div>
        <motion.div {...fadeUp(0.6)}>
          <Headline size="clamp(2.8rem, 15vw, 4.5rem)" />
        </motion.div>
        <motion.div {...fadeUp(0.9)} className="mt-5 max-w-sm">
          <Copy />
          <Actions className="mt-6" />
        </motion.div>
      </div>

      {/* Scroll cue — desktop bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-body text-[9px] font-medium uppercase tracking-[0.4em] text-ivory/45">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </div>
  )
}
