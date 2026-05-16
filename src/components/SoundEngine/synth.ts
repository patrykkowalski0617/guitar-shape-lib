let audioCtx: AudioContext | null = null;
let masterLimiter: DynamicsCompressorNode | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let masterTilt: BiquadFilterNode | null = null;
let reverbNode: ConvolverNode | null = null;
let reverbPreDelay: DelayNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;
let delayNode: DelayNode | null = null;
let delayFeedbackGain: GainNode | null = null;
let delayWetGain: GainNode | null = null;
let delayDryGain: GainNode | null = null;

// Parametry dostępne w UI – sterowane przez użytkownika
export const synthConfig = {
  gain: 0.7,
  attackTime: 0.4,
  filterFreq: 3200,
  reverbMix: 0.5,
  delayMix: 0.15,
  delayFeedback: 0.05,
  delayTime: 0.3,
};

// Parametry wewnętrzne – konfiguracja dla programisty
const internalConfig = {
  // Filtr masterowy
  filterReso: 0.3,

  // Limiter
  limiterThreshold: -8,

  // Tilt EQ
  tiltFreq: 3000,
  tiltGain: 3,

  // Saturator per-voice
  // Działa przed sumowaniem – każda nuta nasycana osobno, brak charczenia przy akordach
  saturationAmount: 5, // 0–1; 0.5 = ciepłe harmoniczne, bez agresji

  // Reverb
  reverbDuration: 2.5,
  reverbDecayExponent: 2,
  reverbAmplitude: 0.25,
  reverbPreDelayMs: 22, // ms – atak "oddycha" zanim wpadnie w pogłos

  // Harmoniczne – addytywna synteza sinusami
  oscMix: 0.55,
  harmonics: [
    [1, 1.0],
    [2, 0.65],
    [3, 0.4],
    [4, 0.25],
    [5, 0.12],
    [0.5, 0.28],
  ] as [number, number][],
  harmonicPan: [0, -0.2, 0.2, -0.15, 0.15, 0.05] as number[],

  // Głośność głosu – niżej niż poprzednio, saturator per-voice nie dostaje za dużo
  voiceGain: 0.18,

  // Envelope – wszystkie parametry w jednym miejscu
  envelope: {
    // Granice gałki attackTime w UI
    attackMin: 0.001, // s – funk, punchy
    attackMax: 0.95, // s – pad, string

    // Decay – stały czas opadania od peaku do sustain
    decayTime: 0.2, // s

    // Sustain – interpolowany między min a max w zależności od attackTime
    // Krzywa kwadratowa: pierwsze ~30% gałki = funk strefa
    sustainMin: 0, // funk: opada do 22% i zostaje
    sustainMax: 15, // pad: pełny sustain

    // Release – czas zaniku przy stop() (setTargetAtTime time constant)
    releaseTimeConstant: 0.15, // s – miękkie ale nie za długie
  },

  // Delay
  delayMaxTime: 2.0,
  cleanupDelayMs: 400,
};

// Krzywa saturacji per-voice – łagodna, ciepła (harmoniczne parzyste)
const createSaturationCurve = (amount: number) => {
  const samples = 8192; // mniejszy bufor – mniej pamięci per-voice
  const curve = new Float32Array(samples);
  const k = amount * 80;
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((1 + k / 100) * x) / (1 + (k / 100) * Math.abs(x));
  }
  return curve;
};

// Krzywa współdzielona między wszystkimi głosami
const sharedSaturationCurve = createSaturationCurve(
  internalConfig.saturationAmount,
);

const activeVoices = new Map<
  string,
  {
    oscillators: OscillatorNode[];
    voiceMainGain: GainNode;
  }
>();

const createReverbImpulse = (ctx: AudioContext) => {
  const { reverbDuration, reverbDecayExponent, reverbAmplitude } =
    internalConfig;
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * reverbDuration;
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] =
        (Math.random() * 2 - 1) *
        Math.pow(1 - i / length, reverbDecayExponent) *
        reverbAmplitude;
    }
  }
  return buffer;
};

const initAudioPath = (ctx: AudioContext) => {
  if (masterLimiter) return;

  masterFilter = ctx.createBiquadFilter();
  masterFilter.type = "lowpass";

  masterTilt = ctx.createBiquadFilter();
  masterTilt.type = "highshelf";
  masterTilt.frequency.setValueAtTime(internalConfig.tiltFreq, ctx.currentTime);
  masterTilt.gain.setValueAtTime(internalConfig.tiltGain, ctx.currentTime);

  masterLimiter = ctx.createDynamicsCompressor();
  masterLimiter.threshold.setValueAtTime(
    internalConfig.limiterThreshold,
    ctx.currentTime,
  );

  masterGain = ctx.createGain();

  // Reverb z pre-delay – atak nie tonie natychmiast w pogłosie
  reverbPreDelay = ctx.createDelay(0.1);
  reverbPreDelay.delayTime.setValueAtTime(
    internalConfig.reverbPreDelayMs / 1000,
    ctx.currentTime,
  );
  reverbNode = ctx.createConvolver();
  reverbNode.buffer = createReverbImpulse(ctx);

  dryGain = ctx.createGain();
  wetGain = ctx.createGain();

  delayNode = ctx.createDelay(internalConfig.delayMaxTime);
  delayFeedbackGain = ctx.createGain();
  delayWetGain = ctx.createGain();
  delayDryGain = ctx.createGain();

  // Graf sygnału:
  // voices → masterFilter → masterTilt → masterLimiter
  //   → delayDryGain ──────────────────────────────────┐
  //   → delayNode ⟲ feedbackGain                       ├→ dryGain ──┬→ masterGain → out
  //   → delayWetGain ──────────────────────────────────┘            │
  //                                        reverbPreDelay → reverb → wetGain ──┘

  masterFilter.connect(masterTilt);
  masterTilt.connect(masterLimiter);

  masterLimiter.connect(delayDryGain);
  masterLimiter.connect(delayNode);

  delayNode.connect(delayFeedbackGain);
  delayFeedbackGain.connect(delayNode);
  delayNode.connect(delayWetGain);

  delayDryGain.connect(dryGain);
  delayWetGain.connect(dryGain);

  // Pre-delay przed reverb
  dryGain.connect(reverbPreDelay);
  reverbPreDelay.connect(reverbNode);
  reverbNode.connect(wetGain);

  dryGain.connect(masterGain);
  wetGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  updateMasterParams();
};

