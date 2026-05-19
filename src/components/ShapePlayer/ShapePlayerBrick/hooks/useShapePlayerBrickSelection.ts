import { useMemo } from "react";
import { useDataKeyStore, useShapePlayerStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapeVariantDataKeys } from "@/data";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickSelection = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapesVariantDataKeys,
  );
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );

  const updateBrickRange = useShapePlayerStore(
    (state) => state.updateBrickRange,
  );
  const setNextBaseChordDataKey = useDataKeyStore(
    (state) => state.setNextBaseChordDataKey,
  );
  const setNextSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.setNextSelectedShapesVariantDataKeys,
  );
  const setNextSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setNextSemitoneOffsetFromMajorRoot,
  );
  const setNextUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setNextUnifiedMusicKeysDataKey,
  );
  const currentSliderRange: [number, number] = useMemo(() => {
    return guitarShapePlayerBrick?.sliderRange ?? [0, 0];
  }, [guitarShapePlayerBrick?.sliderRange]);

  const orderedLocations = useMemo(() => {
    const hasRequiredData =
      guitarShapePlayerBrick?.guitarShapeDataKey &&
      guitarShapePlayerBrick?.unifiedMusicKeysDataKey;

    if (!hasRequiredData) {
      return [] as ShapeVariantDataKeys[];
    }

    const locations = getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot:
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
    });

    return locations as ShapeVariantDataKeys[];
  }, [guitarShapePlayerBrick]);

  const selectedShapesVariantDataKeys = useMemo(() => {
    const startIdx = currentSliderRange[0];
    const endIdx = currentSliderRange[1] + 1;
    return orderedLocations.slice(startIdx, endIdx);
  }, [orderedLocations, currentSliderRange]);

  const setSliderRange = (newRange: [number, number]) => {
    if (guitarShapePlayerBrick?.id) {
      updateBrickRange(guitarShapePlayerBrick.id, newRange);
    }
  };

  const restoreData = () => {
    const canRestore = guitarShapePlayerBrick?.baseChordDataKey;

    if (canRestore) {
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
    const canRestore = guitarShapePlayerBrick?.baseChordDataKey;

    if (canRestore) {
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
    sliderRange: currentSliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
    restoreNextData,
  };
};
