import { useControlsStore, useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
import {
  calculateMatrixData,
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
} from "../utils";

export const useNoteMatrix = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const shapeOffset = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );

  const selectedNotes = useMusicStore(
    (state) => state.selectedTargetNotesNames,
  );
  const setSelectedNotes = useMusicStore(
    (state) => state.setSelectedTargetNotesNames,
  );

  const getEnharmonicName = useEnharmonicNoteName();

  const isStateReady = !!(
    shapeDataKey &&
    unifiedMusicKeysDataKey &&
    baseChordDataKey &&
    shapeOffset !== null
  );

  const data = isStateReady
    ? calculateMatrixData(
        unifiedMusicKeysDataKey!,
        baseChordDataKey!,
        shapeDataKey!,
        shapeOffset!,
        getEnharmonicName,
      )
    : null;

  const checkIsShared = (noteName: string) => {
    if (!data || noteName === "") return false;

    const inScale = data.visibleColumnsIndices.some((i) => {
      const isVisible = getIsScaleNoteVisible(i, data.allScaleIndices);
      return isVisible && data.displayNoteNames[i] === noteName;
    });

    const inShape = data.visibleColumnsIndices.some((i) => {
      const isVisible = getIsShapeNoteVisible(i, data.shapeIndices);
      return isVisible && data.displayNoteNames[i] === noteName;
    });

    return inScale && inShape;
  };

  const MIN_NOTES = 12;
  const visibleCount = data?.visibleColumnsIndices.length || 0;
  const paddingArray = Array.from({
    length: Math.max(0, MIN_NOTES - visibleCount),
  });

  return {
    isStateReady,
    data,
    selectedNotes,
    setSelectedNotes,
    checkIsShared,
    paddingArray,
  };
};
