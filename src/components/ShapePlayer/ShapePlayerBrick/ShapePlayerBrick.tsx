import * as S from "./parts";
import { useShapePlayerBrick } from "./hooks/useShapePlayerBrick";

interface ShapePlayerBrickProps {
  id: string;
}

export const ShapePlayerBrick = ({ id }: ShapePlayerBrickProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    handleRemoveClick,
  } = useShapePlayerBrick(id);

  return (
    <S.ShapePlayerBrickWrapper ref={setNodeRef} style={draggingStyles}>
      <S.ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </S.ShapePlayerBrickDragHandle>
      <S.ShapePlayerBrickLabel>Brick: {id.slice(0, 8)}</S.ShapePlayerBrickLabel>
      <S.ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
        Usuń
      </S.ShapePlayerBrickDeleteButton>
    </S.ShapePlayerBrickWrapper>
  );
};
