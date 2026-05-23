import { useMusicStore, type ShapePlayerBrick } from "@/store";
import {
  useDataKeySelectors,
  useShapePlayerLocations,
  useShapePlayerBrickUpdates,
} from "./";

export const useShapePlayerBrickSelection = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
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

  const replaceTargetSharpNoteNames = useMusicStore(
    (s) => s.replaceTargetSharpNoteNames,
  );

  const { sliderRange, orderedLocations, selectedShapesVariantDataKeys } =
    useShapePlayerLocations(guitarShapePlayerBrick);

  const { setSliderRange, toggleTargetNote, targetSharpNoteNames } =
    useShapePlayerBrickUpdates(guitarShapePlayerBrick);

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
      replaceTargetSharpNoteNames(
        guitarShapePlayerBrick.targetSharpNoteNames ?? [],
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
