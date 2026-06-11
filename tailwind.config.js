/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4efe6',
        ivory: '#faf7f1',
        sand: '#e9e0cf',
        champagne: '#e3d3b4',
        ink: '#2c2620',
        stone: '#6f6457',
        hairline: 'rgba(44, 38, 32, 0.12)',
        gold: '#b08d3e',
        goldsoft: '#d2b97c',
      },
      fontFamily: {
        display: ['Italiana', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(60, 48, 30, 0.18), 0 6px 18px -8px rgba(60, 48, 30, 0.10)',
        'lift-lg': '0 40px 90px -30px rgba(60, 48, 30, 0.26), 0 10px 28px -12px rgba(60, 48, 30, 0.14)',
      },
    },
  },
  plugins: [],
}
