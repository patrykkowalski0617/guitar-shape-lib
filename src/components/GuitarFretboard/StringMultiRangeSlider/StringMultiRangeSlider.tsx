import { useMemo, useCallback } from "react";
import { useControllersStore } from "@/store";
import { stringIndexes, type StringIndexes } from "../constants";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import { getIndexRangeArray, getRangeFromVisibleStrings } from "./helpers";
import type { RangeValue } from "./types";
import { SideSliderDrawer } from "@/components/ui";

export const StringMultiRangeSlider = () => {
  const visibleStrings = useControllersStore((s) => s.visibleStrings);
  const setVisibleStrings = useControllersStore((s) => s.setVisibleStrings);

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
    <SideSliderDrawer>
      <MultiRangeSlider
        values={stringIndexes}
        range={range}
        onChange={handleChange}
        orientation="vertical"
      />
    </SideSliderDrawer>
  );
};
