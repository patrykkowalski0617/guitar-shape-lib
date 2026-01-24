import { memo } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";
import type { HighlightRole } from "@/utils/roleColors";

interface FretCellProps {
  note: NoteObject;
  fretIndex: number;
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
  numberOfFrets: number;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (() => void) | undefined;
  variants: { id: string }[];
  isCurrentActiveRoot: boolean;
  areAnimationsOn: boolean;
}

const FretCell = memo(
  ({
    note,
    isHighlighted,
    isFlatTune,
    isActive,
    isShapeNote,
    isLockedNote,
    lockedRoleId,
    isDevNote,
    isShapeRootNote,
    isTuneNote,
    numberOfFrets,
    currentRoleId,
    onHover,
    onLeave,
    onClick,
    variants,
    isCurrentActiveRoot,
    areAnimationsOn,
  }: FretCellProps) => {
    const activeRole: HighlightRole =
      isShapeRootNote && currentRoleId ? (currentRoleId as HighlightRole) : "none";

    return (
      <S.Fret
        $numberOfFrets={numberOfFrets}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
        $isDevNote={isDevNote}
        $isShapeNote={isShapeNote}
        $isLockedNote={isLockedNote}
        $lockedRoleId={lockedRoleId}
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

          {isShapeRootNote && (
            <VariantProgressDots variants={variants} isCurrentActiveRoot={isCurrentActiveRoot} />
          )}
        </S.Note>
      </S.Fret>
    );
  },
  (prev, next) => {
    return (
      prev.isActive === next.isActive &&
      prev.isHighlighted === next.isHighlighted &&
      prev.isFlatTune === next.isFlatTune &&
      prev.isShapeRootNote === next.isShapeRootNote &&
      prev.isTuneNote === next.isTuneNote &&
      prev.currentRoleId === next.currentRoleId &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isLockedNote === next.isLockedNote &&
      prev.isDevNote === next.isDevNote &&
      prev.isCurrentActiveRoot === next.isCurrentActiveRoot &&
      prev.variants === next.variants
    );
  },
);

export default FretCell;
