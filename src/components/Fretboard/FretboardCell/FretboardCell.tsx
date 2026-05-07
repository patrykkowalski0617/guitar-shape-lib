import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretboardCellInteraction } from "./hooks/useFretboardCellInteraction";
import { useNoteState } from "./hooks";
import { useControlsStore, useMusicStore } from "@/store";
import type { StringIndex } from "../constants";

interface FretboardCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
  isVisibleString: boolean;
}

export default function FretboardCell({
  noteData,
  stringIndex,
  fretIndex,
  isVisibleString,
}: FretboardCellProps) {
  const { handleMouseEnter, handleMouseLeave } = useFretboardCellInteraction({
    noteData,
  });

  const { isLockedNote, isVisible, isBaseChordNote, noteLabel } = useNoteState({
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
          $isVisible={isVisible}
          $isVisibleString={isVisibleString}
        >
          <NoteLabel
            isVisible={isVisible}
            variant="fretboard"
            noteLabel={noteLabel}
          />
        </S.Note>
      </S.Fret>
    </S.FretWrapper>
  );
}
