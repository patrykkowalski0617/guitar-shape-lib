import * as S from "./parts";
import {
  useShapePlayerBrick,
  useShapePlayerBrickDisplay,
  useShapePlayerBrickSelection,
} from "./hooks";
import { ShapeMulitStepSliderExplorer } from "@/components/ShapeMulitStepSliderExplorer/ShapeMulitStepSliderExplorer";
import { Button } from "../ui/parts";

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

  const { keyName, chordName, shapeName } = useShapePlayerBrickDisplay(brick);
  const { range, setRange, orderedLocations, restoreData } =
    useShapePlayerBrickSelection(brick);

  if (!brick) return null;

  const brickDetails = [` ${brick.playLength}`, `id: ${id.slice(0, 8)}`];

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
    >
      <Button>{keyName}</Button>

      <Button>{chordName}</Button>

      <Button>{shapeName}</Button>

      <S.ShapePlayerBrickLabel style={{ whiteSpace: "pre-wrap" }}>
        {brickDetails}
      </S.ShapePlayerBrickLabel>

      <ShapeMulitStepSliderExplorer
        unifiedMusicKeysDataKey={brick.unifiedMusicKeysDataKey}
        baseChordDataKey={brick.baseChordDataKey}
        shapeDataKey={brick.shapeDataKey}
        semitoneOffsetFromMajorRoot={brick.semitoneOffsetFromMajorRoot}
        range={range}
        onRangeChange={setRange}
        orderedLocations={orderedLocations}
      />

      <S.ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
        Usuń
      </S.ShapePlayerBrickDeleteButton>

      <S.ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </S.ShapePlayerBrickDragHandle>
    </S.ShapePlayerBrickWrapper>
  );
};
