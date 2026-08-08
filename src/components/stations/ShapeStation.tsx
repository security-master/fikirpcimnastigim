import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEED_IDEAS, SHAPE_MOVES } from '../../data/workouts'
import { useSessionStore } from '../../store/sessionStore'
import { playTap, playSuccess } from '../../hooks/useSound'

export function ShapeStation() {
  const ideas = useSessionStore((s) => s.ideas)
  const collideResult = useSessionStore((s) => s.collideResult)
  const addIdea = useSessionStore((s) => s.addIdea)
  const setPhase = useSessionStore((s) => s.setPhase)

  const seeds = useMemo(() => {
    const fromSession = ideas
      .filter((i) => i.source !== 'shape')
      .map((i) => i.text)
      .slice(-3)
    const base = collideResult ? [collideResult, ...fromSession] : fromSession
    return [...new Set([...base, ...SEED_IDEAS])].slice(0, 6)
  }, [ideas, collideResult])

  const [seed, setSeed] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const applyMove = (moveId: string) => {
    if (!seed) return
    const move = SHAPE_MOVES.find((m) => m.id === moveId)
    if (!move) return
    playTap()
    const shaped = move.apply(seed)
    setResult(shaped)
    addIdea(shaped, 'shape')
    playSuccess()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        İstasyon 3 · Şekil ver
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
        Fikrini bük, güçlendir
      </h2>
      <p className="mt-2 text-ink-soft/70">
        Bir tohum seç, sonra bir hareket uygula. Sonuç defterine eklenir.
      </p>

      <div className="mt-8 space-y-2">
        <p className="text-sm font-semibold text-ink/50">1. Tohum fikir</p>
        <div className="grid gap-2">
          {seeds.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSeed(s)
                setResult(null)
                playTap()
              }}
              className="rounded-2xl border px-4 py-3 text-left text-sm font-medium transition"
              style={{
                borderColor: seed === s ? '#ff4d2e' : 'rgba(16,42,67,0.1)',
                background: seed === s ? 'rgba(255,77,46,0.08)' : 'rgba(255,255,255,0.8)',
                color: '#102a43',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <p className="text-sm font-semibold text-ink/50">2. Hareket</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SHAPE_MOVES.map((m) => (
            <button
              key={m.id}
              type="button"
              disabled={!seed}
              onClick={() => applyMove(m.id)}
              className="rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-left transition hover:border-teal/40 disabled:opacity-35"
            >
              <p className="font-display text-base font-bold text-ink">{m.label}</p>
              <p className="mt-0.5 text-xs text-ink/45">{m.hint}</p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-3xl border border-ink/8 bg-white/90 p-6 shadow-[0_20px_50px_rgba(16,42,67,0.08)]"
          >
            <p className="text-sm font-semibold text-teal">Şekillendirilmiş fikir</p>
            <p className="mt-3 text-lg font-semibold leading-snug text-ink">{result}</p>
            <button
              type="button"
              onClick={() => {
                playTap()
                setPhase('finale')
              }}
              className="mt-5 rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-white"
            >
              Antrenman özetine geç →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
