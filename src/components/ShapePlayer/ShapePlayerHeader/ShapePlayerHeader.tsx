import { GlobalMultiRangeController } from "@/components/ShapeMulitStepSliderExplorer/GlobalMultiRangeController";
import {
  AddButton,
  ClearButton,
  MetronomeButton,
  UndoButton,
  Save,
  Open,
} from "./buttons";
import * as S from "./parts";
import { useMemo } from "react";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import { useShapePlayerStore } from "@/store";

export const ShapePlayerHeader = () => {
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );
  const sliderConfigs = useMemo(() => {
    return shapePlayerBricks.map((brick) => ({
      id: brick.id,
      shapeDataKey: brick.shapeDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
      orderedLocations: getOrderedShapeVariantDataKeys({
        shapeDataKey: brick.shapeDataKey,
        unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
      }),
    }));
  }, [shapePlayerBricks]);

  return (
    <>
      <S.ShapePlayerControls>
        <AddButton />
        <ClearButton />
        <UndoButton />
        <MetronomeButton />
        <Save />
        <Open />
      </S.ShapePlayerControls>
      <GlobalMultiRangeController configs={sliderConfigs} />
    </>
  );
};
