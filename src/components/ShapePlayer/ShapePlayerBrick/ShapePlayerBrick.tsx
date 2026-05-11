import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShapePlayerStore } from "@/store";
import {
  ShapePlayerBrickWrapper,
  ShapePlayerBrickDragHandle,
  ShapePlayerBrickLabel,
  ShapePlayerBrickDeleteButton,
} from "./parts";

interface ShapePlayerBrickProps {
  id: string;
}

export const ShapePlayerBrick = ({ id }: ShapePlayerBrickProps) => {
  const removeShapePlayerBrick = useShapePlayerStore(
    (state) => state.removeShapePlayerBrick,
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const draggingStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative" as const,
  };

  const handleRemoveClick = () => {
    removeShapePlayerBrick(id);
  };

  return (
    <ShapePlayerBrickWrapper ref={setNodeRef} style={draggingStyles}>
      <ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </ShapePlayerBrickDragHandle>
      <ShapePlayerBrickLabel>Brick: {id.slice(0, 8)}</ShapePlayerBrickLabel>
      <ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
        Usuń
      </ShapePlayerBrickDeleteButton>
    </ShapePlayerBrickWrapper>
  );
};
