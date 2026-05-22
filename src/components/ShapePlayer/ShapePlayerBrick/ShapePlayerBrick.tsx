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
import { useUiStore } from "@/store";
import { useDataKeyStore } from "@/store";

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

  const setEditingBrickId = useUiStore((state) => state.setEditingBrickId);
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );

  if (!guitarShapePlayerBrick) return null;

  const isCurrentBrickPlayed = activeBrickId === id;
  const playLength = guitarShapePlayerBrick.playLength;

  // Otwiera picker 1 (key + chord) z presetem danych tej cegły
  const handleEditKeyAndChord = () => {
    setEditingBrickId(id);
    setUnifiedMusicKeysDataKey(guitarShapePlayerBrick.unifiedMusicKeysDataKey);
    setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
    setKeyAndChordPickerExpanded(true);
    setShapePickerExpanded(false);
  };

  // Otwiera picker 2 (shape) z presetem danych tej cegły — pomija picker 1
  const handleEditShape = () => {
    setEditingBrickId(id);
    setUnifiedMusicKeysDataKey(guitarShapePlayerBrick.unifiedMusicKeysDataKey);
    setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
    setShapeDataKey(guitarShapePlayerBrick.guitarShapeDataKey);
    setSemitoneOffsetFromMajorRoot(
      guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
    );
    setShapePickerExpanded(true);
    setKeyAndChordPickerExpanded(false);
  };

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
    >
      <Button onClick={handleEditKeyAndChord}>{keyName}</Button>
      <Button onClick={handleEditKeyAndChord}>{baseChordName}</Button>
      <Button $widthMultiplier={4} onClick={handleEditShape}>
        {guitarShapeName}
      </Button>
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
