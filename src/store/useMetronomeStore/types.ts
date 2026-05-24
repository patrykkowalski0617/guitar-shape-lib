import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
import type { ShapePlayerBrick } from "../useShapePlayerStore/types";

export interface StepResult {
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
  isCountingIn: boolean;
  countIn: number;
  currentStep: number;
  bassNoteFrequency: number | null;
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
  peekNextStep: (guitarShapePlayerBricks: ShapePlayerBrick[]) => StepResult;
  applyStep: (event: ScheduledEvent) => void;
}
