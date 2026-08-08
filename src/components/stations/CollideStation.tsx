import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CONCEPT_POOL,
  COLLISION_TEMPLATES,
  pickN,
  pickOne,
} from '../../data/workouts'
import { useSessionStore } from '../../store/sessionStore'
import { playTap, playSuccess } from '../../hooks/useSound'

export function CollideStation() {
  const [poolKey, setPoolKey] = useState(0)
  const pool = useMemo(() => pickN(CONCEPT_POOL, 12), [poolKey])
  const [a, setA] = useState<string | null>(null)
  const [b, setB] = useState<string | null>(null)
  const collideResult = useSessionStore((s) => s.collideResult)
  const setCollideResult = useSessionStore((s) => s.setCollideResult)
  const addIdea = useSessionStore((s) => s.addIdea)
  const setPhase = useSessionStore((s) => s.setPhase)

  const strike = () => {
    if (!a || !b) return
    playTap()
    const result = pickOne(COLLISION_TEMPLATES)(a, b)
    setCollideResult(result)
    addIdea(result, 'collide')
    playSuccess()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        İstasyon 2 · Çarpıştır
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
        İki kavram seç, yeni fikir doğsun
      </h2>
      <p className="mt-2 text-ink-soft/70">
        Soldan birini, sağdan birini seç. Sistem çarpışmayı senin için yazacak.
      </p>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-ink/50">
          {a ?? '…'} <span className="text-coral">×</span> {b ?? '…'}
        </p>
        <button
          type="button"
          onClick={() => {
            setPoolKey((k) => k + 1)
            setA(null)
            setB(null)
            setCollideResult(null)
            playTap()
          }}
          className="text-sm font-semibold text-teal hover:underline"
        >
          Kavramları yenile
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pool.map((c) => {
          const selected = a === c || b === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                playTap()
                if (a === c) setA(null)
                else if (b === c) setB(null)
                else if (!a) setA(c)
                else if (!b) setB(c)
                else {
                  setA(c)
                  setB(null)
                }
              }}
              className="rounded-full px-4 py-2 text-sm font-semibold transition"
              style={{
                background: selected ? '#102a43' : 'rgba(255,255,255,0.8)',
                color: selected ? '#fff' : '#102a43',
                border: selected ? '1px solid #102a43' : '1px solid rgba(16,42,67,0.12)',
              }}
            >
              {c}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        disabled={!a || !b}
        onClick={strike}
        className="mt-6 w-full rounded-2xl bg-coral px-6 py-3.5 text-sm font-bold text-white transition hover:bg-coral-deep disabled:opacity-35"
      >
        Çarpıştır
      </button>

      <AnimatePresence>
        {collideResult && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-3xl border border-ink/8 bg-white/90 p-6 shadow-[0_20px_50px_rgba(16,42,67,0.08)]"
          >
            <p className="text-sm font-semibold text-coral">Çarpışma sonucu</p>
            <p className="mt-3 text-lg font-semibold leading-snug text-ink">
              {collideResult}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  playTap()
                  setPhase('shape')
                }}
                className="rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-white"
              >
                Sonraki: Şekil ver →
              </button>
              <button
                type="button"
                onClick={() => {
                  setCollideResult(null)
                  strike()
                }}
                className="rounded-2xl border border-ink/15 px-5 py-3 text-sm font-semibold text-ink"
              >
                Tekrar çarpıştır
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
