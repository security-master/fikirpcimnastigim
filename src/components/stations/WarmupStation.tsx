import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WARMUP_ROUNDS, composeSpark } from '../../data/workouts'
import { useSessionStore } from '../../store/sessionStore'
import { playTap, playSuccess } from '../../hooks/useSound'

export function WarmupStation() {
  const [round, setRound] = useState(0)
  const picks = useSessionStore((s) => s.warmupPicks)
  const addWarmupPick = useSessionStore((s) => s.addWarmupPick)
  const addIdea = useSessionStore((s) => s.addIdea)
  const setPhase = useSessionStore((s) => s.setPhase)

  const current = WARMUP_ROUNDS[round]
  const done = round >= WARMUP_ROUNDS.length

  const spark = useMemo(() => {
    if (picks.length < 4) return null
    return composeSpark(picks[0], picks[1], picks[2], picks[3])
  }, [picks])

  const choose = (option: string) => {
    playTap()
    addWarmupPick(option)
    if (round + 1 >= WARMUP_ROUNDS.length) {
      const nextPicks = [...picks, option]
      const idea = composeSpark(nextPicks[0], nextPicks[1], nextPicks[2], nextPicks[3])
      addIdea(idea, 'warmup')
      playSuccess()
      setRound(WARMUP_ROUNDS.length)
    } else {
      setRound((r) => r + 1)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        İstasyon 1 · Isınma
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
        Zihnini açmak için 4 seçim
      </h2>
      <p className="mt-2 text-ink-soft/70">
        Doğru-yanlış yok. Her tık, sonraki fikrin hammaddesi.
      </p>

      <div className="mt-6 flex gap-1.5">
        {WARMUP_ROUNDS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: i < round || done ? '#ff4d2e' : i === round ? '#102a43' : 'rgba(16,42,67,0.12)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done && current ? (
          <motion.div
            key={round}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            className="mt-8"
          >
            <p className="mb-4 text-lg font-semibold text-ink">{current.prompt}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className="rounded-2xl border border-ink/10 bg-white/80 px-4 py-4 text-left text-base font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral/50 hover:shadow-md"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-3xl border border-ink/8 bg-white/85 p-6 shadow-[0_20px_50px_rgba(16,42,67,0.08)]"
          >
            <p className="text-sm font-semibold text-coral">Isınma tamam</p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink">
              {spark}
            </p>
            <button
              type="button"
              onClick={() => {
                playTap()
                setPhase('collide')
              }}
              className="mt-6 rounded-2xl bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-soft"
            >
              Sonraki istasyon: Çarpıştır →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
