let audioCtx: AudioContext | null = null;
let masterLimiter: DynamicsCompressorNode | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let masterTilt: BiquadFilterNode | null = null;
let reverbNode: ConvolverNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;

export const synthConfig = {
  gain: 0.6,
  filterFreq: 2600,
  filterQ: 0.7,
  oscMix: 0.5,
  reverbMix: 0.5,
};

const activeVoices = new Map<
  string,
  {
    oscSaw: OscillatorNode;
    oscSqu: OscillatorNode;
    sub: OscillatorNode;
    gainSaw: GainNode;
    gainSqu: GainNode;
    voiceMainGain: GainNode;
  }
>();

const createSoftSaturationCurve = () => {
  const samples = 44100;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((Math.PI + 2) * x) / (Math.PI + 2 * Math.abs(x));
  }
  return curve;
};

const saturationCurve = createSoftSaturationCurve();

const createReverbImpulse = (ctx: AudioContext, duration: number = 1.2) => {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 4) * 0.3;
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
  masterTilt.frequency.setValueAtTime(5000, ctx.currentTime);
  masterTilt.gain.setValueAtTime(-4, ctx.currentTime);

  masterLimiter = ctx.createDynamicsCompressor();
  masterLimiter.threshold.setValueAtTime(-8, ctx.currentTime);

  masterGain = ctx.createGain();
  reverbNode = ctx.createConvolver();
  reverbNode.buffer = createReverbImpulse(ctx);

  dryGain = ctx.createGain();
  wetGain = ctx.createGain();

  masterFilter.connect(masterTilt);
  masterTilt.connect(masterLimiter);
  masterLimiter.connect(dryGain);
  masterLimiter.connect(reverbNode);
  reverbNode.connect(wetGain);

  dryGain.connect(masterGain);
  wetGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  updateMasterParams();
};

export const updateMasterParams = () => {
  if (!audioCtx || !masterGain || !masterFilter || !dryGain || !wetGain) return;
  const now = audioCtx.currentTime;

  masterGain.gain.setTargetAtTime(synthConfig.gain, now, 0.02);
  masterFilter.frequency.setTargetAtTime(synthConfig.filterFreq, now, 0.02);
  masterFilter.Q.setTargetAtTime(synthConfig.filterQ, now, 0.02);

  const dryVol = Math.cos(synthConfig.reverbMix * Math.PI * 0.5);
  const wetVol = Math.sin(synthConfig.reverbMix * Math.PI * 0.5);

  dryGain.gain.setTargetAtTime(dryVol, now, 0.02);
  wetGain.gain.setTargetAtTime(wetVol, now, 0.02);

  activeVoices.forEach((voice) => {
    const sawVol = Math.sqrt(1 - synthConfig.oscMix);
    const squVol = Math.sqrt(synthConfig.oscMix);
    voice.gainSaw.gain.setTargetAtTime(sawVol, now, 0.02);
    voice.gainSqu.gain.setTargetAtTime(squVol, now, 0.02);
  });
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

export const synth = {
  play: (pitch: string) => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    if (activeVoices.has(pitch) || !masterFilter) return;

    const [note, octaveStr] = pitch.split("-");
    const octave = parseInt(octaveStr, 10);
    const frequency = NOTE_FREQUENCIES[note] * Math.pow(2, octave);
    const now = ctx.currentTime;

    const oscSaw = ctx.createOscillator();
    const oscSqu = ctx.createOscillator();
    const sub = ctx.createOscillator();

    const gainSaw = ctx.createGain();
    const gainSqu = ctx.createGain();
    const gainSub = ctx.createGain();
    const voiceMainGain = ctx.createGain();

    const voiceSaturator = ctx.createWaveShaper();
    voiceSaturator.curve = saturationCurve;

    const panSaw = ctx.createStereoPanner();
    const panSqu = ctx.createStereoPanner();

    oscSaw.type = "sawtooth";
    oscSqu.type = "square";
    sub.type = "triangle";

    const baseDetune = 6;
    const scaledDetune = baseDetune / Math.max(1, octave - 1);

    oscSaw.frequency.setValueAtTime(frequency, now);
    oscSaw.detune.setValueAtTime(-scaledDetune, now);

    oscSqu.frequency.setValueAtTime(frequency, now);
    oscSqu.detune.setValueAtTime(scaledDetune, now);

    sub.frequency.setValueAtTime(frequency / 2, now);
    gainSub.gain.setValueAtTime(0.07, now);

    panSaw.pan.setValueAtTime(-0.3, now);
    panSqu.pan.setValueAtTime(0.3, now);

    const sawVol = Math.sqrt(1 - synthConfig.oscMix);
    const squVol = Math.sqrt(synthConfig.oscMix);
    gainSaw.gain.setValueAtTime(sawVol, now);
    gainSqu.gain.setValueAtTime(squVol, now);

    voiceMainGain.gain.setValueAtTime(0, now);
    voiceMainGain.gain.linearRampToValueAtTime(0.18, now + 0.04);

    oscSaw.connect(gainSaw);
    gainSaw.connect(panSaw);
    panSaw.connect(voiceSaturator);

    oscSqu.connect(gainSqu);
    gainSqu.connect(panSqu);
    panSqu.connect(voiceSaturator);

    sub.connect(gainSub);
    gainSub.connect(voiceSaturator);

    voiceSaturator.connect(voiceMainGain);
    voiceMainGain.connect(masterFilter);

    oscSaw.start(now);
    oscSqu.start(now + 0.002);
    sub.start(now);

    activeVoices.set(pitch, {
      oscSaw,
      oscSqu,
      sub,
      gainSaw,
      gainSqu,
      voiceMainGain,
    });
  },

  stop: (pitch: string) => {
    const voice = activeVoices.get(pitch);
    if (!voice || !audioCtx) return;

    const now = audioCtx.currentTime;
    voice.voiceMainGain.gain.cancelScheduledValues(now);
    voice.voiceMainGain.gain.setTargetAtTime(0, now, 0.05);

    setTimeout(() => {
      voice.oscSaw.stop();
      voice.oscSqu.stop();
      voice.sub.stop();
      voice.oscSaw.disconnect();
      voice.oscSqu.disconnect();
      voice.sub.disconnect();
      activeVoices.delete(pitch);
    }, 250);
  },
};
