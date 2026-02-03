import { memo } from "react";
import * as S from "./parts";
import type { NoteFlat, NoteSharp } from "@/utils";
import type { HighlightRole } from "../../../utils/roleColors";
import NoteLabel from "@/components/NoteLabel/NoteLabel";

interface KeyboardKeyProps {
  areAnimationsOn: boolean;
  isActive: boolean;
  isWhiteKey: boolean;
  keyShape: S.KeyShape | undefined;
  //
  noteId: string;
  isHighlighted: boolean;
  highlightRole: HighlightRole;
  //
  isFlatTune: boolean;
  isShapeNote: boolean;
  flatNoteName: NoteFlat;
  sharpNoteName: NoteSharp;
  isEnharmonic: boolean;
  //
  onLeave: () => void;
  onHover: (id: string) => void;
  "data-role-highlight"?: boolean;
}

const KeyboardKey = memo(
  ({
    areAnimationsOn,
    isActive,
    isWhiteKey,
    keyShape,
    //
    noteId,
    isHighlighted,
    highlightRole,
    //
    isFlatTune,
    isShapeNote,
    flatNoteName,
    sharpNoteName,
    isEnharmonic,
    //
    onHover,
    onLeave,
    "data-role-highlight": dataRoleHighlight,
  }: KeyboardKeyProps) => {
    return (
      <S.Key
        $areAnimationsOn={areAnimationsOn}
        $isActive={isActive}
        $isWhiteKey={isWhiteKey}
        $keyShape={keyShape}
        //
        $isHighlighted={isHighlighted}
        $highlightRole={highlightRole}
        //
        onMouseOver={() => onHover(noteId)}
        onMouseLeave={onLeave}
        data-role-highlight={dataRoleHighlight}
      >
        <NoteLabel
          isFlatTune={isFlatTune}
          isShapeNote={isShapeNote}
          flatNoteName={flatNoteName}
          sharpNoteName={sharpNoteName}
          isEnharmonic={isEnharmonic}
          isHighlighted={isHighlighted}
          variant="keyboard"
        />
      </S.Key>
    );
  },
);

export default KeyboardKey;
