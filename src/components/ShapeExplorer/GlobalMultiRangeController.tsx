import { useEffect, useMemo, useRef } from "react";
import { useShapeExplorerStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import type {
  GuitarShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface ExplorerConfig {
  id: string;
  guitarShapeDataKey: GuitarShapeDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  semitoneOffsetFromMajorRoot: number;
  orderedLocations: ShapeVariantDataKeys[];
}

export const GlobalMultiRangeController = ({
  configs = [],
}: {
  configs?: ExplorerConfig[];
}) => {
  const { ranges, initializeRanges, setRange } = useShapeExplorerStore();
  const updateBrickRange = useShapePlayerStore(
    (state) => state.updateBrickRange,
  );
  const prevIdsRef = useRef<string>("");

  useEffect(() => {
    const currentIds = configs.map((c) => c.id).join(",");

    if (currentIds !== prevIdsRef.current) {
      const guitarShapePlayerBricks =
        useShapePlayerStore.getState().guitarShapePlayerBricks;
      const updatedInitialRanges: Record<
        string,
        { start: number; end: number }
      > = {};

      configs.forEach((c) => {
        const guitarShapePlayerBrick = guitarShapePlayerBricks.find(
          (b) => b.id === c.id,
        );
        updatedInitialRanges[c.id] = {
          start: guitarShapePlayerBrick?.sliderRange?.[0] ?? 0,
          end: guitarShapePlayerBrick?.sliderRange?.[1] ?? 0,
        };
      });

      prevIdsRef.current = currentIds;
      initializeRanges(updatedInitialRanges);
    }
  }, [configs, initializeRanges]);

  useEffect(() => {
    Object.entries(ranges).forEach(([id, range]) => {
      const guitarShapePlayerBrick = useShapePlayerStore
        .getState()
        .guitarShapePlayerBricks.find((b) => b.id === id);

      const hasChanged =
        guitarShapePlayerBrick &&
        (guitarShapePlayerBrick.sliderRange?.[0] !== range.start ||
          guitarShapePlayerBrick.sliderRange?.[1] !== range.end);

      if (hasChanged) {
        updateBrickRange(id, [range.start, range.end]);
      }
    });
  }, [ranges, updateBrickRange]);

  useEffect(() => {
    const unsub = useShapePlayerStore.subscribe(
      (state) => state.guitarShapePlayerBricks,
      (guitarShapePlayerBricks) => {
        guitarShapePlayerBricks.forEach((guitarShapePlayerBrick) => {
          const currentMasterRange = ranges[guitarShapePlayerBrick.id];
          const newStart = guitarShapePlayerBrick.sliderRange?.[0] ?? 0;
          const newEnd = guitarShapePlayerBrick.sliderRange?.[1] ?? 0;

          const isOutOfSync =
            currentMasterRange &&
            (currentMasterRange.start !== newStart ||
              currentMasterRange.end !== newEnd);

          if (isOutOfSync) {
            setRange(guitarShapePlayerBrick.id, {
              start: newStart,
              end: newEnd,
            });
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
