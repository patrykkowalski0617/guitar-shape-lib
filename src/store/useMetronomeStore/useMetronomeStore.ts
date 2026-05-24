import { create } from "zustand";
import type { MetronomeState, MetronomeBrick } from "./types";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";

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
  countInInternal: 0,
  isCountingIn: false,
  isFirstPlaybackTick: false,
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
        countInInternal: initialCountIn,
        currentStep: 0,
        isFirstPlaybackTick: false,
      });
    } else {
      set({
        isPlaying: false,
        isCountingIn: false,
        countIn: 0,
        countInInternal: 0,
        currentStep: 0,
        isFirstPlaybackTick: false,
      });
    }
  },

  getTotalSteps: (guitarShapePlayerBricks) => {
    return guitarShapePlayerBricks.reduce((sum, b) => sum + b.playLength, 0);
  },

  peekNextStep: (guitarShapePlayerBricks: MetronomeBrick[]) => {
    const { currentStep, isCountingIn, countInInternal, isFirstPlaybackTick } =
      get();

    if (isCountingIn && countInInternal > 0) {
      const isLastCountInStep = countInInternal === 1;
      return {
        isNewBrick: true,
        isFirstStepTotal: isLastCountInStep,
        isCountingIn: true,
        countIn: countInInternal,
        currentStep: currentStep,
      };
    }

    const totalSteps = guitarShapePlayerBricks.reduce(
      (sum, b) => sum + b.playLength,
      0,
    );

    if (totalSteps === 0) {
      return {
        isNewBrick: false,
        isFirstStepTotal: false,
        isCountingIn: false,
        countIn: 0,
        currentStep: currentStep,
      };
    }

    // First playback tick after countIn: stay at step 0
    // All subsequent ticks: advance normally
    const nextStepIndex = isFirstPlaybackTick
      ? 0
      : (currentStep + 1) % totalSteps;

    let accumulatedWidth = 0;
    let isNewBrick = false;
    for (const brick of guitarShapePlayerBricks) {
      if (nextStepIndex === accumulatedWidth) {
        isNewBrick = true;
        break;
      }
      accumulatedWidth += brick.playLength;
    }

    return {
      isNewBrick,
      isFirstStepTotal: nextStepIndex === 0,
      isCountingIn: false,
      countIn: 0,
      currentStep: nextStepIndex,
    };
  },

  applyStep: (event: ScheduledEvent) => {
    const t1 = performance.now();
    console.log(
      JSON.stringify({
        point: "T1_applyStep",
        t: t1,
        step: event.currentStep,
        isCountingIn: event.isCountingIn,
      }),
    );

    if (event.isCountingIn) {
      const nextInternal = (event.countIn ?? 1) - 1;
      const isLastCountInBeat = nextInternal === 0;
      set({
        countIn: event.countIn ?? 0,
        countInInternal: nextInternal,
        // Mark that next playback tick is the first one
        ...(isLastCountInBeat ? { isFirstPlaybackTick: true } : {}),
      });
    } else {
      set({
        isCountingIn: false,
        countIn: 0,
        countInInternal: 0,
        currentStep: event.currentStep ?? 0,
        isFirstPlaybackTick: false, // consumed - back to normal advancement
      });
    }
  },
}));
