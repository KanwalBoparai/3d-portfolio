import { useEffect, useState } from 'react'
import { SECTIONS, profile } from '../data/content'
import { scrollToSection } from '../scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-hairline' : ''
      }`}
    >
      <nav className="max-w-[100rem] mx-auto flex items-center justify-between px-6 sm:px-10 h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-lg font-bold uppercase tracking-tight text-ivory"
          aria-label="Back to top"
        >
          Boparai<span className="ml-0.5 align-super text-[9px] text-ivory/50">™</span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="font-body text-[12px] font-medium uppercase tracking-[0.12em] text-ivory/65 hover:text-ivory transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink bg-cyan rounded-full px-4 py-2 hover:bg-aqua transition-colors duration-300"
        >
          Hire me
        </a>
      </nav>
    </header>
  )
}
