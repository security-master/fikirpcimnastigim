import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIdeaStore } from '../../store/ideaStore'
import { playAddIdea } from '../../hooks/useSound'
import { STARTER_IDEAS } from '../../data/content'

export function NebulaPanel() {
  const [input, setInput] = useState('')
  const addIdea = useIdeaStore((s) => s.addIdea)
  const ideas = useIdeaStore((s) => s.ideas)
  const selectedId = useIdeaStore((s) => s.selectedId)
  const selected = ideas.find((i) => i.id === selectedId)
  const removeIdea = useIdeaStore((s) => s.removeIdea)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    addIdea(input)
    playAddIdea()
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">Fikir Nebulası</h3>
        <p className="text-sm text-white/50">Bir fikir yaz, evrende yıldız olarak doğsun</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fikrini yaz..."
          className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-cyan/50 transition-all"
          maxLength={120}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="rounded-xl px-5 py-3 text-sm font-semibold text-void"
          style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}
        >
          Ekle
        </motion.button>
      </form>

      {ideas.length === 0 && (
        <div className="space-y-2">
          <p className="text-xs text-white/30">Başlamak için dene:</p>
          <div className="flex flex-wrap gap-2">
            {STARTER_IDEAS.map((idea) => (
              <button
                key={idea}
                onClick={() => { addIdea(idea); playAddIdea() }}
                className="glass rounded-lg px-3 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: selected.color }} />
                <span className="text-xs text-white/40">Seçili Fikir</span>
              </div>
              <p className="text-sm text-white/90">{selected.text}</p>
            </div>
            <button
              onClick={() => removeIdea(selected.id)}
              className="text-white/30 hover:text-red-400 text-xs transition-colors"
            >
              Sil
            </button>
          </div>
        </motion.div>
      )}

      {ideas.length > 0 && (
        <p className="text-xs text-white/30">
          {ideas.length} fikir evrende · Döndürmek için sürükle
        </p>
      )}
    </div>
  )
}
