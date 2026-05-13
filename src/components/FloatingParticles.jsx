// Particles are computed at module load — synchronous, zero layout shift on mount.
const COLORS = ["#E8F4FD", "#93C5FD", "#C4B5FD", "#FEF3C7", "#34D399", "#4A9EFF"];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  // Deterministic spread — avoids hydration mismatches and layout shifts
  left:     ((i * 41 + 7)  % 97),
  top:      ((i * 73 + 13) % 95),
  size:     1 + (i % 3),           // 1 – 3 px
  duration: 2.5 + (i % 5) * 0.8,  // 2.5 – 6.3 s
  delay:    -(i * 0.55),           // stagger start mid-cycle: no initial mass-pop-in
  color:    COLORS[i % COLORS.length],
}));

const FloatingParticles = () => (
  <div className="floating-particles">
    {PARTICLES.map((p) => (
      <div
        key={p.id}
        className="particle"
        style={{
          left:            `${p.left}%`,
          top:             `${p.top}%`,
          width:           `${p.size}px`,
          height:          `${p.size}px`,
          background:      p.color,
          boxShadow:       `0 0 ${p.size * 3}px ${p.color}`,
          animation:       `starTwinkle ${p.duration}s ease-in-out infinite`,
          animationDelay:  `${p.delay}s`,
        }}
      />
    ))}
  </div>
);

export default FloatingParticles;
