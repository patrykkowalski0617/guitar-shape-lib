import * as S from "./parts";
import {
  useShapePlayerBrick,
  useShapePlayerBrickDisplay,
  useShapePlayerBrickSelection,
} from "./hooks";
import { ShapeExplorer } from "@/components/ShapeExplorer/ShapeExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricks";
import { Button } from "../ui/parts";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";

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
    guitarShapePlayerBrick,
  } = useShapePlayerBrick(id);

  const { activeBrickId, activeBeatIndex } = usePlayingBricksData();
  const { keyName, chordName, guitarShapeName } = useShapePlayerBrickDisplay(
    guitarShapePlayerBrick,
  );
  const { sliderRange, setSliderRange, orderedLocations, restoreData } =
    useShapePlayerBrickSelection(guitarShapePlayerBrick);

  if (!guitarShapePlayerBrick) return null;

  const isCurrentBrickPlayed = activeBrickId === id;
  const playLength = guitarShapePlayerBrick.playLength;

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
    >
      <Button>{keyName}</Button>
      <Button>{chordName}</Button>
      <Button $widthMultiplier={4}>{guitarShapeName}</Button>
      <Button>{playLength}</Button>
      <NoteMatrix
        unifiedMusicKeysDataKey={guitarShapePlayerBrick.unifiedMusicKeysDataKey}
        baseChordDataKey={guitarShapePlayerBrick.baseChordDataKey}
        guitarShapeOffset={guitarShapePlayerBrick.semitoneOffsetFromMajorRoot}
        guitarShapeDataKey={guitarShapePlayerBrick.guitarShapeDataKey}
      />
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

      <ShapeExplorer
        unifiedMusicKeysDataKey={guitarShapePlayerBrick.unifiedMusicKeysDataKey}
        baseChordDataKey={guitarShapePlayerBrick.baseChordDataKey}
        guitarShapeDataKey={guitarShapePlayerBrick.guitarShapeDataKey}
        semitoneOffsetFromMajorRoot={
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot
        }
        sliderRange={sliderRange}
        onRangeChange={setSliderRange}
        orderedLocations={orderedLocations}
      />

      <Button onClick={handleRemoveClick}>Delete</Button>

      <Button {...attributes} {...listeners}>
        ::
      </Button>
    </S.ShapePlayerBrickWrapper>
  );
};
