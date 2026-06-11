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
        scrolled ? 'bg-cream/80 backdrop-blur-md border-b border-hairline' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl tracking-wide text-ink"
          aria-label="Back to top"
        >
          K<span className="text-gold">.</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="font-body text-[11px] font-medium tracking-[0.22em] text-stone hover:text-ink transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="font-body text-[11px] font-medium tracking-[0.22em] text-gold border border-gold/40 rounded-full px-4 py-1.5 hover:bg-gold hover:text-ivory transition-all duration-300"
        >
          HIRE ME
        </a>
      </nav>
    </header>
  )
}
