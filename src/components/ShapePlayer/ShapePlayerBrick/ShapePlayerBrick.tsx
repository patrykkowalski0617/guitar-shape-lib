import * as S from "./parts";
import { useShapePlayerBrick, useShapePlayerBrickSelection } from "./hooks";
import { ShapeExplorer } from "@/components/ShapeExplorer/ShapeExplorer";
import { usePlayingBricksData } from "../ShapePlayerList/hooks/usePlayingBricksData";
import {
  Counter,
  EditKeyAndChordButton,
  EditShapeButton,
  RangeArmed,
  RemoveBrickButton,
  DragHandleButton,
} from "./brickElements";
import { TargetNotesSelect } from "@/components/TargetNotesSelect/TargetNotesSelect";
import { useUiStore } from "@/store";

interface ShapePlayerBrickProps {
  id: string;
  index: number;
  isWithinRange: boolean;
  isDuplicateKey: boolean;
}

export const ShapePlayerBrick = ({
  id,
  index,
  isWithinRange,
  isDuplicateKey,
}: ShapePlayerBrickProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    guitarShapePlayerBrick,
  } = useShapePlayerBrick(id);
  const { isCurrentBrickPlayed, activeBeatIndex } = usePlayingBricksData(id);
  const selectedViewIndices = useUiStore((s) => s.selectedViewIndices);

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
      {selectedViewIndices.includes(0) && (
        <S.RangeArmedWrapper>
          <RangeArmed isWithinRange={isWithinRange} />
        </S.RangeArmedWrapper>
      )}

      {(selectedViewIndices.includes(1) ||
        selectedViewIndices.includes(6) ||
        selectedViewIndices.includes(7)) && (
        <EditKeyAndChordButton
          id={id}
          isDuplicateKey={isDuplicateKey}
          index={index}
        />
      )}

      {!selectedViewIndices.includes(1) &&
        !selectedViewIndices.includes(6) &&
        !selectedViewIndices.includes(7) &&
        selectedViewIndices.includes(8) && (
          <EditKeyAndChordButton
            id={id}
            isDuplicateKey={isDuplicateKey}
            index={index}
            isShort
          />
        )}

      {selectedViewIndices.includes(2) && <EditShapeButton id={id} />}

      {selectedViewIndices.includes(3) && (
        <TargetNotesSelect
          unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
          baseChordDataKey={baseChordDataKey}
          guitarShapeOffset={semitoneOffsetFromMajorRoot}
          guitarShapeDataKey={guitarShapeDataKey}
          targetNoteIndices={targetNoteIndices ?? [1]}
          brickId={id}
        />
      )}

      {selectedViewIndices.includes(4) && (
        <Counter
          id={id}
          playLength={playLength}
          isCurrentBrickPlayed={isCurrentBrickPlayed}
          activeBeatIndex={activeBeatIndex}
        />
      )}

      {selectedViewIndices.includes(5) && (
        <ShapeExplorer
          unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
          guitarShapeDataKey={guitarShapeDataKey}
          semitoneOffsetFromMajorRoot={semitoneOffsetFromMajorRoot}
          sliderRange={sliderRange}
          onRangeChange={setSliderRange}
          orderedLocations={orderedLocations}
        />
      )}

      {/* <S.ButtonsWrapper> */}
      {selectedViewIndices.includes(6) && <RemoveBrickButton id={id} />}

      {selectedViewIndices.includes(7) && (
        <DragHandleButton attributes={attributes} listeners={listeners} />
      )}
      {/* </S.ButtonsWrapper> */}
    </S.ShapePlayerBrickWrapper>
  );
};
