import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
import { useIsNoteActive } from "@/hooks/useIsNoteActive";
import { useShapeCoordinates } from "@/DevTools/useShapeCoordinates";

interface FretboardCellProps {
  noteObject: NoteObject;
  fretIndex: number;
  stringIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
}

export default function FretboardCell({
  noteObject,
  fretIndex,
  stringIndex,
  isVisibleString,
  isShapeCell,
  isBaseChordCell,
}: FretboardCellProps) {
  const { handleMouseEnter, handleMouseLeave } = useFretboardCellInteraction({
    noteObject,
  });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const noteLabel = getEnharmonicNoteName(noteObject);

  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );
  const { addShapeCoordinate, isCoordinateSelected } = useShapeCoordinates();
  const handleCellClick = () => {
    setActiveLockedNoteIds(noteObject.noteId);
    addShapeCoordinate(stringIndex, fretIndex);
  };

  const isActiveNote = useIsNoteActive(noteObject.noteId);
  const isDevNote = isCoordinateSelected(stringIndex, fretIndex);

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCellClick}
      $isDevNote={isDevNote}
    >
      <S.Fret
        $isLockedNote={false}
        data-fret={fretIndex}
        $isBaseChordShapeNote={isBaseChordCell}
        $isVisibleString={isVisibleString}
      >
        <S.Note $isVisible={isShapeCell} $isVisibleString={isVisibleString}>
          {noteLabel && (
            <NoteLabel
              isVisible={
                isShapeCell || isActiveNote //|| 1
                //
              }
              variant="fretboard"
              noteLabel={noteLabel}
            />
          )}
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
