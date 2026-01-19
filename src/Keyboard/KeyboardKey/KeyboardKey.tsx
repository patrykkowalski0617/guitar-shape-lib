import { memo } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import { majorScale } from "@/utils";

interface KeyboardKeyProps {
  note: NoteObject;
  noteOctaveIndex: number;
  isHighlighted: boolean;
  isShapeNote: boolean;
  isFlatKey: boolean;
  activeNoteId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  areAnimationsOn: boolean;
}

const KEY_SHAPE_MAP: Record<number, S.KeyShape> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

const KeyboardKey = memo(
  ({
    note,
    noteOctaveIndex,
    isHighlighted,
    isShapeNote,
    isFlatKey,
    activeNoteId,
    onHover,
    onLeave,
    areAnimationsOn,
  }: KeyboardKeyProps) => {
    return (
      <S.Key
        $isHighlighted={isHighlighted}
        $highlightRole={"none"}
        $isWhiteKey={majorScale.includes(noteOctaveIndex)}
        $keyShape={KEY_SHAPE_MAP[noteOctaveIndex]}
        $isActiveNote={note.noteId === activeNoteId}
        $areAnimationsOn={areAnimationsOn}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
      >
        <NoteLabel
          isHighlighted={isHighlighted}
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
      prev.activeNoteId === next.activeNoteId &&
      prev.isHighlighted === next.isHighlighted &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isFlatKey === next.isFlatKey
    );
  },
);

export default KeyboardKey;
