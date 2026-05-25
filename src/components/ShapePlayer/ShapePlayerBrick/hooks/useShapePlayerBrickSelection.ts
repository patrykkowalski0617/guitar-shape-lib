import { useDataKeyStore, type ShapePlayerBrick } from "@/store";
import { useShapePlayerLocations, useShapePlayerBrickUpdates } from "./";
import { useRestoreBrick } from "@/hooks";

export const useShapePlayerBrickSelection = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const restoreNextBrick = useDataKeyStore((s) => s.restoreNextBrick);
  const { restore } = useRestoreBrick();

  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
  );
  const currentBaseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);
  const currentSemitoneOffset = useDataKeyStore(
    (s) => s.semitoneOffsetFromMajorRoot,
  );

  const isCurrentDataBrick =
    guitarShapePlayerBrick?.unifiedMusicKeysDataKey ===
      currentUnifiedMusicKeysDataKey &&
    guitarShapePlayerBrick?.baseChordDataKey === currentBaseChordDataKey &&
    guitarShapePlayerBrick?.semitoneOffsetFromMajorRoot ===
      currentSemitoneOffset;

  const { sliderRange, orderedLocations, selectedShapesVariantDataKeys } =
    useShapePlayerLocations(guitarShapePlayerBrick);

  const { setSliderRange } = useShapePlayerBrickUpdates(guitarShapePlayerBrick);

  const restoreData = () => {
    if (guitarShapePlayerBrick?.baseChordDataKey) {
      restore(guitarShapePlayerBrick);
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
    isCurrentDataBrick,
  };
};
