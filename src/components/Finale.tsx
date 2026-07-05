import { motion } from 'framer-motion'

interface FinaleProps {
  heading: string
  subtext: string
  replayLabel: string
  onReplay: () => void
}

export function Finale({ heading, subtext, replayLabel, onReplay }: FinaleProps) {
  return (
    <motion.div
      className="finale"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1 className="finale-heading">{heading}</h1>
      <p className="finale-subtext">{subtext}</p>
      <button type="button" className="replay-btn" onClick={onReplay}>
        {replayLabel} ↻
      </button>
    </motion.div>
  )
}
