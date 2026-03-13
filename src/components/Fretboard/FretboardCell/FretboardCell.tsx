import * as S from "./parts";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useFretboardStates, useNoteState } from "./hooks";

interface FretboardCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function FretboardCell({
  noteData,
  stringIndex,
  fretIndex,
}: FretboardCellProps) {
  const { isRoleSelected } = useFretboardStates();
  const {
    transitionTime,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    roleAndModeCellsCoords,
  } = useFretboardCellInteraction({ noteData, stringIndex, fretIndex });

  const noteState = useNoteState({
    noteData,
    stringIndex,
    fretIndex,
  });

  const { isLockedNote, isShapeNote, opacity, brightness } = noteState;

  const currentPointIndex = roleAndModeCellsCoords.findIndex(
    ([targetString, targetFret]) =>
      targetString === stringIndex && targetFret === fretIndex,
  );

  const isRoleAndModeNote = currentPointIndex !== -1 && !isRoleSelected;

  const minorPointIndexes = [1, 2, 5];
  const isMinor =
    isRoleAndModeNote && minorPointIndexes.includes(currentPointIndex);

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        handleClick(stringIndex, fretIndex);
      }}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        <S.Note
          $opacity={opacity}
          $brightness={brightness}
          $isShapeNote={isShapeNote}
          $transitionTime={transitionTime}
          $isRoleAndModeNote={isRoleAndModeNote}
        >
          <NoteLabel
            isShapeNote={isShapeNote}
            variant="fretboard"
            note={noteData}
            isMinor={isMinor}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
