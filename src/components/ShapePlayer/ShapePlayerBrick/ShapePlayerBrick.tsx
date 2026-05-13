import * as S from "./parts";
import { useShapePlayerBrick } from "./hooks/useShapePlayerBrick";
import { ShapeMulitStepSliderExplorer } from "@/components/ShapeMulitStepSliderExplorer/ShapeMulitStepSliderExplorer";
import { Button } from "../ui/parts";
import { useBaseChord, useShape, useUnifiedMusicKey } from "@/hooks";

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
    brick,
  } = useShapePlayerBrick(id);

  const unifiedMusicKey = useUnifiedMusicKey({
    unifiedMusicKeysDataKey: brick?.unifiedMusicKeysDataKey,
  });
  const { getBaseChordName } = useBaseChord({
    baseChordDataKey: brick?.baseChordDataKey,
  });
  const { getShapeName } = useShape({
    shapeDataKey: brick?.shapeDataKey,
  });

  if (!brick) return null;

  const {
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    shapeDataKey,
    semitoneOffsetFromMajorRoot,
    playLength,
  } = brick;

  const brickDetails = [` ${playLength}`, `id: ${id.slice(0, 8)}`];

  return (
    <S.ShapePlayerBrickWrapper ref={setNodeRef} style={draggingStyles}>
      <S.ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </S.ShapePlayerBrickDragHandle>

      <Button>
        {unifiedMusicKey?.majorName} / {unifiedMusicKey?.relativeMinorName}
      </Button>

      <Button>
        {getBaseChordName({
          unifiedMusicKeysDataKey,
        })}
      </Button>

      <Button>
        {getShapeName({ semitoneOffsetFromMajorRoot, unifiedMusicKeysDataKey })}
      </Button>

      <S.ShapePlayerBrickLabel style={{ whiteSpace: "pre-wrap" }}>
        {brickDetails}
      </S.ShapePlayerBrickLabel>

      <S.ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
        Usuń
      </S.ShapePlayerBrickDeleteButton>

      <ShapeMulitStepSliderExplorer
        unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
        baseChordDataKey={baseChordDataKey}
        shapeDataKey={shapeDataKey}
        semitoneOffsetFromMajorRoot={semitoneOffsetFromMajorRoot}
      />
    </S.ShapePlayerBrickWrapper>
  );
};
