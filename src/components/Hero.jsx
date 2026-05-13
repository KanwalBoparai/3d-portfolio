import { motion } from "framer-motion";
import { AvatarScene } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* Cinematic background — large warm orbs */}
      <div
        aria-hidden
        className="absolute top-[10%] right-[8%] w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(235, 78, 26, 0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[10%] left-[8%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(25, 57, 181, 0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-16 w-full pt-28 pb-16">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <span className="section-num">01 · INTRO</span>
          <div className="status-chip">
            <span className="status-dot" />
            Open to opportunities · UWaterloo
          </div>
        </motion.div>

        {/* Hero grid — asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[80vh]">

          {/* Left: text content — 7 cols */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="mb-3"
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-[#0A0908]/6 text-[#0A0908]/65"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Full-stack developer · CS @ Waterloo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-display font-bold leading-[0.95] tracking-tight mb-7 text-[#0A0908]"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.035em",
              }}
            >
              Building at the
              <br />
              <span className="italic font-medium" style={{
                background: "linear-gradient(120deg, #EB4E1A 0%, #D97706 60%, #1939B5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                intersection
              </span>
              <br />
              of code <span className="text-[#EB4E1A]">&</span> craft.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#3D3935] text-[17px] sm:text-[19px] leading-[1.6] mb-9 max-w-[52ch]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I&rsquo;m Kanwal — I ship software that&rsquo;s fast, beautiful, and
              built to last. Currently studying Computer Science at the University of Waterloo,
              shipping full-stack products on the side.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative overflow-hidden px-7 py-3.5 rounded-xl text-[#FAF5EA] font-semibold text-[14px]"
                style={{
                  background: "linear-gradient(135deg, #EB4E1A 0%, #D97706 100%)",
                  boxShadow: "0 10px 30px rgba(235, 78, 26, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-xl font-semibold text-[14px] text-[#0A0908] border border-[#0A0908]/12 hover:border-[#0A0908]/25 bg-white/40 backdrop-blur-sm transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Get in Touch
              </motion.button>

              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
                className="hidden sm:flex items-center gap-2 px-4 py-3.5 rounded-xl text-[#6B6258] hover:text-[#0A0908] border border-[#0A0908]/8 hover:border-[#0A0908]/15 bg-white/30 hover:bg-white/55 transition-all"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}
              >
                <kbd className="px-1.5 py-0.5 text-[10px] bg-[#0A0908]/8 border border-[#0A0908]/10 rounded">⌘K</kbd>
                <span>Quick nav</span>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-[480px]"
            >
              {[
                { num: "5+", label: "Years coding" },
                { num: "20+", label: "Projects shipped" },
                { num: "∞",  label: "Cups of coffee" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-[#0A0908]/12 pl-4">
                  <p
                    className="font-display font-bold text-[#0A0908] mb-1"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#6B6258]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: avatar — 5 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            {/* Halo behind avatar */}
            <div
              aria-hidden
              className="absolute inset-[-40px] rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(235,78,26,0.12) 0%, rgba(25,57,181,0.06) 50%, transparent 75%)",
                filter: "blur(30px)",
              }}
            />

            {/* Avatar canvas frame */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: "clamp(420px, 60vw, 620px)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(250,245,234,0.25) 100%)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(10, 9, 8, 0.08)",
                boxShadow: "0 32px 80px -20px rgba(10, 9, 8, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <AvatarScene />

              {/* Corner crosshair marks for editorial feel */}
              <div aria-hidden className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#0A0908]/30 pointer-events-none" />
              <div aria-hidden className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#0A0908]/30 pointer-events-none" />
              <div aria-hidden className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[#0A0908]/30 pointer-events-none" />
              <div aria-hidden className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[#0A0908]/30 pointer-events-none" />

              {/* Top tag */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2">
                <span
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#0A0908] text-[#FAF5EA]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Avatar · Live
                </span>
              </div>
            </div>

            {/* Floating "currently building" badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="absolute -bottom-5 -left-5 ink-panel px-4 py-3 flex items-center gap-3"
            >
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#FAF5EA]/60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Currently building
                </p>
                <p className="text-[13px] text-[#FAF5EA] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  3D Portfolio v2
                </p>
              </div>
            </motion.div>

            {/* Floating tech stack chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="absolute -top-3 -right-3 glass rounded-xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#EB4E1A] animate-pulse" />
              <span className="text-[11px] font-mono text-[#0A0908]/85" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                React · Three.js · TS
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-[#6B6258] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Scroll</span>
          <a href="#about" aria-label="Scroll to about" className="block">
            <div className="w-[26px] h-[42px] rounded-full border border-[#0A0908]/25 flex justify-center items-start p-1.5 bg-white/30 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
                className="w-1.5 h-1.5 rounded-full bg-[#EB4E1A]"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
