import { useMemo } from 'react'
import type { CSSProperties } from 'react'

const HUES = [330, 42, 265, 195, 12]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

interface DecorativeStyle extends CSSProperties {
  '--drift-duration': string
  '--drift-delay': string
  '--flap-duration': string
  '--butterfly-size': number
  '--wing-hue': number
}

// Purely ambient — the butterflies she just caught, set loose again around
// the finale. No click handling, no repel, just a slow celebratory drift.
export function CelebrationButterflies({ count = 5 }: { count?: number }) {
  const butterflies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: randomBetween(6, 94),
        y: randomBetween(8, 92),
        size: randomBetween(0.9, 1.5),
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        driftDuration: randomBetween(7, 12),
        driftDelay: randomBetween(0, 5),
        flapDuration: randomBetween(0.4, 0.6),
      })),
    [count],
  )

  return (
    <div className="celebration-field" aria-hidden="true">
      {butterflies.map((b) => {
        const style: DecorativeStyle = {
          left: `${b.x}%`,
          top: `${b.y}%`,
          '--drift-duration': `${b.driftDuration}s`,
          '--drift-delay': `${b.driftDelay}s`,
          '--flap-duration': `${b.flapDuration}s`,
          '--butterfly-size': b.size,
          '--wing-hue': b.hue,
        }
        return (
          <span className="butterfly-decorative" style={style} key={b.id}>
            <span className="butterfly-drift">
              <svg className="butterfly-svg" viewBox="-20 -16 40 32">
                <g className="wing wing-left">
                  <ellipse className="wing-shape wing-upper" cx="-9" cy="-6" rx="9" ry="7.5" />
                  <ellipse className="wing-shape wing-lower" cx="-7" cy="5" rx="6" ry="5.5" />
                </g>
                <g className="wing wing-right">
                  <ellipse className="wing-shape wing-upper" cx="9" cy="-6" rx="9" ry="7.5" />
                  <ellipse className="wing-shape wing-lower" cx="7" cy="5" rx="6" ry="5.5" />
                </g>
                <ellipse className="butterfly-body" cx="0" cy="0" rx="1.4" ry="11" />
              </svg>
            </span>
          </span>
        )
      })}
    </div>
  )
}
