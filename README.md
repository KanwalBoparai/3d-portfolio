# NEURAL//LINK — Kanwal Boparai's 3D Portfolio

A cinematic, interactive 3D portfolio. A cybernetic head floats in a dark futuristic
environment — its eyes track your cursor, neural cables run from its skull to five
holographic nodes (**Projects · Experience · Skills · Resume · Contact**), and clicking
a node or its cable flies the camera along the wire into that memory sector.

Inspired by *Ghost in the Shell*, *Cyberpunk 2077* and *Deus Ex*.

## Experience

- **Boot sequence** — terminal-style BIOS boot, then "ESTABLISH LINK" to jack in
- **Living head** — cursor-tracked eyes, attention-turning head, breathing float,
  pulsing synaptic point-cloud brain that glows through the cranium
- **Neural cables** — energy packets race along each wire; hover to charge them
- **Cinematic camera** — curve-based fly-throughs along the cables, FOV swell and
  chromatic-aberration surge mid-flight, damped glide while focused
- **Atmosphere** — volumetric light shafts, drifting particle dust, holographic
  radar floor, procedural nebula dome, CRT scanlines
- **HUD** — live telemetry (clock, FPS, link status), nav rail, sector tracking

## Tech

| Layer | Stack |
| --- | --- |
| Rendering | Three.js + React Three Fiber + drei |
| Shaders | Hand-written GLSL (head shell, eyes, brain, cables, holo-nodes, floor, dome, shafts) |
| Post | `postprocessing` — Bloom, SMAA, ChromaticAberration, Noise, Vignette |
| State | zustand FSM (`boot → intro → idle ⇄ dive → focus → return`) |
| UI | React 19, Tailwind CSS, Framer Motion |
| Build | Vite |

Performance: capped DPR, additive shader materials with no per-frame geometry
rebuilds, reduced particle counts + trimmed post chain on mobile, `prefers-reduced-motion`
honored (camera cuts instead of flights).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint
```

`scripts/probe.mjs` is a dev-only Playwright smoke test that boots the experience
headlessly and screenshots each interaction state (`npm i --no-save playwright-core`).

## Credits

- Head scan geometry: [Lee Perry-Smith](http://ir-ltd.net/) (Infinite Realities),
  CC-BY 3.0 — via the [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/LeePerrySmith)
- Fonts: Orbitron, Rajdhani, JetBrains Mono (self-hosted via Fontsource)

Built by [Kanwal Boparai](https://github.com/KanwalBoparai).
