export type ClickType = "guitarShapePlayerBrick-start" | "beat" | "sub-beat";

export interface TickResult {
  isNewBrick: boolean;
  isFirstStepTotal: boolean;
  isCountingIn: boolean;
  countIn: number;
  currentStep: number;
  bassNoteFrequency: number | null;
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
