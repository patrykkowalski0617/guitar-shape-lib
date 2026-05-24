import { AudioContextManager } from "./audio-context-manager";
import type { ScheduledEventQueue } from "./ScheduledEventQueue";

type UIUpdateCallback = (
  event: import("./ScheduledEventQueue").ScheduledEvent,
) => void;

export class MetronomeUISync {
  private rafId: number | null = null;
  private queue: ScheduledEventQueue;
  private audioManager: AudioContextManager;
  private onEvent: UIUpdateCallback;

  constructor(
    queue: ScheduledEventQueue,
    audioManager: AudioContextManager,
    onEvent: UIUpdateCallback,
  ) {
    this.queue = queue;
    this.audioManager = audioManager;
    this.onEvent = onEvent;
  }

  start() {
    if (this.rafId !== null) return;
    this.loop();
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.queue.clear();
  }
  private loop = () => {
    const context = this.audioManager.getCurrentContext();
    if (context) {
      const due = this.queue.flush(context.currentTime);
      for (const event of due) {
        this.onEvent(event);
      }
    }
    this.rafId = requestAnimationFrame(this.loop);
  };
}
