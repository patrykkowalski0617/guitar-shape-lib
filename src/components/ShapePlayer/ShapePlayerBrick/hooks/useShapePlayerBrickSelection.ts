import { useMemo } from "react";
import { useDataKeyStore, useShapePlayerStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import type { ShapeVariantDataKeys } from "@/data";
import type { ShapePlayerBrick } from "@/store";

export const useShapePlayerBrickSelection = (brick?: ShapePlayerBrick) => {
  const setSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapesVariantDataKeys,
  );

  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );

  const updateBrickRange = useShapePlayerStore(
    (state) => state.updateBrickRange,
  );

  const currentRange = useMemo(() => {
    return brick?.range ?? [0, 0];
  }, [brick?.range]);

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

  const selectedKeys = useMemo(() => {
    const startIdx = currentRange[0];
    const endIdx = currentRange[1] + 1;
    return orderedLocations.slice(startIdx, endIdx);
  }, [orderedLocations, currentRange]);

  const setRange = (newRange: [number, number]) => {
    if (brick?.id) {
      updateBrickRange(brick.id, newRange);
    }
  };

  const restoreData = () => {
    const canRestore = brick?.baseChordDataKey;

    if (canRestore) {
      setBaseChordDataKey(brick.baseChordDataKey);
      setSelectedShapesVariantDataKeys(selectedKeys);
    }
  };

  return {
    range: currentRange,
    setRange,
    orderedLocations,
    restoreData,
  };
};
