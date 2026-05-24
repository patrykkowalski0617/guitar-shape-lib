import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";

export interface StepResult {
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
  isCountingIn: boolean;
  countIn: number;
  currentStep: number;
}

export interface MetronomeBrick {
  playLength: number;
}

export interface MetronomeState {
  bpm: number;
  bpmMultiplier: number;
  isPlaying: boolean;
  currentStep: number;
  countIn: number;
  countInInternal: number;
  isCountingIn: boolean;
  isFirstPlaybackTick: boolean;
  isMetronomeWithBass: boolean;

  setBpm: (bpm: number) => void;
  setBpmMultiplier: (multiplier: number) => void;
  togglePlay: () => void;
  getTotalSteps: (guitarShapePlayerBricks: MetronomeBrick[]) => number;
  peekNextStep: (guitarShapePlayerBricks: MetronomeBrick[]) => StepResult;
  applyStep: (event: ScheduledEvent) => void;
}
