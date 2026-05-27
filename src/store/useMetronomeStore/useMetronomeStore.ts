import { create } from "zustand";
import type { MetronomeState } from "./types";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
import type { ShapePlayerBrick } from "../useShapePlayerStore/types";
import { brickToBackingtrackNoteIds } from "@/utils/brickToBackingtrackNoteIds";
import { noteIdToFrequency } from "@/utils";

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

  peekNextStep: (guitarShapePlayerBricks: ShapePlayerBrick[]) => {
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
        bassNoteFrequency: null,
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
        bassNoteFrequency: null,
      };
    }

    const nextStepIndex = isFirstPlaybackTick
      ? 0
      : (currentStep + 1) % totalSteps;

    let accumulatedWidth = 0;
    let isNewBrick = false;
    let activeBrick: ShapePlayerBrick | undefined;

    for (const brick of guitarShapePlayerBricks) {
      if (nextStepIndex === accumulatedWidth) {
        isNewBrick = true;
        activeBrick = brick;
        break;
      }
      accumulatedWidth += brick.playLength;
    }

    let bassNoteFrequency: number | null = null;
    if (isNewBrick && activeBrick) {
      const noteIds = brickToBackingtrackNoteIds(activeBrick);
      const bassNoteId = noteIds[0];
      if (bassNoteId) {
        bassNoteFrequency = noteIdToFrequency(bassNoteId);
      }
    }

    return {
      isNewBrick,
      isFirstStepTotal: nextStepIndex === 0,
      isCountingIn: false,
      countIn: 0,
      currentStep: nextStepIndex,
      bassNoteFrequency,
    };
  },

  applyStep: (event: ScheduledEvent) => {
    if (event.isCountingIn) {
      const nextInternal = (event.countIn ?? 1) - 1;
      const isLastCountInBeat = nextInternal === 0;
      set({
        countIn: event.countIn ?? 0,
        countInInternal: nextInternal,

        ...(isLastCountInBeat ? { isFirstPlaybackTick: true } : {}),
      });
    } else {
      set({
        isCountingIn: false,
        countIn: 0,
        countInInternal: 0,
        currentStep: event.currentStep ?? 0,
        isFirstPlaybackTick: false,
      });
    }
  },

  toggleIsMetronomeWithBass: () =>
    set((state) => ({ isMetronomeWithBass: !state.isMetronomeWithBass })),
}));
