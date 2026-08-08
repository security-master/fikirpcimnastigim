import { motion } from 'framer-motion'
import { useRiver } from '../store'
import { bottlePop, splash } from '../lib/sound'

export function Bottles() {
  const bottles = useRiver((s) => s.bottles)
  const kept = useRiver((s) => s.kept)
  const keepBottle = useRiver((s) => s.keepBottle)
  const setToast = useRiver((s) => s.setToast)
  const reset = useRiver((s) => s.reset)
  const caught = useRiver((s) => s.caught)

  const copyKept = async () => {
    const list = kept.length ? kept : bottles
    const text = [
      'Fikir Jimnastiği — Irmağın getirdikleri',
      `Yakalananlar: ${caught.join(', ')}`,
      '',
      ...list.map((b, i) => `${i + 1}. ${b}`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setToast('Şişeler panoya kopyalandı')
      bottlePop()
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('Kopyalanamadı')
      setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 py-8 md:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-lime">
            Kıyıya vurdu
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-foam md:text-5xl">
            Üç fikir şişesi
          </h2>
          <p className="mt-3 max-w-xl text-foam/65">
            Irmağın senin için yazdıkları. Beğendiğini tut, hepsini kıyıya al.
          </p>
        </motion.div>

        <div className="mt-8 space-y-4">
          {bottles.map((text, i) => {
            const isKept = kept.includes(text)
            return (
              <motion.article
                key={text}
                initial={{ opacity: 0, y: 24, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="bob rounded-[1.75rem] border border-foam/15 bg-gradient-to-br from-foam/10 to-ink/40 p-5 backdrop-blur-md md:p-6"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-mint">
                    Şişe {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      keepBottle(text)
                      splash()
                    }}
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: isKept ? '#d6ff4b' : 'rgba(232,255,251,0.1)',
                      color: isKept ? '#03181c' : '#e8fffb',
                    }}
                  >
                    {isKept ? 'Tutuldu' : 'Tut'}
                  </button>
                </div>
                <p className="text-base font-medium leading-relaxed text-foam md:text-lg">
                  {text}
                </p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 pb-10">
          <button
            type="button"
            onClick={copyKept}
            className="rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-ink"
          >
            Kıyıya al (kopyala)
          </button>
          <button
            type="button"
            onClick={() => {
              splash()
              reset()
            }}
            className="rounded-full border border-foam/20 px-6 py-3 text-sm font-semibold text-foam/80"
          >
            Tekrar ırmağa gir
          </button>
        </div>
      </div>
    </div>
  )
}
