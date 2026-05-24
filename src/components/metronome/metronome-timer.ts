export class MetronomeTimer {
  private nextTickTime: number = 0;
  private bpm: number = 120;
  private multiplier: number = 1;

  constructor(bpm: number, multiplier: number) {
    this.bpm = bpm;
    this.multiplier = multiplier;
  }

  initialize(currentTime: number) {
    this.nextTickTime = currentTime;
  }

  getNextTickTime(): number {
    return this.nextTickTime;
  }

  advanceTimer() {
    this.nextTickTime += 60.0 / this.bpm;
  }

  getSubInterval(): number {
    return 60.0 / this.bpm / this.multiplier;
  }

  updateBpm(bpm: number) {
    this.bpm = bpm;
  }

  updateMultiplier(multiplier: number) {
    this.multiplier = multiplier;
  }

  shouldScheduleTick(currentLookAhead: number): boolean {
    return this.nextTickTime < currentLookAhead;
  }

  calculateClickType(
    i: number,
    isNewBrick: boolean,
  ): import("./types").ClickType {
    if (i === 0) {
      return isNewBrick ? "guitarShapePlayerBrick-start" : "beat";
    }
    return "sub-beat";
  }
}
