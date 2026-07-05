import { useCallback, useState } from 'react'
import type { ButterflyState, Fragment } from '../types'

// Curated pastel hues so random assignment never clashes with the dusk theme.
const WING_HUES = [330, 42, 265, 195, 12]

// Interior width/height ratio of the jar (it's taller than it is wide),
// used so the placement grid below is portrait rather than square.
const JAR_INTERIOR_ASPECT = 0.76

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function pickHue(): number {
  return WING_HUES[Math.floor(Math.random() * WING_HUES.length)]
}

// Scatters `count` points across a shuffled grid (with jitter) instead of
// pure uniform random positions, so butterflies stay visually separated
// instead of clumping together and hiding each other in a small jar.
function scatterPositions(count: number): { x: number; y: number }[] {
  const cols = Math.max(1, Math.round(Math.sqrt(count * JAR_INTERIOR_ASPECT)))
  const rows = Math.ceil(count / cols)
  const cellW = 100 / cols
  const cellH = 100 / rows

  const cells = Array.from({ length: rows * cols }, (_, i) => i)
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }

  return Array.from({ length: count }, (_, i) => {
    const col = cells[i] % cols
    const row = Math.floor(cells[i] / cols)
    const x = col * cellW + cellW / 2 + randomBetween(-0.28, 0.28) * cellW
    const y = row * cellH + cellH / 2 + randomBetween(-0.28, 0.28) * cellH
    return {
      x: Math.min(94, Math.max(6, x)),
      y: Math.min(94, Math.max(6, y)),
    }
  })
}

function makeButterflies(fragments: Fragment[]): ButterflyState[] {
  const positions = scatterPositions(fragments.length)
  return fragments.map((fragment, i) => ({
    id: fragment.id,
    x: positions[i].x,
    y: positions[i].y,
    size: randomBetween(0.75, 1.15),
    hue: pickHue(),
    driftDuration: randomBetween(5, 9),
    driftDelay: randomBetween(0, 4),
    flapDuration: randomBetween(0.32, 0.5),
  }))
}

// Owns the jar's butterflies and which ones have been tapped free. Positions
// and colors are regenerated fresh on replay so the jar never looks the same
// twice. Whether a tapped butterfly's phrase has actually settled into the
// message card is tracked separately, by CarrierProvider.
export function useButterflies(fragments: Fragment[]) {
  const [round, setRound] = useState(0)
  const [butterflies, setButterflies] = useState<ButterflyState[]>(() => makeButterflies(fragments))
  const [takenIds, setTakenIds] = useState<Set<string>>(() => new Set())

  const takeButterfly = useCallback((id: string) => {
    setTakenIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const replay = useCallback(() => {
    setButterflies(makeButterflies(fragments))
    setTakenIds(new Set())
    setRound((r) => r + 1)
  }, [fragments])

  return { butterflies, takenIds, takeButterfly, replay, round }
}
