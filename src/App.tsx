import { AnimatePresence, motion } from 'framer-motion'
import { Jar } from './components/Jar'
import { MessageCard } from './components/MessageCard'
import { Finale } from './components/Finale'
import { ProgressDots } from './components/ProgressDots'
import { CelebrationButterflies } from './components/CelebrationButterflies'
import { CarrierProvider } from './context/CarrierProvider'
import { useCarrier } from './context/carrierContext'
import { useButterflies } from './hooks/useButterflies'
import type { ButterflyState } from './types'
import { fragments, introHeading, introInstruction, finaleHeading, finaleSubtext, replayLabel } from './content'
import './App.css'

interface AppContentProps {
  butterflies: ButterflyState[]
  takenIds: Set<string>
  takeButterfly: (id: string) => void
  replay: () => void
  round: number
}

function AppContent({ butterflies, takenIds, takeButterfly, replay, round }: AppContentProps) {
  const { revealedIds } = useCarrier()
  const hasStarted = takenIds.size > 0
  const allCaught = revealedIds.size === fragments.length

  return (
    <main className="stage">
      {allCaught && <CelebrationButterflies />}

      <div className="layout">
        <div className="jar-panel">
          <p className="eyebrow">{introHeading}</p>

          <AnimatePresence>
            {!hasStarted && !allCaught && (
              <motion.p
                className="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {introInstruction}
              </motion.p>
            )}
          </AnimatePresence>

          <Jar
            butterflies={butterflies}
            takenIds={takenIds}
            onCatch={takeButterfly}
            roundKey={round}
            celebrate={allCaught}
            inviting={!hasStarted}
          />

          <ProgressDots total={fragments.length} caught={revealedIds.size} />
        </div>

        <div className="message-panel">
          <MessageCard fragments={fragments} />

          <AnimatePresence>
            {allCaught && (
              <Finale heading={finaleHeading} subtext={finaleSubtext} replayLabel={replayLabel} onReplay={replay} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const { butterflies, takenIds, takeButterfly, replay, round } = useButterflies(fragments)

  return (
    <CarrierProvider fragments={fragments} key={round}>
      <AppContent
        butterflies={butterflies}
        takenIds={takenIds}
        takeButterfly={takeButterfly}
        replay={replay}
        round={round}
      />
    </CarrierProvider>
  )
}
