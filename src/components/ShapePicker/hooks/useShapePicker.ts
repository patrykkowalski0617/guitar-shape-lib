import { useDataKeyStore, useUiStore, useShapePlayerStore } from "@/store";
import { useBaseChordName } from "@/hooks/baseChord/useBaseChordName";
import { useSortedShapeOptions } from "./useSortedShapeOptions";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import { useRestoreBrick } from "@/hooks";
import { useMusicStore } from "@/store";

export const useShapePicker = () => {
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);
  const { restore } = useRestoreBrick();
  const setShapeDataKey = useDataKeyStore((s) => s.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (s) => s.setSemitoneOffsetFromMajorRoot,
  );

  const isShapePickerExpanded = useUiStore((s) => s.isShapePickerExpanded);
  const setShapePickerExpanded = useUiStore((s) => s.setShapePickerExpanded);
  const editingBrickId = useUiStore((s) => s.editingBrickId);
  const setEditingBrickId = useUiStore((s) => s.setEditingBrickId);

  const addShapePlayerBrick = useShapePlayerStore((s) => s.addShapePlayerBrick);
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);

  const isMajorMode = useMusicStore((s) => s.isMajorMode);

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
          targetNoteIndices: [1],
          isMajorMode,
        });

        setEditingBrickId(null);

        const updatedBrick = useShapePlayerStore
          .getState()
          .guitarShapePlayerBricks.find((b) => b.id === editingBrickId);

        if (updatedBrick) restore({ ...updatedBrick, targetNoteIndices: [1] });
      } else {
        addShapePlayerBrick({
          unifiedMusicKeysDataKey,
          baseChordDataKey,
          guitarShapeDataKey,
          semitoneOffsetFromMajorRoot,
          playLength: 4,
          targetNoteIndices: [1],
          isMajorMode,
        });

        const bricks = useShapePlayerStore.getState().guitarShapePlayerBricks;
        const newBrick = bricks[bricks.length - 1];

        if (newBrick) restore({ ...newBrick, targetNoteIndices: [1] });
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
