import {
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useShapePlayerStore } from "@/store";

export const useShapePlayerDrag = () => {
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );
  const reorderShapePlayerBricks = useShapePlayerStore(
    (state) => state.reorderShapePlayerBricks,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const isTargetValid = over && active.id !== over.id;

    if (isTargetValid) {
      const brickIds = shapePlayerBricks.map(
        (shapePlayerBrick) => shapePlayerBrick.id,
      );
      const oldIndex = brickIds.indexOf(active.id as string);
      const newIndex = brickIds.indexOf(over.id as string);

      reorderShapePlayerBricks(oldIndex, newIndex);
    }
  };

  return { sensors, handleDragEnd };
};
