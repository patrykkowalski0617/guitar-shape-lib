import { useEffect, useMemo, useRef } from "react";
import { useMultiRangeStore, useShapePlayerStore } from "@/store";
import MasterMultiRangeSlider from "../ui/MultiRangeSlider/MasterMultiRangeSlider/MasterMultiRangeSlider";
import { ShapeMulitStepSliderExplorer } from "./ShapeMulitStepSliderExplorer";
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
  const prevIdsRef = useRef<string>("");
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );

  console.log(shapePlayerBricks);

  const masterConfigs = useMemo(() => {
    return configs.reduce(
      (acc, c) => {
        acc[c.id] = c.orderedLocations;
        return acc;
      },
      {} as Record<string, any[]>,
    );
  }, [configs]);

  useEffect(() => {
    const currentIds = configs.map((c) => c.id).join(",");

    if (currentIds !== prevIdsRef.current) {
      const updatedInitialRanges: Record<string, any> = {};

      configs.forEach((c) => {
        updatedInitialRanges[c.id] = ranges[c.id] ?? {
          start: 0,
          end: Math.min(2, c.orderedLocations.length - 1),
        };
      });

      prevIdsRef.current = currentIds;
      initializeRanges(updatedInitialRanges);
    }
  }, [configs, initializeRanges]);

  const masterValues = useMemo(() => {
    const lengths = configs.map((c) => c.orderedLocations.length);
    const maxPossibleLength = lengths.length > 0 ? Math.max(...lengths) : 0;
    return Array.from({ length: maxPossibleLength }, (_, i) => i);
  }, [configs]);

  // Sekcja diagnostyczna renderowana zawsze, gdy komponent zostanie wywołany
  const debugInfo = {
    configsLength: configs.length,
    configIds: configs.map((c) => c.id),
    storeRangesKeys: Object.keys(ranges),
    masterValuesCount: masterValues.length,
  };

  return (
    <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
      <details open>
        <summary>
          <strong>MultiRange Diagnostic (Debug)</strong>
        </summary>
        <pre
          style={{ fontSize: "10px", background: "#f4f4f4", padding: "5px" }}
        >
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>

      {configs.length === 0 ? (
        <p style={{ color: "orange" }}>
          Brak konfiguracji (configs.length === 0)
        </p>
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <h4>Master Control</h4>
            <MasterMultiRangeSlider
              masterValues={masterValues}
              ranges={ranges}
              configs={masterConfigs}
              onRangesChange={() => {}}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {configs.map((config) => (
              <ShapeMulitStepSliderExplorer
                key={config.id}
                {...config}
                sliderRange={[
                  ranges[config.id]?.start ?? 0,
                  ranges[config.id]?.end ?? 0,
                ]}
                onRangeChange={(arr) =>
                  setRange(config.id, { start: arr[0], end: arr[1] })
                }
                baseChordDataKey={{} as any}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
