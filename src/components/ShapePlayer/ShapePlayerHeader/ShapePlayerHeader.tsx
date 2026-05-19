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
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const sliderConfigs = useMemo(() => {
    return guitarShapePlayerBricks.map((guitarShapePlayerBrick) => ({
      id: guitarShapePlayerBrick.id,
      guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot:
        guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      orderedLocations: getOrderedShapeVariantDataKeys({
        guitarShapeDataKey: guitarShapePlayerBrick.guitarShapeDataKey,
        unifiedMusicKeysDataKey: guitarShapePlayerBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot:
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
      }),
    }));
  }, [guitarShapePlayerBricks]);

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
