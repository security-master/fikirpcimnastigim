import { useState } from 'react'
import { motion } from 'framer-motion'
import { PERSPECTIVES } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'

export function PerspectivePanel() {
  const ideas = useIdeaStore((s) => s.ideas)
  const selectedId = useIdeaStore((s) => s.selectedId)
  const [customIdea, setCustomIdea] = useState('')
  const [activePerspective, setActivePerspective] = useState<string | null>(null)

  const ideaText = selectedId
    ? ideas.find((i) => i.id === selectedId)?.text ?? ''
    : customIdea

  const active = PERSPECTIVES.find((p) => p.id === activePerspective)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🔮 Perspektif Portalı</h3>
        <p className="text-sm text-white/50">Aynı fikri 6 farklı gözle gör</p>
      </div>

      {!selectedId && (
        <input
          value={customIdea}
          onChange={(e) => setCustomIdea(e.target.value)}
          placeholder="Bir fikir yaz veya nebuladan seç..."
          className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-violet/50"
        />
      )}

      {selectedId && (
        <div className="glass rounded-xl px-4 py-2 text-sm text-white/70">
          Seçili: {ideaText}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {PERSPECTIVES.map((p) => (
          <motion.button
            key={p.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePerspective(p.id)}
            disabled={!ideaText}
            className="glass rounded-xl p-3 text-center transition-all disabled:opacity-30"
            style={{
              borderColor: activePerspective === p.id ? p.color : undefined,
              borderWidth: activePerspective === p.id ? 1 : undefined,
            }}
          >
            <span className="text-2xl">{p.emoji}</span>
            <p className="mt-1 text-xs text-white/60">{p.name}</p>
          </motion.button>
        ))}
      </div>

      {active && ideaText && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4"
          style={{ borderColor: active.color + '33', borderWidth: 1 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span>{active.emoji}</span>
            <span className="text-sm font-semibold" style={{ color: active.color }}>
              {active.name} Gözüyle
            </span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed italic">
            {active.transform(ideaText)}
          </p>
        </motion.div>
      )}
    </div>
  )
}
