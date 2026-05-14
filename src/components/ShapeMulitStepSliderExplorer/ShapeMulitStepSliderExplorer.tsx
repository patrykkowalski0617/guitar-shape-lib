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
  range: number[];
  onRangeChange: (range: number[]) => void;
  orderedLocations: ShapeVariantDataKeys[];
}

export const ShapeMulitStepSliderExplorer = ({
  shapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
  range,
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
      range[0],
      range[1] + 1,
    );
    setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
  }, [range, orderedLocations, setSelectedShapesVariantDataKeys]);

  return (
    <S.Wrapper>
      <MultiStepSlider
        key={sliderKey}
        value={range}
        onValueChange={onRangeChange}
        min={0}
        max={maxIdx}
      />
    </S.Wrapper>
  );
};
