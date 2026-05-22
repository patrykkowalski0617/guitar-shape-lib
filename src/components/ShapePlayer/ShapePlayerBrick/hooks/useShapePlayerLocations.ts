import { useMemo } from "react";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapeVariantDataKeys } from "@/data";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerLocations = (
  guitarShapePlayerBrick?: ShapePlayerBrick,
) => {
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

    return getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot:
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
    }) as ShapeVariantDataKeys[];
  }, [guitarShapePlayerBrick]);

  const selectedShapesVariantDataKeys = useMemo(() => {
    const startIdx = currentSliderRange[0];
    const endIdx = currentSliderRange[1] + 1;
    return orderedLocations.slice(startIdx, endIdx);
  }, [orderedLocations, currentSliderRange]);

  return {
    sliderRange: currentSliderRange,
    orderedLocations,
    selectedShapesVariantDataKeys,
  };
};
