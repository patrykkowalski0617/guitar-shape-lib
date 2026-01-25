import { memo } from "react";
import * as S from "./parts";
import type { NoteFlat, NoteSharp } from "@/utils";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import type { HighlightRole } from "../../../utils/roleColors";

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
          //
          isHighlighted={isHighlighted}
        />
      </S.Key>
    );
  },
  (prev, next) => {
    return (
      prev.areAnimationsOn === next.areAnimationsOn &&
      prev.isActive === next.isActive &&
      //
      prev.isHighlighted === next.isHighlighted &&
      prev.highlightRole === next.highlightRole &&
      //
      prev.isFlatTune === next.isFlatTune &&
      prev.isShapeNote === next.isShapeNote &&
      prev.flatNoteName === next.flatNoteName &&
      prev.sharpNoteName === next.sharpNoteName &&
      prev.isEnharmonic === next.isEnharmonic &&
      prev["data-role-highlight"] === next["data-role-highlight"]
    );
  },
);

export default KeyboardKey;
