import { useState, useMemo, useEffect, useCallback } from "react";
import { useDataKeyStore } from "@/store";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";
import { MultiStepSlider } from "../ui/MultiStepSlider/MultiStepSlider";
import { getOrderedShapeVariantDataKeys } from "./helpers/getOrderedShapeVariantDataKeys";
import * as S from "./parts";

interface ShapeMultiStepSliderExplorerProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  shapeDataKey: ShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
}

export const ShapeMulitStepSliderExplorer = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  shapeDataKey,
  semitoneOffsetFromMajorRoot,
}: ShapeMultiStepSliderExplorerProps) => {
  const setSelectedShapeVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapeVariantDataKeys,
  );
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
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
  }, [userRange]);

  const selectedData = useMemo(() => {
    return orderedLocations.slice(currentRange[0], currentRange[1] + 1);
  }, [orderedLocations, currentRange]);

  useEffect(() => {
    setSelectedShapeVariantDataKeys(selectedData);
    setBaseChordDataKey(baseChordDataKey);
  }, [
    selectedData,
    baseChordDataKey,
    setSelectedShapeVariantDataKeys,
    setBaseChordDataKey,
  ]);

  const restoreData = useCallback(() => {
    setBaseChordDataKey(baseChordDataKey);
    setSelectedShapeVariantDataKeys(selectedData);
  }, [
    baseChordDataKey,
    selectedData,
    setBaseChordDataKey,
    setSelectedShapeVariantDataKeys,
  ]);

  return (
    <S.Wrapper onMouseDown={restoreData}>
      <MultiStepSlider
        key={sliderKey}
        value={currentRange}
        onValueChange={setUserRange}
        min={0}
        max={maxIdx}
      />
    </S.Wrapper>
  );
};
