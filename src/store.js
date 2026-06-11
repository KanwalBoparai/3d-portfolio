import { create } from 'zustand'

// Global FSM: boot → intro → idle ⇄ (dive → focus → return)
export const useStore = create((set, get) => ({
  phase: 'boot',
  section: null,
  hovered: null,
  visited: [],
  isMobile: false,
  reducedMotion: false,

  // Mutable per-frame FX bus — written/read inside useFrame without re-renders.
  fx: { pulse: 0, ca: 0 },

  boot: () => set({ phase: 'intro' }),
  introDone: () => set((s) => (s.phase === 'intro' ? { phase: 'idle' } : {})),

  openSection: (id) => {
    const { phase, reducedMotion, fx } = get()
    if (phase === 'focus') {
      // Switching sectors while focused — instant panel swap, camera snaps.
      set((s) => ({ section: id, visited: union(s.visited, id) }))
      fx.pulse = 1
      return
    }
    if (phase !== 'idle') return
    fx.pulse = 1
    set((s) => ({
      section: id,
      phase: reducedMotion ? 'focus' : 'dive',
      visited: union(s.visited, id),
    }))
  },

  arrived: () => set((s) => (s.phase === 'dive' ? { phase: 'focus' } : {})),

  closeSection: () => {
    const { phase, reducedMotion } = get()
    if (phase !== 'focus') return
    if (reducedMotion) set({ phase: 'idle', section: null })
    else set({ phase: 'return' })
  },

  returned: () => set((s) => (s.phase === 'return' ? { phase: 'idle', section: null } : {})),

  setHovered: (id) => set((s) => (s.hovered === id ? {} : { hovered: id })),
  setIsMobile: (isMobile) => set({ isMobile }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}))

const union = (arr, id) => (arr.includes(id) ? arr : [...arr, id])
