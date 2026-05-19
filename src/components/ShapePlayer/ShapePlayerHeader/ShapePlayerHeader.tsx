import { GlobalMultiRangeController } from "@/components/ShapeExplorer/GlobalMultiRangeController";
import {
  Add,
  Clear,
  Metronome,
  Undo,
  Save,
  Open,
  TogglePlayback,
  BpmInput,
  BpmMultiplier,
  LookAhead,
} from "./headerElements";
import * as S from "./parts";
import { useMemo } from "react";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
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
        <Add />
        <Clear />
        <Undo />
        <TogglePlayback />
        <Metronome />
        <BpmInput />
        <BpmMultiplier />
        <LookAhead />
      </S.ShapePlayerControllers>
      <GlobalMultiRangeController configs={sliderConfigs} />
    </>
  );
};
