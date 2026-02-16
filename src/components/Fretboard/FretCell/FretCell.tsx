import * as S from "./parts";
import type { NoteObject } from "@/utils";
import VariantProgressDots from "@/components/Fretboard/VariantProgressDots/VariantProgressDots";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretCell, useNoteState, useFretboardStates } from "./helpers";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function FretCell({ noteData, stringIndex, fretIndex }: FretCellProps) {
  const { states, actions } = useFretCell();
  const { isRoleSelected } = useFretboardStates();
  const { isActiveNote, isShapeRootNote, isShapeNote, isLockedNote, isTuneNote } = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });

  return (
    <S.Fret $isLockedNote={isLockedNote} $lockedRoleId={states.lockedRoleId} data-fret={fretIndex}>
      {isShapeRootNote && <VariantProgressDots stringIndex={stringIndex} fretIndex={fretIndex} />}
      <S.Note
        $isActiveNote={isActiveNote}
        $isShapeRootNote={isShapeRootNote}
        $isShapeNote={isShapeNote}
        $isTuneNote={isTuneNote}
        $highlightRole={states.activeRole}
        $isRoleSelected={isRoleSelected}
        onMouseEnter={() => actions.setActiveNoteId(noteData.noteId)}
        onMouseLeave={() => actions.setActiveNoteId(null)}
      >
        <NoteLabel
          isHighlighted={isShapeNote}
          flatNoteName={noteData.flatNoteName}
          sharpNoteName={noteData.sharpNoteName}
          isShapeNote={isShapeNote}
          isFlatTune={states.isFlatTune}
          isEnharmonic={noteData.isEnharmonic}
          variant="fretboard"
        />
      </S.Note>
    </S.Fret>
  );
}
