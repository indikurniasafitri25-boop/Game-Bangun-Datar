// Web Audio API Sound Synthesizer & Haptic Feedback
import { Haptics, ImpactStyle } from '@capacitor/haptics'

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx = new AudioContextClass()
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }
    return audioCtx
  } catch {
    return null
  }
}

export async function triggerHaptic() {
  try {
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch {
    // Graceful fallback for web
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(25)
      } catch {
        // ignore
      }
    }
  }
}

export function playPop(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // ignore
  }
}

export function playCoin(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(987.77, now) // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08) // E6
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.35)
  } catch {
    // ignore
  }
}

export function playGem(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const notes = [1046.5, 1318.51, 1567.98, 2093.0] // C6, E6, G6, C7
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.04)
      gain.gain.setValueAtTime(0.2, now + idx * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + idx * 0.04)
      osc.stop(now + idx * 0.04 + 0.25)
    })
  } catch {
    // ignore
  }
}

export function playBoing(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.12)
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.25)
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.28)
  } catch {
    // ignore
  }
}

export function playWood(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(300, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.07)
    gain.gain.setValueAtTime(0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.07)
  } catch {
    // ignore
  }
}

export function playRumble(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.linearRampToValueAtTime(180, now + 0.1)
    osc.frequency.linearRampToValueAtTime(90, now + 0.22)
    gain.gain.setValueAtTime(0.25, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.25)
  } catch {
    // ignore
  }
}

export function playFanfare(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const melody = [
      { f: 523.25, t: 0.12 }, // C5
      { f: 659.25, t: 0.12 }, // E5
      { f: 783.99, t: 0.12 }, // G5
      { f: 1046.5, t: 0.35 }, // C6
    ]
    let offset = 0
    melody.forEach((note) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(note.f, now + offset)
      gain.gain.setValueAtTime(0.3, now + offset)
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.t)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + offset)
      osc.stop(now + offset + note.t)
      offset += note.t * 0.85
    })
  } catch {
    // ignore
  }
}

export function playCorrect(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const notes = [
      { f: 587.33, t: 0.1 },  // D5
      { f: 880.0, t: 0.25 },  // A5
    ]
    let offset = 0
    notes.forEach((note) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(note.f, now + offset)
      gain.gain.setValueAtTime(0.25, now + offset)
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + note.t)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + offset)
      osc.stop(now + offset + note.t)
      offset += 0.09
    })
  } catch {
    // ignore
  }
}

export function playWrong(sfxEnabled = true) {
  if (!sfxEnabled) return
  triggerHaptic()
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.setValueAtTime(160, now + 0.15)
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.3)
  } catch {
    // ignore
  }
}

// Simple cheerful background music loop
let bgmInterval: ReturnType<typeof setInterval> | null = null

export function toggleBgm(enabled: boolean) {
  if (!enabled) {
    if (bgmInterval) {
      clearInterval(bgmInterval)
      bgmInterval = null
    }
    return
  }
  if (bgmInterval) return

  const ctx = getAudioContext()
  if (!ctx) return

  // Play a cheerful, gentle 4-bar arpeggio in C Major
  const notes = [
    523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.00, 698.46,
    659.25, 783.99, 1046.5, 783.99, 587.33, 659.25, 783.99, 587.33
  ]
  let idx = 0

  bgmInterval = setInterval(() => {
    try {
      if (ctx.state === 'suspended') ctx.resume()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(notes[idx % notes.length], now)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.22)
      idx++
    } catch {
      // ignore
    }
  }, 260)
}
