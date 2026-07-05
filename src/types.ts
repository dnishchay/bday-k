export interface Fragment {
  id: string
  /** Which paragraph of the message this fragment belongs to (0-indexed). */
  paragraph: number
  text: string
}

export interface ButterflyState {
  id: string
  /** Position within the jar, as a percentage (0-100) of its interior. */
  x: number
  y: number
  size: number
  hue: number
  driftDuration: number
  driftDelay: number
  flapDuration: number
}
