import { useState } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import VariantProgressDots from "../VariantProgressDots/VariantProgressDots";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretCell } from "./helpers/useFretCell";
import { useNoteState } from "./helpers/useNoteState";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function FretCell({ noteData, stringIndex, fretIndex }: FretCellProps) {
  const { states, actions } = useFretCell();
  const { isActiveNote, isShapeRootNote, isShapeNote, isLockedNote, isTuneNote } = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });
  const [isActiveRootNote, setIsActiveRootNote] = useState(false);

  const handleClick = () => {
    if (isShapeRootNote) {
      actions.setNextShapeVariantLocationData(stringIndex, fretIndex);
    }
    setIsActiveRootNote(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isShapeRootNote && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <S.Fret $isLockedNote={isLockedNote} $lockedRoleId={states.lockedRoleId}>
      {isShapeRootNote && <VariantProgressDots stringIndex={stringIndex} isActiveRootNote={isActiveRootNote} />}
      <S.Note
        $isActiveNote={isActiveNote}
        $isShapeRootNote={isShapeRootNote}
        $isShapeNote={isShapeNote}
        $isTuneNote={isTuneNote}
        $areAnimationsOn={states.areAnimationsOn}
        $highlightRole={states.activeRole}
        onMouseEnter={() => actions.setActiveNoteId(noteData.noteId)}
        onMouseLeave={() => actions.setActiveNoteId(null)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={isShapeRootNote ? "button" : undefined}
        tabIndex={isShapeRootNote ? 0 : -1}
      >
        <NoteLabel
          isHighlighted={isShapeNote}
          flatNoteName={noteData.flatNoteName}
          sharpNoteName={noteData.sharpNoteName}
          isShapeNote={isShapeNote}
          isTuneNote={isTuneNote}
          isFlatTune={states.isFlatTune}
          isEnharmonic={noteData.isEnharmonic}
          variant="fretboard"
        />
      </S.Note>
    </S.Fret>
  );
}
