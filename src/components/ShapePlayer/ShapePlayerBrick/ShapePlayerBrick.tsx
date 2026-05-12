import * as S from "./parts";
import { useShapePlayerBrick } from "./hooks/useShapePlayerBrick";
import { ShapeMulitStepSliderExplorer } from "@/components/ShapeMulitStepSliderExplorer/ShapeMulitStepSliderExplorer";

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
  if (!brick) return null;

  const {
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    shapeDataKey,
    semitoneOffsetFromMajorRoot,
  } = brick;

  const brickDetails = brick
    ? [
        `unifiedMusicKeysDataKey: ${unifiedMusicKeysDataKey}`,
        `baseChordDataKey: ${baseChordDataKey}`,
        `shapeDataKey: ${shapeDataKey}`,
        `semitoneOffsetFromMajorRoot: ${semitoneOffsetFromMajorRoot}`,
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
      <ShapeMulitStepSliderExplorer
        unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
        shapeDataKey={shapeDataKey}
        semitoneOffsetFromMajorRoot={semitoneOffsetFromMajorRoot}
      />
    </S.ShapePlayerBrickWrapper>
  );
};
