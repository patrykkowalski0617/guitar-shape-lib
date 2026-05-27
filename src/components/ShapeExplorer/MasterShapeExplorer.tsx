import { useEffect, useMemo, useRef } from "react";
import { useMasterShapeExplorerStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import { getOrderedShapeVariantDataKeys } from "./helpers/getOrderedShapeVariantDataKeys";
import { useRestoreBrick } from "@/hooks";

export const MasterShapeExplorer = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
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

  const { ranges, initializeRanges, setRange } = useMasterShapeExplorerStore();
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);
  const { restore } = useRestoreBrick();

  const prevIdsRef = useRef<string>("");

  useEffect(() => {
    const currentIds = sliderConfigs.map((c) => c.id).join(",");
    const hasIdsChanged = currentIds !== prevIdsRef.current;

    if (hasIdsChanged) {
      const currentBricks =
        useShapePlayerStore.getState().guitarShapePlayerBricks;
      const updatedInitialRanges: Record<
        string,
        { start: number; end: number }
      > = {};

      sliderConfigs.forEach((config) => {
        const matchingBrick = currentBricks.find(
          (brick) => brick.id === config.id,
        );
        const initialStart = matchingBrick?.sliderRange?.[0] ?? 0;
        const initialEnd = matchingBrick?.sliderRange?.[1] ?? 0;

        updatedInitialRanges[config.id] = {
          start: initialStart,
          end: initialEnd,
        };
      });

      prevIdsRef.current = currentIds;
      initializeRanges(updatedInitialRanges);
    }
  }, [sliderConfigs, initializeRanges]);

  useEffect(() => {
    Object.entries(ranges).forEach(([id, range]) => {
      const currentBricks =
        useShapePlayerStore.getState().guitarShapePlayerBricks;
      const targetBrick = currentBricks.find((brick) => brick.id === id);

      if (!targetBrick) return;

      const isStartChanged = targetBrick.sliderRange?.[0] !== range.start;
      const isEndChanged = targetBrick.sliderRange?.[1] !== range.end;
      const hasRangeChanged = isStartChanged || isEndChanged;

      if (hasRangeChanged) {
        const newSliderRange: [number, number] = [range.start, range.end];
        updateBrick(id, { sliderRange: newSliderRange });

        const activeBrickId = useShapePlayerStore.getState().activeBrickId;
        const isModifyingActiveBrick = id === activeBrickId;

        if (isModifyingActiveBrick) {
          const updatedBrick = {
            ...targetBrick,
            sliderRange: newSliderRange,
          };
          restore(updatedBrick);
        }
      }
    });
  }, [ranges, updateBrick, restore]);

  useEffect(() => {
    const unsub = useShapePlayerStore.subscribe(
      (s) => s.guitarShapePlayerBricks,
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
    const hasLength = lengths.length > 0;
    const maxPossibleLength = hasLength ? Math.max(...lengths) : 0;
    const createValueArray = (_: unknown, i: number) => i;

    return Array.from({ length: maxPossibleLength }, createValueArray);
  }, [sliderConfigs]);

  const hasNoConfigs = sliderConfigs.length === 0;
  if (hasNoConfigs) return null;

  return (
    <MasterMultiRangeSlider
      masterValues={masterValues}
      ranges={ranges}
      configs={masterConfigs}
    />
  );
};
