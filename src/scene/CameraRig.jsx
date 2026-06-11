import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../store'
import {
  HEAD_CENTER, IDLE_CAM, buildCableCurve, nodePosition, nodeViewPos,
  sectionById, easeInOutCubic, easeOutCubic,
} from './lib'

const BOOT_POS = new THREE.Vector3(0, 1.7, 16)
const BASE_FOV = 55

/** Offsets a cable point away from the head so the camera skims the wire. */
function skim(curve, t, amount) {
  const p = curve.getPointAt(t)
  const away = p.clone().sub(HEAD_CENTER).normalize().multiplyScalar(amount)
  return p.add(away)
}

export default function CameraRig() {
  const phase = useStore((s) => s.phase)
  const section = useStore((s) => s.section)
  const isMobile = useStore((s) => s.isMobile)
  const { camera } = useThree()

  const flight = useRef(null)
  const look = useRef(HEAD_CENTER.clone())
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const idleBase = isMobile ? IDLE_CAM.mobile : IDLE_CAM.desktop

  useEffect(() => {
    const now = performance.now()

    if (phase === 'intro') {
      flight.current = {
        kind: 'intro',
        curve: new THREE.CatmullRomCurve3([camera.position.clone(), idleBase.clone()]),
        lookFrom: look.current.clone(),
        lookTo: HEAD_CENTER.clone(),
        start: now,
        dur: 3000,
      }
    } else if (phase === 'dive' && section) {
      const sec = sectionById(section)
      const cable = buildCableCurve(sec, isMobile)
      flight.current = {
        kind: 'dive',
        curve: new THREE.CatmullRomCurve3([
          camera.position.clone(),
          skim(cable, 0.3, 0.7),
          skim(cable, 0.72, 0.45),
          nodeViewPos(sec, isMobile),
        ]),
        lookFrom: look.current.clone(),
        lookTo: nodePosition(sec, isMobile),
        start: now,
        dur: 2300,
      }
    } else if (phase === 'return' && section) {
      const sec = sectionById(section)
      const cable = buildCableCurve(sec, isMobile)
      flight.current = {
        kind: 'return',
        curve: new THREE.CatmullRomCurve3([
          camera.position.clone(),
          skim(cable, 0.72, 0.5),
          skim(cable, 0.3, 0.8),
          idleBase.clone(),
        ]),
        lookFrom: look.current.clone(),
        lookTo: HEAD_CENTER.clone(),
        start: now,
        dur: 2000,
      }
    }
  }, [phase, section, isMobile, camera, idleBase])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const store = useStore.getState()
    const { fx } = store
    const f = flight.current

    if (phase === 'boot') {
      camera.position.lerp(tmp.set(Math.sin(t * 0.07) * 1.6, BOOT_POS.y, BOOT_POS.z), 0.04)
      camera.lookAt(look.current.lerp(HEAD_CENTER, 0.05))
      return
    }

    if ((phase === 'intro' || phase === 'dive' || phase === 'return') && f) {
      const raw = Math.min((performance.now() - f.start) / f.dur, 1)
      const e = f.kind === 'intro' ? easeOutCubic(raw) : easeInOutCubic(raw)

      camera.position.copy(f.curve.getPointAt(e))
      look.current.lerpVectors(f.lookFrom, f.lookTo, e)
      camera.lookAt(look.current)

      const swell = Math.sin(Math.PI * e)
      camera.fov = BASE_FOV + (f.kind === 'dive' ? swell * 16 - e * 5 : swell * 6)
      camera.updateProjectionMatrix()
      fx.ca = f.kind === 'intro' ? 0 : swell

      if (raw >= 1) {
        flight.current = null
        fx.ca = 0
        if (f.kind === 'intro') store.introDone()
        else if (f.kind === 'dive') store.arrived()
        else store.returned()
      }
      return
    }

    if (phase === 'focus' && section) {
      // Damped glide — also covers reduced-motion entry and sector switching
      const sec = sectionById(section)
      const view = nodeViewPos(sec, isMobile)
      const node = nodePosition(sec, isMobile)
      view.x += Math.sin(t * 0.4) * 0.06
      view.y += Math.cos(t * 0.33) * 0.04
      easing.damp3(camera.position, view, 0.6, delta)
      easing.damp3(look.current, node, 0.5, delta)
      camera.lookAt(look.current)
      easing.damp(camera, 'fov', 50, 0.4, delta)
      camera.updateProjectionMatrix()
      fx.ca = THREE.MathUtils.damp(fx.ca, 0, 4, delta)
      return
    }

    // Idle — parallax orbit around the head, gentle breathing
    const px = state.pointer.x
    const py = state.pointer.y
    tmp.set(
      idleBase.x + px * 0.6 + Math.sin(t * 0.23) * 0.07,
      idleBase.y + py * 0.4 + Math.sin(t * 0.5) * 0.05,
      idleBase.z
    )
    easing.damp3(camera.position, tmp, 0.85, delta)
    easing.damp3(look.current, tmp.set(HEAD_CENTER.x + px * 0.25, HEAD_CENTER.y + py * 0.15, 0), 0.8, delta)
    camera.lookAt(look.current)
    easing.damp(camera, 'fov', BASE_FOV, 0.5, delta)
    camera.updateProjectionMatrix()
    fx.ca = THREE.MathUtils.damp(fx.ca, 0, 4, delta)
  })

  return null
}
