import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShapePlayerStore } from "@/store";

export const useShapePlayerBrick = (id: string) => {
  const removeShapePlayerBrick = useShapePlayerStore(
    (state) => state.removeShapePlayerBrick,
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const draggingStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = () => {
    removeShapePlayerBrick(id);
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    handleRemoveClick,
  };
};
