# CYBER MIND — Kanwal Boparai's 3D Portfolio

A premium, cinematic interactive 3D portfolio in a warm-white / champagne aesthetic.
An elegant humanoid robot mind floats at the center of the hero — porcelain skin,
glowing gold eyes that track your cursor, and an exposed brain of light cresting
through its open cranium. Luminous wires flow down from behind the head into glass
nodes for **Projects · Resume · Experience · Skills · Contact**; clicking a node (or
its wire) glides you into that section.

Luxury sci-fi, not cyberpunk: Apple-like cleanliness meets interactive art.

## Experience

- **Living head** — slow rotation, cursor attention, breathing float, drag-to-rotate,
  eye tracking; brain particles pulse when you engage a section
- **Wires** — layered bronze strands with soft golden light packets flowing downward
- **Glass nodes** — frosted orbs with hairline gold rings and side label stacks
- **Cinematic page** — full-viewport 3D hero, preview card grid (01–05 + X), then
  full content sections; Lenis smooth scroll with soft camera parallax as you leave
  the stage
- **Quiet boot** — a hairline progress veil lifts into a slow camera dolly

## Content

All content lives in `src/data/content.js` — profile, sections, featured projects,
additional GitHub repos, experience (with locations), skills and education.

**Résumé PDF:** the Resume section links to `./resume.pdf`. Drop your PDF at
`public/resume.pdf` and it ships with the build.

## Tech

| Layer | Stack |
| --- | --- |
| Rendering | Three.js + React Three Fiber + drei |
| Shaders | Hand-written GLSL (porcelain shell with open-cranium discard, eyes, brain cloud, wire cores + light flow, glass orbs, stage floor, ivory dome) |
| Post | `postprocessing` — Bloom (high threshold for emissives on a light bg), SMAA, soft Vignette |
| Motion | Lenis smooth scroll, Framer Motion reveals, maath damping |
| UI | React 19, Tailwind CSS, Italiana + Outfit (self-hosted via Fontsource) |
| Build | Vite |

Performance: capped DPR, no per-frame geometry rebuilds, fewer particles on mobile,
`prefers-reduced-motion` honored (native scroll, no intro dolly).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint
```

`scripts/probe.mjs` is a dev-only Playwright smoke test that loads the experience
headlessly and screenshots each state (`npm i --no-save playwright-core`;
`PROBE_MOBILE=1` for the mobile viewport).

## Credits

- Head scan geometry: [Lee Perry-Smith](http://ir-ltd.net/) (Infinite Realities),
  CC-BY 3.0 — via the [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/LeePerrySmith)
- Fonts: Italiana, Outfit (Fontsource)

Designed & built by [Kanwal Boparai](https://github.com/KanwalBoparai).
