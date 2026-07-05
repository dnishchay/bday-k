import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FlightContext } from './flightContext'

interface Flight {
  id: string
  fromX: number
  fromY: number
  toX: number
  toY: number
  hue: number
}

interface WispStyle extends CSSProperties {
  '--wisp-hue': number
}

// Lets a caught butterfly's light visibly travel from the jar to its phrase
// in the message card, tying the two halves of the screen together.
export function FlightProvider({ children }: { children: ReactNode }) {
  const fragmentEls = useRef<Map<string, HTMLElement>>(new Map())
  const [flights, setFlights] = useState<Flight[]>([])

  const registerFragmentEl = useCallback((id: string, el: HTMLElement | null) => {
    if (el) fragmentEls.current.set(id, el)
    else fragmentEls.current.delete(id)
  }, [])

  const emitFlight = useCallback((id: string, fromRect: DOMRect, hue: number) => {
    const targetEl = fragmentEls.current.get(id)
    if (!targetEl) return
    const toRect = targetEl.getBoundingClientRect()
    setFlights((prev) => [
      ...prev,
      {
        id,
        fromX: fromRect.left + fromRect.width / 2,
        fromY: fromRect.top + fromRect.height / 2,
        toX: toRect.left + toRect.width / 2,
        toY: toRect.top + toRect.height / 2,
        hue,
      },
    ])
  }, [])

  const removeFlight = useCallback((id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id))
  }, [])

  return (
    <FlightContext.Provider value={{ registerFragmentEl, emitFlight }}>
      {children}
      <div className="flight-overlay" aria-hidden="true">
        <AnimatePresence>
          {flights.map((flight) => {
            const arcY = Math.min(flight.fromY, flight.toY) - 70
            const style: WispStyle = { '--wisp-hue': flight.hue }
            return (
              <motion.span
                key={flight.id}
                className="flight-wisp"
                style={style}
                initial={{ left: flight.fromX, top: flight.fromY, opacity: 1, scale: 1 }}
                animate={{
                  left: [flight.fromX, (flight.fromX + flight.toX) / 2, flight.toX],
                  top: [flight.fromY, arcY, flight.toY],
                  opacity: [1, 1, 0],
                  scale: [1, 1.3, 0.5],
                }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                onAnimationComplete={() => removeFlight(flight.id)}
              />
            )
          })}
        </AnimatePresence>
      </div>
    </FlightContext.Provider>
  )
}
