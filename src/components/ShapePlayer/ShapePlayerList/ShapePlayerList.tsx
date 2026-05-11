import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";

export const ShapePlayerList = () => {
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );
  const brickIds = shapePlayerBricks.map((b) => b.id);

  return (
    <SortableContext items={brickIds} strategy={verticalListSortingStrategy}>
      <S.ShapePlayerBricksList>
        {shapePlayerBricks.map((brick) => (
          <ShapePlayerBrick key={brick.id} id={brick.id} />
        ))}
      </S.ShapePlayerBricksList>
    </SortableContext>
  );
};
