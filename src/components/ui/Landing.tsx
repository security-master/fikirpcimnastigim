import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resumeAudio } from '../../hooks/useSound'
import { GOALS } from '../../data/goals'
import { useIdeaStore } from '../../store/ideaStore'

export function Landing() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const setGoal = useIdeaStore((s) => s.setGoal)
  const setPhase = useIdeaStore((s) => s.setPhase)

  const handleStart = () => {
    if (!selectedGoal) return
    resumeAudio()
    setGoal(selectedGoal)
    setPhase('experience')
  }

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center overflow-y-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 max-w-xl"
      >
        <p className="mb-3 text-sm font-medium tracking-wide text-neon-cyan/80">
          Yaratıcı tıkanıklık için pratik araç
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          <span className="text-gradient">Fikir Jimnastiği</span>
        </h1>
        <p className="mt-4 text-base text-white/65 md:text-lg leading-relaxed">
          Ne yazacağını bilmiyor musun? Seçenekleri tıkla —
          <br className="hidden sm:block" />
          kullanabileceğin fikirler otomatik üretisin.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mb-6 w-full max-w-lg"
      >
        <p className="mb-3 text-left text-sm text-white/50">
          Bugün ne için buradasın?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
          {GOALS.map((goal) => {
            const active = selectedGoal === goal.id
            return (
              <motion.button
                key={goal.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGoal(goal.id)}
                className="glass rounded-2xl p-4 transition-all"
                style={{
                  borderWidth: 1,
                  borderColor: active ? 'rgba(0,245,255,0.55)' : 'transparent',
                  background: active ? 'rgba(0,245,255,0.08)' : undefined,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none">{goal.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{goal.label}</p>
                    <p className="mt-1 text-xs text-white/45 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedGoal && (
          <motion.p
            key={selectedGoal}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-5 max-w-md text-sm text-white/50"
          >
            {GOALS.find((g) => g.id === selectedGoal)?.hint}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        whileHover={selectedGoal ? { scale: 1.04 } : undefined}
        whileTap={selectedGoal ? { scale: 0.96 } : undefined}
        onClick={handleStart}
        disabled={!selectedGoal}
        className="rounded-2xl px-10 py-4 font-display text-lg font-semibold text-white disabled:opacity-35 glow-cyan"
        style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.22), rgba(191,0,255,0.22))',
          border: '1px solid rgba(0,245,255,0.35)',
        }}
      >
        {selectedGoal ? 'Başla — fikir üret' : 'Önce amacını seç'}
      </motion.button>

      <p className="mt-6 max-w-sm text-xs text-white/30 leading-relaxed">
        Yazmana gerek yok. Seç → sistem üretir → beğendiklerini deftere kaydet.
      </p>
    </div>
  )
}
