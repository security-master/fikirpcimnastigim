import { useState } from 'react'
import { motion } from 'framer-motion'
import { PERSPECTIVES, SEED_IDEAS } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playSelect } from '../../hooks/useSound'
import { OptionChip } from './OptionChip'

export function PerspectivePanel() {
  const ideas = useIdeaStore((s) => s.ideas)
  const selectedId = useIdeaStore((s) => s.selectedId)
  const [seed, setSeed] = useState<string | null>(null)
  const [activePerspective, setActivePerspective] = useState<string | null>(null)

  const nebulaIdea = selectedId
    ? ideas.find((i) => i.id === selectedId)?.text ?? null
    : null

  const ideaText = seed ?? nebulaIdea ?? ''
  const active = PERSPECTIVES.find((p) => p.id === activePerspective)
  const seeds = nebulaIdea
    ? [nebulaIdea, ...SEED_IDEAS.filter((s) => s !== nebulaIdea)].slice(0, 8)
    : SEED_IDEAS

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🔮 Perspektif Portalı</h3>
        <p className="text-sm text-white/50">Fikir seç → bakış açısı seç → sonuç gör</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">1. Fikrini seç</p>
        <div className="grid grid-cols-1 gap-2">
          {seeds.map((s) => (
            <OptionChip
              key={s}
              label={s}
              size="sm"
              accent="#bf00ff"
              selected={ideaText === s}
              onClick={() => {
                setSeed(s)
                setActivePerspective(null)
                playSelect()
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">2. Bakış açısını seç</p>
        <div className="grid grid-cols-3 gap-2">
          {PERSPECTIVES.map((p) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActivePerspective(p.id)
                playSelect()
              }}
              disabled={!ideaText}
              className="glass rounded-xl p-3 text-center transition-all disabled:opacity-30"
              style={{
                borderColor: activePerspective === p.id ? p.color : 'transparent',
                borderWidth: 1,
                background: activePerspective === p.id ? `${p.color}18` : undefined,
              }}
            >
              <span className="text-2xl">{p.emoji}</span>
              <p className="mt-1 text-xs text-white/60">{p.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {active && ideaText && (
        <motion.div
          key={`${active.id}-${ideaText}`}
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
