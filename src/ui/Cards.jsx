import { motion } from 'framer-motion'
import { cards } from '../data/content'
import { scrollToSection } from '../scroll'

// Preview card grid under the hero — mirrors the concept's 01–05 + X layout
export default function Cards() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-ivory/70 backdrop-blur-sm border border-hairline rounded-2xl p-7 shadow-lift hover:shadow-lift-lg hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            {/* Soft gold bloom in the corner */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-goldsoft/30 to-transparent blur-2xl group-hover:from-goldsoft/50 transition-all duration-700" />

            <div className="relative">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-[10px] font-medium tracking-[0.3em] text-gold">{c.code}</span>
                <span className="flex-1 rule" />
              </div>
              <h3 className="mt-5 font-display text-3xl text-ink tracking-wide">{c.title}</h3>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-stone min-h-[3.5rem]">
                {c.blurb}
              </p>

              {c.tech ? (
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                  {c.tech.map((t) => (
                    <li key={t} className="font-body text-[10px] font-medium tracking-[0.18em] text-stone">
                      <span className="text-gold mr-1.5">·</span>
                      {t.toUpperCase()}
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  onClick={() => scrollToSection(c.id)}
                  className="mt-5 inline-flex items-center gap-2 border border-ink/20 rounded-full px-5 py-2 font-body text-[10px] font-medium tracking-[0.25em] text-ink group-hover:border-gold group-hover:text-gold transition-colors duration-300"
                >
                  {c.cta.toUpperCase()}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
