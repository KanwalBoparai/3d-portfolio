import { motion } from 'framer-motion'
import {
  profile, projects, experiences, skillCategories, proficiency,
  education, leadership, interests,
} from '../data/content'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const Chip = ({ children, color = '#00e5ff' }) => (
  <span
    className="px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] border rounded-sm"
    style={{ borderColor: `${color}55`, color }}
  >
    {children}
  </span>
)

const LinkBtn = ({ href, children, color = '#00e5ff' }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="px-3 py-1 font-mono text-[10px] tracking-[0.2em] border transition-all hover:bg-white/5"
    style={{ borderColor: `${color}66`, color }}
  >
    {children} ↗
  </a>
)

// ── PROJECTS ──────────────────────────────────────────────────────────────────
export function ProjectsPanel({ color }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {projects.map((p) => (
        <motion.article key={p.name} variants={item} className="border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-sm sm:text-base font-bold tracking-[0.15em] text-white">
              {p.name.toUpperCase()}
            </h3>
            <Chip color={color}>{p.status}</Chip>
          </div>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-ghost">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="font-mono text-[9px] tracking-[0.12em] text-faint">[{t}]</span>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {p.source && <LinkBtn href={p.source} color={color}>SOURCE</LinkBtn>}
            {p.live && <LinkBtn href={p.live} color="#00ff9d">LIVE</LinkBtn>}
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
export function ExperiencePanel({ color }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="relative space-y-6">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      {experiences.map((e) => (
        <motion.article key={e.company} variants={item} className="relative pl-7">
          <span
            className="absolute left-0 top-1.5 w-[11px] h-[11px] rotate-45 border"
            style={{ borderColor: color, backgroundColor: e.status === 'QUEUED' ? 'transparent' : `${color}33` }}
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-[13px] sm:text-sm font-bold tracking-[0.12em] text-white">{e.title.toUpperCase()}</h3>
            <span className="font-body text-[14px] text-ghost">@ {e.company}</span>
            <Chip color={e.status === 'QUEUED' ? '#ffb300' : color}>{e.status === 'QUEUED' ? 'UPCOMING' : e.status}</Chip>
          </div>
          <div className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-faint">{e.date}</div>
          <ul className="mt-2 space-y-1.5">
            {e.points.map((pt, i) => (
              <li key={i} className="font-body text-[14px] leading-relaxed text-ghost flex gap-2">
                <span style={{ color }} className="shrink-0">▸</span>
                {pt}
              </li>
            ))}
          </ul>
          {e.link && (
            <div className="mt-3">
              <LinkBtn href={e.link} color={color}>VISIT SITE</LinkBtn>
            </div>
          )}
        </motion.article>
      ))}
    </motion.div>
  )
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
export function SkillsPanel({ color }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {skillCategories.map((c) => (
          <motion.div key={c.code} variants={item} className="border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] px-1.5 py-0.5 border" style={{ borderColor: `${color}66`, color }}>
                {c.code}
              </span>
              <h3 className="font-display text-[12px] font-bold tracking-[0.15em] text-white">
                {c.category.toUpperCase()}
              </h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {c.skills.map((s) => (
                <span key={s} className="font-body text-[13px] text-ghost">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="border border-white/10 bg-white/[0.02] p-4">
        <h3 className="font-display text-[12px] font-bold tracking-[0.15em] text-white">SIGNAL STRENGTH</h3>
        <div className="mt-4 space-y-3">
          {proficiency.map((p) => (
            <div key={p.skill}>
              <div className="flex justify-between font-mono text-[10px] tracking-[0.15em] text-ghost">
                <span>{p.skill.toUpperCase()}</span>
                <span style={{ color }}>{p.level}%</span>
              </div>
              <div className="mt-1 h-1 bg-white/5">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── RESUME / DOSSIER ──────────────────────────────────────────────────────────
export function ResumePanel({ color }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.p variants={item} className="font-body text-[15px] leading-relaxed text-ghost">
        {profile.bio}
      </motion.p>

      <motion.div variants={item} className="border border-white/10 bg-white/[0.02] p-5">
        <div className="font-mono text-[9px] tracking-[0.3em] text-faint">EDUCATION</div>
        <h3 className="mt-2 font-display text-[13px] font-bold tracking-[0.1em] text-white">
          {education.degree.toUpperCase()}
        </h3>
        <div className="font-body text-[14px] text-ghost">{education.institution}</div>
        <div className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-faint">{education.duration}</div>
        <ul className="mt-3 space-y-1">
          {education.achievements.map((a) => (
            <li key={a} className="font-body text-[14px] text-ghost flex gap-2">
              <span style={{ color }} className="shrink-0">◆</span>{a}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-body text-[13px] text-faint">
          <span className="font-mono text-[9px] tracking-[0.2em]">COURSEWORK //</span> {education.coursework}
        </p>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
        {leadership.map((l) => (
          <div key={l.title} className="border border-white/10 bg-white/[0.02] p-4">
            <h4 className="font-display text-[11px] font-bold tracking-[0.1em] text-white">{l.title.toUpperCase()}</h4>
            <div className="font-mono text-[9px] tracking-[0.15em]" style={{ color }}>{l.org.toUpperCase()}</div>
            <p className="mt-2 font-body text-[13px] leading-relaxed text-ghost">{l.detail}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap gap-2">
        {interests.map((i) => (
          <Chip key={i} color={color}>{i}</Chip>
        ))}
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
        <LinkBtn href={`mailto:${profile.email}?subject=Resume%20Request`} color={color}>REQUEST FULL RESUME</LinkBtn>
        <LinkBtn href={profile.linkedin} color={color}>LINKEDIN</LinkBtn>
      </motion.div>
    </motion.div>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
export function ContactPanel({ color }) {
  const rows = [
    { k: 'EMAIL', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'ACADEMIC', v: profile.schoolEmail, href: `mailto:${profile.schoolEmail}` },
    { k: 'GITHUB', v: 'github.com/KanwalBoparai', href: profile.github },
    { k: 'LINKEDIN', v: 'linkedin.com/in/kanwalboparai', href: profile.linkedin },
  ]
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.p variants={item} className="font-body text-[15px] leading-relaxed text-ghost">
        Channel open. Whether it&apos;s an internship, a collaboration, or you just want to talk
        shaders and LLM agents — transmissions are welcome.
      </motion.p>

      <motion.div variants={item} className="space-y-2">
        {rows.map((r) => (
          <a
            key={r.k}
            href={r.href}
            target={r.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-white/25 transition-colors group"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-faint w-20 shrink-0">{r.k}</span>
            <span className="font-mono text-[12px] sm:text-[13px] text-ghost group-hover:text-white transition-colors break-all">
              {r.v}
            </span>
            <span className="ml-auto font-mono text-[10px]" style={{ color }}>↗</span>
          </a>
        ))}
      </motion.div>

      <motion.div variants={item} className="font-mono text-[10px] tracking-[0.2em] text-faint">
        NODE LOCATION // {profile.location.toUpperCase()}
      </motion.div>

      <motion.a
        variants={item}
        href={`mailto:${profile.email}`}
        className="inline-block px-8 py-3 font-display text-xs tracking-[0.3em] border transition-all hover:bg-white/5"
        style={{ borderColor: color, color, boxShadow: `0 0 24px ${color}33` }}
      >
        OPEN TRANSMISSION ▸
      </motion.a>
    </motion.div>
  )
}
