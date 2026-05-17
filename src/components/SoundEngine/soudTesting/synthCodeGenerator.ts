import type { ModuleConfig } from "./types";

export const DEFAULT_CONFIG = {
  modules: [
    {
      id: "voice",
      type: "voice",
      name: "Voice",
      icon: "waveform",
      params: {
        voiceGain: {
          value: 0.18,
          min: 0.05,
          max: 0.5,
          step: 0.01,
          label: "Gain",
        },
        oscMix: { value: 0.55, min: 0, max: 1, step: 0.01, label: "Harmonics" },
      },
    },
    {
      id: "envelope",
      type: "envelope",
      name: "Envelope",
      icon: "chart-line",
      params: {
        attackMin: {
          value: 0.001,
          min: 0.001,
          max: 0.05,
          step: 0.001,
          label: "Attack min",
        },
        attackMax: {
          value: 0.95,
          min: 0.1,
          max: 2,
          step: 0.01,
          label: "Attack max",
        },
        decayTime: {
          value: 0.2,
          min: 0.01,
          max: 1,
          step: 0.01,
          label: "Decay",
        },
        sustainMin: {
          value: 0,
          min: 0,
          max: 1,
          step: 0.01,
          label: "Sustain min",
        },
        sustainMax: {
          value: 15,
          min: 0.1,
          max: 20,
          step: 0.1,
          label: "Sustain max",
        },
        releaseTimeConstant: {
          value: 0.15,
          min: 0.01,
          max: 1,
          step: 0.01,
          label: "Release",
        },
      },
    },
    {
      id: "saturator",
      type: "saturator",
      name: "Saturator",
      icon: "wave-sine",
      params: {
        saturationAmount: {
          value: 5,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Amount",
        },
      },
    },
    {
      id: "filter",
      type: "filter",
      name: "Filter",
      icon: "filter",
      params: {
        filterFreq: {
          value: 3200,
          min: 200,
          max: 12000,
          step: 50,
          label: "Frequency",
        },
        filterReso: {
          value: 0.3,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Resonance",
        },
      },
    },
    {
      id: "tilt",
      type: "tilt",
      name: "Tilt EQ",
      icon: "chart-dots",
      params: {
        tiltFreq: {
          value: 3000,
          min: 1000,
          max: 8000,
          step: 100,
          label: "Frequency",
        },
        tiltGain: { value: 3, min: -12, max: 12, step: 0.5, label: "Gain" },
      },
    },
    {
      id: "reverb",
      type: "reverb",
      name: "Reverb",
      icon: "ripple",
      params: {
        reverbDuration: {
          value: 2.5,
          min: 0.5,
          max: 5,
          step: 0.1,
          label: "Duration",
        },
        reverbDecayExponent: {
          value: 2,
          min: 1,
          max: 6,
          step: 0.1,
          label: "Decay exp",
        },
        reverbAmplitude: {
          value: 0.25,
          min: 0.05,
          max: 1,
          step: 0.01,
          label: "Amplitude",
        },
        reverbPreDelayMs: {
          value: 22,
          min: 0,
          max: 100,
          step: 1,
          label: "Pre-delay ms",
        },
        reverbMix: { value: 0.5, min: 0, max: 1, step: 0.01, label: "Mix" },
      },
    },
    {
      id: "delay",
      type: "delay",
      name: "Delay",
      icon: "arrows-right",
      params: {
        delayTime: { value: 0.3, min: 0.01, max: 2, step: 0.01, label: "Time" },
        delayMaxTime: {
          value: 2,
          min: 0.5,
          max: 5,
          step: 0.1,
          label: "Max time",
        },
        delayMix: { value: 0.15, min: 0, max: 1, step: 0.01, label: "Mix" },
      },
    },
    {
      id: "feedback",
      type: "feedback",
      name: "Feedback",
      icon: "repeat",
      params: {
        delayFeedback: {
          value: 0.05,
          min: 0,
          max: 0.92,
          step: 0.01,
          label: "Amount",
        },
      },
    },
    {
      id: "limiter",
      type: "limiter",
      name: "Limiter",
      icon: "maximize",
      params: {
        limiterThreshold: {
          value: -8,
          min: -24,
          max: 0,
          step: 1,
          label: "Threshold",
        },
      },
    },
    {
      id: "master",
      type: "master",
      name: "Master",
      icon: "volume",
      params: {
        gain: { value: 0.7, min: 0, max: 1, step: 0.01, label: "Gain" },
        attackTime: {
          value: 0.4,
          min: 0.001,
          max: 1,
          step: 0.01,
          label: "Attack",
        },
      },
    },
  ] as ModuleConfig[],
};

