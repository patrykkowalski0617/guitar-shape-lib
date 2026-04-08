import * as S from "./parts";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useNoteState } from "./hooks";
import { useControlsStore, useMusicStore } from "@/store";
import { useBaseChordShapeCoordinates } from "./hooks/useBaseChordShapeCoordinates";

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
  const { handleMouseEnter, handleMouseLeave } = useFretboardCellInteraction({
    noteData,
  });

  const { baseChordShapeCoordinates, CAGEDassigments } =
    useBaseChordShapeCoordinates();

  const { isLockedNote, isHighlighted, opacity, noteLabel } = useNoteState({
    noteData,
    stringIndex,
    fretIndex,
  });

  const setActiveLockedNotes = useMusicStore(
    (state) => state.setActiveLockedNotes,
  );
  const isShapeSliderHold = useControlsStore(
    (state) => state.isShapeSliderHold,
  );

  const animationTrigger = CAGEDassigments;

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setActiveLockedNotes(noteData.noteId);
      }}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        <S.Note
          $opacity={opacity}
          $isHighlighted={isHighlighted}
          $isBaseChordShapeNote={
            !!baseChordShapeCoordinates?.some(
              (coord) => coord[0] === stringIndex && coord[1] === fretIndex,
            )
          }
          key={animationTrigger}
          $animateBaseChordDown={isShapeSliderHold}
        >
          <NoteLabel
            isHighlighted={isHighlighted}
            variant="fretboard"
            noteLabel={noteLabel}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
