import { useDataKeyStore, useUiStore, useShapePlayerStore } from "@/store";
import { useBaseChord } from "@/hooks";
import { useSortedShapeOptions } from "./useSortedShapeOptions";

export const useShapePicker = () => {
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);

  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );

  const isShapePickerExpanded = useUiStore(
    (state) => state.isShapePickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );

  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );

  const options = useSortedShapeOptions();
  const { getBaseChordName } = useBaseChord();
  const selectedChordLabel = getBaseChordName();

  const handleSelectShape = (value: string) => {
    const [shapeDataKey, offsetStr] = value.split("|");
    const semitoneOffsetFromMajorRoot = parseInt(offsetStr, 10);

    setShapeDataKey(shapeDataKey);
    setSemitoneOffsetFromMajorRoot(semitoneOffsetFromMajorRoot);

    if (unifiedMusicKeysDataKey && baseChordDataKey) {
      addShapePlayerBrick({
        unifiedMusicKeysDataKey,
        baseChordDataKey,
        shapeDataKey,
        semitoneOffsetFromMajorRoot,
        playLength: 4,
      });
    }

    setShapePickerExpanded(false);
  };

  return {
    options,
    selectedChordLabel,
    isShapePickerExpanded,
    handleSelectShape,
  };
};
