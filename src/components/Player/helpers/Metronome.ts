interface Window {
  webkitAudioContext?: typeof AudioContext;
}

type ClickType = "brick-start" | "beat" | "sub-beat";

export class Metronome {
  private audioContext: AudioContext | null = null;
  private nextTickTime: number = 0;
  private worker: Worker | null = null;
  private scheduleAheadTime = 0.1;
  private bpm: number = 120;
  private multiplier: number = 1;
  private volume: number = 2.5;
  private onTick: () => { isNewBrick: boolean };
  private scheduledNodes: AudioNode[] = [];
  private isRunning: boolean = false;

  constructor(onTick: () => { isNewBrick: boolean }) {
    this.onTick = onTick;
    this.worker = new Worker(new URL("./metronome.worker.ts", import.meta.url));
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };
  }

  private playClick(time: number, type: ClickType) {
    if (!this.audioContext || !this.isRunning) return;

    const frequencies: Record<ClickType, number> = {
      "brick-start": 440,
      beat: 330,
      "sub-beat": 220,
    };

    const noiseFrequencies: Record<ClickType, number> = {
      "brick-start": 1600,
      beat: 1000,
      "sub-beat": 600,
    };

    const mainGain = this.audioContext.createGain();
    mainGain.gain.setValueAtTime(this.volume, time);

    const osc = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequencies[type], time);
    osc.frequency.exponentialRampToValueAtTime(10, time + 0.04);

    oscGain.gain.setValueAtTime(0, time);
    const gainValue =
      type === "brick-start" ? 0.9 : type === "beat" ? 0.6 : 0.3;
    oscGain.gain.linearRampToValueAtTime(gainValue, time + 0.001);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

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
    noiseFilter.frequency.setValueAtTime(noiseFrequencies[type], time);
    noiseGain.gain.setValueAtTime(type === "brick-start" ? 0.4 : 0.15, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(oscGain);
    oscGain.connect(mainGain);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(mainGain);
    mainGain.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.05);
    noise.start(time);
    noise.stop(time + 0.05);

    this.scheduledNodes.push(osc, noise);
  }

  private scheduler = () => {
    if (!this.audioContext || !this.isRunning) return;
    const lookAhead = this.audioContext.currentTime + this.scheduleAheadTime;

    while (this.nextTickTime < lookAhead) {
      const { isNewBrick } = this.onTick();
      const subInterval = 60.0 / this.bpm / this.multiplier;

      for (let i = 0; i < this.multiplier; i++) {
        const time = this.nextTickTime + i * subInterval;
        let clickType: ClickType = "sub-beat";

        if (i === 0) {
          clickType = isNewBrick ? "brick-start" : "beat";
        }

        this.playClick(time, clickType);
      }
      this.advanceTimer();
    }
  };

  private advanceTimer = () => {
    this.nextTickTime += 60.0 / this.bpm;
  };

  public async start(initialBpm: number, initialMultiplier: number = 1) {
    this.isRunning = true;
    if (!this.audioContext) {
      this.audioContext = new (
        window.AudioContext || (window as Window).webkitAudioContext
      )();
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.bpm = initialBpm;
    this.multiplier = initialMultiplier;
    this.nextTickTime = this.audioContext.currentTime;

    this.worker?.postMessage("start");
  }

  public stop() {
    this.isRunning = false;
    this.worker?.postMessage("stop");
    this.cancelScheduledNodes();
  }

  public updateBpm(newBpm: number) {
    this.bpm = newBpm;
  }

  public updateMultiplier(newMultiplier: number) {
    this.multiplier = newMultiplier;
  }

  public updateVolume(newVolume: number) {
    this.volume = newVolume;
  }

  public replaceCallback(newCallback: () => { isNewBrick: boolean }) {
    this.onTick = newCallback;
  }

  public cleanup() {
    this.stop();
    this.worker?.terminate();
  }

  private stopNode(node: AudioScheduledSourceNode) {
    try {
      node.stop(0);
    } catch (_e) {}
  }

  private cancelScheduledNodes() {
    this.scheduledNodes.forEach((node) =>
      this.stopNode(node as AudioScheduledSourceNode),
    );
    this.scheduledNodes = [];
  }
}
