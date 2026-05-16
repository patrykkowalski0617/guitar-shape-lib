import { useMemo } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";
import { usePlayingBricksEngine } from "./hooks/usePlayingBricks";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import { GlobalMultiRangeController } from "@/components/ShapeMulitStepSliderExplorer/GlobalMultiRangeController";

export const ShapePlayerList = () => {
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );
  const brickIds = shapePlayerBricks.map((b) => b.id);

  usePlayingBricksEngine();

  // Przygotowanie konfiguracji dla Mastera
  const sliderConfigs = useMemo(() => {
    return shapePlayerBricks.map((brick) => ({
      id: brick.id,
      shapeDataKey: brick.shapeDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
      // Wyliczamy lokacje, żeby Master wiedział, jak szeroki jest dany slider
      orderedLocations: getOrderedShapeVariantDataKeys({
        shapeDataKey: brick.shapeDataKey,
        unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
      }),
    }));
  }, [shapePlayerBricks]);

  return (
    <>
      {/* Dodajemy kontroler nad listą */}
      <GlobalMultiRangeController configs={sliderConfigs} />

      <SortableContext items={brickIds} strategy={verticalListSortingStrategy}>
        <S.ShapePlayerBricksList>
          {shapePlayerBricks.map((brick) => (
            <ShapePlayerBrick key={brick.id} id={brick.id} />
          ))}
        </S.ShapePlayerBricksList>
      </SortableContext>
    </>
  );
};
