import * as S from "./parts";
import {
  useShapePlayerBrick,
  useShapePlayerBrickDisplay,
  useShapePlayerBrickSelection,
} from "./hooks";
import { ShapeExplorer } from "@/components/ShapeExplorer/ShapeExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricksData";
import { Button } from "@/components/ui/parts";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";
import { Counter } from "./brickElements/Counter/Counter";

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
  const { keyName, baseChordName, guitarShapeName } =
    useShapePlayerBrickDisplay(guitarShapePlayerBrick);
  const {
    sliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
    targetSharpNoteNames,
    toggleTargetNote,
  } = useShapePlayerBrickSelection(guitarShapePlayerBrick);

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
      <Button>{baseChordName}</Button>
      <Button $widthMultiplier={4}>{guitarShapeName}</Button>
      <Button>{playLength}</Button>

      <NoteMatrix
        unifiedMusicKeysDataKey={guitarShapePlayerBrick.unifiedMusicKeysDataKey}
        baseChordDataKey={guitarShapePlayerBrick.baseChordDataKey}
        guitarShapeOffset={guitarShapePlayerBrick.semitoneOffsetFromMajorRoot}
        guitarShapeDataKey={guitarShapePlayerBrick.guitarShapeDataKey}
        targetSharpNoteNames={targetSharpNoteNames}
        onToggleNote={toggleTargetNote}
      />

      <Counter
        playLength={playLength}
        isCurrentBrickPlayed={isCurrentBrickPlayed}
        activeBeatIndex={activeBeatIndex}
      />

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
