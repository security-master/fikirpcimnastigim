import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DRIFT_WORDS, type Floater } from '../lib/words'
import { useRiver } from '../store'
import { catchSound } from '../lib/sound'

function makeFloater(i: number): Floater {
  return {
    id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
    word: DRIFT_WORDS[Math.floor(Math.random() * DRIFT_WORDS.length)],
    y: 12 + Math.random() * 58,
    duration: 7 + Math.random() * 7,
    delay: Math.random() * 0.4,
    size: 0.9 + Math.random() * 0.5,
  }
}

export function Drift() {
  const caught = useRiver((s) => s.caught)
  const need = useRiver((s) => s.need)
  const catchWord = useRiver((s) => s.catchWord)
  const [floaters, setFloaters] = useState<Floater[]>(() =>
    Array.from({ length: 8 }, (_, i) => makeFloater(i)),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setFloaters((prev) => {
        const next = prev.length > 14 ? prev.slice(-10) : prev
        return [...next, makeFloater(next.length)]
      })
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  const remaining = need - caught.length

  const netLabel = useMemo(
    () => (remaining === 0 ? 'Girdap açılıyor…' : `${remaining} kelime daha`),
    [remaining],
  )

  return (
    <div className="relative z-10 h-full w-full">
      <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 md:px-10">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-lime">
            Irmağa bırak
          </p>
          <p className="mt-1 text-sm text-foam/60">Akan kelimelere dokun — ağa düşsün</p>
        </div>
        <div className="rounded-full border border-foam/15 bg-ink/40 px-4 py-2 text-sm font-semibold text-foam backdrop-blur-md">
          {caught.length}/{need}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {floaters.map((f) => {
            const taken = caught.includes(f.word)
            return (
              <motion.button
                key={f.id}
                type="button"
                initial={{ x: '-20vw', opacity: 0 }}
                animate={{ x: '110vw', opacity: taken ? 0.15 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: f.duration, delay: f.delay, ease: 'linear' }}
                onAnimationComplete={() => {
                  setFloaters((prev) => prev.filter((p) => p.id !== f.id))
                }}
                onClick={() => {
                  if (taken || caught.length >= need) return
                  catchSound()
                  catchWord(f.word)
                }}
                disabled={taken || caught.length >= need}
                className="absolute whitespace-nowrap rounded-full border px-4 py-2 font-display font-bold shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition disabled:cursor-default"
                style={{
                  top: `${f.y}%`,
                  fontSize: `${f.size}rem`,
                  borderColor: taken ? 'rgba(214,255,75,0.2)' : 'rgba(232,255,251,0.25)',
                  background: taken ? 'rgba(214,255,75,0.08)' : 'rgba(3,24,28,0.45)',
                  color: taken ? 'rgba(214,255,75,0.5)' : '#e8fffb',
                }}
              >
                {f.word}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-foam/15 bg-ink/50 p-4 backdrop-blur-xl md:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Ağın</p>
            <p className="text-xs font-medium text-foam/50">{netLabel}</p>
          </div>
          <div className="flex min-h-12 flex-wrap gap-2">
            {caught.length === 0 ? (
              <p className="text-sm text-foam/40">Henüz boş — bir kelimeye dokun</p>
            ) : (
              caught.map((w) => (
                <span
                  key={w}
                  className="rounded-full bg-lime px-3 py-1.5 text-sm font-bold text-ink"
                >
                  {w}
                </span>
              ))
            )}
            {Array.from({ length: Math.max(0, need - caught.length) }).map((_, i) => (
              <span
                key={`slot-${i}`}
                className="rounded-full border border-dashed border-foam/20 px-3 py-1.5 text-sm text-foam/25"
              >
                ···
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
