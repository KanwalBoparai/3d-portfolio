/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // NOTE: editorial direction (Lovera). The token named `cyan` is now the
        // ORANGE accent and `aqua` a lighter orange — repointed to flip the whole
        // UI without renaming hundreds of class strings. `gold*` are unused.
        // Elegant graphite + silver to sync with the marble/chrome statue.
        cream: '#16171a',
        ivory: '#ececee',
        sand: '#e9e0cf',
        champagne: '#e3d3b4',
        ink: '#16171a',
        stone: '#9a9aa2',
        hairline: 'rgba(255, 255, 255, 0.10)',
        gold: '#b08d3e',
        goldsoft: '#d2b97c',
        cyan: '#ff7e2e', // flame (accent — matches the lens reflection)
        aqua: '#ffa75a', // ember (light accent)
        silver: '#c8c8cd',
        graphite: '#202024',
      },
      fontFamily: {
        // Big, neutral, editorial grotesque — Helvetica on Mac, Arial elsewhere.
        display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(0, 0, 0, 0.5), 0 6px 18px -8px rgba(0, 0, 0, 0.4)',
        'lift-lg': '0 40px 90px -30px rgba(0, 0, 0, 0.6), 0 10px 28px -12px rgba(0, 0, 0, 0.5)',
        neon: '0 22px 70px -30px rgba(255, 126, 46, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
}
