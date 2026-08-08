export function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 10% 0%, #ffe8d6 0%, transparent 45%), radial-gradient(90% 70% at 90% 10%, #cffafe 0%, transparent 40%), linear-gradient(180deg, #f3f6f9 0%, #e8eef5 55%, #f7fafc 100%)',
        }}
      />
      <div
        className="atmosphere-orb-a absolute -left-24 top-10 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,77,46,0.28), transparent 68%)' }}
      />
      <div
        className="atmosphere-orb-b absolute -right-16 top-40 h-[380px] w-[380px] rounded-full opacity-80 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.35), transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-120px] left-1/3 h-[320px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,42,67,0.12), transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,42,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,42,67,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
    </div>
  )
}
