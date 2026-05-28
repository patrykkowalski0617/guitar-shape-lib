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
  isWithinRange: boolean;
  isDuplicateKey: boolean;
}

export const ShapePlayerBrick = ({
  id,
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
  const isEditShapeView = useUiStore((s) => s.isEditShapeView);
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
      <S.RangeArmedWrapper>
        <RangeArmed isWithinRange={isWithinRange} />
      </S.RangeArmedWrapper>

      <EditKeyAndChordButton id={id} isDuplicateKey={isDuplicateKey} />

      {isEditShapeView && (
        <>
          <EditShapeButton id={id} />
          <TargetNotesSelect
            unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
            baseChordDataKey={baseChordDataKey}
            guitarShapeOffset={semitoneOffsetFromMajorRoot}
            guitarShapeDataKey={guitarShapeDataKey}
            targetNoteIndices={targetNoteIndices ?? [1]}
            brickId={id}
          />
        </>
      )}
      {!isEditShapeView && (
        <>
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
        </>
      )}
      <S.ButtonsWrapper>
        <RemoveBrickButton id={id} />
        <DragHandleButton attributes={attributes} listeners={listeners} />
      </S.ButtonsWrapper>
    </S.ShapePlayerBrickWrapper>
  );
};
