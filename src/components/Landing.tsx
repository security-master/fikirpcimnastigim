import { motion } from 'framer-motion'
import { WORKOUTS } from '../data/workouts'
import { useSessionStore } from '../store/sessionStore'
import { playTap, resumeAudio } from '../hooks/useSound'

export function Landing() {
  const chooseWorkout = useSessionStore((s) => s.chooseWorkout)

  return (
    <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-5 py-10 md:px-8">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.18em] uppercase text-teal">
          Fikir Jimnastiği
        </p>
        <h1 className="font-display text-[clamp(2.6rem,8vw,5.4rem)] font-extrabold leading-[0.95] tracking-tight text-ink">
          5 dakikalık
          <br />
          <span className="text-coral">yaratıcı antrenman.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft/80 md:text-xl">
          Takıldın mı? Yazmana gerek yok. Seçenekleri seç — üç istasyonda
          kullanabileceğin fikirler üretilsin, sonunda defterine kalsın.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-10"
      >
        <p className="mb-3 text-sm font-semibold text-ink/55">Antrenmanını seç</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {WORKOUTS.map((w, i) => (
            <motion.button
              key={w.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                resumeAudio()
                playTap()
                chooseWorkout(w.id)
              }}
              className="group rounded-3xl border border-ink/8 bg-white/70 p-5 text-left shadow-[0_10px_40px_rgba(16,42,67,0.06)] backdrop-blur-md transition-colors hover:border-coral/40 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">{w.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft/75">{w.subtitle}</p>
                </div>
                <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink">
                  {w.duration}
                </span>
              </div>
              <p className="mt-4 text-xs font-medium text-ink/45">{w.forWho}</p>
              <p className="mt-3 text-sm font-semibold text-coral opacity-0 transition-opacity group-hover:opacity-100">
                Başla →
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-sm text-ink/40"
      >
        Akış: Isın → Çarpıştır → Şekil ver → Özetini al
      </motion.p>
    </div>
  )
}
