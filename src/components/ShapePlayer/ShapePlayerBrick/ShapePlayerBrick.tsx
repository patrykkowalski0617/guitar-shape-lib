import * as S from "./parts";
import { useShapePlayerBrick, useShapePlayerBrickSelection } from "./hooks";
import { ShapeExplorer } from "@/components/ShapeExplorer/ShapeExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricksData";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";
import {
  Counter,
  EditKeyAndChordButton,
  EditShapeButton,
  RemoveBrickButton,
  DragHandleButton,
} from "./brickElements";

interface ShapePlayerBrickProps {
  id: string;
}

export const ShapePlayerBrick = ({ id }: ShapePlayerBrickProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    guitarShapePlayerBrick,
  } = useShapePlayerBrick(id);

  const { isCurrentBrickPlayed, activeBeatIndex } = usePlayingBricksData(id);

  const {
    sliderRange,
    setSliderRange,
    orderedLocations,
    restoreData,
    isCurrentDataBrick,
  } = useShapePlayerBrickSelection(guitarShapePlayerBrick);

  if (!guitarShapePlayerBrick) return null;

  const playLength = guitarShapePlayerBrick.playLength;

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
      $isActiveBrick={isCurrentDataBrick || isCurrentBrickPlayed}
    >
      <EditKeyAndChordButton id={id} displayMode="key" />
      <EditKeyAndChordButton id={id} displayMode="chord" />
      <EditShapeButton id={id} />

      <Counter
        id={id}
        playLength={playLength}
        isCurrentBrickPlayed={isCurrentBrickPlayed}
        activeBeatIndex={activeBeatIndex}
      />

      <NoteMatrix
        unifiedMusicKeysDataKey={guitarShapePlayerBrick.unifiedMusicKeysDataKey}
        baseChordDataKey={guitarShapePlayerBrick.baseChordDataKey}
        guitarShapeOffset={guitarShapePlayerBrick.semitoneOffsetFromMajorRoot}
        guitarShapeDataKey={guitarShapePlayerBrick.guitarShapeDataKey}
        targetNoteIndices={guitarShapePlayerBrick.targetNoteIndices ?? [1]}
        brickId={id}
      />

      <ShapeExplorer
        unifiedMusicKeysDataKey={guitarShapePlayerBrick.unifiedMusicKeysDataKey}
        guitarShapeDataKey={guitarShapePlayerBrick.guitarShapeDataKey}
        semitoneOffsetFromMajorRoot={
          guitarShapePlayerBrick.semitoneOffsetFromMajorRoot
        }
        sliderRange={sliderRange}
        onRangeChange={setSliderRange}
        orderedLocations={orderedLocations}
      />

      <RemoveBrickButton id={id} />

      <DragHandleButton attributes={attributes} listeners={listeners} />
    </S.ShapePlayerBrickWrapper>
  );
};
