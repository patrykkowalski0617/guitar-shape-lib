import { memo, useState, useCallback } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { HighlightRole } from "@/utils/roleColors";
import type { StringIndex } from "../FretboardRow/FretboardRow";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  currentRoleId: RoleId | null;
  lockedRoleId: RoleId | null;
  isFlatTune: boolean;
  isActive: boolean;
  isShapeRootNote: boolean;
  isShapeRootNoteWithVariants: boolean;
  isShapeNote: boolean;
  isTuneNote: boolean;
  isLockedNote: boolean;
  isDevNote: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (() => void) | undefined;
  areAnimationsOn: boolean;
}

const FretCell = memo((props: FretCellProps) => {
  const {
    noteData,
    stringIndex,
    currentRoleId,
    lockedRoleId,
    isFlatTune,
    isActive,
    isShapeRootNote,
    isShapeRootNoteWithVariants,
    isShapeNote,
    isTuneNote,
    isLockedNote,
    isDevNote,
    onHover,
    onLeave,
    onClick,
    areAnimationsOn,
  } = props;

  const [isActiveRootNote, setIsActiveRootNote] = useState(false);
  const activeRole: HighlightRole = (currentRoleId as HighlightRole) || "none";

  const handleClick = useCallback(() => {
    onClick?.();
    setIsActiveRootNote(true);
  }, [onClick]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isShapeRootNoteWithVariants && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <S.LockedEffectWrapper $isLockedNote={isLockedNote} $lockedRoleId={lockedRoleId}>
      {isShapeRootNoteWithVariants && (
        <VariantProgressDots stringIndex={stringIndex} isActiveRootNote={isActiveRootNote} />
      )}
      <S.Fret
        onMouseOver={() => onHover(noteData.noteId)}
        onMouseLeave={onLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        $isDevNote={isDevNote}
        $isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
        $isShapeNote={isShapeNote}
        $isTuneNote={isTuneNote}
        $areAnimationsOn={areAnimationsOn}
        tabIndex={isShapeRootNoteWithVariants ? 0 : -1}
        role={isShapeRootNoteWithVariants ? "button" : undefined}
      >
        <S.Note
          $isShapeRootNote={isShapeRootNote}
          $isActiveNote={isActive}
          $highlightRole={activeRole}
          $isShapeNote={isShapeNote}
          $areAnimationsOn={areAnimationsOn}
        >
          <NoteLabel
            isHighlighted={isShapeRootNote || isShapeNote}
            flatNoteName={noteData.flatNoteName}
            sharpNoteName={noteData.sharpNoteName}
            isTuneNote={isTuneNote}
            isShapeNote={isShapeNote}
            isFlatTune={isFlatTune}
            targetComponent="fretboard"
            isEnharmonic={noteData.isEnharmonic}
          />
        </S.Note>
      </S.Fret>
    </S.LockedEffectWrapper>
  );
});

export default FretCell;
