// metronome.ts
import { AudioContextManager } from "./audio-context-manager";
import { ClickSoundGenerator } from "./click-sound-generator";
import { BassNoteGenerator } from "./bass-note-generator";
import { ScheduledNodesManager } from "./scheduled-nodes-manager";
import { MetronomeTimer } from "./metronome-timer";
import { type TickCallback } from "./types";

export class Metronome {
  private audioManager = new AudioContextManager();
  private clickGenerator = new ClickSoundGenerator();
  private bassGenerator = new BassNoteGenerator();
  private nodesManager = new ScheduledNodesManager();
  private timer: MetronomeTimer;

  private worker: Worker | null = null;
  private volume: number = 2.5;
  private isRunning: boolean = false;
  private bassNoteFrequency: number | null = null;
  private onTick: TickCallback;

  constructor(onTick: TickCallback) {
    this.onTick = onTick;
    this.timer = new MetronomeTimer(120, 1);

    this.worker = new Worker(new URL("./metronome.worker.ts", import.meta.url));
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };
  }

  private playBassNote(time: number) {
    const context = this.audioManager.getCurrentContext();
    if (!context || !this.isRunning || this.bassNoteFrequency === null) return;

    const nodes = this.bassGenerator.createBassNote(
      context,
      time,
      this.bassNoteFrequency,
      this.volume,
      this.timer["bpm"],
    );
    this.nodesManager.add(...nodes);
  }

  public updateBassNote(frequency: number | null) {
    this.bassNoteFrequency = frequency;
  }

  private playClick(time: number, type: import("./types").ClickType) {
    const context = this.audioManager.getCurrentContext();
    if (!context || !this.isRunning) return;

    const nodes = this.clickGenerator.createClickSound(
      context,
      time,
      type,
      this.volume,
    );
    this.nodesManager.add(...nodes);
  }

  private scheduler = async () => {
    const context = this.audioManager.getCurrentContext();
    if (!context || !this.isRunning) return;

    const lookAheadTime = context.currentTime + 0.1;

    while (this.timer.shouldScheduleTick(lookAheadTime)) {
      const { isNewBrick } = this.onTick();
      const subInterval = this.timer.getSubInterval();

      for (let i = 0; i < this.timer["multiplier"]; i++) {
        const time = this.timer.getNextTickTime() + i * subInterval;
        const clickType = this.timer.calculateClickType(i, isNewBrick);
        this.playClick(time, clickType);
      }
      this.timer.advanceTimer();
    }
  };

  public async start(initialBpm: number, initialMultiplier: number = 1) {
    this.isRunning = true;
    const context = await this.audioManager.getContext();

    this.timer.updateBpm(initialBpm);
    this.timer.updateMultiplier(initialMultiplier);
    this.timer.initialize(context.currentTime);

    this.worker?.postMessage("start");
  }

  public stop() {
    this.isRunning = false;
    this.worker?.postMessage("stop");
    this.nodesManager.cancelAll();
  }

  public updateBpm(newBpm: number) {
    this.timer.updateBpm(newBpm);
  }

  public updateMultiplier(newMultiplier: number) {
    this.timer.updateMultiplier(newMultiplier);
  }

  public updateVolume(newVolume: number) {
    this.volume = newVolume;
  }

  public replaceCallback(newCallback: TickCallback) {
    this.onTick = newCallback;
  }

  public cleanup() {
    this.stop();
    this.worker?.terminate();
    this.audioManager.close();
    this.nodesManager.clear();
  }
}
