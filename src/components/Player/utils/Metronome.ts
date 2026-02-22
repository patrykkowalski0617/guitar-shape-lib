// utils/Metronome.ts
export class Metronome {
  private audioContext: AudioContext | null = null;
  private nextTickTime: number = 0;
  private worker: Worker | null = null;
  private scheduleAheadTime = 0.1;

  private bpm: number = 120;
  private onTick: () => void;

  constructor(onTick: () => void) {
    this.onTick = onTick;
    // Inicjalizacja Workera
    this.worker = new Worker(new URL("./metronome.worker.ts", import.meta.url));
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };
  }

  private playClick(time: number) {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);

    envelope.gain.setValueAtTime(0.25, time); // Zmniejszyłem głośność dla czystości
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(envelope);
    envelope.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private scheduler = () => {
    if (!this.audioContext) return;

    // Planowanie dźwięków w wątku Audio (sprzętowym)
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
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.bpm = initialBpm;
    this.nextTickTime = this.audioContext.currentTime;
    this.worker?.postMessage("start");
  }

  public stop() {
    this.worker?.postMessage("stop");
  }

  public updateBpm(newBpm: number) {
    this.bpm = newBpm;
  }

  public replaceCallback(newCallback: () => void) {
    this.onTick = newCallback;
  }

  public cleanup() {
    this.stop();
    this.worker?.terminate();
  }
}
