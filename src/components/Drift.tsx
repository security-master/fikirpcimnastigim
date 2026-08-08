import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DRIFT_WORDS } from '../lib/words'
import { useRiver } from '../store'
import { catchSound } from '../lib/sound'

type Floater = {
  id: string
  word: string
  x: number
  y: number
}

function spawn(): Floater {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    word: DRIFT_WORDS[Math.floor(Math.random() * DRIFT_WORDS.length)],
    x: 8 + Math.random() * 70,
    y: 16 + Math.random() * 48,
  }
}

export function Drift() {
  const caught = useRiver((s) => s.caught)
  const need = useRiver((s) => s.need)
  const catchWord = useRiver((s) => s.catchWord)
  const [floaters, setFloaters] = useState<Floater[]>(() =>
    Array.from({ length: 6 }, spawn),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setFloaters((prev) => {
        const next = prev.length > 10 ? prev.slice(-8) : prev
        return [...next, spawn(), spawn()]
      })
    }, 1400)
    return () => window.clearInterval(id)
  }, [])

  const remaining = need - caught.length

  const grab = (word: string, id: string) => {
    if (caught.includes(word) || caught.length >= need) return
    catchSound()
    catchWord(word)
    setFloaters((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="relative z-10 h-full w-full select-none">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 py-5 md:px-10">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-lime">
            Irmağa bırak
          </p>
          <p className="mt-1 text-sm text-foam/60">Parlayan kelimelere dokun — ağa düşsün</p>
        </div>
        <div className="rounded-full border border-foam/15 bg-ink/40 px-4 py-2 text-sm font-semibold text-foam backdrop-blur-md">
          {caught.length}/{need}
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {floaters.map((f) => {
            const taken = caught.includes(f.word)
            return (
              <motion.button
                key={f.id}
                type="button"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: taken ? 0.2 : 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                  y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                }}
                onPointerDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  grab(f.word, f.id)
                }}
                disabled={taken || caught.length >= need}
                className="absolute touch-manipulation rounded-full border px-5 py-3 font-display text-base font-bold shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:text-lg"
                style={{
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  borderColor: taken ? 'rgba(214,255,75,0.2)' : 'rgba(214,255,75,0.55)',
                  background: taken ? 'rgba(214,255,75,0.08)' : 'rgba(3,24,28,0.72)',
                  color: taken ? 'rgba(214,255,75,0.45)' : '#e8fffb',
                  zIndex: 15,
                }}
              >
                {f.word}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Auto-despawn old floaters */}
      <FloaterJanitor floaters={floaters} setFloaters={setFloaters} />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-5 pb-8 md:px-10">
        <div className="pointer-events-auto mx-auto max-w-3xl rounded-[2rem] border border-foam/15 bg-ink/55 p-4 backdrop-blur-xl md:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Ağın</p>
            <p className="text-xs font-medium text-foam/50">
              {remaining === 0 ? 'Girdap açılıyor…' : `${remaining} kelime daha`}
            </p>
          </div>
          <div className="flex min-h-12 flex-wrap gap-2">
            {caught.length === 0 ? (
              <p className="text-sm text-foam/40">Henüz boş — parlayan bir kelimeye dokun</p>
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

function FloaterJanitor({
  floaters,
  setFloaters,
}: {
  floaters: Floater[]
  setFloaters: Dispatch<SetStateAction<Floater[]>>
}) {
  useEffect(() => {
    if (floaters.length === 0) return
    const oldest = floaters[0]
    const t = window.setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== oldest.id))
    }, 4500)
    return () => window.clearTimeout(t)
  }, [floaters, setFloaters])
  return null
}
