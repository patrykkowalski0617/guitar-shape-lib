import { DndContext, closestCenter } from "@dnd-kit/core";
import { ShapePlayerLayout } from "./parts";
import { ShapePlayerHeader } from "./ShapePlayerHeader/ShapePlayerHeader";
import { ShapePlayerList } from "./ShapePlayerList/ShapePlayerList";
import { useShapePlayerDrag } from "./hooks/useShapePlayerDrag";
import { usePlayingBricks } from "./hooks/usePlayingBricks";

export const ShapePlayer = () => {
  const { sensors, handleDragEnd } = useShapePlayerDrag();
  usePlayingBricks();

  return (
    <ShapePlayerLayout>
      <ShapePlayerHeader />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ShapePlayerList />
      </DndContext>
    </ShapePlayerLayout>
  );
};
