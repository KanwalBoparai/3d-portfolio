import * as THREE from 'three'
import { SECTIONS } from '../data/content'

export const HEAD_CENTER = new THREE.Vector3(0, 0.55, 0)
export const HEAD_SCALE = 0.4
export const HEAD_POS = [0, 0.1, 0]

export const IDLE_CAM = { desktop: new THREE.Vector3(0, 0.55, 7.4), mobile: new THREE.Vector3(0, 0.7, 10.2) }

export const nodePosition = (section, isMobile) =>
  new THREE.Vector3(...(isMobile ? section.mobilePosition : section.position))

// Deterministic per-section lateral swirl so each cable arcs differently.
const SWIRL = { projects: 0.9, experience: -0.9, skills: -0.7, resume: 0.7, contact: 0.5 }

/**
 * The neural cable path from a skull anchor out to its holo node.
 * Shared by the tube renderer and the camera fly-through.
 */
export function buildCableCurve(section, isMobile) {
  const a = new THREE.Vector3(...section.anchor)
  const n = nodePosition(section, isMobile)
  const end = n.clone().add(new THREE.Vector3(0, -0.62, 0))

  const out = a.clone().sub(HEAD_CENTER).normalize()
  const toNode = end.clone().sub(a)
  const side = new THREE.Vector3().crossVectors(toNode, new THREE.Vector3(0, 1, 0)).normalize()
  const swirl = SWIRL[section.id] ?? 0.6

  const m1 = a.clone()
    .add(out.clone().multiplyScalar(0.85))
    .add(side.clone().multiplyScalar(swirl * 0.45))
    .add(new THREE.Vector3(0, 0.35, 0.15))

  const m2 = a.clone().lerp(end, 0.68)
    .add(side.clone().multiplyScalar(-swirl * 0.55))
    .add(new THREE.Vector3(0, -0.25, 0.3))

  return new THREE.CatmullRomCurve3([a, m1, m2, end], false, 'catmullrom', 0.9)
}

/** Where the camera parks when focused on a node. */
export function nodeViewPos(section, isMobile) {
  const n = nodePosition(section, isMobile)
  const out = n.clone().sub(HEAD_CENTER).setY(0).normalize()
  return n.clone()
    .add(out.multiplyScalar(0.55))
    .add(new THREE.Vector3(0, 0.18, isMobile ? 3.4 : 2.6))
}

export const sectionById = (id) => SECTIONS.find((s) => s.id === id)

export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
