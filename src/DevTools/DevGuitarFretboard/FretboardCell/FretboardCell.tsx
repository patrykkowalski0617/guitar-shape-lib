import * as S from "./parts";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCell } from "./hooks/useFretboardCell";
import type { FretboardCellProps } from "./types";
import { useGettingShapeByClick } from "../useGettingShapeByClick";

export default function FretboardCell({
  noteObject,
  fretIndex,
  stringIndex,
  isVisibleString,
  isShapeCell,
  isBaseChordCell,
  nextTargetShapeCoordinates,
}: FretboardCellProps) {
  const { handleMouseEnter, handleMouseLeave, noteLabel, isTargetNote } =
    useFretboardCell({
      noteObject,
      isShapeCell,
      stringIndex,
      fretIndex,
      nextTargetShapeCoordinates,
    });
  const { isCoordinateSelected, addShapeCoordinate } = useGettingShapeByClick();
  const isDevSelect = isCoordinateSelected(stringIndex, fretIndex);

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        addShapeCoordinate(stringIndex, fretIndex);
      }}
    >
      <S.Fret
        data-fret={fretIndex}
        $isBaseChordShapeNote={isBaseChordCell}
        $isVisibleString={isVisibleString}
        $isDevSelect={isDevSelect}
      >
        <S.Note $isVisible={true} $isVisibleString={isVisibleString}>
          {noteLabel && (
            <NoteLabel
              isVisible={true}
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
