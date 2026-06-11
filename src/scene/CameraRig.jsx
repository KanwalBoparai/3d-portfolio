import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../store'
import { HEAD_CENTER, IDLE_CAM, easeOutCubic } from './lib'

const BASE_FOV = 50

export default function CameraRig() {
  const ready = useStore((s) => s.ready)
  const isMobile = useStore((s) => s.isMobile)
  const { camera } = useThree()

  const introStart = useRef(null)
  const look = useRef(HEAD_CENTER.clone())
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const base = isMobile ? IDLE_CAM.mobile : IDLE_CAM.desktop

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { fx, reducedMotion } = useStore.getState()

    // Scroll progress over the first viewport — eases the stage away
    const s = Math.min(fx.scroll / window.innerHeight, 1)

    if (!ready) {
      camera.position.set(base.x, base.y + 0.4, base.z + 3.6)
      camera.lookAt(look.current.copy(HEAD_CENTER))
      return
    }

    if (introStart.current === null) introStart.current = t
    const introT = reducedMotion ? 1 : Math.min((t - introStart.current) / 2.4, 1)
    const intro = easeOutCubic(introT)

    const px = state.pointer.x
    const py = state.pointer.y

    tmp.set(
      base.x + px * 0.45 + Math.sin(t * 0.2) * 0.05,
      base.y + 0.4 * (1 - intro) + py * 0.28 + Math.sin(t * 0.45) * 0.04 + s * 1.4,
      base.z + 3.6 * (1 - intro) + s * 1.8
    )
    easing.damp3(camera.position, tmp, 0.55, delta)

    easing.damp3(
      look.current,
      tmp.set(HEAD_CENTER.x + px * 0.2, HEAD_CENTER.y + py * 0.12 + s * 0.5, 0),
      0.6,
      delta
    )
    camera.lookAt(look.current)

    easing.damp(camera, 'fov', BASE_FOV + s * 4, 0.5, delta)
    camera.updateProjectionMatrix()
  })

  return null
}
