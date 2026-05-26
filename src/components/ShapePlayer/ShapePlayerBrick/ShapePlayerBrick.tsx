import * as S from "./parts";
import { useShapePlayerBrick, useShapePlayerBrickSelection } from "./hooks";
import { ShapeExplorer } from "@/components/ShapeExplorer/ShapeExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricksData";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";
import {
  Counter,
  EditKeyAndChordButton,
  EditShapeButton,
  RangeArmed,
  RemoveBrickButton,
  DragHandleButton,
} from "./brickElements";

interface ShapePlayerBrickProps {
  id: string;
  isWithinRange: boolean;
}

export const ShapePlayerBrick = ({
  id,
  isWithinRange,
}: ShapePlayerBrickProps) => {
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

  const {
    playLength,
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    semitoneOffsetFromMajorRoot,
    guitarShapeDataKey,
    targetNoteIndices,
  } = guitarShapePlayerBrick;

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
      $isActiveBrick={isCurrentDataBrick || isCurrentBrickPlayed}
    >
      <RangeArmed isWithinRange={isWithinRange} />
      <EditKeyAndChordButton id={id} />
      <EditShapeButton id={id} />

      <NoteMatrix
        unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
        baseChordDataKey={baseChordDataKey}
        guitarShapeOffset={semitoneOffsetFromMajorRoot}
        guitarShapeDataKey={guitarShapeDataKey}
        targetNoteIndices={targetNoteIndices ?? [1]}
        brickId={id}
      />

      <Counter
        id={id}
        playLength={playLength}
        isCurrentBrickPlayed={isCurrentBrickPlayed}
        activeBeatIndex={activeBeatIndex}
      />

      <ShapeExplorer
        unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
        guitarShapeDataKey={guitarShapeDataKey}
        semitoneOffsetFromMajorRoot={semitoneOffsetFromMajorRoot}
        sliderRange={sliderRange}
        onRangeChange={setSliderRange}
        orderedLocations={orderedLocations}
      />

      <RemoveBrickButton id={id} />

      <DragHandleButton attributes={attributes} listeners={listeners} />
    </S.ShapePlayerBrickWrapper>
  );
};
