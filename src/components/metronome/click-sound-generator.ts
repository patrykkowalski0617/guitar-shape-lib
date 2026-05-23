import { type ClickType, type ClickConfig } from "./types";

export class ClickSoundGenerator {
  private readonly CLICK_CONFIGS: Record<ClickType, ClickConfig> = {
    "guitarShapePlayerBrick-start": {
      frequency: 440,
      noiseFrequency: 1600,
      gain: 0.9,
      noiseGain: 0.4,
    },
    beat: {
      frequency: 330,
      noiseFrequency: 1000,
      gain: 0.6,
      noiseGain: 0.15,
    },
    "sub-beat": {
      frequency: 220,
      noiseFrequency: 600,
      gain: 0.3,
      noiseGain: 0.15,
    },
  };

  private generateNoiseBuffer(
    context: AudioContext,
    duration: number,
  ): AudioBuffer {
    const bufferSize = context.sampleRate * duration;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  createClickSound(
    context: AudioContext,
    time: number,
    type: ClickType,
    volume: number,
  ): AudioNode[] {
    const config = this.CLICK_CONFIGS[type];
    const mainGain = context.createGain();
    mainGain.gain.setValueAtTime(volume, time);

    // Tone generator (sine wave with pitch drop)
    const osc = context.createOscillator();
    const oscGain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(config.frequency, time);
    osc.frequency.exponentialRampToValueAtTime(10, time + 0.04);

    oscGain.gain.setValueAtTime(0, time);
    oscGain.gain.linearRampToValueAtTime(config.gain, time + 0.001);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    // Noise generator (for attack/click sound)
    const noiseBuffer = this.generateNoiseBuffer(context, 0.05);
    const noise = context.createBufferSource();
    const noiseGain = context.createGain();
    const noiseFilter = context.createBiquadFilter();

    noise.buffer = noiseBuffer;
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(config.noiseFrequency, time);
    noiseGain.gain.setValueAtTime(config.noiseGain, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    // Connect everything
    osc.connect(oscGain);
    oscGain.connect(mainGain);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(mainGain);
    mainGain.connect(context.destination);

    // Schedule playback
    osc.start(time);
    osc.stop(time + 0.05);
    noise.start(time);
    noise.stop(time + 0.05);

    return [osc, noise];
  }
}
