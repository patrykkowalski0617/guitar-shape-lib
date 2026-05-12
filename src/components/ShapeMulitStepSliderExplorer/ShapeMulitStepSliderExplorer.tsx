import { useState, useMemo, useEffect } from "react";
import { useDataKeyStore } from "@/store";
import type { ShapeDataKey, UnifiedMusicKeysDataKey } from "@/data";
import { MultiStepSlider } from "../ui/MultiStepSlider/MultiStepSlider";
import { getOrderedShapeVariantDataKeys } from "./helpers/getOrderedShapeVariantDataKeys";

interface ShapeMultiStepSliderExplorerProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  shapeDataKey: ShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
}

export const ShapeMulitStepSliderExplorer = ({
  unifiedMusicKeysDataKey,
  shapeDataKey,
  semitoneOffsetFromMajorRoot,
}: ShapeMultiStepSliderExplorerProps) => {
  const setSelectedShapeVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapeVariantDataKeys,
  );

  const orderedLocations = useMemo(
    () =>
      getOrderedShapeVariantDataKeys({
        shapeDataKey,
        unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot,
      }),
    [shapeDataKey, unifiedMusicKeysDataKey, semitoneOffsetFromMajorRoot],
  );

  const sliderKey = `${shapeDataKey}-${unifiedMusicKeysDataKey}-${semitoneOffsetFromMajorRoot}`;

  const [userRange, setUserRange] = useState<number[] | null>(null);

  const maxIdx = Math.max(0, orderedLocations.length - 1);

  const currentRange = useMemo(() => {
    return userRange ?? [0, 0];
  }, [userRange, maxIdx]);

  useEffect(() => {
    const selectedData = orderedLocations.slice(
      currentRange[0],
      currentRange[1] + 1,
    );
    setSelectedShapeVariantDataKeys(selectedData);
  }, [orderedLocations, currentRange, setSelectedShapeVariantDataKeys]);

  return (
    <MultiStepSlider
      key={sliderKey}
      value={currentRange}
      onValueChange={setUserRange}
      min={0}
      max={maxIdx}
    />
  );
};
