// Web Audio API synthesizer for Whale Crier Kelp Horn

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes the authentic Hermanus Whale Crier dried kelp horn blast
 * (Deep, reedy, resonant horn blast blown from Ecklonia maxima kelp)
 */
export function playKelpHornBlast(blasts = 1): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    for (let i = 0; i < blasts; i++) {
      const start = now + i * 0.9;
      const duration = 0.65;

      const hornGain = ctx.createGain();
      hornGain.gain.setValueAtTime(0.001, start);
      hornGain.gain.linearRampToValueAtTime(0.4, start + 0.08);
      hornGain.gain.setValueAtTime(0.38, start + duration - 0.1);
      hornGain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      // Typical kelp horn pitch is around 175-190 Hz (F3 to G3)
      osc.frequency.setValueAtTime(185, start);
      osc.frequency.linearRampToValueAtTime(178, start + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(370, start);
      filter.Q.setValueAtTime(2.0, start);

      osc.connect(filter);
      filter.connect(hornGain);
      hornGain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.05);
    }
  } catch (e) {
    console.warn('Audio error', e);
  }
}
