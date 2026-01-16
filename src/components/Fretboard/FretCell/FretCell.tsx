import { memo } from "react";
import * as S from "./parts";
import type { NoteObject, RoleId } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import type { ScaleStepMetadata } from "@/hooks/useActiveScale/useActiveScale";
import type { HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";

interface FretCellProps {
  note: NoteObject;
  fretIndex: number;
  isHighlighted: boolean;
  scaleDegree: ScaleStepMetadata | undefined;
  currentRoleId: RoleId | null;
  isFlatKey: boolean;
  isActive: boolean;
  isShapeRootNote: boolean;
  numberOfFrets: number;
  onHover: (id: string) => void;
  onLeave: () => void;
}

const FretCell = memo(
  ({
    note,
    fretIndex,
    isHighlighted,
    isFlatKey,
    isActive,
    isShapeRootNote,
    numberOfFrets,
    currentRoleId,
    scaleDegree,
    onHover,
    onLeave,
  }: FretCellProps) => {
    const activeRole: HighlightRole = scaleDegree?.role
      ? (scaleDegree.role as HighlightRole)
      : isShapeRootNote && currentRoleId
      ? (currentRoleId as HighlightRole)
      : "none";
    return (
      <S.Fret
        $numberOfFrets={numberOfFrets}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
      >
        <S.Note
          $isHighlighted={isHighlighted}
          $isActiveNote={isActive}
          $isShapeRootNote={isShapeRootNote}
          $isHighlightRole={activeRole}
        >
          <NoteLabel
            isHighlighted={isHighlighted}
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
      prev.scaleDegree === next.scaleDegree
    );
  }
);

export default FretCell;
