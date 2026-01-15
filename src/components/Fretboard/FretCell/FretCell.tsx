import { memo } from "react";
import * as S from "./parts";
import { type ScaleDegreeInfo } from "@/hooks/useActiveScale/useActiveScale";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";

interface FretCellProps {
  note: NoteObject;
  fretIndex: number;
  isHighlighted: boolean;
  isFlatKey: boolean;
  scaleDegree: ScaleDegreeInfo | undefined;
  isActive: boolean;
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
    numberOfFrets,
    onHover,
    onLeave,
  }: FretCellProps) => {
    return (
      <S.Fret $numberOfFrets={numberOfFrets}>
        <S.Note
          $isHighlighted={isHighlighted}
          $isActiveNote={isActive}
          onMouseOver={() => onHover(note.noteId)}
          onMouseLeave={onLeave}
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
      prev.scaleDegree?.role === next.scaleDegree?.role
    );
  }
);

export default FretCell;
