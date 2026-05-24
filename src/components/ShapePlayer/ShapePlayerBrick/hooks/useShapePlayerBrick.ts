import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShapePlayerStore } from "@/store";

export const useShapePlayerBrick = (id: string) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const draggingStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    guitarShapePlayerBrick,
  };
};
