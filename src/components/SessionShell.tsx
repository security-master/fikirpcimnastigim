import { AnimatePresence, motion } from 'framer-motion'
import { useSessionStore } from '../store/sessionStore'
import { WORKOUTS } from '../data/workouts'
import { ProgressRail } from './ProgressRail'
import { WarmupStation } from './stations/WarmupStation'
import { CollideStation } from './stations/CollideStation'
import { ShapeStation } from './stations/ShapeStation'
import { Finale } from './Finale'
import { playTap } from '../hooks/useSound'

export function SessionShell() {
  const phase = useSessionStore((s) => s.phase)
  const workoutId = useSessionStore((s) => s.workoutId)
  const ideas = useSessionStore((s) => s.ideas)
  const reset = useSessionStore((s) => s.reset)
  const toast = useSessionStore((s) => s.toast)
  const workout = WORKOUTS.find((w) => w.id === workoutId)

  return (
    <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col px-5 py-6 md:px-8 md:py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => {
              playTap()
              reset()
            }}
            className="font-display text-sm font-bold tracking-wide text-ink"
          >
            Fikir Jimnastiği
          </button>
          {workout && (
            <p className="mt-1 text-xs font-medium text-ink/45">
              {workout.title} · {ideas.length} fikir
            </p>
          )}
        </div>
        <ProgressRail phase={phase} />
      </header>

      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {phase === 'warmup' && <WarmupStation />}
            {phase === 'collide' && <CollideStation />}
            {phase === 'shape' && <ShapeStation />}
            {phase === 'finale' && <Finale />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
