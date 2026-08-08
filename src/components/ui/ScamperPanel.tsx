import { useState } from 'react'
import { motion } from 'framer-motion'
import { SCAMPER } from '../../data/content'

export function ScamperPanel() {
  const [idea, setIdea] = useState('')
  const [active, setActive] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const item = SCAMPER.find((s) => s.letter === active)

  const handleAnswer = (letter: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [letter]: value }))
  }

  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.trim()).length

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🔄 SCAMPER</h3>
        <p className="text-sm text-white/50">7 yaratıcı düşünme tekniği</p>
      </div>

      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Geliştirmek istediğin fikir..."
        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-cyan/50"
      />

      <div className="flex flex-wrap gap-2">
        {SCAMPER.map((s) => (
          <motion.button
            key={s.letter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(s.letter)}
            disabled={!idea}
            className="glass rounded-lg px-3 py-2 text-sm font-display font-bold transition-all disabled:opacity-30"
            style={{
              color: active === s.letter ? '#00f5ff' : undefined,
              borderColor: answers[s.letter] ? '#00ff8844' : undefined,
              borderWidth: answers[s.letter] ? 1 : undefined,
            }}
          >
            {s.letter}
          </motion.button>
        ))}
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
          <textarea
            value={answers[item.letter] ?? ''}
            onChange={(e) => handleAnswer(item.letter, e.target.value)}
            placeholder="Cevabını yaz..."
            rows={3}
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-cyan/50 resize-none"
          />
        </motion.div>
      )}

      {answeredCount > 0 && (
        <p className="text-xs text-white/30">
          {answeredCount}/7 teknik tamamlandı
        </p>
      )}
    </div>
  )
}
