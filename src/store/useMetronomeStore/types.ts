export interface StepResult {
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
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
  isCountingIn: boolean;
  isMetronomeWithBass: boolean;

  setBpm: (bpm: number) => void;
  setBpmMultiplier: (multiplier: number) => void;
  togglePlay: () => void;
  nextStep: (guitarShapePlayerBricks: MetronomeBrick[]) => StepResult;
  getTotalSteps: (guitarShapePlayerBricks: MetronomeBrick[]) => number;
}
