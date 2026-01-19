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
  isFlatTune: boolean;
  scaleDegree: ScaleStepMetadata | undefined;
  isActive: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  keyShape: S.KeyShape | undefined;
  majorScale: number[];
  areAnimationsOn: boolean;
}

const KeyboardKey = memo(
  ({
    note,
    index,
    noteIndex,
    isHighlighted,
    isShapeNote,
    isFlatTune,
    scaleDegree,
    isActive,
    onHover,
    onLeave,
    keyShape,
    majorScale,
    areAnimationsOn,
  }: KeyboardKeyProps) => {
    return (
      <S.Key
        $isHighlighted={isHighlighted}
        $isHighlightRole={scaleDegree?.role || "none"}
        $isWhiteKey={majorScale.includes(noteIndex)}
        $keyShape={keyShape}
        $isActiveNote={isActive}
        $areAnimationsOn={areAnimationsOn}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
      >
        <NoteLabel
          isHighlighted={isHighlighted}
          index={index}
          flatNoteName={note.flatNoteName}
          sharpNoteName={note.sharpNoteName}
          isFlatTune={isFlatTune}
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
      prev.isFlatTune === next.isFlatTune
    );
  },
);

export default KeyboardKey;
