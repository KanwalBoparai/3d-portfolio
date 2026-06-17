// Editorial hero backdrop, behind the statue / canvas. A brushed silver-to-
// graphite radial (tuned to the statue photo's own background so the image melts
// in) + a giant ghosted wordmark + grid columns. Also the full backdrop on
// reduced-motion / no-WebGL, so nothing depends on the canvas.
export default function StaticHero() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#16171a]">
      {/* Brushed silver spotlight — matches the statue's grey studio background */}
      <div
        className="absolute left-1/2 top-[38%] h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(176,178,186,0.20), transparent 66%)' }}
      />
      {/* Warm orange wash, top */}
      <div
        className="absolute left-1/2 top-[6%] h-[34rem] w-[48rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,126,46,0.10), transparent 64%)' }}
      />

      {/* Faint vertical grid columns */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '20% 100%',
        }}
      />

      {/* GIANT ghosted wordmark — spans the width, behind the subject */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-[55%] flex justify-center">
        <span
          className="select-none whitespace-nowrap font-display font-black uppercase leading-none text-white/[0.05]"
          style={{ fontSize: 'clamp(7rem, 24vw, 24rem)', letterSpacing: '-0.04em' }}
        >
          Boparai
        </span>
      </div>

      {/* Bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </div>
  )
}
