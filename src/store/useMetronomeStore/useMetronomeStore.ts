import { create } from "zustand";
import type { MetronomeState } from "./types";

export const BPM_RANGE = {
  MIN: 20,
  MAX: 220,
} as const;

export const useMetronomeStore = create<MetronomeState>((set, get) => ({
  bpm: 70,
  bpmMultiplier: 1,
  isPlaying: false,
  currentStep: 0,
  countIn: 0,
  isCountingIn: false,
  isMetronomeWithBass: true,

  setBpm: (bpm) => {
    const validatedBpm = Math.max(BPM_RANGE.MIN, Math.min(BPM_RANGE.MAX, bpm));
    set({ bpm: validatedBpm });
  },

  setBpmMultiplier: (bpmMultiplier) => set({ bpmMultiplier }),

  togglePlay: () => {
    const { isPlaying, bpm } = get();

    if (!isPlaying) {
      const initialCountIn = bpm <= 100 ? 4 : 8;
      set({
        isPlaying: true,
        isCountingIn: true,
        countIn: initialCountIn,
        currentStep: 0,
      });
    } else {
      set({
        isPlaying: false,
        isCountingIn: false,
        countIn: 0,
        currentStep: 0,
      });
    }
  },

  getTotalSteps: (guitarShapePlayerBricks) => {
    return guitarShapePlayerBricks.reduce(
      (sum, guitarShapePlayerBrick) => sum + guitarShapePlayerBrick.playLength,
      0,
    );
  },

  nextStep: (guitarShapePlayerBricks) => {
    const { currentStep, isCountingIn, countIn } = get();

    if (isCountingIn) {
      const isLastCountInStep = countIn === 1;

      if (isLastCountInStep) {
        set({ isCountingIn: false, countIn: 0, currentStep: 0 });
      } else {
        set({ countIn: countIn - 1 });
      }

      return { isNewBrick: true, isFirstStepTotal: isLastCountInStep };
    }

    const totalSteps = guitarShapePlayerBricks.reduce(
      (sum, guitarShapePlayerBrick) => sum + guitarShapePlayerBrick.playLength,
      0,
    );

    if (totalSteps === 0) {
      return { isNewBrick: false, isFirstStepTotal: false };
    }

    const nextStepIndex = (currentStep + 1) % totalSteps;
    set({ currentStep: nextStepIndex });

    let accumulatedWidth = 0;
    let isNewBrick = false;

    for (const guitarShapePlayerBrick of guitarShapePlayerBricks) {
      if (nextStepIndex === accumulatedWidth) {
        isNewBrick = true;
        break;
      }
      accumulatedWidth += guitarShapePlayerBrick.playLength;
    }

    return {
      isNewBrick,
      isFirstStepTotal: nextStepIndex === 0,
    };
  },
}));
