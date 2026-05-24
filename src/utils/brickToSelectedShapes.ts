import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapePlayerBrick } from "@/store";
import type { ShapeVariantDataKeys } from "@/data";

export const brickToSelectedShapes = (
  brick: ShapePlayerBrick,
): ShapeVariantDataKeys[] => {
  const orderedLocations = getOrderedShapeVariantDataKeys({
    guitarShapeDataKey: brick.guitarShapeDataKey,
    unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
  });

  const [startIdx, endIdx] = brick.sliderRange ?? [0, 0];
  return orderedLocations.slice(startIdx, endIdx + 1);
};
