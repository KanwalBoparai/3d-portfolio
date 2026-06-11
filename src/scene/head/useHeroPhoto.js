import { useEffect, useState } from 'react'
import * as THREE from 'three'

const HERO_CANDIDATES = ['hero/robot.jpg', 'hero/robot.png', 'hero/robot.webp']

/**
 * Looks for an AI-rendered hero portrait in public/hero/.
 * status: 'loading' → 'ready' (texture set) | 'missing' (procedural fallback).
 */
export function useHeroPhoto() {
  const [result, setResult] = useState({ status: 'loading', texture: null })

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    const tryLoad = (i) => {
      if (i >= HERO_CANDIDATES.length) {
        if (!cancelled) setResult({ status: 'missing', texture: null })
        return
      }
      loader.load(
        `${import.meta.env.BASE_URL}${HERO_CANDIDATES[i]}`,
        (tex) => {
          if (cancelled) return
          tex.colorSpace = THREE.SRGBColorSpace
          tex.anisotropy = 4
          setResult({ status: 'ready', texture: tex })
        },
        undefined,
        () => tryLoad(i + 1)
      )
    }
    tryLoad(0)
    return () => {
      cancelled = true
    }
  }, [])

  return result
}
