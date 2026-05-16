import { useEffect, useMemo, useRef } from "react";
import { useMultiRangeStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import type { ShapeVariantDataKeys } from "@/data";

interface ExplorerConfig {
  id: string;
  shapeDataKey: any;
  unifiedMusicKeysDataKey: any;
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

  /**
   * 1. INICJALIZACJA I SYNCHRONIZACJA LISTY
   * Kiedy zmienia się liczba cegiełek lub ich kolejność, aktualizujemy MultiRangeStore
   */
  useEffect(() => {
    const currentIds = configs.map((c) => c.id).join(",");

    if (currentIds !== prevIdsRef.current) {
      const bricks = useShapePlayerStore.getState().shapePlayerBricks;
      const updatedInitialRanges: Record<
        string,
        { start: number; end: number }
      > = {};

      configs.forEach((c) => {
        const brick = bricks.find((b) => b.id === c.id);
        updatedInitialRanges[c.id] = {
          start: brick?.sliderRange?.[0] ?? 0,
          end: brick?.sliderRange?.[1] ?? 0,
        };
      });

      prevIdsRef.current = currentIds;
      initializeRanges(updatedInitialRanges);
    }
  }, [configs, initializeRanges]);

  /**
   * 2. SYNCHRONIZACJA: MASTER -> CEGIEŁKI
   * Kiedy Master zmienia ranges (ruch Masterem), wypychamy dane do ShapePlayerStore
   */
  useEffect(() => {
    Object.entries(ranges).forEach(([id, range]) => {
      const brick = useShapePlayerStore
        .getState()
        .shapePlayerBricks.find((b) => b.id === id);

      const hasChanged =
        brick &&
        (brick.sliderRange?.[0] !== range.start ||
          brick.sliderRange?.[1] !== range.end);

      if (hasChanged) {
        updateBrickRange(id, [range.start, range.end]);
      }
    });
  }, [ranges, updateBrickRange]);

  /**
   * 3. SYNCHRONIZACJA: CEGIEŁKI -> MASTER
   * Kiedy suwak w cegiełce zostanie przesunięty ręcznie, aktualizujemy Mastera
   */
  useEffect(() => {
    const unsub = useShapePlayerStore.subscribe(
      (state) => state.shapePlayerBricks,
      (bricks) => {
        bricks.forEach((brick) => {
          const currentMasterRange = ranges[brick.id];
          const newStart = brick.sliderRange?.[0] ?? 0;
          const newEnd = brick.sliderRange?.[1] ?? 0;

          const isOutOfSync =
            currentMasterRange &&
            (currentMasterRange.start !== newStart ||
              currentMasterRange.end !== newEnd);

          if (isOutOfSync) {
            setRange(brick.id, { start: newStart, end: newEnd });
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
      {} as Record<string, any[]>,
    );
  }, [configs]);

  const masterValues = useMemo(() => {
    const lengths = configs.map((c) => c.orderedLocations.length);
    const maxPossibleLength = lengths.length > 0 ? Math.max(...lengths) : 0;
    return Array.from({ length: maxPossibleLength }, (_, i) => i);
  }, [configs]);

  if (configs.length === 0) return null;

  return (
    <div
      style={{
        padding: "16px",
        background: "rgba(0, 0, 0, 0.03)",
        borderRadius: "12px",
        marginBottom: "24px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "12px",
          opacity: 0.6,
        }}
      >
        Global Multi-Range Master
      </div>
      <MasterMultiRangeSlider
        masterValues={masterValues}
        ranges={ranges}
        configs={masterConfigs}
        onRangesChange={() => {}}
      />
    </div>
  );
};
