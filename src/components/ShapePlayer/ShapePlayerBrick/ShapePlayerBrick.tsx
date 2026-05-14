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
  const { sliderRange, setSliderRange, orderedLocations, restoreData } =
    useShapePlayerBrickSelection(brick);

  if (!brick) return null;

  const playLength = brick.playLength;

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

      <Button>{playLength}</Button>

      <ShapeMulitStepSliderExplorer
        unifiedMusicKeysDataKey={brick.unifiedMusicKeysDataKey}
        baseChordDataKey={brick.baseChordDataKey}
        shapeDataKey={brick.shapeDataKey}
        semitoneOffsetFromMajorRoot={brick.semitoneOffsetFromMajorRoot}
        sliderRange={sliderRange}
        onRangeChange={setSliderRange}
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
