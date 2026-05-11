import * as React from "react";
import { MultiStepSlider } from "@/components/ui/MultiStepSlider/MultiStepSlider";
import { useControlsStore } from "@/store";
import type { StringIndex } from "../constants";
import { getAllIndexesFromIndexRange } from "@/components/ui/MultiStepSlider/utils";

export const StringMultiStepSlider = () => {
  const stringIndexes: StringIndex = [0, 5];
  const maxIdx = stringIndexes[stringIndexes.length - 1];

  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );

  const flip = (val: number) => maxIdx - val;

  const sliderValue = React.useMemo(() => {
    if (!visibleStrings || visibleStrings.length === 0)
      return [flip(0), flip(0)];

    const realMin = Math.min(...visibleStrings);
    const realMax = Math.max(...visibleStrings);

    return [flip(realMax), flip(realMin)];
  }, [visibleStrings, maxIdx]);

  const handleValueChange = (nextRange: number[]) => {
    const realValues = nextRange.map(flip);

    const fullIndexList = getAllIndexesFromIndexRange([
      Math.min(...realValues),
      Math.max(...realValues),
    ]);

    setVisibleStrings(fullIndexList);
  };

  return (
    <MultiStepSlider
      value={sliderValue}
      onValueChange={handleValueChange}
      min={0}
      max={maxIdx}
      orientation="vertical"
      thumbSize={32}
    />
  );
};
