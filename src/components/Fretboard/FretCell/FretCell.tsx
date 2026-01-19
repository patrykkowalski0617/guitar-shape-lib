import { memo } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import type { HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";
import { VariantProgressDots } from "../VariantProgressDots/VariantProgressDots";

interface FretCellProps {
  note: NoteObject;
  fretIndex: number;
  isHighlighted: boolean;
  currentRoleId: RoleId | null;
  isFlatKey: boolean;
  isActive: boolean;
  isShapeRootNote: boolean;
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
    fretIndex,
    isHighlighted,
    isFlatKey,
    isActive,
    isShapeNote,
    isLockedNote,
    lockedRoleId,
    isDevNote,
    isShapeRootNote,
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
            index={fretIndex}
            flatNoteName={note.flatNoteName}
            sharpNoteName={note.sharpNoteName}
            isFlatKey={isFlatKey}
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
      prev.isFlatKey === next.isFlatKey &&
      prev.isShapeRootNote === next.isShapeRootNote &&
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
