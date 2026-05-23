export type ClickType = "guitarShapePlayerBrick-start" | "beat" | "sub-beat";

export interface TickCallback {
  (): { isNewBrick: boolean };
}

export interface ClickConfig {
  frequency: number;
  noiseFrequency: number;
  gain: number;
  noiseGain: number;
}

export type AudioScheduledNode = AudioNode | AudioScheduledSourceNode;
