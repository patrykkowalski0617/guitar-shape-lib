import { memo } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import type { HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";

interface FretCellProps {
  note: NoteObject;
  fretIndex: number;
  isHighlighted: boolean;
  currentRoleId: RoleId | null;
  isFlatKey: boolean;
  isActive: boolean;
  isShapeRootNote: boolean;
  isShapeNote: boolean;
  isDevNote: boolean;
  numberOfFrets: number;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (() => void) | undefined;
}

const FretCell = memo(
  ({
    note,
    fretIndex,
    isHighlighted,
    isFlatKey,
    isActive,
    isShapeNote,
    isDevNote,
    isShapeRootNote,
    numberOfFrets,
    currentRoleId,
    onHover,
    onLeave,
    onClick,
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
      >
        <S.Note
          $isHighlighted={isHighlighted}
          $isActiveNote={isActive}
          $isShapeRootNote={isShapeRootNote}
          $isHighlightRole={activeRole}
          onClick={onClick}
          $isShapeNote={isShapeNote}
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
      prev.isDevNote === next.isDevNote
    );
  }
);

export default FretCell;
