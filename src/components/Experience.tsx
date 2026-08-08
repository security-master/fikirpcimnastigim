import { AnimatePresence, motion } from 'framer-motion'
import { IdeaScene } from './canvas/IdeaScene'
import { SidePanel } from './ui/SidePanel'
import { useIdeaStore } from '../store/ideaStore'
import { getGoal } from '../data/goals'

export function Experience() {
  const ideas = useIdeaStore((s) => s.ideas)
  const goalId = useIdeaStore((s) => s.goalId)
  const copiedToast = useIdeaStore((s) => s.copiedToast)
  const setActivePanel = useIdeaStore((s) => s.setActivePanel)
  const goal = getGoal(goalId)

  return (
    <div className="relative flex h-full w-full">
      <div className="absolute inset-0 z-0">
        <IdeaScene />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row pointer-events-none">
        <div className="pointer-events-auto w-full md:w-[400px] lg:w-[440px] p-3 md:p-4 md:max-h-full md:h-full">
          <SidePanel />
        </div>

        <div className="flex-1 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
          <div className="hidden md:block self-end pointer-events-auto">
            {goal && (
              <div className="glass rounded-xl px-4 py-2.5 max-w-xs text-right">
                <p className="text-xs text-white/40">Amacın</p>
                <p className="text-sm text-white/80 font-medium">
                  {goal.icon} {goal.label}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            {ideas.length > 0 && (
              <button
                onClick={() => setActivePanel('notebook')}
                className="pointer-events-auto glass rounded-xl px-4 py-2 text-xs text-white/70 hover:text-white transition-colors"
              >
                {ideas.length} fikir defterinde · Görüntüle
              </button>
            )}
            <div className="hidden md:block glass rounded-xl px-4 py-2 text-xs text-white/30">
              Sürükle · Yakınlaştır · Yıldızlara tıkla
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md border border-white/15"
          >
            {copiedToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
