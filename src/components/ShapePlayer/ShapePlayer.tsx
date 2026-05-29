import { DndContext, closestCenter } from "@dnd-kit/core";
import * as S from "./parts";
import { ShapePlayerList } from "./ShapePlayerList/ShapePlayerList";
import { useShapePlayerDrag } from "./hooks/useShapePlayerDrag";
import { ShapePlayerHeader } from "./ShapePlayerHeader/ShapePlayerHeader";
import { BricksMultiRangeSlider } from "./BricksMultiRangeSlider/BricksMultiRangeSlider";

export const ShapePlayer = () => {
  const { sensors, handleDragEnd } = useShapePlayerDrag();

  return (
    <S.ShapePlayerLayout>
      <div>
        <BricksMultiRangeSlider />
      </div>
      <S.ListContainer>
        <ShapePlayerHeader />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ShapePlayerList />
        </DndContext>
      </S.ListContainer>
    </S.ShapePlayerLayout>
  );
};
