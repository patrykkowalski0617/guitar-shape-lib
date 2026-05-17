import React from "react";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { useMasterMultiRangeSlider } from "./useMasterMultiRangeSlider";
import { type Range } from "../MultiRangeSlider/useMultiRangeSlider";

interface MasterMultiRangeSliderProps {
  ranges: Record<string, Range>;
  configs: Record<string, any[]>;
  masterValues: (string | number)[];
}

const MasterMultiRangeSlider: React.FC<MasterMultiRangeSliderProps> = ({
  ranges,
  configs,

  masterValues,
}) => {
  const { currentMasterRange, handleMasterChange } = useMasterMultiRangeSlider(
    ranges,
    configs,
  );

  return (
    <MultiRangeSlider
      values={masterValues}
      range={currentMasterRange}
      onChange={handleMasterChange}
    />
  );
};

export default MasterMultiRangeSlider;
