import * as S from "./parts";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCell } from "./hooks/useFretboardCell";
import type { FretboardCellProps } from "./types";

export default function FretboardCell({
  noteObject,
  fretIndex,
  stringIndex,
  isVisibleString,
  isShapeCell,
  isBaseChordCell,
  nextTargetShapeCoordinates,
}: FretboardCellProps) {
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    noteLabel,
    isTargetNote,
    isActiveNote,
  } = useFretboardCell({
    noteObject,
    isShapeCell,
    stringIndex,
    fretIndex,
    nextTargetShapeCoordinates,
  });

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
              isTargetNote={isTargetNote}
            />
          )}
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
