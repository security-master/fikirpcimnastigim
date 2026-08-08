import { AnimatePresence, motion } from 'framer-motion'
import { RiverBed } from './components/RiverBed'
import { Shore } from './components/Shore'
import { Drift } from './components/Drift'
import { Vortex } from './components/Vortex'
import { Bottles } from './components/Bottles'
import { useRiver } from './store'

export default function App() {
  const phase = useRiver((s) => s.phase)
  const toast = useRiver((s) => s.toast)

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <RiverBed />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative h-full w-full"
        >
          {phase === 'shore' && <Shore />}
          {phase === 'drift' && <Drift />}
          {phase === 'vortex' && <Vortex />}
          {phase === 'bottles' && <Bottles />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-ink shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
