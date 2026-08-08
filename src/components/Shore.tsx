import { motion } from 'framer-motion'
import { useRiver } from '../store'
import { wakeAudio, splash } from '../lib/sound'

export function Shore() {
  const enterRiver = useRiver((s) => s.enterRiver)

  return (
    <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-10 md:justify-center md:px-16 md:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.28em] uppercase text-lime">
          Fikir Jimnastiği
        </p>
        <h1 className="font-display text-[clamp(3rem,10vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight text-foam">
          Zihnini
          <br />
          ırmağa bırak.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-foam/70 md:text-xl">
          Akan kelimeleri yakala. Beş tanesi birikince girdap döner —
          kıyıya üç fikir şişesi vurur.
        </p>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            wakeAudio()
            splash()
            enterRiver()
          }}
          className="mt-10 rounded-full bg-lime px-10 py-4 font-display text-lg font-bold text-ink shadow-[0_0_40px_rgba(214,255,75,0.35)]"
        >
          Suya gir
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute right-6 top-1/4 hidden bob md:block lg:right-20"
      >
        <div className="rounded-full border border-foam/20 bg-foam/5 px-5 py-3 text-sm text-foam/50 backdrop-blur-sm">
          yazma · sadece yakala
        </div>
      </motion.div>
    </div>
  )
}
