import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";
import { usePlayingBricksEngine } from "./hooks/usePlayingBricks";

export const ShapePlayerList = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const brickIds = guitarShapePlayerBricks.map((b) => b.id);

  usePlayingBricksEngine();

  return (
    <>
      <SortableContext items={brickIds} strategy={verticalListSortingStrategy}>
        <S.ShapePlayerBricksList>
          {guitarShapePlayerBricks.map((guitarShapePlayerBrick) => (
            <ShapePlayerBrick
              key={guitarShapePlayerBrick.id}
              id={guitarShapePlayerBrick.id}
            />
          ))}
        </S.ShapePlayerBricksList>
      </SortableContext>
    </>
  );
};
