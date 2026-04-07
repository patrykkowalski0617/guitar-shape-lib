import * as S from "./parts";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useNoteState } from "./hooks";
import { useMusicStore } from "@/store";
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

  const baseChordShapeCoordinates = useBaseChordShapeCoordinates()?.flat();

  const { isLockedNote, isShapeNote, opacity, brightness, noteLabel } =
    useNoteState({
      noteData,
      stringIndex,
      fretIndex,
    });

  const setActiveNotes = useMusicStore((state) => state.setActiveNotes);
  const activeNotes = useMusicStore((state) => state.activeNotes);

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setActiveNotes(noteData.noteId);
      }}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        <S.Note
          $opacity={opacity}
          $brightness={brightness}
          $isShapeNote={activeNotes.includes(noteData.noteId) || isShapeNote}
          $isBaseChordShapeNote={
            !!baseChordShapeCoordinates?.some(
              (coord) => coord[0] === stringIndex && coord[1] === fretIndex,
            )
          }
        >
          <NoteLabel
            isShapeNote={activeNotes.includes(noteData.noteId) || isShapeNote}
            variant="fretboard"
            noteLabel={noteLabel}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
