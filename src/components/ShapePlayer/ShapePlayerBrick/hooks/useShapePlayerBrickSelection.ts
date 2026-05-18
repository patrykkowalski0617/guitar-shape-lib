import { useMemo } from "react";
import { useDataKeyStore, useShapePlayerStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapeVariantDataKeys } from "@/data";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickSelection = (
  shapePlayerBrick?: ShapePlayerBrick,
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

  const currentSliderRange: [number, number] = useMemo(() => {
    return shapePlayerBrick?.sliderRange ?? [0, 0];
  }, [shapePlayerBrick?.sliderRange]);

  const orderedLocations = useMemo(() => {
    const hasRequiredData =
      shapePlayerBrick?.shapeDataKey &&
      shapePlayerBrick?.unifiedMusicKeysDataKey;

    if (!hasRequiredData) {
      return [] as ShapeVariantDataKeys[];
    }

    const locations = getOrderedShapeVariantDataKeys({
      shapeDataKey: shapePlayerBrick.shapeDataKey,
      unifiedMusicKeysDataKey: shapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: shapePlayerBrick.semitoneOffsetFromMajorRoot,
    });

    return locations as ShapeVariantDataKeys[];
  }, [shapePlayerBrick]);

  const selectedShapesVariantDataKeys = useMemo(() => {
    const startIdx = currentSliderRange[0];
    const endIdx = currentSliderRange[1] + 1;
    return orderedLocations.slice(startIdx, endIdx);
  }, [orderedLocations, currentSliderRange]);

  const setSliderRange = (newRange: [number, number]) => {
    if (shapePlayerBrick?.id) {
      updateBrickRange(shapePlayerBrick.id, newRange);
    }
  };

  const restoreData = () => {
    const canRestore = shapePlayerBrick?.baseChordDataKey;

    if (canRestore) {
      setBaseChordDataKey(shapePlayerBrick.baseChordDataKey);
      setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
      setSemitoneOffsetFromMajorRoot(
        shapePlayerBrick.semitoneOffsetFromMajorRoot,
      );
      setUnifiedMusicKeysDataKey(shapePlayerBrick.unifiedMusicKeysDataKey);
    }
  };

  return {
    sliderRange: currentSliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
  };
};
