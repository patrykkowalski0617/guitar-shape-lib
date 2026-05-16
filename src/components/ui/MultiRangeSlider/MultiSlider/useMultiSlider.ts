import { useState } from "react";
import { type SliderRange } from "../SegmentedRangeSlider/useSegmentedRangeSlider";

export interface RangesState {
  A: SliderRange;
  B: SliderRange;
}

export interface ConfigsState {
  A: number[];
  B: number[];
}

export const useMultiSlider = () => {
  const [ranges, setRanges] = useState<RangesState>({
    A: { start: 1, end: 3 },
    B: { start: 0, end: 2 },
  });

  const configs: ConfigsState = {
    A: [0, 1, 2, 3, 4, 5],
    B: [10, 20, 30, 40],
  };

  const maxConfigLength = Math.max(
    ...Object.values(configs).map((c) => c.length),
  );
  const masterValues = Array.from(
    { length: maxConfigLength },
    (_, index) => index,
  );

  const masterRange: SliderRange = {
    start: Math.min(ranges.A.start, ranges.B.start),
    end: Math.max(ranges.A.end, ranges.B.end),
  };

  const onMasterChange = (next: SliderRange) => {
    const dS = next.start - masterRange.start;
    const dE = next.end - masterRange.end;

    const keys = Object.keys(configs) as Array<keyof ConfigsState>;

    const valid = keys.every((key) => {
      const nS = ranges[key].start + dS;
      const nE = ranges[key].end + dE;
      const isWithinBoundaries = nS >= 0 && nE < configs[key].length;
      const isValidRange = nS <= nE;

      return isWithinBoundaries && isValidRange;
    });

    if (valid) {
      setRanges({
        A: { start: ranges.A.start + dS, end: ranges.A.end + dE },
        B: { start: ranges.B.start + dS, end: ranges.B.end + dE },
      });
    }
  };

  const onSliderAChange = (r: SliderRange) => {
    setRanges((prev) => ({ ...prev, A: r }));
  };

  const onSliderBChange = (r: SliderRange) => {
    setRanges((prev) => ({ ...prev, B: r }));
  };

  return {
    ranges,
    configs,
    masterValues,
    masterRange,
    onMasterChange,
    onSliderAChange,
    onSliderBChange,
  };
};
