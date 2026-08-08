let ctx: AudioContext | null = null

function ac() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function wakeAudio() {
  void ac().resume()
}

function tone(freq: number, dur = 0.12, type: OscillatorType = 'sine', vol = 0.05) {
  try {
    const c = ac()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.value = vol
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
    o.connect(g)
    g.connect(c.destination)
    o.start()
    o.stop(c.currentTime + dur)
  } catch {
    /* ignore */
  }
}

export function splash() {
  tone(220, 0.08, 'triangle', 0.04)
  setTimeout(() => tone(440, 0.1, 'sine', 0.05), 40)
}

export function catchSound() {
  tone(660, 0.09, 'sine', 0.06)
  setTimeout(() => tone(880, 0.12, 'triangle', 0.04), 60)
}

export function vortexHum() {
  tone(110, 0.5, 'sawtooth', 0.02)
  setTimeout(() => tone(165, 0.4, 'sine', 0.03), 120)
  setTimeout(() => tone(330, 0.5, 'sine', 0.04), 280)
}

export function bottlePop() {
  ;[523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 0.16, 'sine', 0.05), i * 100))
}
