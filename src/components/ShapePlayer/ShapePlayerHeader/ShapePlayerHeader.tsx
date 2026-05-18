import { GlobalMultiRangeController } from "@/components/ShapeMulitStepSliderExplorer/GlobalMultiRangeController";
import {
  AddButton,
  ClearButton,
  MetronomeButton,
  UndoButton,
  Save,
  Open,
  TogglePlayback,
  BpmInput,
  BpmMultiplierButton,
} from "./headerElements";
import * as S from "./parts";
import { useMemo } from "react";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import { useShapePlayerStore } from "@/store";
import { ExerciseTitle } from "./headerElements/ExerciseTitle/ExerciseTitle";

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
      <S.ShapePlayerControllers>
        <Open />
        <Save />
        <ExerciseTitle />
        <AddButton />
        <ClearButton />
        <UndoButton />
        <TogglePlayback />
        <MetronomeButton />
        <BpmInput />
        <BpmMultiplierButton />
      </S.ShapePlayerControllers>
      <GlobalMultiRangeController configs={sliderConfigs} />
    </>
  );
};
