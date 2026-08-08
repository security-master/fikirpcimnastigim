import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIdeaStore } from '../../store/ideaStore'
import { playAddIdea, playSelect } from '../../hooks/useSound'
import {
  THEMES,
  MOODS,
  MEDIUMS,
  TWISTS,
  composeIdea,
} from '../../data/content'
import { OptionChip } from './OptionChip'

type Step = 'theme' | 'mood' | 'medium' | 'twist' | 'result'

const STEPS: Step[] = ['theme', 'mood', 'medium', 'twist', 'result']

export function NebulaPanel() {
  const [step, setStep] = useState<Step>('theme')
  const [themeId, setThemeId] = useState<string | null>(null)
  const [moodId, setMoodId] = useState<string | null>(null)
  const [mediumId, setMediumId] = useState<string | null>(null)
  const [twistId, setTwistId] = useState<string | null>(null)
  const [result, setResult] = useState<{ title: string; description: string } | null>(null)

  const addIdea = useIdeaStore((s) => s.addIdea)
  const ideas = useIdeaStore((s) => s.ideas)
  const selectedId = useIdeaStore((s) => s.selectedId)
  const selected = ideas.find((i) => i.id === selectedId)
  const removeIdea = useIdeaStore((s) => s.removeIdea)
  const setActivePanel = useIdeaStore((s) => s.setActivePanel)

  const stepIndex = STEPS.indexOf(step)

  const reset = () => {
    setStep('theme')
    setThemeId(null)
    setMoodId(null)
    setMediumId(null)
    setTwistId(null)
    setResult(null)
  }

  const finish = (twist: string) => {
    setTwistId(twist)
    const composed = composeIdea(
      themeId as never,
      moodId as never,
      mediumId as never,
      twist as never,
    )
    setResult(composed)
    setStep('result')
    playAddIdea()
  }

  const save = () => {
    if (!result) return
    addIdea(result.title, ['nebula', themeId ?? '', moodId ?? ''])
    playAddIdea()
  }

  const saveAndOpenNotebook = () => {
    save()
    setActivePanel('notebook')
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">💡 Fikir Üret</h3>
        <p className="text-sm text-white/50">4 seçim yap → kullanabileceğin bir fikir çıksın</p>
      </div>

      <div className="flex gap-1.5">
        {['Tema', 'Ruh Hali', 'Form', 'Büküm'].map((label, i) => (
          <div
            key={label}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < stepIndex ? 'bg-neon-cyan' : i === stepIndex && step !== 'result' ? 'bg-neon-cyan/50' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'theme' && (
          <motion.div key="theme" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-3">
            <p className="text-xs text-white/40">1. Temanı seç</p>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <OptionChip
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  selected={themeId === t.id}
                  onClick={() => {
                    setThemeId(t.id)
                    playSelect()
                    setStep('mood')
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 'mood' && (
          <motion.div key="mood" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-3">
            <p className="text-xs text-white/40">2. Ruh halini seç</p>
            <div className="grid grid-cols-2 gap-2">
              {MOODS.map((m) => (
                <OptionChip
                  key={m.id}
                  icon={m.icon}
                  label={m.label}
                  accent="#ff00aa"
                  selected={moodId === m.id}
                  onClick={() => {
                    setMoodId(m.id)
                    playSelect()
                    setStep('medium')
                  }}
                />
              ))}
            </div>
            <button onClick={() => setStep('theme')} className="text-xs text-white/30 hover:text-white/60">← Geri</button>
          </motion.div>
        )}

        {step === 'medium' && (
          <motion.div key="medium" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-3">
            <p className="text-xs text-white/40">3. Formunu seç</p>
            <div className="grid grid-cols-2 gap-2">
              {MEDIUMS.map((m) => (
                <OptionChip
                  key={m.id}
                  icon={m.icon}
                  label={m.label}
                  accent="#ffd700"
                  selected={mediumId === m.id}
                  onClick={() => {
                    setMediumId(m.id)
                    playSelect()
                    setStep('twist')
                  }}
                />
              ))}
            </div>
            <button onClick={() => setStep('mood')} className="text-xs text-white/30 hover:text-white/60">← Geri</button>
          </motion.div>
        )}

        {step === 'twist' && (
          <motion.div key="twist" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-3">
            <p className="text-xs text-white/40">4. Bükümü seç — fikir üretilecek</p>
            <div className="grid grid-cols-2 gap-2">
              {TWISTS.map((t) => (
                <OptionChip
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  accent="#bf00ff"
                  selected={twistId === t.id}
                  onClick={() => finish(t.id)}
                />
              ))}
            </div>
            <button onClick={() => setStep('medium')} className="text-xs text-white/30 hover:text-white/60">← Geri</button>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="glass rounded-xl p-4 border border-neon-cyan/25">
              <p className="text-xs text-neon-cyan mb-2">Üretilen fikir</p>
              <p className="font-display text-base font-semibold text-white leading-snug">{result.title}</p>
              <p className="mt-2 text-xs text-white/50 leading-relaxed">{result.description}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={saveAndOpenNotebook}
                className="flex-1 rounded-xl py-3 text-sm font-semibold text-void"
                style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}
              >
                Deftere kaydet
              </motion.button>
              <button
                onClick={save}
                className="rounded-xl px-3 py-3 text-xs text-white/60 glass hover:text-white"
              >
                Ekle
              </button>
              <button
                onClick={reset}
                className="rounded-xl px-3 py-3 text-xs text-white/60 glass hover:text-white"
              >
                Yeniden
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
