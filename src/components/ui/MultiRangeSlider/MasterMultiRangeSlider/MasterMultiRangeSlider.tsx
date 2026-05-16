import React from "react";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { useMasterMultiRangeSlider } from "./useMasterMultiRangeSlider";
import { type Range } from "../MultiRangeSlider/useMultiRangeSlider";

interface MasterMultiRangeSliderProps {
  ranges: Record<string, Range>;
  configs: Record<string, any[]>;
  onRangesChange: (nextRanges: Record<string, Range>) => void;
  masterValues: (string | number)[];
}

const MasterMultiRangeSlider: React.FC<MasterMultiRangeSliderProps> = ({
  ranges,
  configs,
  onRangesChange,
  masterValues,
}) => {
  const { currentMasterRange, handleMasterChange } = useMasterMultiRangeSlider(
    ranges,
    configs,
    onRangesChange,
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
