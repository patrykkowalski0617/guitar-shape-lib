import { useEffect } from "react";
import { useDataKeyStore } from "@/store";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
  ShapeVariantDataKeys,
} from "@/data";
import { MultiStepSlider } from "../ui/MultiStepSlider/MultiStepSlider";
import * as S from "./parts";

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
  const maxIdx = Math.max(0, orderedLocations.length - 1);

  useEffect(() => {
    const selectedShapesVariantDataKeys = orderedLocations.slice(
      sliderRange[0],
      sliderRange[1] + 1,
    );
    setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
  }, [sliderRange, orderedLocations, setSelectedShapesVariantDataKeys]);

  return (
    <S.Wrapper>
      <MultiStepSlider
        key={sliderKey}
        value={sliderRange}
        onValueChange={onRangeChange}
        min={0}
        max={maxIdx}
      />
    </S.Wrapper>
  );
};
