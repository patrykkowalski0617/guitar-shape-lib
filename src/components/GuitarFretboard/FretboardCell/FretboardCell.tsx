import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";
import { useIsNoteActive } from "@/hooks/useIsNoteActive";

interface FretboardCellProps {
  noteObject: NoteObject;
  fretIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
}

export default function FretboardCell({
  noteObject,
  fretIndex,
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

  const handleCellClick = () => {
    setActiveLockedNoteIds(noteObject.noteId);
  };

  const isActiveNote = useIsNoteActive(noteObject.noteId);

  return (
    <S.FretWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCellClick}
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
