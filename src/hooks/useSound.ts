let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

export function playTone(freq: number, duration = 0.15, type: OscillatorType = 'sine', volume = 0.08) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch { /* silent */ }
}

export function playAddIdea() {
  playTone(523, 0.1)
  setTimeout(() => playTone(659, 0.1), 80)
  setTimeout(() => playTone(784, 0.15), 160)
}

export function playStorm() {
  playTone(110, 0.3, 'sawtooth', 0.04)
  setTimeout(() => playTone(220, 0.2, 'square', 0.03), 100)
  setTimeout(() => playTone(440, 0.4, 'sine', 0.06), 200)
  setTimeout(() => playTone(880, 0.5, 'sine', 0.04), 350)
}

export function playSelect() {
  playTone(440, 0.08, 'triangle', 0.05)
}

export function playSuccess() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, 'sine', 0.06), i * 100)
  })
}

export function playTick() {
  playTone(800, 0.05, 'square', 0.03)
}

export function resumeAudio() {
  getCtx().resume()
}
