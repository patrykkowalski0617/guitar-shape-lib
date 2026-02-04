import { useState } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretCell } from "./helpers/useFretCell";
import { useNoteState } from "./helpers/useNoteState";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

const FretCell = ({ noteData, stringIndex, fretIndex }: FretCellProps) => {
  const { states, actions } = useFretCell();
  const {
    isActiveNote,
    isShapeRootNoteWithVariants,
    isShapeRootNote,
    isShapeNote,
    isLockedNote,
    isTuneNote,
  } = useNoteState({
    sharpNoteName: noteData.sharpNoteName,
    noteId: noteData.noteId,
    stringIndex,
    fretIndex,
  });
  const [isActiveRootNote, setIsActiveRootNote] = useState(false);

  const handleClick = () => {
    if (isShapeRootNoteWithVariants) {
      actions.setNextShapeVariantLocationData(stringIndex, fretIndex);
    }
    setIsActiveRootNote(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isShapeRootNoteWithVariants && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <S.LockedEffectWrapper $isLockedNote={isLockedNote} $lockedRoleId={states.lockedRoleId}>
      {isShapeRootNoteWithVariants && (
        <VariantProgressDots stringIndex={stringIndex} isActiveRootNote={isActiveRootNote} />
      )}
      <S.Fret
        $isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
        $isShapeNote={isShapeNote}
        $isTuneNote={isTuneNote}
        $areAnimationsOn={states.areAnimationsOn}
        tabIndex={isShapeRootNoteWithVariants ? 0 : -1}
        role={isShapeRootNoteWithVariants ? "button" : undefined}
        onMouseEnter={() => actions.setActiveNoteId(noteData.noteId)}
        onMouseLeave={() => actions.setActiveNoteId(null)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <S.Note
          $isActiveNote={isActiveNote}
          $isShapeRootNote={isShapeRootNote}
          $highlightRole={states.activeRole}
          $isShapeNote={isShapeNote}
          $areAnimationsOn={states.areAnimationsOn}
        >
          <NoteLabel
            isHighlighted={isShapeRootNote || isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isTuneNote={isTuneNote}
            isShapeNote={isShapeNote}
            isFlatTune={states.isFlatTune}
            isEnharmonic={noteData.isEnharmonic}
            variant="fretboard"
          />
        </S.Note>
      </S.Fret>
    </S.LockedEffectWrapper>
  );
};

export default FretCell;
