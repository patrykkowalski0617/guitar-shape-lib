import * as React from "react";
import { useControllersStore } from "@/store";
import { stringIndexes, type StringIndexes } from "../constants";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";

const getAllIndexesFromIndexRange = (range: number[]): number[] => {
  if (range.length === 0) return [];

  const start = Math.min(...range);
  const end = Math.max(...range);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const StringMultiRangeSlider = () => {
  const visibleStrings = useControllersStore((state) => state.visibleStrings);
  const setVisibleStrings = useControllersStore(
    (state) => state.setVisibleStrings,
  );

  const range = React.useMemo(() => {
    const hasNoVisibleStrings = !visibleStrings || !visibleStrings.length;

    if (hasNoVisibleStrings) {
      return { start: 0, end: 0 };
    }

    return {
      start: Math.min(...visibleStrings),
      end: Math.max(...visibleStrings),
    };
  }, [visibleStrings]);

  const handleChange = (nextRange: { start: number; end: number }) => {
    const fullIndexList = getAllIndexesFromIndexRange([
      nextRange.start,
      nextRange.end,
    ]);

    setVisibleStrings(fullIndexList as StringIndexes);
  };

  return (
    <MultiRangeSlider
      values={stringIndexes}
      range={range}
      onChange={handleChange}
      orientation="vertical"
      height={242}
    />
  );
};
