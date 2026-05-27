import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";
import { usePlayingBricksEngine } from "./hooks/usePlayingBricksEngine";
import { BricksMultiRangeSlider } from "../BricksMultiRangeSlider/BricksMultiRangeSlider";

export const ShapePlayerList = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const brickIds = guitarShapePlayerBricks.map((b) => b.id);
  const playbackRange = useShapePlayerStore((s) => s.playbackRange);

  usePlayingBricksEngine();

  return (
    <S.ShapePlayerListWrapper>
      <S.BricksMultiRangeSliderWraprer>
        <BricksMultiRangeSlider />
      </S.BricksMultiRangeSliderWraprer>
      <SortableContext items={brickIds} strategy={verticalListSortingStrategy}>
        <S.ShapePlayerBricksList>
          {guitarShapePlayerBricks.map((guitarShapePlayerBrick, index) => {
            const isWithinRange = playbackRange
              ? index >= playbackRange.start && index <= playbackRange.end
              : true;
            return (
              <ShapePlayerBrick
                key={guitarShapePlayerBrick.id}
                id={guitarShapePlayerBrick.id}
                isWithinRange={isWithinRange}
              />
            );
          })}
        </S.ShapePlayerBricksList>
      </SortableContext>
    </S.ShapePlayerListWrapper>
  );
};
