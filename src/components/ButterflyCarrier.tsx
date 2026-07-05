import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface ButterflyCarrierProps {
  text: string
  hue: number
  fromX: number
  fromY: number
  toX: number
  toY: number
  onComplete: () => void
}

interface CarrierStyle extends CSSProperties {
  '--carrier-hue': number
}

const FLY_IN_MS = 550
const FLY_OUT_MS = 550
const MIN_HOLD_MS = 1200
const MAX_HOLD_MS = 3200
const MS_PER_CHAR = 28

function holdDurationFor(text: string): number {
  return Math.min(MAX_HOLD_MS, Math.max(MIN_HOLD_MS, 900 + text.length * MS_PER_CHAR))
}

const px = (n: number) => `${n}px`

// A caught butterfly's full journey: fly to center stage carrying its
// phrase, hold there long enough to read it, then home to its exact slot
// in the message card and fade as the real text takes over.
//
// Position (left/top) animates on the outer element; opacity/scale animate
// on an inner one. Framer Motion owns the `transform` property wholesale
// once you animate scale/x/y on an element, which would otherwise wipe out
// the plain CSS `translate(-50%, -50%)` centering on the positioned element.
export function ButterflyCarrier({ text, hue, fromX, fromY, toX, toY, onComplete }: ButterflyCarrierProps) {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight * 0.42

  const holdMs = holdDurationFor(text)
  const totalMs = FLY_IN_MS + holdMs + FLY_OUT_MS
  const t1 = FLY_IN_MS / totalMs
  const t2 = (FLY_IN_MS + holdMs) / totalMs
  const t3 = t2 + 0.8 * (1 - t2)

  const nearX = centerX + 0.8 * (toX - centerX)
  const nearY = centerY + 0.8 * (toY - centerY)

  const style: CarrierStyle = { '--carrier-hue': hue }
  const transition = { duration: totalMs / 1000, times: [0, t1, t2, t3, 1], ease: 'easeInOut' as const }

  return (
    <>
      <motion.div
        className="carrier-scrim"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0.4, 0] }}
        transition={transition}
      />
      <motion.div
        className="carrier"
        initial={{ left: px(fromX), top: px(fromY) }}
        animate={{ left: [fromX, centerX, centerX, nearX, toX].map(px), top: [fromY, centerY, centerY, nearY, toY].map(px) }}
        transition={transition}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="carrier-content"
          style={style}
          role="status"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 1, 0], scale: [0.5, 1, 1, 0.9, 0.5] }}
          transition={transition}
        >
          <span className="carrier-butterfly" aria-hidden="true">
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
          <span className="carrier-text">{text}</span>
        </motion.div>
      </motion.div>
    </>
  )
}
