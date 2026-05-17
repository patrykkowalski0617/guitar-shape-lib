import { useControlsStore, useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
import {
  calculateMatrixData,
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
} from "../utils";
import type { NoteObject } from "@/utils";
import type { NoteName } from "@/data";

export const useNoteMatrix = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const shapeOffset = useControlsStore(
    (state) => state.semitoneOffsetFromMajorRoot,
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

  const getSafeEnharmonicName = (noteObject: NoteObject): NoteName => {
    const enharmonicName = getEnharmonicName(noteObject, {
      unifiedMusicKeysDataKey,
    });
    const fallbackName = noteObject.sharpNoteName as NoteName;
    return enharmonicName ?? fallbackName;
  };

  const data = isStateReady
    ? calculateMatrixData(
        unifiedMusicKeysDataKey!,
        baseChordDataKey!,
        shapeDataKey!,
        shapeOffset!,
        getSafeEnharmonicName,
      )
    : null;

  const checkIsShared = (noteName: NoteName | "") => {
    if (!data || noteName === "") return false;

    const inScale = data.visibleColumnsIndices.some((i) => {
      const isScaleVisible = getIsScaleNoteVisible(i, data.allScaleIndices);
      const isNoteMatch = data.displayNoteNames[i] === noteName;
      return isScaleVisible && isNoteMatch;
    });

    const inShape = data.visibleColumnsIndices.some((i) => {
      const isShapeVisible = getIsShapeNoteVisible(i, data.shapeIndices);
      const isNoteMatch = data.displayNoteNames[i] === noteName;
      return isShapeVisible && isNoteMatch;
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
