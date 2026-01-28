import { memo } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { HighlightRole } from "@/utils/roleColors";

interface FretCellProps {
  note: NoteObject;
  stringIndex: number;
  isHighlighted: boolean;
  currentRoleId: RoleId | null;
  isFlatTune: boolean;
  isActive: boolean;
  isShapeRootNote: boolean;
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
    note,
    stringIndex,
    isHighlighted,
    isFlatTune,
    isActive,
    isShapeNote,
    isLockedNote,
    lockedRoleId,
    isDevNote,
    isShapeRootNote,
    isTuneNote,
    currentRoleId,
    onHover,
    onLeave,
    onClick,
    areAnimationsOn,
  }: FretCellProps) => {
    const activeRole: HighlightRole =
      isShapeRootNote && currentRoleId ? (currentRoleId as HighlightRole) : "none";

    return (
      <S.LockedEffectWrapper $isLockedNote={isLockedNote} $lockedRoleId={lockedRoleId}>
        {isShapeRootNote && <VariantProgressDots stringIndex={stringIndex} />}
        <S.Fret
          onMouseOver={() => onHover(note.noteId)}
          onMouseLeave={onLeave}
          $isDevNote={isDevNote}
          $isShapeRootNote={isShapeRootNote}
          $isShapeNote={isShapeNote}
          $isTuneNote={isTuneNote}
          $areAnimationsOn={areAnimationsOn}
        >
          <S.Note
            $isHighlighted={isHighlighted}
            $isActiveNote={isActive}
            $isHighlightRole={activeRole}
            onClick={onClick}
            $isShapeNote={isShapeNote}
            $areAnimationsOn={areAnimationsOn}
          >
            <NoteLabel
              isHighlighted={isHighlighted || isShapeNote}
              flatNoteName={note.flatNoteName}
              sharpNoteName={note.sharpNoteName}
              isTuneNote={isTuneNote}
              isShapeNote={isShapeNote}
              isFlatTune={isFlatTune}
              orientation="horizontal"
              isEnharmonic={note.isEnharmonic}
            />
          </S.Note>
        </S.Fret>
      </S.LockedEffectWrapper>
    );
  },
  (prev, next) => {
    return (
      prev.stringIndex === next.stringIndex &&
      prev.isActive === next.isActive &&
      prev.isHighlighted === next.isHighlighted &&
      prev.isFlatTune === next.isFlatTune &&
      prev.isShapeRootNote === next.isShapeRootNote &&
      prev.isTuneNote === next.isTuneNote &&
      prev.currentRoleId === next.currentRoleId &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isLockedNote === next.isLockedNote &&
      prev.isDevNote === next.isDevNote
    );
  },
);

export default FretCell;
