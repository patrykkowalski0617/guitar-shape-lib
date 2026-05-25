import { useDataKeyStore, useMusicStore, type ShapePlayerBrick } from "@/store";
import { useShapePlayerLocations, useShapePlayerBrickUpdates } from "./";
import { resolveTargetSharpNoteNames } from "@/utils";

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

  const { setSliderRange } = useShapePlayerBrickUpdates(guitarShapePlayerBrick);

  const restoreData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      restoreCurrentBrick({
        baseChordDataKey: guitarShapePlayerBrick.baseChordDataKey,
        unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot:
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
        selectedShapesVariantDataKeys: selectedShapesVariantDataKeys,
      });

      const sharpNoteNames = resolveTargetSharpNoteNames(
        guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        guitarShapePlayerBrick.baseChordDataKey,
        guitarShapePlayerBrick.guitarShapeDataKey,
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
        guitarShapePlayerBrick.targetNoteIndices ?? [1],
      );
      replaceTargetSharpNoteNames(sharpNoteNames);
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
  };
};
