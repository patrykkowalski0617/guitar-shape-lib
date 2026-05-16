import type { Range } from "@/components/ui/MultiRangeSlider/MultiRangeSlider/useMultiRangeSlider";
import { create } from "zustand";

interface MultiRangeState {
  // Przechowuje zakresy wszystkich suwaków: { [id: string]: { start, end } }
  ranges: Record<string, Range>;

  // Akcje
  setRange: (id: string, range: Range) => void;
  setAllRanges: (newRanges: Record<string, Range>) => void;
  initializeRanges: (initialRanges: Record<string, Range>) => void;

  // Logika Mastera przeniesiona do store'a
  updateRangesFromMaster: (
    nextMasterRange: Range,
    currentMasterRange: Range,
    configs: Record<string, any[]>,
  ) => void;
}

export const useMultiRangeStore = create<MultiRangeState>((set) => ({
  ranges: {},

  initializeRanges: (initialRanges) => set({ ranges: initialRanges }),

  setRange: (id, range) =>
    set((state) => ({
      ranges: { ...state.ranges, [id]: range },
    })),

  setAllRanges: (newRanges) => set({ ranges: newRanges }),

  updateRangesFromMaster: (nextMasterRange, currentMasterRange, configs) =>
    set((state) => {
      const startDelta = nextMasterRange.start - currentMasterRange.start;
      const endDelta = nextMasterRange.end - currentMasterRange.end;

      const updatedRanges = { ...state.ranges };
      let isValid = true;

      for (const id in state.ranges) {
        const nextStart = state.ranges[id].start + startDelta;
        const nextEnd = state.ranges[id].end + endDelta;

        const configLength = configs[id]?.length || 0;
        const outOfBounds = nextStart < 0 || nextEnd >= configLength;
        const invalidRange = nextStart > nextEnd;

        if (outOfBounds || invalidRange) {
          isValid = false;
          break;
        }

        updatedRanges[id] = { start: nextStart, end: nextEnd };
      }

      return isValid ? { ranges: updatedRanges } : state;
    }),
}));
