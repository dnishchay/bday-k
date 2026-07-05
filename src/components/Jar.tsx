import { useCallback, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Butterfly } from './Butterfly'
import type { ButterflyState } from '../types'

interface JarProps {
  butterflies: ButterflyState[]
  caughtIds: Set<string>
  onCatch: (id: string) => void
  roundKey: number
  celebrate: boolean
  inviting: boolean
}

const REPEL_RADIUS = 56
const REPEL_STRENGTH = 26

export function Jar({ butterflies, caughtIds, onCatch, roundKey, celebrate, inviting }: JarProps) {
  const active = butterflies.filter((b) => !caughtIds.has(b.id))

  const interiorRef = useRef<HTMLDivElement | null>(null)
  const repelEls = useRef<Map<string, HTMLDivElement>>(new Map())
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const frameRequested = useRef(false)

  const registerRepelEl = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) repelEls.current.set(id, el)
    else repelEls.current.delete(id)
  }, [])

  const applyRepel = useCallback(() => {
    frameRequested.current = false
    const interior = interiorRef.current
    if (!interior) return
    const rect = interior.getBoundingClientRect()
    const pointer = pointerRef.current

    for (const butterfly of active) {
      const el = repelEls.current.get(butterfly.id)
      if (!el) continue

      if (!pointer) {
        el.style.transform = 'translate(0, 0)'
        continue
      }

      const bx = (butterfly.x / 100) * rect.width
      const by = (butterfly.y / 100) * rect.height
      const dx = bx - pointer.x
      const dy = by - pointer.y
      const dist = Math.hypot(dx, dy)

      if (dist < REPEL_RADIUS && dist > 0.001) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
        el.style.transform = `translate(${((dx / dist) * force).toFixed(1)}px, ${((dy / dist) * force).toFixed(1)}px)`
      } else {
        el.style.transform = 'translate(0, 0)'
      }
    }
  }, [active])

  const scheduleRepel = useCallback(() => {
    if (frameRequested.current) return
    frameRequested.current = true
    requestAnimationFrame(applyRepel)
  }, [applyRepel])

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'touch') return
      const interior = interiorRef.current
      if (!interior) return
      const rect = interior.getBoundingClientRect()
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      scheduleRepel()
    },
    [scheduleRepel],
  )

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = null
    scheduleRepel()
  }, [scheduleRepel])

  return (
    <div className={`jar ${celebrate ? 'jar--celebrate' : ''} ${inviting ? 'jar--inviting' : ''}`} key={roundKey}>
      <div className="jar-lid" />
      <div className="jar-glass">
        <div
          className="jar-interior"
          ref={interiorRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <AnimatePresence>
            {active.map((butterfly) => (
              <Butterfly
                key={butterfly.id}
                butterfly={butterfly}
                onCatch={onCatch}
                registerRepelEl={registerRepelEl}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="jar-shine" aria-hidden="true" />
      </div>
      <div className="jar-glow" aria-hidden="true" />
    </div>
  )
}
