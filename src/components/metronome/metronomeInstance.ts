import { Metronome } from "./Metronome";

export const metronomeInstance = new Metronome(() => ({
  isNewBrick: false,
  isFirstStepTotal: false,
  isCountingIn: false,
  countIn: 0,
  currentStep: 0,
}));
