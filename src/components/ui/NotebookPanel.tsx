import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIdeaStore } from '../../store/ideaStore'
import { getGoal } from '../../data/goals'
import { playSelect, playSuccess } from '../../hooks/useSound'

export function NotebookPanel() {
  const ideas = useIdeaStore((s) => s.ideas)
  const goalId = useIdeaStore((s) => s.goalId)
  const removeIdea = useIdeaStore((s) => s.removeIdea)
  const toggleStar = useIdeaStore((s) => s.toggleStar)
  const selectIdea = useIdeaStore((s) => s.selectIdea)
  const clearAll = useIdeaStore((s) => s.clearAll)
  const setCopiedToast = useIdeaStore((s) => s.setCopiedToast)
  const [filter, setFilter] = useState<'all' | 'starred'>('all')

  const goal = getGoal(goalId)
  const list = filter === 'starred' ? ideas.filter((i) => i.starred) : ideas
  const sorted = [...list].sort((a, b) => b.createdAt - a.createdAt)

  const copyAll = async () => {
    if (ideas.length === 0) return
    const text = [
      `Fikir Jimnastiği — ${goal?.label ?? 'Fikirlerim'}`,
      `Tarih: ${new Date().toLocaleDateString('tr-TR')}`,
      '',
      ...ideas.map((i, idx) => `${idx + 1}. ${i.text}${i.starred ? ' ★' : ''}`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopiedToast('Defter panoya kopyalandı')
      playSuccess()
      setTimeout(() => setCopiedToast(null), 2200)
    } catch {
      setCopiedToast('Kopyalama desteklenmiyor')
      setTimeout(() => setCopiedToast(null), 2200)
    }
  }

  const download = () => {
    if (ideas.length === 0) return
    const text = ideas.map((i, idx) => `${idx + 1}. ${i.text}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fikir-defterim.txt'
    a.click()
    URL.revokeObjectURL(url)
    playSelect()
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">📓 Fikir Defterin</h3>
        <p className="text-sm text-white/50">
          {goal
            ? `${goal.resultLabel} burada birikir. Beğendiklerini yıldızla, hepsini kopyala.`
            : 'Ürettiğin fikirler burada toplanır.'}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={copyAll}
          disabled={ideas.length === 0}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-void disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}
        >
          Hepsini kopyala
        </button>
        <button
          onClick={download}
          disabled={ideas.length === 0}
          className="glass rounded-xl px-4 py-2.5 text-sm text-white/70 disabled:opacity-40"
        >
          İndir
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-3 py-1.5 text-xs ${filter === 'all' ? 'bg-white/10 text-white' : 'text-white/40'}`}
        >
          Tümü ({ideas.length})
        </button>
        <button
          onClick={() => setFilter('starred')}
          className={`rounded-lg px-3 py-1.5 text-xs ${filter === 'starred' ? 'bg-white/10 text-white' : 'text-white/40'}`}
        >
          Yıldızlı ({ideas.filter((i) => i.starred).length})
        </button>
        {ideas.length > 0 && (
          <button
            onClick={clearAll}
            className="ml-auto text-xs text-white/25 hover:text-red-400"
          >
            Temizle
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-sm text-white/50">Henüz fikir yok.</p>
          <p className="mt-1 text-xs text-white/30">
            Sol menüden bir araç seç, seçeneklere tıkla — sonuçlar buraya düşer.
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {sorted.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="glass rounded-xl p-3"
            >
              <div className="flex items-start gap-2">
                <div
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: idea.color }}
                />
                <button
                  onClick={() => selectIdea(idea.id)}
                  className="flex-1 text-left text-sm text-white/85 leading-snug hover:text-white"
                >
                  {idea.text}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-3 pl-5">
                <button
                  onClick={() => toggleStar(idea.id)}
                  className={`text-xs ${idea.starred ? 'text-neon-gold' : 'text-white/30 hover:text-neon-gold'}`}
                >
                  {idea.starred ? '★ Yıldızlı' : '☆ Yıldızla'}
                </button>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(idea.text)
                    setCopiedToast('Fikir kopyalandı')
                    playSelect()
                    setTimeout(() => setCopiedToast(null), 1800)
                  }}
                  className="text-xs text-white/30 hover:text-neon-cyan"
                >
                  Kopyala
                </button>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="text-xs text-white/25 hover:text-red-400 ml-auto"
                >
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
