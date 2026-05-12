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
    handleRestoreClick,
    brick,
  } = useShapePlayerBrick(id);

  const brickDetails = brick
    ? [
        `unifiedMusicKeysDataKey: ${brick.unifiedMusicKeysDataKey}`,
        `baseChordDataKey: ${brick.baseChordDataKey}`,
        `shapeDataKey: ${brick.shapeDataKey}`,
        `semitoneOffsetFromMajorRoot: ${brick.semitoneOffsetFromMajorRoot}`,
        `brick id: ${id.slice(0, 8)}`,
      ]
    : [];

  const brickLabel = brickDetails.join("\n");

  return (
    <S.ShapePlayerBrickWrapper ref={setNodeRef} style={draggingStyles}>
      <S.ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </S.ShapePlayerBrickDragHandle>

      <S.ShapePlayerBrickLabel style={{ whiteSpace: "pre-wrap" }}>
        {brickLabel}
      </S.ShapePlayerBrickLabel>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleRestoreClick}>Przywróć</button>
        <S.ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
          Usuń
        </S.ShapePlayerBrickDeleteButton>
      </div>
    </S.ShapePlayerBrickWrapper>
  );
};
