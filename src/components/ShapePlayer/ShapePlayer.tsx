import { DndContext, closestCenter } from "@dnd-kit/core";
import { ShapePlayerLayout } from "./parts";
import { ShapePlayerList } from "./ShapePlayerList/ShapePlayerList";
import { useShapePlayerDrag } from "./hooks/useShapePlayerDrag";

export const ShapePlayer = () => {
  const { sensors, handleDragEnd } = useShapePlayerDrag();

  return (
    <ShapePlayerLayout>
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
