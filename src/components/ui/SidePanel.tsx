import { motion, AnimatePresence } from 'framer-motion'
import { useIdeaStore, type Panel } from '../../store/ideaStore'
import { getGoal } from '../../data/goals'
import { NebulaPanel } from './NebulaPanel'
import { StormPanel } from './StormPanel'
import { FlexPanel } from './FlexPanel'
import { PerspectivePanel } from './PerspectivePanel'
import { ScamperPanel } from './ScamperPanel'
import { NotebookPanel } from './NotebookPanel'

const TABS: { id: Panel; label: string; icon: string; why: string }[] = [
  { id: 'nebula', label: 'Üret', icon: '💡', why: 'Sıfırdan fikir üret' },
  { id: 'storm', label: 'Çarpıştır', icon: '⚡', why: 'İki kavramı birleştir' },
  { id: 'flex', label: 'Isın', icon: '🔥', why: 'Hızlı zihin açma' },
  { id: 'perspective', label: 'Bakış', icon: '👁️', why: 'Farklı gözle gör' },
  { id: 'scamper', label: 'Geliştir', icon: '🔧', why: 'Fikri güçlendir' },
  { id: 'notebook', label: 'Defter', icon: '📓', why: 'Sonuçlarını topla' },
]

function PanelContent({ panel }: { panel: Panel }) {
  switch (panel) {
    case 'nebula': return <NebulaPanel />
    case 'storm': return <StormPanel />
    case 'flex': return <FlexPanel />
    case 'perspective': return <PerspectivePanel />
    case 'scamper': return <ScamperPanel />
    case 'notebook': return <NotebookPanel />
  }
}

export function SidePanel() {
  const activePanel = useIdeaStore((s) => s.activePanel)
  const setActivePanel = useIdeaStore((s) => s.setActivePanel)
  const ideas = useIdeaStore((s) => s.ideas)
  const goalId = useIdeaStore((s) => s.goalId)
  const showGuide = useIdeaStore((s) => s.showGuide)
  const dismissGuide = useIdeaStore((s) => s.dismissGuide)
  const goal = getGoal(goalId)
  const activeTab = TABS.find((t) => t.id === activePanel)

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass flex h-full flex-col rounded-2xl overflow-hidden"
    >
      <div className="border-b border-white/5 px-4 py-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-sm font-semibold text-white">
            {goal ? `${goal.icon} ${goal.short}` : 'Fikir alanı'}
          </h2>
          <button
            onClick={() => setActivePanel('notebook')}
            className="text-xs text-neon-cyan/80 hover:text-neon-cyan"
          >
            Defter · {ideas.length}
          </button>
        </div>
        {goal && (
          <p className="text-xs text-white/40 leading-relaxed">{goal.description}</p>
        )}
      </div>

      {showGuide && goal && (
        <div className="mx-3 mt-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-white/75 leading-relaxed">
              <span className="text-neon-cyan font-medium">Nasıl çalışır: </span>
              {goal.hint} Beğendiğin sonuçlar defterine eklenir.
            </p>
            <button
              onClick={dismissGuide}
              className="shrink-0 text-white/30 hover:text-white text-xs"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-1 overflow-x-auto px-3 py-2 border-b border-white/5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            title={tab.why}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
              activePanel === tab.id
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.id === 'notebook' && ideas.length > 0 && (
              <span className="rounded-md bg-neon-cyan/20 px-1 text-[10px] text-neon-cyan">
                {ideas.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab && activePanel !== 'notebook' && (
        <p className="px-4 pt-3 text-[11px] text-white/30">{activeTab.why}</p>
      )}

      <div className="flex-1 overflow-y-auto p-4 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PanelContent panel={activePanel} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
