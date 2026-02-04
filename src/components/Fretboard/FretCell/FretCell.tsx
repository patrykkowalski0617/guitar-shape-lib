import { useState } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { HighlightRole } from "@/utils/roleColors";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { useFretCell } from "./helpers/useFretCell";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

const FretCell = ({ noteData, stringIndex, fretIndex }: FretCellProps) => {
  const { state, actions } = useFretCell();

  const isShapeRootNote = state.shapeRootSharpNote === noteData.sharpNoteName;
  const isShapeRootNoteWithVariants = isShapeRootNote && stringIndex > 1;
  const isShapeNote = actions.isShapeNote([stringIndex, fretIndex]);
  const isLockedNote = actions.isLockedShapeNote([stringIndex, fretIndex]);
  const isTuneNote = actions.isTuneNote(noteData.sharpNoteName);
  const isActive = state.activeNoteId === noteData.noteId;
  const isDevNote = actions.isDevNote(stringIndex, fretIndex);

  const [isActiveRootNote, setIsActiveRootNote] = useState(false);
  const activeRole: HighlightRole = (state.currentRoleId as HighlightRole) || "none";

  const handleClick = () => {
    if (state.isDevMode) {
      actions.onDevClick(stringIndex, fretIndex);
    }

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
    <S.LockedEffectWrapper $isLockedNote={isLockedNote} $lockedRoleId={state.lockedRoleId}>
      {isShapeRootNoteWithVariants && (
        <VariantProgressDots stringIndex={stringIndex} isActiveRootNote={isActiveRootNote} />
      )}
      <S.Fret
        onMouseEnter={() => actions.setActiveNoteId(noteData.noteId)}
        onMouseLeave={() => actions.setActiveNoteId(null)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        $isDevNote={isDevNote}
        $isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
        $isShapeNote={isShapeNote}
        $isTuneNote={isTuneNote}
        $areAnimationsOn={state.areAnimationsOn}
        tabIndex={isShapeRootNoteWithVariants ? 0 : -1}
        role={isShapeRootNoteWithVariants ? "button" : undefined}
      >
        <S.Note
          $isShapeRootNote={isShapeRootNote}
          $isActiveNote={isActive}
          $highlightRole={activeRole}
          $isShapeNote={isShapeNote}
          $areAnimationsOn={state.areAnimationsOn}
        >
          <NoteLabel
            isHighlighted={isShapeRootNote || isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isTuneNote={isTuneNote}
            isShapeNote={isShapeNote}
            isFlatTune={state.isFlatTune}
            isEnharmonic={noteData.isEnharmonic}
            variant="fretboard"
          />
        </S.Note>
      </S.Fret>
    </S.LockedEffectWrapper>
  );
};

export default FretCell;
