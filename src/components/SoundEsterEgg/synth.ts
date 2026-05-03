const NOTE_FREQUENCIES: Record<string, number> = {
  C: 16.35,
  "C#": 17.32,
  D: 18.35,
  "D#": 19.45,
  E: 20.6,
  F: 21.83,
  "F#": 23.12,
  G: 24.5,
  "G#": 25.96,
  A: 27.5,
  "A#": 29.14,
  B: 30.87,
};

let audioCtx: AudioContext | null = null;
let masterLimiter: DynamicsCompressorNode | null = null;
let masterGain: GainNode | null = null;

const activeVoices = new Map<
  string,
  {
    osc: OscillatorNode;
    sub: OscillatorNode;
    gain: GainNode;
  }
>();

const initAudioPath = (ctx: AudioContext) => {
  if (masterLimiter) return;

  masterLimiter = ctx.createDynamicsCompressor();
  masterLimiter.threshold.setValueAtTime(-12, ctx.currentTime);
  masterLimiter.knee.setValueAtTime(30, ctx.currentTime);
  masterLimiter.ratio.setValueAtTime(12, ctx.currentTime);
  masterLimiter.attack.setValueAtTime(0.003, ctx.currentTime);
  masterLimiter.release.setValueAtTime(0.25, ctx.currentTime);

  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.8, ctx.currentTime);

  masterLimiter.connect(masterGain);
  masterGain.connect(ctx.destination);
};

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
  }
  initAudioPath(audioCtx);
  return audioCtx;
};

const calculateVolume = (octave: number): number => {
  const baseVolume = 0.5;
  const reductionFactor = 0.08;
  const volume = baseVolume - octave * reductionFactor;
  return Math.max(0.05, Math.min(0.4, volume));
};

export const warmSynth = {
  play: (pitch: string) => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    if (activeVoices.has(pitch) || !masterLimiter) return;

    const [note, octaveStr] = pitch.split("-");
    const octave = parseInt(octaveStr, 10);
    const frequency = NOTE_FREQUENCIES[note] * Math.pow(2, octave);
    const now = ctx.currentTime;
    const dynamicVolume = calculateVolume(octave);

    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    sub.type = "triangle";
    osc.frequency.setValueAtTime(frequency, now);
    sub.frequency.setValueAtTime(frequency / 2, now);

    filter.type = "lowpass";
    const filterMultiplier = 1.2 + octave * 0.4;
    filter.frequency.setValueAtTime(frequency * filterMultiplier, now);
    const resonance = octave <= 3 ? 4 : 1;
    filter.Q.setValueAtTime(resonance, now);

    gain.gain.setValueAtTime(0, now);
    const attackTime = octave <= 3 ? 0.07 : 0.04;
    gain.gain.linearRampToValueAtTime(dynamicVolume, now + attackTime);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(masterLimiter);

    osc.start();
    sub.start();
    activeVoices.set(pitch, { osc, sub, gain });
  },

  stop: (pitch: string) => {
    const voice = activeVoices.get(pitch);
    if (!voice || !audioCtx) return;

    const now = audioCtx.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    setTimeout(() => {
      voice.osc.stop();
      voice.sub.stop();
      voice.osc.disconnect();
      voice.sub.disconnect();
      activeVoices.delete(pitch);
    }, 300);
  },
};
