import { memo } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import type { ScaleStepMetadata } from "@/hooks/useActiveScale/useActiveScale";

interface KeyboardKeyProps {
  note: NoteObject;
  index: number;
  noteIndex: number;
  isHighlighted: boolean;
  isShapeNote: boolean;
  isFlatKey: boolean;
  scaleDegree: ScaleStepMetadata | undefined;
  isActive: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  keyShape: S.KeyShape | undefined;
  majorScale: number[];
}

const KeyboardKey = memo(
  ({
    note,
    index,
    noteIndex,
    isHighlighted,
    isShapeNote,
    isFlatKey,
    scaleDegree,
    isActive,
    onHover,
    onLeave,
    keyShape,
    majorScale,
  }: KeyboardKeyProps) => {
    return (
      <S.Key
        $isHighlighted={isHighlighted}
        $isHighlightRole={scaleDegree?.role || "none"}
        $isWhiteKey={majorScale.includes(noteIndex)}
        $keyShape={keyShape}
        $isActiveNote={isActive}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
      >
        <NoteLabel
          isHighlighted={isHighlighted}
          index={index}
          flatNoteName={note.flatNoteName}
          sharpNoteName={note.sharpNoteName}
          isFlatKey={isFlatKey}
          isEnharmonic={note.isEnharmonic}
          isShapeNote={isShapeNote}
        />
      </S.Key>
    );
  },
  (prev, next) => {
    return (
      prev.isActive === next.isActive &&
      prev.isHighlighted === next.isHighlighted &&
      prev.isShapeNote === next.isShapeNote &&
      prev.scaleDegree?.role === next.scaleDegree?.role &&
      prev.isFlatKey === next.isFlatKey
    );
  }
);

export default KeyboardKey;
