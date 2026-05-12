import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useNoteState } from "./hooks";
import { useControlsStore, useMusicStore } from "@/store";
import type { StringValidIndex } from "../constants";

interface FretboardCellProps {
  noteData: NoteObject;
  stringIndex: StringValidIndex;
  fretIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
}

export default function FretboardCell({
  noteData,
  stringIndex,
  fretIndex,
  isVisibleString,
  isShapeCell,
}: FretboardCellProps) {
  const { handleMouseEnter, handleMouseLeave } = useFretboardCellInteraction({
    noteData,
  });

  const { isLockedNote, isBaseChordNote, noteLabel } = useNoteState({
    noteData,
    stringIndex,
    fretIndex,
  });

  const setActiveLockedNoteIds = useMusicStore(
    (state) => state.setActiveLockedNoteIds,
  );
  const isShapeSliderHold = useControlsStore(
    (state) => state.isShapeSliderHold,
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
        $isLockedNote={isLockedNote}
        data-fret={fretIndex}
        $isBaseChordShapeNote={isBaseChordNote}
        $isVisibleString={isVisibleString}
      >
        <S.Note
          $animateBaseChordDown={isShapeSliderHold}
          $isVisible={isShapeCell}
          $isVisibleString={isVisibleString}
        >
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