export const generateSynthCode = (modules: ModuleConfig[]): string => {
  const params: Record<string, number> = {};
  modules.forEach((module) => {
    Object.entries(module.params).forEach(([key, param]) => {
      params[key] = param.value;
    });
  });

  return `let audioCtx: AudioContext | null = null;
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

export const synthConfig = {
  gain: ${params.gain ?? 0.7},
  attackTime: ${params.attackTime ?? 0.4},
  filterFreq: ${params.filterFreq ?? 3200},
  reverbMix: ${params.reverbMix ?? 0.5},
  delayMix: ${params.delayMix ?? 0.15},
  delayFeedback: ${params.delayFeedback ?? 0.05},
  delayTime: ${params.delayTime ?? 0.3},
};

const internalConfig = {
  filterReso: ${params.filterReso ?? 0.3},
  limiterThreshold: ${params.limiterThreshold ?? -8},
  tiltFreq: ${params.tiltFreq ?? 3000},
  tiltGain: ${params.tiltGain ?? 3},
  saturationAmount: ${params.saturationAmount ?? 5},
  reverbDuration: ${params.reverbDuration ?? 2.5},
  reverbDecayExponent: ${params.reverbDecayExponent ?? 2},
  reverbAmplitude: ${params.reverbAmplitude ?? 0.25},
  reverbPreDelayMs: ${params.reverbPreDelayMs ?? 22},
  oscMix: ${params.oscMix ?? 0.55},
  harmonics: [
    [1, 1.0],
    [2, 0.65],
    [3, 0.4],
    [4, 0.25],
    [5, 0.12],
    [0.5, 0.28],
  ] as [number, number][],
  harmonicPan: [0, -0.2, 0.2, -0.15, 0.15, 0.05] as number[],
  voiceGain: ${params.voiceGain ?? 0.18},
  envelope: {
    attackMin: ${params.attackMin ?? 0.001},
    attackMax: ${params.attackMax ?? 0.95},
    decayTime: ${params.decayTime ?? 0.2},
    sustainMin: ${params.sustainMin ?? 0},
    sustainMax: ${params.sustainMax ?? 15},
    releaseTimeConstant: ${params.releaseTimeConstant ?? 0.15},
  },
  delayMaxTime: ${params.delayMaxTime ?? 2},
  cleanupDelayMs: 400,
};

const createSaturationCurve = (amount: number) => {
  const samples = 8192;
  const curve = new Float32Array(samples);
  const k = amount * 80;
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((1 + k / 100) * x) / (1 + (k / 100) * Math.abs(x));
  }
  return curve;
};

const sharedSaturationCurve = createSaturationCurve(internalConfig.saturationAmount);

const activeVoices = new Map<
  string,
  {
    oscillators: OscillatorNode[];
    voiceMainGain: GainNode;
  }
>();

const createReverbImpulse = (ctx: AudioContext) => {
  const { reverbDuration, reverbDecayExponent, reverbAmplitude } = internalConfig;
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
  masterLimiter.threshold.setValueAtTime(internalConfig.limiterThreshold, ctx.currentTime);

  masterGain = ctx.createGain();
  reverbPreDelay = ctx.createDelay(0.1);
  reverbPreDelay.delayTime.setValueAtTime(internalConfig.reverbPreDelayMs / 1000, ctx.currentTime);
  reverbNode = ctx.createConvolver();
  reverbNode.buffer = createReverbImpulse(ctx);

  dryGain = ctx.createGain();
  wetGain = ctx.createGain();

  delayNode = ctx.createDelay(internalConfig.delayMaxTime);
  delayFeedbackGain = ctx.createGain();
  delayWetGain = ctx.createGain();
  delayDryGain = ctx.createGain();

  masterFilter.connect(masterTilt);
  masterTilt.connect(masterLimiter);
  masterLimiter.connect(delayDryGain);
  masterLimiter.connect(delayNode);
  delayNode.connect(delayFeedbackGain);
  delayFeedbackGain.connect(delayNode);
  delayNode.connect(delayWetGain);
  delayDryGain.connect(dryGain);
  delayWetGain.connect(dryGain);
  dryGain.connect(reverbPreDelay);
  reverbPreDelay.connect(reverbNode);
  reverbNode.connect(wetGain);
  dryGain.connect(masterGain);
  wetGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  updateMasterParams();
};

export const updateMasterParams = () => {
  if (!audioCtx || !masterGain || !masterFilter || !dryGain || !wetGain || !delayNode || !delayFeedbackGain || !delayWetGain || !delayDryGain) return;
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
  delayFeedbackGain.gain.setTargetAtTime(Math.min(synthConfig.delayFeedback, 0.92), now, 0.02);
  delayWetGain.gain.setTargetAtTime(synthConfig.delayMix, now, 0.02);
  delayDryGain.gain.setTargetAtTime(1 - synthConfig.delayMix * 0.5, now, 0.02);
};

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  initAudioPath(audioCtx);
  return audioCtx;
};

const NOTE_FREQUENCIES: Record<string, number> = {
  C: 16.35, "C#": 17.32, D: 18.35, "D#": 19.45, E: 20.6, F: 21.83,
  "F#": 23.12, G: 24.5, "G#": 25.96, A: 27.5, "A#": 29.14, B: 30.87,
};

const getSustainLevel = (attackTime: number): number => {
  const { attackMin, attackMax, sustainMin, sustainMax } = internalConfig.envelope;
  const t = Math.max(0, Math.min(1, (attackTime - attackMin) / (attackMax - attackMin)));
  return sustainMin + (sustainMax - sustainMin) * Math.pow(t, 2);
};

export const synth = {
  play: (pitch: string) => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    if (activeVoices.has(pitch)) return;
    if (!masterFilter) return;

    const [noteObject, octaveStr] = pitch.split("-");
    const octave = parseInt(octaveStr, 10);
    const fundamentalFreq = NOTE_FREQUENCIES[noteObject] * Math.pow(2, octave);
    const now = ctx.currentTime;

    const { decayTime, releaseTimeConstant } = internalConfig.envelope;
    const attackTime = Math.max(internalConfig.envelope.attackMin, Math.min(internalConfig.envelope.attackMax, synthConfig.attackTime));
    const sustainLevel = getSustainLevel(attackTime);
    const peakGain = internalConfig.voiceGain;
    const sustainGain = peakGain * sustainLevel;

    const voiceMainGain = ctx.createGain();
    voiceMainGain.gain.setValueAtTime(0, now);
    voiceMainGain.gain.linearRampToValueAtTime(peakGain, now + attackTime);
    voiceMainGain.gain.setTargetAtTime(sustainGain, now + attackTime, decayTime);

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
      const volume = isOverTone ? baseVolume * internalConfig.oscMix : baseVolume;

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
};`;
};
