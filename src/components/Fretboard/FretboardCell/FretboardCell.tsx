import * as S from "./parts";
import type { NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useNoteState } from "./hooks";

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
  const { handleMouseEnter, handleMouseLeave, handleClick } =
    useFretboardCellInteraction({ noteData });

  const {
    isLockedNote,
    isShapeNote,
    isRoleAndModeNote,
    isMinor,
    opacity,
    brightness,
  } = useNoteState({
    noteData,
    stringIndex,
    fretIndex,
  });

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(stringIndex, fretIndex)}
    >
      <S.Fret $isLockedNote={isLockedNote} data-fret={fretIndex}>
        <S.Note
          $opacity={opacity}
          $brightness={brightness}
          $isShapeNote={isShapeNote}
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
