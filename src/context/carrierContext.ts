import { createContext, useContext } from 'react'

export interface CarrierContextValue {
  registerFragmentEl: (id: string, el: HTMLElement | null) => void
  /**
   * Tap any butterfly free: it always carries the *next* unrevealed phrase
   * in the message, in exact reading order, regardless of which butterfly
   * it was or what order they were tapped in.
   */
  beginCarry: (fromRect: DOMRect, hue: number) => void
  /** Fragment ids that have finished settling into the message card. */
  revealedIds: Set<string>
}

export const CarrierContext = createContext<CarrierContextValue | null>(null)

export function useCarrier() {
  const ctx = useContext(CarrierContext)
  if (!ctx) throw new Error('useCarrier must be used within CarrierProvider')
  return ctx
}
