import { memo, useState } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { HighlightRole } from "@/utils/roleColors";

interface FretCellProps {
  noteData: NoteObject;
  stringIndex: number;
  fretIndex: number;
  isShapeRootNote: boolean;
  currentRoleId: RoleId | null;
  isFlatTune: boolean;
  isActive: boolean;
  isShapeRootNoteWithVariants: boolean;
  isTuneNote: boolean;
  isShapeNote: boolean;
  isLockedNote: boolean;
  lockedRoleId: RoleId | null;
  isDevNote: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (() => void) | undefined;
  areAnimationsOn: boolean;
}

const FretCell = memo(
  ({
    noteData,
    stringIndex,
    fretIndex,
    isShapeRootNote,
    isFlatTune,
    isActive,
    isShapeNote,
    isLockedNote,
    lockedRoleId,
    isDevNote,
    isShapeRootNoteWithVariants,
    isTuneNote,
    currentRoleId,
    onHover,
    onLeave,
    onClick,
    areAnimationsOn,
  }: FretCellProps) => {
    const activeRole: HighlightRole = currentRoleId ? (currentRoleId as HighlightRole) : "none";
    const [clickedFret, setClickedFret] = useState<number | null>(null);
    const handleClick = () => {
      onClick?.();
      setClickedFret(fretIndex);
    };
    return (
      <S.LockedEffectWrapper $isLockedNote={isLockedNote} $lockedRoleId={lockedRoleId}>
        {isShapeRootNoteWithVariants && (
          <VariantProgressDots stringIndex={stringIndex} isActiveFret={fretIndex === clickedFret} />
        )}
        <S.Fret
          onMouseOver={() => onHover(noteData.noteId)}
          onMouseLeave={onLeave}
          $isDevNote={isDevNote}
          $isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
          $isShapeNote={isShapeNote}
          $isTuneNote={isTuneNote}
          $areAnimationsOn={areAnimationsOn}
          onClick={handleClick}
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
              orientation="horizontal"
              isEnharmonic={noteData.isEnharmonic}
            />
          </S.Note>
        </S.Fret>
      </S.LockedEffectWrapper>
    );
  },
  (prev, next) => {
    return (
      prev.stringIndex === next.stringIndex &&
      prev.fretIndex === next.fretIndex &&
      prev.isActive === next.isActive &&
      prev.isShapeRootNote === next.isShapeRootNote &&
      prev.isFlatTune === next.isFlatTune &&
      prev.isShapeRootNoteWithVariants === next.isShapeRootNoteWithVariants &&
      prev.isTuneNote === next.isTuneNote &&
      prev.currentRoleId === next.currentRoleId &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isLockedNote === next.isLockedNote &&
      prev.isDevNote === next.isDevNote
    );
  },
);

export default FretCell;
