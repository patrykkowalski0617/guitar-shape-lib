import { AudioContextManager } from "./audio-context-manager";
import { ClickSoundGenerator } from "./click-sound-generator";
import { BassNoteGenerator } from "./bass-note-generator";
import { ScheduledNodesManager } from "./scheduled-nodes-manager";
import { MetronomeTimer } from "./metronome-timer";
import { type TickCallback } from "./types";
import {
  ScheduledEventQueue,
  type ScheduledEvent,
} from "./ScheduledEventQueue";
import { MetronomeUISync } from "./MetronomeUISync";

export class Metronome {
  private audioManager = new AudioContextManager();
  private clickGenerator = new ClickSoundGenerator();
  private bassGenerator = new BassNoteGenerator();
  private nodesManager = new ScheduledNodesManager();
  private timer: MetronomeTimer;
  private eventQueue = new ScheduledEventQueue();
  private uiSync: MetronomeUISync;

  private worker: Worker | null = null;
  private volume: number = 2.5;
  private isRunning: boolean = false;
  private currentBassFrequency: number | null = null;

  private onTick: TickCallback;
  private onUIEvent: ((event: ScheduledEvent) => void) | null = null;

  constructor(onTick: TickCallback) {
    this.onTick = onTick;
    this.timer = new MetronomeTimer(120, 1);

    this.uiSync = new MetronomeUISync(
      this.eventQueue,
      this.audioManager,
      (event) => this.onUIEvent?.(event),
    );

    this.worker = new Worker(new URL("./metronome.worker.ts", import.meta.url));
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };
  }

  public setUIEventCallback(callback: (event: ScheduledEvent) => void) {
    this.onUIEvent = callback;
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

  private playBassNote(time: number, frequency: number) {
    const context = this.audioManager.getCurrentContext();
    if (!context || !this.isRunning) return;

    const nodes = this.bassGenerator.createBassNote(
      context,
      time,
      frequency,
      this.volume,
      this.timer["bpm"],
    );
    this.nodesManager.add(...nodes);
  }

  private scheduler = async () => {
    const context = this.audioManager.getCurrentContext();
    if (!context || !this.isRunning) return;

    const lookAheadTime = context.currentTime + 0.1;

    while (this.timer.shouldScheduleTick(lookAheadTime)) {
      const tickResult = this.onTick();
      const {
        isNewBrick,
        isFirstStepTotal,
        isCountingIn,
        countIn,
        currentStep,
        bassNoteFrequency,
      } = tickResult;

      const subInterval = this.timer.getSubInterval();
      const scheduledTime = this.timer.getNextTickTime();

      for (let i = 0; i < this.timer["multiplier"]; i++) {
        const time = scheduledTime + i * subInterval;
        const clickType = this.timer.calculateClickType(i, isNewBrick);
        this.playClick(time, clickType);
      }

      if (isNewBrick && bassNoteFrequency !== null) {
        this.currentBassFrequency = bassNoteFrequency;
      }

      if (!isCountingIn && this.currentBassFrequency !== null) {
        this.playBassNote(scheduledTime, this.currentBassFrequency);
      }

      this.eventQueue.enqueue({
        scheduledTime,
        countIn: isCountingIn ? countIn : null,
        currentStep: isCountingIn ? null : currentStep,
        isNewBrick,
        isFirstStepTotal,
        isCountingIn,
        bassNoteFrequency,
      });

      this.timer.advanceTimer();
    }
  };

  public async start(initialBpm: number, initialMultiplier: number = 1) {
    this.isRunning = true;
    const context = await this.audioManager.getContext();

    this.timer.updateBpm(initialBpm);
    this.timer.updateMultiplier(initialMultiplier);
    this.timer.initialize(context.currentTime);

    this.uiSync.start();
    this.worker?.postMessage("start");
  }

  public stop() {
    this.isRunning = false;
    this.currentBassFrequency = null;
    this.worker?.postMessage("stop");
    this.nodesManager.cancelAll();
    this.uiSync.stop();
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
