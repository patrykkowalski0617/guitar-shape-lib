import { useEffect, useMemo, useRef } from "react";
import { useShapeExplorerStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import { getOrderedShapeVariantDataKeys } from "./helpers/getOrderedShapeVariantDataKeys";

export const GlobalMultiRangeController = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );

  const sliderConfigs = useMemo(() => {
    return guitarShapePlayerBricks.map((guitarShapePlayerBrick) => ({
      id: guitarShapePlayerBrick.id,
      guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot:
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      orderedLocations: getOrderedShapeVariantDataKeys({
        guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
        unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot:
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      }),
    }));
  }, [guitarShapePlayerBricks]);

  const { ranges, initializeRanges, setRange } = useShapeExplorerStore();
  const updateBrick = useShapePlayerStore((state) => state.updateBrick);

  const prevIdsRef = useRef<string>("");

  useEffect(() => {
    const currentIds = sliderConfigs.map((c) => c.id).join(",");
    if (currentIds !== prevIdsRef.current) {
      const guitarShapePlayerBricks =
        useShapePlayerStore.getState().guitarShapePlayerBricks;
      const updatedInitialRanges: Record<
        string,
        { start: number; end: number }
      > = {};
      sliderConfigs.forEach((c) => {
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
  }, [sliderConfigs, initializeRanges]);

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
        updateBrick(id, { sliderRange: [range.start, range.end] });
      }
    });
  }, [ranges, updateBrick]);

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
    return sliderConfigs.reduce(
      (acc, c) => {
        acc[c.id] = c.orderedLocations;
        return acc;
      },
      {} as Record<string, unknown[]>,
    );
  }, [sliderConfigs]);

  const masterValues = useMemo(() => {
    const lengths = sliderConfigs.map((c) => c.orderedLocations.length);
    const maxPossibleLength = lengths.length > 0 ? Math.max(...lengths) : 0;
    return Array.from({ length: maxPossibleLength }, (_, i) => i);
  }, [sliderConfigs]);

  if (sliderConfigs.length === 0) return null;

  return (
    <MasterMultiRangeSlider
      masterValues={masterValues}
      ranges={ranges}
      configs={masterConfigs}
    />
  );
};
