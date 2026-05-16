import { useMultiRangeStore } from "@/store"; // dostosuj ścieżkę
import { type Range } from "../MultiRangeSlider/useMultiRangeSlider";

interface MasterConfig {
  [key: string]: any[];
}

interface MasterRanges {
  [key: string]: Range;
}

export const useMasterMultiRangeSlider = (
  ranges: MasterRanges,
  configs: MasterConfig,
  // Usuwamy onRangesChange z parametrów, bo będziemy używać akcji ze store
) => {
  const updateRangesFromMaster = useMultiRangeStore(
    (state) => state.updateRangesFromMaster,
  );

  const rangeValues = Object.values(ranges);

  const currentMasterRange: Range = {
    start:
      rangeValues.length > 0 ? Math.min(...rangeValues.map((r) => r.start)) : 0,
    end:
      rangeValues.length > 0 ? Math.max(...rangeValues.map((r) => r.end)) : 0,
  };

  const handleMasterChange = (nextMasterRange: Range) => {
    // Wywołujemy logikę bezpośrednio w store
    updateRangesFromMaster(nextMasterRange, currentMasterRange, configs);
  };

  return {
    currentMasterRange,
    handleMasterChange,
  };
};
