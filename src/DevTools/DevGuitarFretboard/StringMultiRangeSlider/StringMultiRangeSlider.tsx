import { useMemo, useCallback } from "react";
import { useControllersStore } from "@/store";
import { stringIndexes, type StringIndexes } from "../constants";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import { getIndexRangeArray, getRangeFromVisibleStrings } from "./helpers";
import type { RangeValue } from "./types";

export const StringMultiRangeSlider = () => {
  const visibleStrings = useControllersStore((state) => state.visibleStrings);
  const setVisibleStrings = useControllersStore(
    (state) => state.setVisibleStrings,
  );

  const range = useMemo(
    () => getRangeFromVisibleStrings(visibleStrings),
    [visibleStrings],
  );

  const handleChange = useCallback(
    ({ start, end }: RangeValue) => {
      setVisibleStrings(getIndexRangeArray(start, end) as StringIndexes);
    },
    [setVisibleStrings],
  );

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
