import { AnimatePresence, motion } from 'framer-motion'
import { Jar } from './components/Jar'
import { MessageCard } from './components/MessageCard'
import { Finale } from './components/Finale'
import { ProgressDots } from './components/ProgressDots'
import { CelebrationButterflies } from './components/CelebrationButterflies'
import { FlightProvider } from './context/FlightProvider'
import { useButterflies } from './hooks/useButterflies'
import { fragments, introHeading, introInstruction, finaleHeading, finaleSubtext, replayLabel } from './content'
import './App.css'

export default function App() {
  const { butterflies, caughtIds, catchButterfly, replay, allCaught, round } = useButterflies(fragments)
  const hasStarted = caughtIds.size > 0

  return (
    <FlightProvider>
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
              caughtIds={caughtIds}
              onCatch={catchButterfly}
              roundKey={round}
              celebrate={allCaught}
              inviting={!hasStarted}
            />

            <ProgressDots total={fragments.length} caught={caughtIds.size} />
          </div>

          <div className="message-panel">
            <MessageCard fragments={fragments} caughtIds={caughtIds} />

            <AnimatePresence>
              {allCaught && (
                <Finale heading={finaleHeading} subtext={finaleSubtext} replayLabel={replayLabel} onReplay={replay} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </FlightProvider>
  )
}
