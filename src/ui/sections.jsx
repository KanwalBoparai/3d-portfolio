import { motion } from 'framer-motion'
import {
  profile, projects, githubRepos, experiences, skillCategories, proficiency, education,
} from '../data/content'

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

function SectionShell({ id, code, title, intro, children }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
      <motion.div {...reveal}>
        <div className="flex items-baseline gap-4">
          <span className="font-body text-[11px] font-medium tracking-[0.35em] text-gold">{code}</span>
          <span className="font-body text-[11px] font-medium tracking-[0.35em] text-stone">{title.toUpperCase()}</span>
          <span className="flex-1 rule" />
        </div>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl text-ink tracking-wide">{title}</h2>
        {intro && (
          <p className="mt-4 font-body text-[15px] font-light leading-relaxed text-stone max-w-2xl">{intro}</p>
        )}
      </motion.div>
      <div className="mt-12">{children}</div>
    </section>
  )
}

const Pill = ({ children }) => (
  <span className="font-body text-[10px] font-medium tracking-[0.2em] text-gold border border-gold/35 rounded-full px-3 py-1">
    {children}
  </span>
)

const Arrow = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group/link inline-flex items-center gap-2 font-body text-[11px] font-medium tracking-[0.25em] text-ink hover:text-gold transition-colors"
  >
    {children}
    <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">↗</span>
  </a>
)

// ── 01 PROJECTS ───────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <SectionShell
      id="projects"
      code="01"
      title="Projects"
      intro="Production AI products and interactive builds — designed, engineered and shipped end-to-end."
    >
      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.08 }}
            className="group grid lg:grid-cols-[1fr_auto] gap-6 bg-ivory/70 border border-hairline rounded-2xl p-7 sm:p-9 shadow-lift hover:shadow-lift-lg transition-shadow duration-500"
          >
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="font-display text-3xl text-ink tracking-wide">{p.name}</h3>
                <Pill>{p.status}</Pill>
              </div>
              <p className="mt-4 font-body text-[15px] font-light leading-relaxed text-stone max-w-3xl">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {p.tags.map((t) => (
                  <span key={t} className="font-body text-[11px] font-medium tracking-[0.18em] text-stone">
                    <span className="text-gold mr-1.5">·</span>
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex lg:flex-col items-start gap-5 lg:justify-center lg:pl-8 lg:border-l border-hairline">
              {p.live && <Arrow href={p.live}>LIVE</Arrow>}
              <Arrow href={p.source}>SOURCE</Arrow>
            </div>
          </motion.article>
        ))}
      </div>

      {/* More from GitHub */}
      <motion.div {...reveal} className="mt-14">
        <div className="flex items-baseline gap-4">
          <span className="font-body text-[11px] font-medium tracking-[0.3em] text-stone">MORE ON GITHUB</span>
          <span className="flex-1 rule" />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {githubRepos.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-ivory/60 border border-hairline rounded-xl p-5 hover:border-gold/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-sm font-medium text-ink group-hover:text-gold transition-colors">
                  {r.name}
                </span>
                <span className="text-gold">↗</span>
              </div>
              <div className="mt-2 font-body text-[11px] font-light tracking-[0.12em] text-stone">
                {r.note} · {r.language} · {r.year}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <Arrow href={profile.github}>ALL REPOSITORIES</Arrow>
        </div>
      </motion.div>
    </SectionShell>
  )
}

