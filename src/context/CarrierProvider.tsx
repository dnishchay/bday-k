import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { CarrierContext } from './carrierContext'
import { ButterflyCarrier } from '../components/ButterflyCarrier'
import type { Fragment } from '../types'

interface CarryJob {
  id: string
  text: string
  fromX: number
  fromY: number
  hue: number
}

interface CarrierProviderProps {
  fragments: Fragment[]
  children: ReactNode
}

// Queues freed butterflies one at a time so each phrase gets its own moment
// center-stage before settling into the message card. Which butterfly was
// tapped never decides which phrase it carries — a running pointer always
// hands out the next unrevealed fragment in exact message order, so the
// story assembles in sequence no matter how she taps through the jar.
export function CarrierProvider({ fragments, children }: CarrierProviderProps) {
  const fragmentEls = useRef<Map<string, HTMLElement>>(new Map())
  const nextFragmentIndex = useRef(0)
  const [queue, setQueue] = useState<CarryJob[]>([])
  const [activeJob, setActiveJob] = useState<CarryJob | null>(null)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set())

  const registerFragmentEl = useCallback((id: string, el: HTMLElement | null) => {
    if (el) fragmentEls.current.set(id, el)
    else fragmentEls.current.delete(id)
  }, [])

  const beginCarry = useCallback(
    (fromRect: DOMRect, hue: number) => {
      const fragment = fragments[nextFragmentIndex.current]
      if (!fragment) return
      nextFragmentIndex.current += 1

      setQueue((prev) => [
        ...prev,
        {
          id: fragment.id,
          text: fragment.text,
          fromX: fromRect.left + fromRect.width / 2,
          fromY: fromRect.top + fromRect.height / 2,
          hue,
        },
      ])
    },
    [fragments],
  )

  useEffect(() => {
    if (activeJob || queue.length === 0) return
    const [next, ...rest] = queue
    setQueue(rest)
    setActiveJob(next)
  }, [activeJob, queue])

  const handleComplete = useCallback((id: string) => {
    setRevealedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setActiveJob(null)
  }, [])

  const targetEl = activeJob ? fragmentEls.current.get(activeJob.id) : null
  const toRect = targetEl?.getBoundingClientRect()

  return (
    <CarrierContext.Provider value={{ registerFragmentEl, beginCarry, revealedIds }}>
      {children}
      {activeJob && toRect && (
        <ButterflyCarrier
          key={activeJob.id}
          text={activeJob.text}
          hue={activeJob.hue}
          fromX={activeJob.fromX}
          fromY={activeJob.fromY}
          toX={toRect.left + toRect.width / 2}
          toY={toRect.top + toRect.height / 2}
          onComplete={() => handleComplete(activeJob.id)}
        />
      )}
    </CarrierContext.Provider>
  )
}
