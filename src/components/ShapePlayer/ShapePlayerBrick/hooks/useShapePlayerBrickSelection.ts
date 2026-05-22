import { type ShapePlayerBrick, useShapePlayerStore } from "@/store";
import {
  useDataKeySelectors,
  useShapePlayerLocations,
  useShapePlayerTargetNotes,
} from "./";

export const useShapePlayerBrickSelection = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const updateBrickRange = useShapePlayerStore(
    (state) => state.updateBrickRange,
  );

  const {
    setBaseChordDataKey,
    setSelectedShapesVariantDataKeys,
    setSemitoneOffsetFromMajorRoot,
    setUnifiedMusicKeysDataKey,
    setNextBaseChordDataKey,
    setNextSelectedShapesVariantDataKeys,
    setNextSemitoneOffsetFromMajorRoot,
    setNextUnifiedMusicKeysDataKey,
  } = useDataKeySelectors();

  const { sliderRange, orderedLocations, selectedShapesVariantDataKeys } =
    useShapePlayerLocations(guitarShapePlayerBrick);

  const { targetSharpNoteNames, toggleTargetNote } = useShapePlayerTargetNotes(
    guitarShapePlayerBrick,
  );

  const setSliderRange = (newRange: [number, number]) => {
    if (guitarShapePlayerBrick?.id) {
      updateBrickRange(guitarShapePlayerBrick.id, newRange);
    }
  };

  const restoreData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
      setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
      setSemitoneOffsetFromMajorRoot(
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      );
      setUnifiedMusicKeysDataKey(
        guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      );
    }
  };

  const restoreNextData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      setNextBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
      setNextSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
      setNextSemitoneOffsetFromMajorRoot(
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      );
      setNextUnifiedMusicKeysDataKey(
        guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      );
    }
  };

  return {
    sliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
    restoreNextData,
    targetSharpNoteNames,
    toggleTargetNote,
  };
};
