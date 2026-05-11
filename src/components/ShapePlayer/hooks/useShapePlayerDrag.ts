import {
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useShapePlayerStore } from "@/store";

export const useShapePlayerDrag = () => {
  const { shapePlayerBrickIds, reorderShapePlayerBricks } =
    useShapePlayerStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const isTargetValid = over && active.id !== over.id;

    if (isTargetValid) {
      const oldIndex = shapePlayerBrickIds.indexOf(active.id as string);
      const newIndex = shapePlayerBrickIds.indexOf(over.id as string);
      reorderShapePlayerBricks(oldIndex, newIndex);
    }
  };

  return { sensors, handleDragEnd };
};
