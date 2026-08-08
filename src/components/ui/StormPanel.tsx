import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONCEPTS, STORM_TEMPLATES, pickN, pickOne } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playStorm, playSelect } from '../../hooks/useSound'
import { OptionChip } from './OptionChip'

export function StormPanel() {
  const [poolKey, setPoolKey] = useState(0)
  const poolA = useMemo(() => pickN(CONCEPTS, 8), [poolKey])
  const poolB = useMemo(() => pickN(CONCEPTS.filter((c) => !poolA.includes(c)), 8), [poolKey, poolA])

  const [conceptA, setConceptA] = useState<string | null>(null)
  const [conceptB, setConceptB] = useState<string | null>(null)
  const [result, setResult] = useState('')
  const [isStriking, setIsStriking] = useState(false)

  const addIdea = useIdeaStore((s) => s.addIdea)
  const setStormResult = useIdeaStore((s) => s.setStormResult)

  const strike = () => {
    if (!conceptA || !conceptB) return
    setIsStriking(true)
    playStorm()
    const template = pickOne(STORM_TEMPLATES)
    const collision = template(conceptA, conceptB)
    setTimeout(() => {
      setResult(collision)
      setStormResult(collision)
      setIsStriking(false)
    }, 600)
  }

  const reshuffle = () => {
    setPoolKey((k) => k + 1)
    setConceptA(null)
    setConceptB(null)
    setResult('')
    playSelect()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">⚡ Çarpıştır</h3>
          <p className="text-sm text-white/50">İki kavram seç → beklenmedik bir fikir doğsun</p>
        </div>
        <button onClick={reshuffle} className="text-xs text-white/40 hover:text-neon-cyan transition-colors">
          Yenile
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">Sol kavram</p>
        <div className="flex flex-wrap gap-2">
          {poolA.map((c) => (
            <OptionChip
              key={`a-${c}`}
              label={c}
              size="sm"
              accent="#ff00aa"
              selected={conceptA === c}
              onClick={() => {
                setConceptA(c)
                playSelect()
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.span
          animate={isStriking ? { scale: [1, 2, 1], rotate: [0, 180, 360] } : {}}
          className="text-2xl"
        >
          ⚡
        </motion.span>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40">Sağ kavram</p>
        <div className="flex flex-wrap gap-2">
          {poolB.map((c) => (
            <OptionChip
              key={`b-${c}`}
              label={c}
              size="sm"
              accent="#00f5ff"
              selected={conceptB === c}
              onClick={() => {
                setConceptB(c)
                playSelect()
              }}
            />
          ))}
        </div>
      </div>

      {(conceptA || conceptB) && (
        <p className="text-center text-sm text-white/60">
          <span className="text-neon-magenta">{conceptA ?? '…'}</span>
          {' × '}
          <span className="text-neon-cyan">{conceptB ?? '…'}</span>
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={strike}
        disabled={!conceptA || !conceptB || isStriking}
        className="w-full rounded-xl py-3 font-semibold text-white glow-magenta disabled:opacity-40"
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
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => addIdea(result, ['storm'])}
                className="text-xs text-neon-cyan hover:underline"
              >
                → Deftere kaydet
              </button>
              <button
                onClick={() => {
                  setResult('')
                  strike()
                }}
                className="text-xs text-white/40 hover:text-white/70"
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
