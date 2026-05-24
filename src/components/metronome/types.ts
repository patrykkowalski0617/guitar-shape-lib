export type ClickType = "guitarShapePlayerBrick-start" | "beat" | "sub-beat";

// onTick now returns full context needed both for audio scheduling and UI sync
// It does NOT mutate store - it only reads current state and computes next state
export interface TickResult {
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
  isCountingIn: boolean;
  countIn: number; // value that should appear in UI when this tick plays
  currentStep: number; // step that should be active when this tick plays
}

export interface TickCallback {
  (): TickResult;
}

export interface ClickConfig {
  frequency: number;
  noiseFrequency: number;
  gain: number;
  noiseGain: number;
}

export type AudioScheduledNode = AudioNode | AudioScheduledSourceNode;
