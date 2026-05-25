import { useDataKeyStore, useUiStore, useShapePlayerStore } from "@/store";
import { useBaseChordName } from "@/hooks/baseChord/useBaseChordName";
import { useSortedShapeOptions } from "./useSortedShapeOptions";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";

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
  const editingBrickId = useUiStore((state) => state.editingBrickId);
  const setEditingBrickId = useUiStore((state) => state.setEditingBrickId);

  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );
  const updateBrick = useShapePlayerStore((state) => state.updateBrick);

  const options = useSortedShapeOptions();
  const selectedChordLabel = useBaseChordName();

  const handleSelectShape = (value: string) => {
    const [guitarShapeDataKey, offsetStr] = value.split("|");
    const semitoneOffsetFromMajorRoot = parseInt(offsetStr, 10);

    setShapeDataKey(guitarShapeDataKey);
    setSemitoneOffsetFromMajorRoot(semitoneOffsetFromMajorRoot);

    if (unifiedMusicKeysDataKey && baseChordDataKey) {
      if (editingBrickId) {
        const locations = getOrderedShapeVariantDataKeys({
          guitarShapeDataKey,
          unifiedMusicKeysDataKey,
          semitoneOffsetFromMajorRoot,
        });
        const maxLocationIndex = Math.max(0, locations.length - 1);
        const defaultRange: [number, number] = [0, maxLocationIndex];

        updateBrick(editingBrickId, {
          unifiedMusicKeysDataKey,
          baseChordDataKey,
          guitarShapeDataKey,
          semitoneOffsetFromMajorRoot,
          sliderRange: defaultRange,
        });

        setEditingBrickId(null);
      } else {
        addShapePlayerBrick({
          unifiedMusicKeysDataKey,
          baseChordDataKey,
          guitarShapeDataKey,
          semitoneOffsetFromMajorRoot,
          playLength: 4,
        });
      }
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
