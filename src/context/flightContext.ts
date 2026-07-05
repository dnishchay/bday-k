import { createContext, useContext } from 'react'

export interface FlightContextValue {
  registerFragmentEl: (id: string, el: HTMLElement | null) => void
  emitFlight: (id: string, fromRect: DOMRect, hue: number) => void
}

export const FlightContext = createContext<FlightContextValue | null>(null)

export function useFlight() {
  const ctx = useContext(FlightContext)
  if (!ctx) throw new Error('useFlight must be used within FlightProvider')
  return ctx
}
