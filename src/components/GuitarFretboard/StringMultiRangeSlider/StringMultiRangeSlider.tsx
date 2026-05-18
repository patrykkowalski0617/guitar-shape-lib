import * as React from "react";
import { useControlsStore } from "@/store";
import { stringIndexes, type StringIndexes } from "../constants";
import { getAllIndexesFromIndexRange } from "@/components/ui/MultiStepSlider/utils";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";

export const StringMultiRangeSlider = () => {
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const setVisibleStrings = useControlsStore(
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
    />
  );
};
