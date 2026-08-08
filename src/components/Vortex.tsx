import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRiver } from '../store'
import { vortexHum, bottlePop } from '../lib/sound'

export function Vortex() {
  const caught = useRiver((s) => s.caught)
  const finishVortex = useRiver((s) => s.finishVortex)

  useEffect(() => {
    vortexHum()
    const t = window.setTimeout(() => {
      if (useRiver.getState().phase !== 'vortex') return
      bottlePop()
      finishVortex()
    }, 2800)
    return () => window.clearTimeout(t)
  }, [finishVortex])

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
      <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
        <div className="swirl-ring absolute inset-0 rounded-full border border-lime/30" />
        <div
          className="swirl-ring absolute inset-6 rounded-full border border-mint/40"
          style={{ animationDuration: '1.8s', animationDirection: 'reverse' }}
        />
        <div
          className="swirl-ring absolute inset-14 rounded-full border border-foam/20"
          style={{ animationDuration: '1.2s' }}
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <p className="font-display text-sm font-bold tracking-[0.25em] uppercase text-lime">
            Girdap
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-foam md:text-3xl">
            Kelimeler karışıyor
          </p>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {caught.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-full bg-foam/10 px-3 py-1 text-sm font-semibold text-foam"
          >
            {w}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
