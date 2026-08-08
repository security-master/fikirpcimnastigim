import { AnimatePresence, motion } from 'framer-motion'
import { Atmosphere } from './components/Atmosphere'
import { Landing } from './components/Landing'
import { SessionShell } from './components/SessionShell'
import { useSessionStore } from './store/sessionStore'

export default function App() {
  const phase = useSessionStore((s) => s.phase)
  const isLanding = phase === 'landing'

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <Atmosphere />

      <AnimatePresence mode="wait">
        {isLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-dvh"
          >
            <Landing />
          </motion.div>
        ) : (
          <motion.div
            key="session"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative min-h-dvh"
          >
            <SessionShell />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
