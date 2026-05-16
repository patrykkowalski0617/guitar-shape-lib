import { useEffect } from "react";
import { useDataKeyStore } from "@/store";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
  ShapeVariantDataKeys,
} from "@/data";
import * as S from "./parts";
import MultiRangeSlider from "../ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import type { Range } from "../ui/MultiRangeSlider/MultiRangeSlider/useMultiRangeSlider";

interface ShapeMultiStepSliderExplorerProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  shapeDataKey: ShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
  sliderRange: [number, number];
  onRangeChange: (sliderRange: [number, number]) => void;
  orderedLocations: ShapeVariantDataKeys[];
}

export const ShapeMulitStepSliderExplorer = ({
  shapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
  sliderRange,
  onRangeChange,
  orderedLocations,
}: ShapeMultiStepSliderExplorerProps) => {
  const setSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapesVariantDataKeys,
  );

  const sliderKey = `${shapeDataKey}-${unifiedMusicKeysDataKey}-${semitoneOffsetFromMajorRoot}`;

  useEffect(() => {
    const selectedShapesVariantDataKeys = orderedLocations.slice(
      sliderRange[0],
      sliderRange[1] + 1,
    );
    setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
  }, [sliderRange, orderedLocations, setSelectedShapesVariantDataKeys]);

  const currentRange: Range = {
    start: sliderRange[0],
    end: sliderRange[1],
  };

  const handleSliderChange = (nextRange: Range) => {
    onRangeChange([nextRange.start, nextRange.end]);
  };

  return (
    <S.Wrapper>
      <MultiRangeSlider
        key={sliderKey}
        values={orderedLocations}
        range={currentRange}
        onChange={handleSliderChange}
      />
    </S.Wrapper>
  );
};
