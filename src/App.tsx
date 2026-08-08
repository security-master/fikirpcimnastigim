import { AnimatePresence, motion } from 'framer-motion'
import { useIdeaStore } from './store/ideaStore'
import { Landing } from './components/ui/Landing'
import { Experience } from './components/Experience'
import { IdeaScene } from './components/canvas/IdeaScene'

export default function App() {
  const phase = useIdeaStore((s) => s.phase)

  return (
    <div className="relative h-full w-full overflow-hidden bg-void">
      <div className="absolute inset-0 z-0">
        <IdeaScene />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,15,0.4) 60%, rgba(10,10,15,0.85) 100%)',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 h-full"
          >
            <Landing />
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 h-full"
          >
            <Experience />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
