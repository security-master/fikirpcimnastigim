let ctx: AudioContext | null = null

function getCtx() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function resumeAudio() {
  void getCtx().resume()
}

export function playTap() {
  try {
    const c = getCtx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'triangle'
    o.frequency.value = 520
    g.gain.value = 0.05
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12)
    o.connect(g)
    g.connect(c.destination)
    o.start()
    o.stop(c.currentTime + 0.12)
  } catch {
    /* ignore */
  }
}

export function playSuccess() {
  ;[392, 523, 659].forEach((f, i) => {
    setTimeout(() => {
      try {
        const c = getCtx()
        const o = c.createOscillator()
        const g = c.createGain()
        o.type = 'sine'
        o.frequency.value = f
        g.gain.value = 0.05
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18)
        o.connect(g)
        g.connect(c.destination)
        o.start()
        o.stop(c.currentTime + 0.18)
      } catch {
        /* ignore */
      }
    }, i * 90)
  })
}
