import * as S from "./parts";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCell } from "./hooks/useFretboardCell";
import type { FretboardCellProps } from "./types";

export default function FretboardCell({
  noteObject,
  fretIndex,
  isVisibleString,
  isShapeCell,
  isBaseChordCell,
}: FretboardCellProps) {
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isActiveNote,
  } = useFretboardCell({ noteObject, isShapeCell });

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <S.Fret
        data-fret={fretIndex}
        $isBaseChordShapeNote={isBaseChordCell}
        $isVisibleString={isVisibleString}
      >
        <S.Note $isVisible={isShapeCell} $isVisibleString={isVisibleString}>
          {noteLabel && (
            <NoteLabel
              isVisible={isShapeCell || isActiveNote}
              variant="fretboard"
              noteLabel={noteLabel}
            />
          )}
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