export const updateMasterParams = () => {
  if (
    !audioCtx ||
    !masterGain ||
    !masterFilter ||
    !dryGain ||
    !wetGain ||
    !delayNode ||
    !delayFeedbackGain ||
    !delayWetGain ||
    !delayDryGain
  )
    return;

  const now = audioCtx.currentTime;

  masterGain.gain.setTargetAtTime(synthConfig.gain, now, 0.02);
  masterFilter.frequency.setTargetAtTime(synthConfig.filterFreq, now, 0.02);
  masterFilter.Q.setTargetAtTime(internalConfig.filterReso, now, 0.02);

  const reverbDry = Math.cos(synthConfig.reverbMix * Math.PI * 0.5);
  const reverbWet = Math.sin(synthConfig.reverbMix * Math.PI * 0.5);
  dryGain.gain.setTargetAtTime(reverbDry, now, 0.02);
  wetGain.gain.setTargetAtTime(reverbWet, now, 0.02);

  delayNode.delayTime.setTargetAtTime(
    Math.min(synthConfig.delayTime, internalConfig.delayMaxTime - 0.01),
    now,
    0.02,
  );
  delayFeedbackGain.gain.setTargetAtTime(
    Math.min(synthConfig.delayFeedback, 0.92),
    now,
    0.02,
  );
  delayWetGain.gain.setTargetAtTime(synthConfig.delayMix, now, 0.02);
  delayDryGain.gain.setTargetAtTime(1 - synthConfig.delayMix * 0.5, now, 0.02);
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

const getSustainLevel = (attackTime: number): number => {
  const { attackMin, attackMax, sustainMin, sustainMax } =
    internalConfig.envelope;
  const t = Math.max(
    0,
    Math.min(1, (attackTime - attackMin) / (attackMax - attackMin)),
  );
  return sustainMin + (sustainMax - sustainMin) * Math.pow(t, 2);
};

export const synth = {
  play: (pitch: string) => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    if (activeVoices.has(pitch)) return;
    if (!masterFilter) return;

    const [note, octaveStr] = pitch.split("-");
    const octave = parseInt(octaveStr, 10);
    const fundamentalFreq = NOTE_FREQUENCIES[note] * Math.pow(2, octave);
    const now = ctx.currentTime;

    const { decayTime, releaseTimeConstant } = internalConfig.envelope;
    const attackTime = Math.max(
      internalConfig.envelope.attackMin,
      Math.min(internalConfig.envelope.attackMax, synthConfig.attackTime),
    );
    const sustainLevel = getSustainLevel(attackTime);
    const peakGain = internalConfig.voiceGain;
    const sustainGain = peakGain * sustainLevel;

    const voiceMainGain = ctx.createGain();
    voiceMainGain.gain.setValueAtTime(0, now);
    voiceMainGain.gain.linearRampToValueAtTime(peakGain, now + attackTime);
    voiceMainGain.gain.setTargetAtTime(
      sustainGain,
      now + attackTime,
      decayTime,
    );

    // Saturator per-voice – każda nuta nasycana osobno
    const voiceSaturator = ctx.createWaveShaper();
    voiceSaturator.curve = sharedSaturationCurve;
    voiceSaturator.oversample = "4x";

    voiceSaturator.connect(voiceMainGain);
    voiceMainGain.connect(masterFilter);

    const oscillators: OscillatorNode[] = [];

    internalConfig.harmonics.forEach(([freqMultiplier, baseVolume], i) => {
      const freq = fundamentalFreq * freqMultiplier;
      if (freq > 18000 || freq < 20) return;

      const isOverTone = freqMultiplier > 1;
      const volume = isOverTone
        ? baseVolume * internalConfig.oscMix
        : baseVolume;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, now);

      const panNode = ctx.createStereoPanner();
      panNode.pan.setValueAtTime(internalConfig.harmonicPan[i] ?? 0, now);

      osc.connect(gainNode);
      gainNode.connect(panNode);
      panNode.connect(voiceSaturator);

      osc.start(now);
      oscillators.push(osc);
    });

    activeVoices.set(pitch, { oscillators, voiceMainGain });
  },

  stop: (pitch: string) => {
    const voice = activeVoices.get(pitch);
    if (!voice || !audioCtx) return;

    const { releaseTimeConstant } = internalConfig.envelope;
    const now = audioCtx.currentTime;
    voice.voiceMainGain.gain.cancelScheduledValues(now);
    voice.voiceMainGain.gain.setTargetAtTime(0, now, releaseTimeConstant);

    activeVoices.delete(pitch);

    setTimeout(() => {
      voice.oscillators.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
      voice.voiceMainGain.disconnect();
    }, internalConfig.cleanupDelayMs);
  },
};
