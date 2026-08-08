import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FLEX_PROMPTS } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playAddIdea, playTick, playSuccess } from '../../hooks/useSound'

const DURATION = 60

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function FlexPanel() {
  const [prompt, setPrompt] = useState(pick(FLEX_PROMPTS))
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const flexScore = useIdeaStore((s) => s.flexScore)
  const addIdea = useIdeaStore((s) => s.addIdea)
  const resetFlexScore = useIdeaStore((s) => s.resetFlexScore)
  const incrementFlexScore = useIdeaStore((s) => s.incrementFlexScore)

  const start = () => {
    resetFlexScore()
    setTimeLeft(DURATION)
    setPrompt(pick(FLEX_PROMPTS))
    setRunning(true)
  }

  const finish = useCallback(() => {
    setRunning(false)
    playSuccess()
  }, [])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) { finish(); return }
    const timer = setTimeout(() => {
      if (timeLeft <= 5) playTick()
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [running, timeLeft, finish])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !running) return
    addIdea(input, ['flex'])
    incrementFlexScore()
    playAddIdea()
    setInput('')
  }

  const progress = ((DURATION - timeLeft) / DURATION) * 100

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🏋️ Zihin Esnekliği</h3>
        <p className="text-sm text-white/50">60 saniyede ne kadar fikir üretebilirsin?</p>
      </div>

      {!running && timeLeft === DURATION && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={start}
          className="w-full rounded-xl py-3 font-semibold text-void"
          style={{ background: 'linear-gradient(135deg, #ffd700, #ff6b35)' }}
        >
          Başla!
        </motion.button>
      )}

      {running && (
        <>
          <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, #ffd700, #ff6b35)', width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-3xl font-bold text-neon-gold">{timeLeft}s</span>
            <span className="text-sm text-white/50">{flexScore} fikir</span>
          </div>

          <div className="glass rounded-xl p-4">
            <p className="text-sm font-medium text-white/90">{prompt}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hızlıca yaz..."
              className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-gold/50"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-3 text-sm font-semibold bg-neon-gold/20 text-neon-gold ring-1 ring-neon-gold/30"
            >
              →
            </button>
          </form>
        </>
      )}

      {!running && timeLeft < DURATION && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <p className="text-4xl mb-2">🎉</p>
          <p className="font-display text-2xl font-bold text-gradient">{flexScore} Fikir!</p>
          <p className="mt-2 text-sm text-white/50">
            {flexScore >= 10 ? 'Efsanevi zihin!' : flexScore >= 5 ? 'Harika performans!' : 'Güzel başlangıç!'}
          </p>
          <button onClick={start} className="mt-4 text-sm text-neon-cyan hover:underline">
            Tekrar dene
          </button>
        </motion.div>
      )}
    </div>
  )
}
