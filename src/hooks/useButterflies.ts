import { useCallback, useState } from 'react'
import type { ButterflyState, Fragment } from '../types'

// Curated pastel hues so random assignment never clashes with the dusk theme.
const WING_HUES = [330, 42, 265, 195, 12]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function pickHue(): number {
  return WING_HUES[Math.floor(Math.random() * WING_HUES.length)]
}

function makeButterfly(fragment: Fragment): ButterflyState {
  return {
    id: fragment.id,
    x: randomBetween(14, 86),
    y: randomBetween(16, 80),
    size: randomBetween(0.75, 1.25),
    hue: pickHue(),
    driftDuration: randomBetween(5, 9),
    driftDelay: randomBetween(0, 4),
    flapDuration: randomBetween(0.32, 0.5),
  }
}

// Owns the jar's butterflies and which ones have been caught. Positions and
// colors are regenerated fresh on replay so the jar never looks the same twice.
export function useButterflies(fragments: Fragment[]) {
  const [round, setRound] = useState(0)
  const [butterflies, setButterflies] = useState<ButterflyState[]>(() => fragments.map(makeButterfly))
  const [caughtIds, setCaughtIds] = useState<Set<string>>(() => new Set())

  const catchButterfly = useCallback((id: string) => {
    setCaughtIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const replay = useCallback(() => {
    setButterflies(fragments.map(makeButterfly))
    setCaughtIds(new Set())
    setRound((r) => r + 1)
  }, [fragments])

  const allCaught = fragments.length > 0 && caughtIds.size === fragments.length

  return { butterflies, caughtIds, catchButterfly, replay, allCaught, round }
}
