import { memo } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import NoteLabel from "@/components/customUI/NoteLabel/NoteLabel";
import type { HighlightRole } from "../helpers/useScaleLogic";

interface KeyboardKeyProps {
  isActive: boolean;
  isWhiteKey: boolean;
  keyShape: S.KeyShape | undefined;
  //
  note: NoteObject;
  isHighlighted: boolean;
  isShapeNote: boolean;
  isFlatTune: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  areAnimationsOn: boolean;
  highlightRole: HighlightRole;
}

const KeyboardKey = memo(
  ({
    isActive,
    isWhiteKey,
    keyShape,
    //
    note,
    isHighlighted,
    highlightRole,
    isShapeNote,
    isFlatTune,
    onHover,
    onLeave,
    areAnimationsOn,
  }: KeyboardKeyProps) => {
    return (
      <S.Key
        $isActive={isActive}
        $isWhiteKey={isWhiteKey}
        $keyShape={keyShape}
        //
        $isHighlighted={isHighlighted}
        $highlightRole={highlightRole}
        $areAnimationsOn={areAnimationsOn}
        onMouseOver={() => onHover(note.noteId)}
        onMouseLeave={onLeave}
      >
        <NoteLabel
          isHighlighted={isHighlighted}
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
      //
      prev.isHighlighted === next.isHighlighted &&
      prev.highlightRole === next.highlightRole &&
      prev.isShapeNote === next.isShapeNote &&
      prev.isFlatTune === next.isFlatTune &&
      prev.areAnimationsOn === next.areAnimationsOn
    );
  },
);

export default KeyboardKey;
