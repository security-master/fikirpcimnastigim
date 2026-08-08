import { motion, AnimatePresence } from 'framer-motion'
import { useIdeaStore, type Panel } from '../../store/ideaStore'
import { NebulaPanel } from './NebulaPanel'
import { StormPanel } from './StormPanel'
import { FlexPanel } from './FlexPanel'
import { PerspectivePanel } from './PerspectivePanel'
import { ScamperPanel } from './ScamperPanel'

const TABS: { id: Panel; label: string; icon: string }[] = [
  { id: 'nebula', label: 'Nebula', icon: '🌌' },
  { id: 'storm', label: 'Fırtına', icon: '⚡' },
  { id: 'flex', label: 'Esneklik', icon: '🏋️' },
  { id: 'perspective', label: 'Perspektif', icon: '🔮' },
  { id: 'scamper', label: 'SCAMPER', icon: '🔄' },
]

function PanelContent({ panel }: { panel: Panel }) {
  switch (panel) {
    case 'nebula': return <NebulaPanel />
    case 'storm': return <StormPanel />
    case 'flex': return <FlexPanel />
    case 'perspective': return <PerspectivePanel />
    case 'scamper': return <ScamperPanel />
  }
}

export function SidePanel() {
  const activePanel = useIdeaStore((s) => s.activePanel)
  const setActivePanel = useIdeaStore((s) => s.setActivePanel)
  const ideas = useIdeaStore((s) => s.ideas)

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass flex h-full flex-col rounded-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-white/80">
          Laboratuvar
        </h2>
        <span className="text-xs text-white/30">{ideas.length} fikir</span>
      </div>

      <div className="flex gap-1 overflow-x-auto px-3 py-2 border-b border-white/5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all ${
              activePanel === tab.id
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
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
