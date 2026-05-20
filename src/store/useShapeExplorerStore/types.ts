import type { Range } from "@/components/ui/MultiRangeSlider/MultiRangeSlider/useMultiRangeSlider";

export interface MultiRangeState {
  ranges: Record<string, Range>;

  setRange: (id: string, range: Range) => void;
  setAllRanges: (newRanges: Record<string, Range>) => void;
  initializeRanges: (initialRanges: Record<string, Range>) => void;

  updateRangesFromMaster: (
    nextMasterRange: Range,
    currentMasterRange: Range,
    configs: Record<string, unknown[]>,
  ) => void;
}
