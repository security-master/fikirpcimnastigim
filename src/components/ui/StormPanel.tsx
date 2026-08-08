import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONCEPTS, STORM_TEMPLATES } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playStorm } from '../../hooks/useSound'

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function StormPanel() {
  const [conceptA, setConceptA] = useState('')
  const [conceptB, setConceptB] = useState('')
  const [result, setResult] = useState('')
  const [isStriking, setIsStriking] = useState(false)
  const addIdea = useIdeaStore((s) => s.addIdea)
  const setStormResult = useIdeaStore((s) => s.setStormResult)

  const strike = () => {
    setIsStriking(true)
    playStorm()
    const a = conceptA || pick(CONCEPTS)
    const b = conceptB || pick(CONCEPTS)
    setConceptA(a)
    setConceptB(b)
    const template = pick(STORM_TEMPLATES)
    const collision = template(a, b)
    setTimeout(() => {
      setResult(collision)
      setStormResult(collision)
      setIsStriking(false)
    }, 600)
  }

  const saveCollision = () => {
    if (result) {
      addIdea(result, ['storm'])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">⚡ Sinaptik Fırtına</h3>
        <p className="text-sm text-white/50">İki kavramı çarpıştır, yeni bir fikir doğsun</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={conceptA}
          onChange={(e) => setConceptA(e.target.value)}
          placeholder="Kavram 1"
          className="flex-1 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-magenta/50"
        />
        <motion.span
          animate={isStriking ? { scale: [1, 2, 1], rotate: [0, 180, 360] } : {}}
          className="text-2xl"
        >
          ⚡
        </motion.span>
        <input
          value={conceptB}
          onChange={(e) => setConceptB(e.target.value)}
          placeholder="Kavram 2"
          className="flex-1 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-neon-magenta/50"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={strike}
        disabled={isStriking}
        className="w-full rounded-xl py-3 font-semibold text-white glow-magenta disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, rgba(255,0,170,0.3), rgba(191,0,255,0.3))', border: '1px solid rgba(255,0,170,0.3)' }}
      >
        {isStriking ? 'Çarpışıyor...' : 'Fırtınayı Başlat'}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-xl p-4 border border-neon-magenta/20"
          >
            <p className="text-sm text-white/80 leading-relaxed">{result}</p>
            <button
              onClick={saveCollision}
              className="mt-3 text-xs text-neon-cyan hover:underline"
            >
              → Evrene kaydet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
