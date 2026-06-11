/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#02040a',
        abyss: '#050a14',
        cyber: {
          cyan: '#00e5ff',
          magenta: '#ff2e88',
          amber: '#ffb300',
          violet: '#9d6bff',
          green: '#00ff9d',
        },
        ghost: 'rgba(190, 222, 255, 0.62)',
        faint: 'rgba(120, 160, 200, 0.35)',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        flicker: 'flicker 4s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 91%, 94%, 98%, 100%': { opacity: '1' },
          '92%': { opacity: '0.6' },
          '96%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
