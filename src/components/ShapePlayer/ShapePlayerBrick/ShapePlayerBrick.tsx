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
    shapePlayerBrick,
  } = useShapePlayerBrick(id);

  const { activeBrickId, activeBeatIndex } = usePlayingBricksData();
  const { keyName, chordName, shapeName } =
    useShapePlayerBrickDisplay(shapePlayerBrick);
  const { sliderRange, setSliderRange, orderedLocations, restoreData } =
    useShapePlayerBrickSelection(shapePlayerBrick);

  if (!shapePlayerBrick) return null;

  const isCurrentBrickPlayed = activeBrickId === id;
  const playLength = shapePlayerBrick.playLength;

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
    >
      <Button>{keyName}</Button>
      <Button>{chordName}</Button>
      <Button $widthMultiplier={4}>{shapeName}</Button>
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
        unifiedMusicKeysDataKey={shapePlayerBrick.unifiedMusicKeysDataKey}
        baseChordDataKey={shapePlayerBrick.baseChordDataKey}
        shapeDataKey={shapePlayerBrick.shapeDataKey}
        semitoneOffsetFromMajorRoot={
          shapePlayerBrick.semitoneOffsetFromMajorRoot
        }
        sliderRange={sliderRange}
        onRangeChange={setSliderRange}
        orderedLocations={orderedLocations}
      />

      <Button onClick={handleRemoveClick}>Usuń</Button>

      <Button {...attributes} {...listeners}>
        ::
      </Button>
    </S.ShapePlayerBrickWrapper>
  );
};
