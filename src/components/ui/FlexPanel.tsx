import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FLEX_ROUNDS, pickN } from '../../data/content'
import { useIdeaStore } from '../../store/ideaStore'
import { playAddIdea, playTick, playSuccess, playSelect } from '../../hooks/useSound'
import { OptionChip } from './OptionChip'

const DURATION = 45

export function FlexPanel() {
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [running, setRunning] = useState(false)
  const [roundIndex, setRoundIndex] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [shuffleKey, setShuffleKey] = useState(0)

  const flexScore = useIdeaStore((s) => s.flexScore)
  const addIdea = useIdeaStore((s) => s.addIdea)
  const resetFlexScore = useIdeaStore((s) => s.resetFlexScore)
  const incrementFlexScore = useIdeaStore((s) => s.incrementFlexScore)

  const rounds = useMemo(() => pickN(FLEX_ROUNDS, FLEX_ROUNDS.length), [shuffleKey])
  const current = rounds[roundIndex % rounds.length]

  const start = () => {
    resetFlexScore()
    setTimeLeft(DURATION)
    setRoundIndex(0)
    setPicked([])
    setShuffleKey((k) => k + 1)
    setRunning(true)
  }

  const finish = useCallback(() => {
    setRunning(false)
    playSuccess()
  }, [])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      finish()
      return
    }
    const timer = setTimeout(() => {
      if (timeLeft <= 5) playTick()
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [running, timeLeft, finish])

  const choose = (option: string) => {
    if (!running) return
    playSelect()
    playAddIdea()
    addIdea(`${current.prompt} → ${option}`, ['flex'])
    incrementFlexScore()
    setPicked((p) => [...p, option])
    setRoundIndex((i) => i + 1)
  }

  const progress = ((DURATION - timeLeft) / DURATION) * 100

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">🔥 Isınma</h3>
        <p className="text-sm text-white/50">45 sn · seçeneklere tıkla, zihnini aç</p>
      </div>

      {!running && timeLeft === DURATION && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={start}
          className="w-full rounded-xl py-3 font-semibold text-void"
          style={{ background: 'linear-gradient(135deg, #ffd700, #ff6b35)' }}
        >
          Başla!
        </motion.button>
      )}

      {running && current && (
        <>
          <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, #ffd700, #ff6b35)', width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-3xl font-bold text-neon-gold">{timeLeft}s</span>
            <span className="text-sm text-white/50">{flexScore} seçim</span>
          </div>

          <div className="glass rounded-xl p-4">
            <p className="text-sm font-medium text-white/90">{current.prompt}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {current.options.map((option) => (
              <OptionChip
                key={`${roundIndex}-${option}`}
                label={option}
                accent="#ffd700"
                onClick={() => choose(option)}
              />
            ))}
          </div>
        </>
      )}

      {!running && timeLeft < DURATION && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-6 text-center space-y-3"
        >
          <p className="text-4xl">🎉</p>
          <p className="font-display text-2xl font-bold text-gradient">{flexScore} Seçim!</p>
          <p className="text-sm text-white/50">
            {flexScore >= 10 ? 'Efsanevi zihin!' : flexScore >= 5 ? 'Harika refleks!' : 'Güzel başlangıç!'}
          </p>
          {picked.length > 0 && (
            <div className="text-left space-y-1 max-h-28 overflow-y-auto">
              {picked.slice(-5).map((p, i) => (
                <p key={i} className="text-xs text-white/40 truncate">• {p}</p>
              ))}
            </div>
          )}
          <button onClick={start} className="text-sm text-neon-cyan hover:underline">
            Tekrar dene
          </button>
        </motion.div>
      )}
    </div>
  )
}
