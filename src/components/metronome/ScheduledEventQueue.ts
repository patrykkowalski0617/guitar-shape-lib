export interface ScheduledEvent {
  scheduledTime: number; // AudioContext time when sound plays
  countIn: number | null; // null = not counting in
  currentStep: number | null; // null = counting in
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
  isCountingIn: boolean;
}

export class ScheduledEventQueue {
  private queue: ScheduledEvent[] = [];

  enqueue(event: ScheduledEvent) {
    this.queue.push(event);
  }

  // Returns all events whose scheduledTime <= currentTime, removes them from queue
  flush(currentTime: number): ScheduledEvent[] {
    const due: ScheduledEvent[] = [];
    const remaining: ScheduledEvent[] = [];

    for (const event of this.queue) {
      if (event.scheduledTime <= currentTime) {
        due.push(event);
      } else {
        remaining.push(event);
      }
    }

    this.queue = remaining;
    return due;
  }

  clear() {
    this.queue = [];
  }

  size() {
    return this.queue.length;
  }
}
