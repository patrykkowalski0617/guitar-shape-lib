import type { ShapeDataKey, UnifiedMusicKeysDataKey } from "@/data";
import { getOrderedShapeVariantDataKeys } from "./helpers/getOrderedShapeVariantDataKeys";
import { MultiStepSlider } from "../ui/MultiStepSlider/MultiStepSlider";
import { useState } from "react";

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
  const orderedLocations = getOrderedShapeVariantDataKeys({
    shapeDataKey,
    unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot,
  });
  const [range, setRange] = useState([0, 0]);
  return (
    <MultiStepSlider
      value={range}
      onValueChange={(newRange) => {
        setRange(newRange);
        const selectedData = orderedLocations.slice(
          newRange[0],
          newRange[1] + 1,
        );
        console.log("Wybrane obiekty:", selectedData);
      }}
      min={0}
      max={orderedLocations.length - 1}
    />
  );
};
