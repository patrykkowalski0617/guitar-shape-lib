import * as S from "./parts";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";

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
  const { noteState, transitionTime, handleMouseEnter, handleMouseLeave } =
    useFretboardCellInteraction({ noteData, stringIndex, fretIndex });

  const { isLockedNote, isShapeNote, opacity, brightness } = noteState;

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        <S.Note
          $opacity={opacity}
          $brightness={brightness}
          $isShapeNote={isShapeNote}
          $transitionTime={transitionTime}
        >
          <NoteLabel
            isShapeNote={isShapeNote}
            variant="fretboard"
            note={noteData}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
