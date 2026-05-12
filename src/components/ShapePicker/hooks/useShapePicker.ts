import { useDataKeyStore, useUiStore } from "@/store";
import { useCurrentBaseChordName } from "@/hooks";
import { useSortedShapeOptions } from "./useSortedShapeOptions";

export const useShapePicker = () => {
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  const setShapeSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setShapeSemitoneOffsetFromMajorRoot,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );

  const isExpanded = useUiStore((state) => state.isShapePickerExpanded);
  const options = useSortedShapeOptions();
  const selectedChordLabel = useCurrentBaseChordName();

  const handleSelectShape = (value: string) => {
    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);

    setShapeDataKey(id);
    setShapeSemitoneOffsetFromMajorRoot(offset);
    setBaseChordDataKey(baseChordDataKey);
  };

  return {
    options,
    selectedChordLabel,
    isExpanded,
    handleSelectShape,
  };
};
