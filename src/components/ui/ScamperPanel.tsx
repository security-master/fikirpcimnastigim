import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SCAMPER, SEED_IDEAS } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playSelect, playAddIdea } from '../../hooks/useSound'
import { OptionChip } from './OptionChip'

export function ScamperPanel() {
  const storeIdeas = useIdeaStore((s) => s.ideas)
  const addIdea = useIdeaStore((s) => s.addIdea)
  const [idea, setIdea] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const seeds = useMemo(() => {
    const fromStore = storeIdeas.slice(-4).map((i) => i.text)
    return [...new Set([...fromStore, ...SEED_IDEAS])].slice(0, 8)
  }, [storeIdeas])

  const item = SCAMPER.find((s) => s.letter === active)
  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.trim()).length

  const pickAnswer = (letter: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [letter]: value }))
    playSelect()
    playAddIdea()
    addIdea(value, ['scamper', letter])
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🔧 Fikri Geliştir</h3>
        <p className="text-sm text-white/50">Var olan bir fikri 7 teknikle büyüt ve dönüştür</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">1. Geliştirilecek fikri seç</p>
        <div className="grid grid-cols-1 gap-2">
          {seeds.map((s) => (
            <OptionChip
              key={s}
              label={s}
              size="sm"
              selected={idea === s}
              onClick={() => {
                setIdea(s)
                setActive(null)
                playSelect()
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">2. SCAMPER tekniğini seç</p>
        <div className="flex flex-wrap gap-2">
          {SCAMPER.map((s) => (
            <motion.button
              key={s.letter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActive(s.letter)
                playSelect()
              }}
              disabled={!idea}
              className="glass rounded-lg px-3 py-2 text-sm font-display font-bold transition-all disabled:opacity-30"
              style={{
                color: active === s.letter ? '#00f5ff' : undefined,
                borderColor: answers[s.letter] ? '#00ff8844' : 'transparent',
                borderWidth: 1,
              }}
            >
              {s.letter}
              <span className="ml-1 font-normal text-[10px] text-white/40">{s.tr}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {item && idea && (
        <motion.div
          key={item.letter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 space-y-3"
        >
          <div>
            <span className="font-display text-lg font-bold text-neon-cyan">{item.letter}</span>
            <span className="ml-2 text-sm text-white/60">{item.tr} — {item.desc}</span>
          </div>
          <p className="text-sm text-white/70">
            &ldquo;{idea}&rdquo; için: <strong>{item.question}</strong>
          </p>
          <div className="grid grid-cols-1 gap-2">
            {item.optionsFor(idea).map((option) => (
              <OptionChip
                key={option}
                label={option}
                size="sm"
                accent="#00ff88"
                selected={answers[item.letter] === option}
                onClick={() => pickAnswer(item.letter, option)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {answeredCount > 0 && (
        <p className="text-xs text-white/30">
          {answeredCount}/7 teknik tamamlandı · Cevaplar evrene eklendi
        </p>
      )}
    </div>
  )
}
