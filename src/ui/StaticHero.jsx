// Clean, never-blank poster behind the canvas. Visible instantly on first
// paint, while the 3D stage lazy-loads on top — and it's the backdrop for the
// hero copy on reduced-motion / no-WebGL devices, so nothing depends on the
// canvas. The name + tagline live in <Hero>, which renders over this.
export default function StaticHero() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05090d]">
      {/* Cyan core glow where the robot would stand */}
      <div
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(118,229,255,0.22), transparent 62%)' }}
      />
      {/* Faint grid floor */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(118,229,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(118,229,255,0.25) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(circle at 50% 60%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 60%, black, transparent 70%)',
        }}
      />
      {/* Centered avatar glyph — stands in for the 3D bot */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-28 w-28 place-items-center rounded-3xl border border-cyan/30 bg-cyan/[0.04] shadow-neon">
          <div className="h-3 w-12 rounded-full bg-cyan shadow-[0_0_20px_4px_rgba(118,229,255,0.6)]" />
        </div>
      </div>
    </div>
  )
}
