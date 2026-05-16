import * as S from "./parts";
import {
  useShapePlayerBrick,
  useShapePlayerBrickDisplay,
  useShapePlayerBrickSelection,
} from "./hooks";
import { ShapeMulitStepSliderExplorer } from "@/components/ShapeMulitStepSliderExplorer/ShapeMulitStepSliderExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricks";
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

  const { activeBrickId, activeBeatIndex } = usePlayingBricksData();
  const { keyName, chordName, shapeName } = useShapePlayerBrickDisplay(brick);
  const { sliderRange, setSliderRange, orderedLocations, restoreData } =
    useShapePlayerBrickSelection(brick);

  if (!brick) return null;

  const isCurrentBrickPlayed = activeBrickId === id;
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

      <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
        {Array.from({ length: playLength }).map((_, index) => {
          const isPartActive =
            isCurrentBrickPlayed && activeBeatIndex === index;
          return (
            <div
              key={index}
              style={{
                width: "20px",
                height: "10px",
                backgroundColor: isPartActive ? "#4caf50" : "#e0e0e0",
                borderRadius: "2px",
                transition: "background-color 0.1s",
              }}
            />
          );
        })}
      </div>

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
