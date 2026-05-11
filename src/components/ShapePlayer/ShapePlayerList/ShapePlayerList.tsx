import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";

export const ShapePlayerList = () => {
  const shapePlayerBrickIds = useShapePlayerStore(
    (state) => state.shapePlayerBrickIds,
  );

  return (
    <SortableContext
      items={shapePlayerBrickIds}
      strategy={verticalListSortingStrategy}
    >
      <S.ShapePlayerBricksList>
        {shapePlayerBrickIds.map((id) => (
          <ShapePlayerBrick key={id} id={id} />
        ))}
      </S.ShapePlayerBricksList>
    </SortableContext>
  );
};
