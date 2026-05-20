import { useDataKeyStore, useUiStore, useShapePlayerStore } from "@/store";
import { useBaseChordName } from "@/hooks/baseChord/useBaseChordName";
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
  const selectedChordLabel = useBaseChordName();

  const handleSelectShape = (value: string) => {
    const [guitarShapeDataKey, offsetStr] = value.split("|");
    const semitoneOffsetFromMajorRoot = parseInt(offsetStr, 10);

    setShapeDataKey(guitarShapeDataKey);
    setSemitoneOffsetFromMajorRoot(semitoneOffsetFromMajorRoot);

    if (unifiedMusicKeysDataKey && baseChordDataKey) {
      addShapePlayerBrick({
        unifiedMusicKeysDataKey,
        baseChordDataKey,
        guitarShapeDataKey,
        semitoneOffsetFromMajorRoot,
        playLength: 4,
        targetSharpNoteNames: [],
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
