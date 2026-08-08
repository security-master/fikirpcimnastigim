import { motion } from 'framer-motion'
import { WORKOUTS } from '../data/workouts'
import { useSessionStore } from '../store/sessionStore'
import { playSuccess, playTap } from '../hooks/useSound'

const SOURCE_LABEL = {
  warmup: 'Isınma',
  collide: 'Çarpışma',
  shape: 'Şekil',
} as const

export function Finale() {
  const ideas = useSessionStore((s) => s.ideas)
  const workoutId = useSessionStore((s) => s.workoutId)
  const toggleStar = useSessionStore((s) => s.toggleStar)
  const removeIdea = useSessionStore((s) => s.removeIdea)
  const reset = useSessionStore((s) => s.reset)
  const setToast = useSessionStore((s) => s.setToast)
  const workout = WORKOUTS.find((w) => w.id === workoutId)

  const starred = ideas.filter((i) => i.starred)
  const exportList = starred.length > 0 ? starred : ideas

  const copyAll = async () => {
    const text = [
      `Fikir Jimnastiği — ${workout?.title ?? 'Antrenman'}`,
      new Date().toLocaleString('tr-TR'),
      '',
      ...exportList.map((i, idx) => `${idx + 1}. ${i.text}`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setToast('Fikirlerin panoya kopyalandı')
      playSuccess()
      setTimeout(() => setToast(null), 2200)
    } catch {
      setToast('Kopyalama başarısız')
      setTimeout(() => setToast(null), 2200)
    }
  }

  const download = () => {
    const text = exportList.map((i, idx) => `${idx + 1}. ${i.text}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fikir-jimnastigi-antrenman.txt'
    a.click()
    URL.revokeObjectURL(url)
    playTap()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        Antrenman bitti
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
        İşte bugünkü fikirlerin
      </h2>
      <p className="mt-2 text-ink-soft/70">
        {workout
          ? `${workout.title} tamamlandı. Beğendiklerini yıldızla, hepsini alıp çık.`
          : 'Beğendiklerini yıldızla, hepsini alıp çık.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyAll}
          disabled={ideas.length === 0}
          className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          Kopyala
        </button>
        <button
          type="button"
          onClick={download}
          disabled={ideas.length === 0}
          className="rounded-2xl border border-ink/15 bg-white/80 px-5 py-3 text-sm font-bold text-ink disabled:opacity-40"
        >
          .txt indir
        </button>
        <button
          type="button"
          onClick={() => {
            playTap()
            reset()
          }}
          className="rounded-2xl px-5 py-3 text-sm font-semibold text-ink/55 hover:text-ink"
        >
          Yeni antrenman
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {ideas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink/15 bg-white/50 p-8 text-center text-sm text-ink/50">
            Bu turda fikir birikmedi. Yeni bir antrenman dene.
          </div>
        ) : (
          ideas.map((idea, i) => (
            <motion.article
              key={idea.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="stamp-in rounded-3xl border border-ink/8 bg-white/90 p-5 shadow-[0_12px_30px_rgba(16,42,67,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink/35">
                    {SOURCE_LABEL[idea.source]}
                  </p>
                  <p className="mt-1 text-base font-semibold leading-snug text-ink">
                    {idea.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleStar(idea.id)}
                  className="text-lg"
                  aria-label="Yıldızla"
                >
                  {idea.starred ? '★' : '☆'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeIdea(idea.id)}
                className="mt-3 text-xs font-medium text-ink/30 hover:text-coral"
              >
                Kaldır
              </button>
            </motion.article>
          ))
        )}
      </div>
    </div>
  )
}
