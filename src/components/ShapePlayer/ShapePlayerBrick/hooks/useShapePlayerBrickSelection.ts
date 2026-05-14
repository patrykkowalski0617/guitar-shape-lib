import { useMemo } from "react";
import { useDataKeyStore, useShapePlayerStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapeVariantDataKeys } from "@/data";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickSelection = (brick?: ShapePlayerBrick) => {
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
    return brick?.sliderRange ?? [0, 0];
  }, [brick?.sliderRange]);

  const orderedLocations = useMemo(() => {
    const hasRequiredData =
      brick?.shapeDataKey && brick?.unifiedMusicKeysDataKey;

    if (!hasRequiredData) {
      return [] as ShapeVariantDataKeys[];
    }

    const locations = getOrderedShapeVariantDataKeys({
      shapeDataKey: brick.shapeDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
    });

    return locations as ShapeVariantDataKeys[];
  }, [brick]);

  const selectedShapesVariantDataKeys = useMemo(() => {
    const startIdx = currentSliderRange[0];
    const endIdx = currentSliderRange[1] + 1;
    return orderedLocations.slice(startIdx, endIdx);
  }, [orderedLocations, currentSliderRange]);

  const setSliderRange = (newRange: [number, number]) => {
    if (brick?.id) {
      updateBrickRange(brick.id, newRange);
    }
  };

  const restoreData = () => {
    const canRestore = brick?.baseChordDataKey;

    if (canRestore) {
      setBaseChordDataKey(brick.baseChordDataKey);
      setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
      setSemitoneOffsetFromMajorRoot(brick.semitoneOffsetFromMajorRoot);
      setUnifiedMusicKeysDataKey(brick.unifiedMusicKeysDataKey);
    }
  };

  return {
    sliderRange: currentSliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
  };
};
