import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the bundle works on Vercel (root) and GitHub Pages (/3d-portfolio/) alike.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1200,
  },
})
