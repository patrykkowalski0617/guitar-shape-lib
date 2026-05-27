import { useDataKeyStore } from "@/store";
import type {
  GuitarShapeDataKey,
  UnifiedMusicKeysDataKey,
  ShapeVariantDataKeys,
} from "@/data";
import * as S from "./parts";
import MultiRangeSlider from "../ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import type { Range } from "../ui/MultiRangeSlider/MultiRangeSlider/useMultiRangeSlider";

interface ShapeExplorerProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  guitarShapeDataKey: GuitarShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
  sliderRange: [number, number];
  onRangeChange: (sliderRange: [number, number]) => void;
  orderedLocations: ShapeVariantDataKeys[];
}

export const ShapeExplorer = ({
  guitarShapeDataKey,
  unifiedMusicKeysDataKey,
  semitoneOffsetFromMajorRoot,
  sliderRange,
  onRangeChange,
  orderedLocations,
}: ShapeExplorerProps) => {
  const setSelectedShapesVariantDataKeys = useDataKeyStore(
    (s) => s.setSelectedShapesVariantDataKeys,
  );

  const sliderKey = `${guitarShapeDataKey}-${unifiedMusicKeysDataKey}-${semitoneOffsetFromMajorRoot}`;

  const currentRange: Range = {
    start: sliderRange[0],
    end: sliderRange[1],
  };

  const handleSliderChange = (nextRange: Range) => {
    onRangeChange([nextRange.start, nextRange.end]);

    const selectedShapesVariantDataKeys = orderedLocations.slice(
      nextRange.start,
      nextRange.end + 1,
    );
    setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
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
