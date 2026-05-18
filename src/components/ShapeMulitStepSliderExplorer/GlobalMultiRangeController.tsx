import { useEffect, useMemo, useRef } from "react";
import { useMultiRangeStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import type {
  ShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface ExplorerConfig {
  id: string;
  shapeDataKey: ShapeDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  semitoneOffsetFromMajorRoot: number;
  orderedLocations: ShapeVariantDataKeys[];
}

export const GlobalMultiRangeController = ({
  configs = [],
}: {
  configs?: ExplorerConfig[];
}) => {
  const { ranges, initializeRanges, setRange } = useMultiRangeStore();
  const updateBrickRange = useShapePlayerStore(
    (state) => state.updateBrickRange,
  );
  const prevIdsRef = useRef<string>("");

  useEffect(() => {
    const currentIds = configs.map((c) => c.id).join(",");

    if (currentIds !== prevIdsRef.current) {
      const shapePlayerBricks =
        useShapePlayerStore.getState().shapePlayerBricks;
      const updatedInitialRanges: Record<
        string,
        { start: number; end: number }
      > = {};

      configs.forEach((c) => {
        const shapePlayerBrick = shapePlayerBricks.find((b) => b.id === c.id);
        updatedInitialRanges[c.id] = {
          start: shapePlayerBrick?.sliderRange?.[0] ?? 0,
          end: shapePlayerBrick?.sliderRange?.[1] ?? 0,
        };
      });

      prevIdsRef.current = currentIds;
      initializeRanges(updatedInitialRanges);
    }
  }, [configs, initializeRanges]);

  useEffect(() => {
    Object.entries(ranges).forEach(([id, range]) => {
      const shapePlayerBrick = useShapePlayerStore
        .getState()
        .shapePlayerBricks.find((b) => b.id === id);

      const hasChanged =
        shapePlayerBrick &&
        (shapePlayerBrick.sliderRange?.[0] !== range.start ||
          shapePlayerBrick.sliderRange?.[1] !== range.end);

      if (hasChanged) {
        updateBrickRange(id, [range.start, range.end]);
      }
    });
  }, [ranges, updateBrickRange]);

  useEffect(() => {
    const unsub = useShapePlayerStore.subscribe(
      (state) => state.shapePlayerBricks,
      (shapePlayerBricks) => {
        shapePlayerBricks.forEach((shapePlayerBrick) => {
          const currentMasterRange = ranges[shapePlayerBrick.id];
          const newStart = shapePlayerBrick.sliderRange?.[0] ?? 0;
          const newEnd = shapePlayerBrick.sliderRange?.[1] ?? 0;

          const isOutOfSync =
            currentMasterRange &&
            (currentMasterRange.start !== newStart ||
              currentMasterRange.end !== newEnd);

          if (isOutOfSync) {
            setRange(shapePlayerBrick.id, { start: newStart, end: newEnd });
          }
        });
      },
    );

    return () => unsub();
  }, [ranges, setRange]);

  const masterConfigs = useMemo(() => {
    return configs.reduce(
      (acc, c) => {
        acc[c.id] = c.orderedLocations;
        return acc;
      },
      {} as Record<string, unknown[]>,
    );
  }, [configs]);

  const masterValues = useMemo(() => {
    const lengths = configs.map((c) => c.orderedLocations.length);
    const maxPossibleLength = lengths.length > 0 ? Math.max(...lengths) : 0;
    return Array.from({ length: maxPossibleLength }, (_, i) => i);
  }, [configs]);

  if (configs.length === 0) return null;

  return (
    <MasterMultiRangeSlider
      masterValues={masterValues}
      ranges={ranges}
      configs={masterConfigs}
    />
  );
};
