export function RiverBed() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 120%, #0d6b78 0%, transparent 55%), linear-gradient(180deg, #03181c 0%, #052e34 35%, #0a4f5c 70%, #0d6b78 100%)',
        }}
      />

      <div
        className="river-caustic absolute -left-[10%] top-[10%] h-[70%] w-[70%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(125,211,199,0.35), transparent 65%)' }}
      />
      <div
        className="river-caustic absolute -right-[15%] top-[30%] h-[60%] w-[60%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(214,255,75,0.18), transparent 60%)', animationDelay: '-3s' }}
      />

      <svg className="absolute bottom-0 left-0 h-[38%] w-[200%] river-wave opacity-40" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path
          fill="rgba(232,255,251,0.08)"
          d="M0,120 C180,180 360,40 540,100 C720,160 900,60 1080,110 C1260,160 1350,90 1440,120 L1440,200 L0,200 Z"
        />
        <path
          fill="rgba(214,255,75,0.06)"
          d="M0,140 C200,90 400,170 600,130 C800,90 1000,160 1200,120 C1320,100 1380,130 1440,140 L1440,200 L0,200 Z"
        />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(232,255,251,0.5) 0.6px, transparent 0.6px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(180deg, transparent, black 30%, black 70%, transparent)',
        }}
      />
    </div>
  )
}
