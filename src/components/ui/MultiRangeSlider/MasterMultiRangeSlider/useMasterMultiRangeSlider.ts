import { useMasterShapeExplorerStore } from "@/store";
import { type Range } from "../MultiRangeSlider/useMultiRangeSlider";
import { usePersistentBoolean } from "@/hooks";

interface MasterConfig {
  [key: string]: number[];
}

interface MasterRanges {
  [key: string]: Range;
}

export const useMasterMultiRangeSlider = (
  ranges: MasterRanges,
  configs: MasterConfig,
) => {
  const updateRangesFromMaster = useMasterShapeExplorerStore(
    (state) => state.updateRangesFromMaster,
  );

  const isDisabled = usePersistentBoolean(Object.keys(ranges).length <= 1);

  const rangeValues = Object.values(ranges);

  const currentMasterRange: Range = {
    start:
      rangeValues.length > 0 ? Math.min(...rangeValues.map((r) => r.start)) : 0,
    end:
      rangeValues.length > 0 ? Math.max(...rangeValues.map((r) => r.end)) : 0,
  };

  const handleMasterChange = (nextMasterRange: Range) => {
    updateRangesFromMaster(nextMasterRange, currentMasterRange, configs);
  };

  return {
    currentMasterRange,
    handleMasterChange,
    isDisabled,
  };
};
