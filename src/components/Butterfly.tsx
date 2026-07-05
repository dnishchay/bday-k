import { motion } from 'framer-motion'
import type { CSSProperties, MouseEvent } from 'react'
import type { ButterflyState } from '../types'
import { useFlight } from '../context/flightContext'

interface ButterflyProps {
  butterfly: ButterflyState
  onCatch: (id: string) => void
  registerRepelEl: (id: string, el: HTMLDivElement | null) => void
}

interface ButterflyStyle extends CSSProperties {
  '--drift-duration': string
  '--drift-delay': string
  '--flap-duration': string
  '--butterfly-size': number
  '--wing-hue': number
}

export function Butterfly({ butterfly, onCatch, registerRepelEl }: ButterflyProps) {
  const { emitFlight } = useFlight()

  const style: ButterflyStyle = {
    left: `${butterfly.x}%`,
    top: `${butterfly.y}%`,
    '--drift-duration': `${butterfly.driftDuration}s`,
    '--drift-delay': `${butterfly.driftDelay}s`,
    '--flap-duration': `${butterfly.flapDuration}s`,
    '--butterfly-size': butterfly.size,
    '--wing-hue': butterfly.hue,
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    emitFlight(butterfly.id, event.currentTarget.getBoundingClientRect(), butterfly.hue)
    onCatch(butterfly.id)
  }

  return (
    <motion.button
      type="button"
      className="butterfly"
      style={style}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="catch a butterfly"
    >
      <div className="butterfly-repel" ref={(el) => registerRepelEl(butterfly.id, el)}>
        <span className="butterfly-drift">
          <svg className="butterfly-svg" viewBox="-20 -16 40 32" aria-hidden="true">
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
      </div>
    </motion.button>
  )
}
