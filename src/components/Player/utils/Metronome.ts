interface Window {
  webkitAudioContext?: typeof AudioContext;
}

export class Metronome {
  private audioContext: AudioContext | null = null;
  private nextTickTime: number = 0;
  private worker: Worker | null = null;
  private scheduleAheadTime = 0.1;

  private bpm: number = 120;
  private volume: number = 2.5;
  private onTick: () => void;

  constructor(onTick: () => void) {
    this.onTick = onTick;

    this.worker = new Worker(new URL("./metronome.worker.ts", import.meta.url));
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };
  }

  private playClick(time: number) {
    if (!this.audioContext) return;

    const mainGain = this.audioContext.createGain();
    mainGain.gain.setValueAtTime(this.volume, time);

    const osc = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(400, time);
    osc.frequency.exponentialRampToValueAtTime(10, time + 0.03);

    oscGain.gain.setValueAtTime(0, time);
    oscGain.gain.linearRampToValueAtTime(0.8, time + 0.001);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    const noiseBuffer = this.audioContext.createBuffer(
      1,
      this.audioContext.sampleRate * 0.05,
      this.audioContext.sampleRate,
    );
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();

    noise.buffer = noiseBuffer;

    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1500, time);

    noiseGain.gain.setValueAtTime(0.3, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);

    osc.connect(oscGain);
    oscGain.connect(mainGain);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(mainGain);

    mainGain.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.04);
    noise.start(time);
    noise.stop(time + 0.04);
  }

  private scheduler = () => {
    if (!this.audioContext) return;

    while (this.nextTickTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.playClick(this.nextTickTime);
      this.onTick();
      this.advanceTimer();
    }
  };

  private advanceTimer = () => {
    this.nextTickTime += 60.0 / this.bpm;
  };

  public async start(initialBpm: number) {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as Window).webkitAudioContext)();
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.bpm = initialBpm;
    const secondsPerBeat = 60.0 / this.bpm;

    this.nextTickTime = this.audioContext.currentTime + secondsPerBeat;

    this.playClick(this.audioContext.currentTime);

    this.worker?.postMessage("start");
  }

  public stop() {
    this.worker?.postMessage("stop");
  }

  public updateBpm(newBpm: number) {
    this.bpm = newBpm;
  }

  public updateVolume(newVolume: number) {
    this.volume = newVolume;
  }

  public replaceCallback(newCallback: () => void) {
    this.onTick = newCallback;
  }

  public cleanup() {
    this.stop();
    this.worker?.terminate();
  }
}
