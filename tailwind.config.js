/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        /* Cinematic light palette — warm paper + rich charcoal + signal orange */
        primary:        "#EDE6D7",   /* warm paper */
        secondary:      "#EB4E1A",   /* signal orange accent */
        tertiary:       "#FAF5EA",   /* lighter cream surface */

        "black-100":    "#0A0908",   /* rich black */
        "black-200":    "#1A1815",   /* near-black for high contrast */

        "white-100":    "#0A0908",   /* remapped: was light, now reads as primary text */

        "violet-200":   "#7C3AED",
        "dark-green":   "#0F766E",
        "moonstone":    "#EB4E1A",   /* primary accent */
        "maize":        "#D97706",
        "cyan":         "#0E7490",
        "tea-green":    "#0F766E",
        "blue":         "#1939B5",   /* deep cobalt */

        "tech-blue":    "#1939B5",
        "tech-purple":  "#7C3AED",
        "tech-teal":    "#0F766E",
        "tech-pink":    "#DB2777",
        "tech-orange":  "#EB4E1A",
        "tech-cyan":    "#0E7490",

        "dark-blue":    "#0F1E3A",
        "light-bg":     "rgba(255, 255, 255, 0.65)",
        "card-bg":      "rgba(255, 255, 255, 0.7)",
        "card-hover":   "rgba(255, 255, 255, 0.92)",

        "text-primary":   "#0A0908",
        "text-secondary": "#6B6258",

        /* legacy tokens remapped */
        "space-deep":    "#EDE6D7",
        "space-mid":     "#E5DECE",
        "space-surface": "#FAF5EA",
        "nebula-blue":   "#1939B5",
        "nebula-purple": "#7C3AED",
        "nebula-teal":   "#0F766E",
        "star-white":    "#0A0908",

        "ocean-deep":    "#EDE6D7",
        "ocean-medium":  "#1939B5",
        "ocean-light":   "#6B6258",
        "sea-foam":      "#0F766E",
        "coral-pink":    "#DB2777",
        "pearl-white":   "#0A0908",
        "aqua-glow":     "#1939B5",

        /* new cinematic tokens */
        "paper":         "#EDE6D7",
        "paper-light":   "#FAF5EA",
        "paper-dark":    "#DDD4C0",
        "ink":           "#0A0908",
        "ink-soft":      "#1A1815",
        "ash":           "#6B6258",
        "ash-light":     "#9B9388",
        "signal":        "#EB4E1A",
        "cobalt":        "#1939B5",
        "amber":         "#D97706",
      },
      boxShadow: {
        card:         "0 24px 60px -20px rgba(10, 9, 8, 0.18)",
        "tech-card":  "0 8px 32px rgba(10, 9, 8, 0.08), 0 2px 8px rgba(10, 9, 8, 0.04)",
        "glass":      "0 10px 40px rgba(10, 9, 8, 0.08), 0 2px 6px rgba(10, 9, 8, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-hover":"0 24px 60px rgba(10, 9, 8, 0.16), 0 0 0 1px rgba(235, 78, 26, 0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
        "glow-blue":  "0 0 30px rgba(25, 57, 181, 0.18), 0 0 60px rgba(25, 57, 181, 0.08)",
        "glow-orange":"0 0 30px rgba(235, 78, 26, 0.22), 0 0 60px rgba(235, 78, 26, 0.10)",
        "cinematic":  "0 60px 120px -30px rgba(10, 9, 8, 0.4), 0 30px 60px -30px rgba(10, 9, 8, 0.25)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "tech-gradient":      "linear-gradient(135deg, #1939B5, #EB4E1A)",
        "vibrant-gradient":   "linear-gradient(135deg, #1939B5 0%, #7C3AED 33%, #EB4E1A 66%, #D97706 100%)",
        "section-gradient":   "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(250,245,234,0.4) 100%)",
        "card-gradient":      "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(250,245,234,0.55) 100%)",
        "hero-gradient":      "linear-gradient(160deg, #EDE6D7 0%, #FAF5EA 50%, #EDE6D7 100%)",
        "glow-gradient":      "radial-gradient(circle, rgba(235,78,26,0.18) 0%, transparent 70%)",
        "ocean-gradient":     "linear-gradient(180deg, #EDE6D7 0%, #FAF5EA 50%, #EDE6D7 100%)",
        "space-gradient":     "linear-gradient(160deg, #EDE6D7 0%, #FAF5EA 50%, #EDE6D7 100%)",
        "nebula-gradient":    "radial-gradient(ellipse at center, rgba(25,57,181,0.06) 0%, rgba(235,78,26,0.05) 40%, transparent 70%)",
        "paper-grain":        "radial-gradient(at 20% 30%, rgba(235,78,26,0.06) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(25,57,181,0.06) 0%, transparent 50%), radial-gradient(at 50% 90%, rgba(217,119,6,0.05) 0%, transparent 50%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.7)" },
          "50%":      { opacity: "1",   transform: "scale(1.3)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
