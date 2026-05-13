import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useMusicStore } from "@/store";
import { useEnharmonicNoteName } from "@/hooks";

interface FretboardCellProps {
  noteData: NoteObject;
  fretIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
}

export default function FretboardCell({
  noteData,
  fretIndex,
  isVisibleString,
  isShapeCell,
  isBaseChordCell,
}: FretboardCellProps) {
  const { handleMouseEnter, handleMouseLeave } = useFretboardCellInteraction({
    noteData,
  });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const noteLabel = getEnharmonicNoteName(noteData);

  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );

  const handleCellClick = () => {
    setActiveLockedNoteIds(noteData.noteId);
  };

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
          <NoteLabel
            isVisible={isShapeCell}
            variant="fretboard"
            noteLabel={noteLabel}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
