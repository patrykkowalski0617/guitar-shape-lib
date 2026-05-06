import { useControlsStore, useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
import {
  calculateMatrixData,
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
} from "../utils";

export const useNoteMatrix = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeOffset = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );

  const selectedNotes = useMusicStore((state) => state.selectedComponentNotes);
  const setSelectedNotes = useMusicStore(
    (state) => state.setSelectedComponentNotes,
  );

  const getEnharmonicName = useEnharmonicNoteName();

  const isStateReady = !!(
    shapeId &&
    tuneKeyId &&
    baseChordId &&
    shapeOffset !== null
  );

  const data = isStateReady
    ? calculateMatrixData(
        tuneKeyId!,
        baseChordId!,
        shapeId!,
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