// ── 02 RESUME ─────────────────────────────────────────────────────────────────
export function Resume() {
  return (
    <SectionShell
      id="resume"
      code="02"
      title="Resume"
      intro={profile.summary}
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <motion.div {...reveal} className="bg-ivory/70 border border-hairline rounded-2xl p-7 sm:p-9 shadow-lift">
          <span className="font-body text-[10px] font-medium tracking-[0.35em] text-gold">EDUCATION</span>
          <h3 className="mt-4 font-display text-3xl text-ink tracking-wide">{education.institution}</h3>
          <p className="mt-1 font-body text-[15px] text-stone">{education.degree}</p>
          <p className="mt-1 font-body text-[12px] font-light tracking-[0.15em] text-stone">{education.duration}</p>
          <ul className="mt-5 space-y-2">
            {education.achievements.map((a) => (
              <li key={a} className="font-body text-sm font-light text-stone flex gap-3">
                <span className="text-gold">◆</span>
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-body text-[13px] font-light leading-relaxed text-stone">
            <span className="font-medium tracking-[0.2em] text-[10px] text-gold mr-2">COURSEWORK</span>
            {education.coursework}
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="bg-ivory/70 border border-hairline rounded-2xl p-7 sm:p-9 shadow-lift flex flex-col"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] text-gold">FULL DOCUMENT</span>
          <h3 className="mt-4 font-display text-3xl text-ink tracking-wide">The PDF</h3>
          <p className="mt-3 font-body text-sm font-light leading-relaxed text-stone">
            The complete résumé — experience, projects, education and contact — in one page.
          </p>
          <div className="mt-auto pt-7 flex flex-wrap gap-4">
            <a
              href={`./${profile.resumeFile}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-ivory rounded-full px-7 py-3 font-body text-[11px] font-medium tracking-[0.25em] hover:bg-gold transition-colors duration-300"
            >
              VIEW RESUME ↓
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink/20 rounded-full px-7 py-3 font-body text-[11px] font-medium tracking-[0.25em] text-ink hover:border-gold hover:text-gold transition-colors duration-300"
            >
              LINKEDIN ↗
            </a>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ── 03 EXPERIENCE ─────────────────────────────────────────────────────────────
export function Experience() {
  return (
    <SectionShell
      id="experience"
      code="03"
      title="Experience"
      intro="Companies, roles and impact — from freelance beginnings to founding and enterprise AI."
    >
      <div className="relative space-y-10 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-hairline">
        {experiences.map((e, i) => (
          <motion.article
            key={e.company}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }}
            className="relative pl-10"
          >
            <span className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full border-2 border-gold bg-ivory" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-2xl text-ink tracking-wide">{e.company}</h3>
              <span className="font-body text-sm text-stone">{e.title}</span>
            </div>
            <div className="mt-1 font-body text-[11px] font-medium tracking-[0.2em] text-gold">
              {e.date.toUpperCase()} <span className="text-stone font-light">— {e.location.toUpperCase()}</span>
            </div>
            <ul className="mt-3 space-y-2 max-w-3xl">
              {e.points.map((pt, j) => (
                <li key={j} className="font-body text-sm font-light leading-relaxed text-stone flex gap-3">
                  <span className="text-gold/70 shrink-0 mt-0.5">—</span>
                  {pt}
                </li>
              ))}
            </ul>
            {e.link && (
              <div className="mt-3">
                <Arrow href={e.link}>VISIT SITE</Arrow>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </SectionShell>
  )
}

// ── 04 SKILLS ─────────────────────────────────────────────────────────────────
export function Skills() {
  return (
    <SectionShell
      id="skills"
      code="04"
      title="Skills"
      intro="Comfortable across TypeScript, Python, LLMs and the modern web stack — frontend craft to production AI systems."
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {skillCategories.map((c, i) => (
            <motion.div
              key={c.category}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="bg-ivory/70 border border-hairline rounded-2xl p-6 shadow-lift"
            >
              <h3 className="font-display text-xl text-ink tracking-wide">{c.category}</h3>
              <div className="mt-2 w-8 rule" />
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {c.skills.map((s) => (
                  <span key={s} className="font-body text-[13px] font-light text-stone">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          className="bg-ivory/70 border border-hairline rounded-2xl p-7 shadow-lift h-fit"
        >
          <h3 className="font-display text-xl text-ink tracking-wide">Signal strength</h3>
          <div className="mt-6 space-y-5">
            {proficiency.map((p) => (
              <div key={p.skill}>
                <div className="flex justify-between font-body text-[11px] font-medium tracking-[0.18em] text-stone">
                  <span>{p.skill.toUpperCase()}</span>
                  <span className="text-gold">{p.level}</span>
                </div>
                <div className="mt-1.5 h-px bg-ink/10 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-goldsoft"
                    style={{ height: 2, top: -0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ── 05 CONTACT ────────────────────────────────────────────────────────────────
export function Contact() {
  const rows = [
    { k: 'EMAIL', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'PHONE', v: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
    { k: 'GITHUB', v: 'github.com/KanwalBoparai', href: profile.github },
    { k: 'LINKEDIN', v: 'linkedin.com/in/kgsbopar', href: profile.linkedin },
  ]
  return (
    <SectionShell id="contact" code="05" title="Contact">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <motion.div {...reveal}>
          <h3 className="font-display text-4xl sm:text-5xl text-ink leading-tight tracking-wide">
            Have a project in mind?
            <br />
            Let’s build something <span className="text-gold">amazing</span>.
          </h3>
          <p className="mt-5 font-body text-[15px] font-light leading-relaxed text-stone max-w-md">
            Open to internships, collaborations and zero-to-one builds. Based in {profile.location} — happy to work
            anywhere.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-3 bg-ink text-ivory rounded-full px-8 py-4 font-body text-[11px] font-medium tracking-[0.3em] hover:bg-gold transition-colors duration-300"
          >
            GET IN TOUCH →
          </a>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="space-y-3">
          {rows.map((r) => (
            <a
              key={r.k}
              href={r.href}
              target={r.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-baseline gap-5 bg-ivory/70 border border-hairline rounded-xl px-6 py-4 hover:border-gold/50 transition-colors duration-300"
            >
              <span className="font-body text-[10px] font-medium tracking-[0.3em] text-gold w-20 shrink-0">{r.k}</span>
              <span className="font-body text-sm font-light text-stone group-hover:text-ink transition-colors break-all">
                {r.v}
              </span>
              <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-xl text-ink">
          K<span className="text-gold">.</span>
        </span>
        <p className="font-body text-[11px] font-light tracking-[0.2em] text-stone text-center">
          DESIGNED & BUILT BY {profile.name.toUpperCase()} — REACT THREE FIBER · GLSL · {new Date().getFullYear()}
        </p>
        <div className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-body text-[11px] font-medium tracking-[0.2em] text-stone hover:text-gold transition-colors">GH</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-body text-[11px] font-medium tracking-[0.2em] text-stone hover:text-gold transition-colors">IN</a>
          <a href={`mailto:${profile.email}`} className="font-body text-[11px] font-medium tracking-[0.2em] text-stone hover:text-gold transition-colors">@</a>
        </div>
      </div>
    </footer>
  )
}
