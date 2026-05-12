import * as React from "react";
import { MultiStepSlider } from "@/components/ui/MultiStepSlider/MultiStepSlider";
import { useControlsStore } from "@/store";
import type { StringIndexes, StringValidIndex } from "../constants";
import { getAllIndexesFromIndexRange } from "@/components/ui/MultiStepSlider/utils";

export const StringMultiStepSlider = () => {
  const stringIndexes: StringValidIndex[] = [0, 5];
  const maxIdx = stringIndexes[stringIndexes.length - 1];

  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );

  const flip = React.useCallback((val: number) => maxIdx - val, [maxIdx]);

  const sliderValue = React.useMemo(() => {
    const hasNoVisibleStrings = !visibleStrings || !visibleStrings.length;

    if (hasNoVisibleStrings) {
      const defaultFlippedValue = flip(0);
      return [defaultFlippedValue, defaultFlippedValue];
    }

    const minStringIndex = Math.min(...visibleStrings);
    const maxStringIndex = Math.max(...visibleStrings);

    const bottomSliderThumb = flip(maxStringIndex);
    const topSliderThumb = flip(minStringIndex);

    return [bottomSliderThumb, topSliderThumb];
  }, [visibleStrings, flip]);

  const handleValueChange = (nextRange: number[]) => {
    const realValues = nextRange.map(flip);

    const minSelectedValue = Math.min(...realValues);
    const maxSelectedValue = Math.max(...realValues);

    const fullIndexList = getAllIndexesFromIndexRange([
      minSelectedValue,
      maxSelectedValue,
    ]);

    setVisibleStrings(fullIndexList as StringIndexes);
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
