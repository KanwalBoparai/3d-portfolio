import * as THREE from 'three'
import { SECTIONS } from '../data/content'

export const HEAD_CENTER = new THREE.Vector3(0, 0.55, 0)
export const HEAD_SCALE = 0.46
export const HEAD_POS = [0, 0.3, 0]

export const IDLE_CAM = { desktop: new THREE.Vector3(0, 0.55, 6.7), mobile: new THREE.Vector3(0, 0.4, 10.8) }

export const nodePosition = (section, isMobile) =>
  new THREE.Vector3(...(isMobile ? section.mobilePosition : section.position))

// Per-section lateral swirl so each wire sweeps around the head differently.
const SWIRL = { projects: 1.0, experience: -1.0, skills: 0.65, resume: -0.65, contact: 0.0 }

/**
 * Wire path: emerges from behind the open cranium, rises briefly, sweeps out
 * around the side of the head, then flows gracefully down to its node.
 * Shared by the strand renderer and any camera choreography.
 */
export function buildCableCurve(section, isMobile) {
  const a = new THREE.Vector3(...section.anchor)
  const n = nodePosition(section, isMobile)
  const end = n.clone().add(new THREE.Vector3(0, 0.42, 0)) // plug from above

  const centered = n.x === 0
  const sideSign = Math.sign(n.x) || (SWIRL[section.id] >= 0 ? 1 : -1)
  const swirl = SWIRL[section.id] ?? 0.5

  // Slip backward out of the cranium — no upward antenna loop
  const m1 = a.clone().add(new THREE.Vector3(sideSign * 0.3, 0.1, -0.6))

  if (centered) {
    // Center node (contact): fall straight down the back of the bust, then
    // swing forward beneath the chin — never across the face.
    const m2 = new THREE.Vector3(sideSign * 0.85, 0.3, -1.05)
    const m3 = new THREE.Vector3(sideSign * 0.35, end.y - 0.15, -0.35)
    return new THREE.CatmullRomCurve3([a, m1, m2, m3, end], false, 'catmullrom', 0.6)
  }

  // Sweep around the side of the head, staying behind the face plane
  const m2 = new THREE.Vector3(
    sideSign * (2.55 + Math.abs(swirl) * 0.4),
    0.95 + Math.abs(swirl) * 0.2,
    -0.55
  )

  // Glide down toward the node, easing forward only once clear of the head
  const m3 = new THREE.Vector3(
    n.x * 0.95 + sideSign * 0.25,
    (m2.y + end.y) * 0.5 - 0.2,
    n.z * 0.45
  )

  return new THREE.CatmullRomCurve3([a, m1, m2, m3, end], false, 'catmullrom', 0.6)
}

export const sectionById = (id) => SECTIONS.find((s) => s.id === id)

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
