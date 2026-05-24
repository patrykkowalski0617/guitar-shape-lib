import { useDataKeyStore, useMusicStore, type ShapePlayerBrick } from "@/store";
import { useShapePlayerLocations, useShapePlayerBrickUpdates } from "./";

export const useShapePlayerBrickSelection = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const restoreCurrentBrick = useDataKeyStore((s) => s.restoreCurrentBrick);
  const restoreNextBrick = useDataKeyStore((s) => s.restoreNextBrick);
  const replaceTargetSharpNoteNames = useMusicStore(
    (s) => s.replaceTargetSharpNoteNames,
  );

  const { sliderRange, orderedLocations, selectedShapesVariantDataKeys } =
    useShapePlayerLocations(guitarShapePlayerBrick);

  const { setSliderRange, toggleTargetNote, targetSharpNoteNames } =
    useShapePlayerBrickUpdates(guitarShapePlayerBrick);

  const restoreData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      restoreCurrentBrick({
        baseChordDataKey: guitarShapePlayerBrick.baseChordDataKey,
        unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot:
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
        selectedShapesVariantDataKeys: selectedShapesVariantDataKeys,
      });
      replaceTargetSharpNoteNames(
        guitarShapePlayerBrick.targetSharpNoteNames ?? [],
      );
    }
  };

  const restoreNextData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      restoreNextBrick({
        nextBaseChordDataKey: guitarShapePlayerBrick.baseChordDataKey,
        nextUnifiedMusicKeysDataKey:
          guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        nextSemitoneOffsetFromMajorRoot:
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
        nextSelectedShapesVariantDataKeys: selectedShapesVariantDataKeys,
      });
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
