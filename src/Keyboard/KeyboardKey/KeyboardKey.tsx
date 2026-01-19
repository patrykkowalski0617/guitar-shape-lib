import { memo } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import { majorScale, NOTES_SHARP } from "@/utils";
import type { HighlightRole } from "../helpers/useScaleLogic";

interface KeyboardKeyProps {
  isActive: boolean;
  //
  note: NoteObject;
  isHighlighted: boolean;
  isShapeNote: boolean;
  isFlatKey: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  areAnimationsOn: boolean;
  highlightRole: HighlightRole;
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
    isActive,
    //
    note,
    isHighlighted,
    highlightRole,
    isShapeNote,
    isFlatKey,
    onHover,
    onLeave,
    areAnimationsOn,
  }: KeyboardKeyProps) => {
    const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
    const isWhiteKey = majorScale.includes(noteOctaveIndex);
    const keyShape = KEY_SHAPE_MAP[noteOctaveIndex];

    return (
      <S.Key
        $isActive={isActive}
        //
        $isHighlighted={isHighlighted}
        $highlightRole={highlightRole}
        $isWhiteKey={isWhiteKey}
        $keyShape={keyShape}
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
      prev.isActive === next.isActive &&
      //
      prev.isHighlighted === next.isHighlighted &&
      prev.highlightRole === next.highlightRole &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isFlatKey === next.isFlatKey &&
      prev.areAnimationsOn === next.areAnimationsOn
    );
  },
);

export default KeyboardKey;
