/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#071116',
        ivory: '#faf7f1',
        sand: '#e9e0cf',
        champagne: '#e3d3b4',
        ink: '#071116',
        stone: '#7f9196',
        hairline: 'rgba(118, 229, 255, 0.14)',
        gold: '#b08d3e',
        goldsoft: '#d2b97c',
        cyan: '#76e5ff',
        aqua: '#2fe6c8',
        graphite: '#101a1f',
      },
      fontFamily: {
        display: ['Italiana', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(60, 48, 30, 0.18), 0 6px 18px -8px rgba(60, 48, 30, 0.10)',
        'lift-lg': '0 40px 90px -30px rgba(60, 48, 30, 0.26), 0 10px 28px -12px rgba(60, 48, 30, 0.14)',
        neon: '0 22px 70px -30px rgba(118, 229, 255, 0.36), inset 0 1px 0 rgba(250, 247, 241, 0.08)',
      },
    },
  },
  plugins: [],
}
