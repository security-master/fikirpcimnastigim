import { motion } from 'framer-motion'
import { resumeAudio } from '../../hooks/useSound'

interface LandingProps {
  onStart: () => void
}

export function Landing({ onStart }: LandingProps) {
  const handleStart = () => {
    resumeAudio()
    onStart()
  }

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="mb-6 text-6xl animate-float">🧠</div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient">Fikir</span>
          <br />
          <span className="text-white">Jimnastiği</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-4 max-w-lg text-lg text-white/60 md:text-xl"
      >
        Seçenekleri seç — fikirler kendiliğinden doğsun.
        <br />
        3D evrende yaratıcı zekanı keşfet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-12 flex flex-wrap justify-center gap-3 text-sm text-white/40"
      >
        {['3D Fikir Nebulası', 'Sinaptik Fırtına', 'Zihin Esnekliği', 'SCAMPER'].map((tag) => (
          <span key={tag} className="glass rounded-full px-4 py-1.5">
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        className="group relative overflow-hidden rounded-2xl px-12 py-4 font-display text-lg font-semibold text-white glow-cyan"
        style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))',
          border: '1px solid rgba(0,245,255,0.3)',
        }}
      >
        <span className="relative z-10">Evrene Gir ✨</span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-xs text-white/25"
      >
        Ses için tıkla · Tam ekran deneyim
      </motion.p>
    </div>
  )
}
