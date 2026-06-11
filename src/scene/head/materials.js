import * as THREE from 'three'

export const GOLD = '#c9a35c'
export const GOLD_DEEP = '#a87f3f'

/** Brushed champagne-gold metal — sockets, rings, halo, trim. */
export const makeGold = (opts = {}) =>
  new THREE.MeshPhysicalMaterial({
    color: GOLD,
    metalness: 1.0,
    roughness: 0.32,
    clearcoat: 0.6,
    clearcoatRoughness: 0.35,
    ...opts,
  })

/** Dark gunmetal — inner skull, mechanical understructure. */
export const makeGunmetal = (opts = {}) =>
  new THREE.MeshStandardMaterial({
    color: '#43444a',
    metalness: 0.92,
    roughness: 0.42,
    ...opts,
  })

/**
 * The facial shell: warm ceramic PBR, surgically patched to add —
 *  - the open-cranium discard (local-space cut so it rotates with the head)
 *  - zoned surfacing: metallic gray rear/ear sections, gold machined collar
 *  - hairline panel seams
 *  - pulsing gold emissive at the cranium rim
 * Uniforms are exposed through material.userData.shader after first compile.
 */
export function makeShellMaterial({ cut }) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#f2ecdf',
    metalness: 0.0,
    roughness: 0.34,
    clearcoat: 0.9,
    clearcoatRoughness: 0.28,
    sheen: 0.25,
    sheenColor: new THREE.Color('#fff6e8'),
  })

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uCut = { value: cut }
    shader.uniforms.uPulse = { value: 0 }

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vLocal;'
      )
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvLocal = position;'
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        varying vec3 vLocal;
        uniform float uCut;
        uniform float uPulse;

        float shellMetalZone(vec3 p) {
          // Rear cranium turns to brushed metal…
          float backZone = smoothstep(-0.45, -1.35, p.z) * smoothstep(-2.2, -0.8, p.y);
          // …as do the ear pods on both sides.
          vec2 e = vec2(abs(p.x) - 3.15, p.y - 0.25);
          float earZone = 1.0 - smoothstep(0.55, 1.05, length(e * vec2(1.0, 0.72)));
          return clamp(max(backZone, earZone), 0.0, 1.0);
        }

        float shellSeams(vec3 p) {
          // Machined center parting down the face
          float seam = smoothstep(0.025, 0.0, abs(p.x)) * smoothstep(0.1, 0.8, p.z);
          // Cheek panel partings — engineered arcs around each side
          float cheek = smoothstep(0.022, 0.0, abs(length(vec2(abs(p.x), p.z) - vec2(0.4, -0.4)) - 2.55));
          // Jaw parting line
          float jaw = smoothstep(0.02, 0.0, abs(p.y + 2.15)) * smoothstep(1.2, 2.2, p.z + abs(p.x) * 0.4);
          return clamp(seam + cheek * 0.7 + jaw * 0.6, 0.0, 1.0);
        }
        `
      )
      .replace(
        '#include <clipping_planes_fragment>',
        'if (vLocal.y > uCut) discard;\n#include <clipping_planes_fragment>'
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
        {
          float mz = shellMetalZone(vLocal);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.392, 0.40, 0.43), mz);

          // Champagne collar where the cranium opens
          float collar = smoothstep(uCut - 0.55, uCut - 0.18, vLocal.y);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.788, 0.624, 0.357), collar);

          diffuseColor.rgb *= 1.0 - shellSeams(vLocal) * 0.22;
        }
        `
      )
      .replace(
        '#include <roughnessmap_fragment>',
        /* glsl */ `#include <roughnessmap_fragment>
        {
          float mz = shellMetalZone(vLocal);
          float collar = smoothstep(uCut - 0.55, uCut - 0.18, vLocal.y);
          roughnessFactor = mix(roughnessFactor, 0.42, mz);
          roughnessFactor = mix(roughnessFactor, 0.3, collar);
        }
        `
      )
      .replace(
        '#include <metalnessmap_fragment>',
        /* glsl */ `#include <metalnessmap_fragment>
        {
          float mz = shellMetalZone(vLocal);
          float collar = smoothstep(uCut - 0.55, uCut - 0.18, vLocal.y);
          metalnessFactor = mix(metalnessFactor, 0.88, max(mz, collar));
        }
        `
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        {
          // Warm light spilling from the open cranium onto the rim
          float rim = smoothstep(uCut - 0.16, uCut, vLocal.y);
          totalEmissiveRadiance += vec3(1.15, 0.85, 0.42) * rim * (0.5 + uPulse * 0.9);
        }
        `
      )

    mat.userData.shader = shader
  }

  return mat
}

/**
 * Inner skull material — same discard mechanic, cut a touch lower for layered
 * depth at the rim, and clipped to the upper skull so it never surfaces at
 * the neck or chest.
 */
export function makeInnerSkullMaterial({ cut, floor = 0.35 }) {
  const mat = makeGunmetal({ roughness: 0.5 })
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uCut = { value: cut }
    shader.uniforms.uFloor = { value: floor }
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocal = position;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocal;\nuniform float uCut;\nuniform float uFloor;')
      .replace(
        '#include <clipping_planes_fragment>',
        'if (vLocal.y > uCut || vLocal.y < uFloor) discard;\n#include <clipping_planes_fragment>'
      )
    mat.userData.shader = shader
  }
  return mat
}
