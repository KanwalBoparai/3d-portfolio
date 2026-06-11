import { create } from 'zustand'

export const useStore = create((set) => ({
  ready: false, // assets loaded, loading veil lifted, intro may play
  hovered: null, // hovered node id
  isMobile: false,
  reducedMotion: false,

  // Mutable per-frame FX bus — written/read inside useFrame without re-renders.
  // pulse: energy surge (node click / hover), scroll: window scrollY in px.
  fx: { pulse: 0, scroll: 0 },

  setReady: () => set({ ready: true }),
  setHovered: (id) => set((s) => (s.hovered === id ? {} : { hovered: id })),
  setIsMobile: (isMobile) => set({ isMobile }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}))
