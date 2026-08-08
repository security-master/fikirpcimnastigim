import type { Phase } from '../store/sessionStore'

const STEPS: { id: Phase; label: string }[] = [
  { id: 'warmup', label: 'Isın' },
  { id: 'collide', label: 'Çarpıştır' },
  { id: 'shape', label: 'Şekil ver' },
  { id: 'finale', label: 'Özet' },
]

export function ProgressRail({ phase }: { phase: Phase }) {
  if (phase === 'landing') return null
  const idx = STEPS.findIndex((s) => s.id === phase)

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const done = i < idx
        const active = i === idx
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: done || active ? '#102a43' : 'rgba(16,42,67,0.08)',
                  color: done || active ? '#fff' : 'rgba(16,42,67,0.4)',
                  outline: active ? '2px solid #ff4d2e' : undefined,
                  outlineOffset: 2,
                }}
              >
                {i + 1}
              </div>
              <span
                className="hidden text-xs font-semibold sm:inline"
                style={{ color: active ? '#102a43' : 'rgba(16,42,67,0.4)' }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 w-6 rounded-full sm:w-10"
                style={{ background: done ? '#ff4d2e' : 'rgba(16,42,67,0.12)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
