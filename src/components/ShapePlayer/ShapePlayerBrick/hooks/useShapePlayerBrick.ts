import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShapePlayerStore } from "@/store";
import { useRestoreBrick } from "./useRestoreBrick";

export const useShapePlayerBrick = (id: string) => {
  const brick = useShapePlayerStore((state) =>
    state.shapePlayerBricks.find((b) => b.id === id),
  );

  const removeShapePlayerBrick = useShapePlayerStore(
    (state) => state.removeShapePlayerBrick,
  );

  const { restoreBrickData } = useRestoreBrick();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const draggingStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = () => {
    removeShapePlayerBrick(id);
  };

  const handleRestoreClick = () => {
    if (brick) {
      restoreBrickData(brick);
    }
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    handleRemoveClick,
    handleRestoreClick,
    brick,
  };
};
