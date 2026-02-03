import { memo } from "react";
import * as S from "./parts";
import type { NoteFlat, NoteSharp } from "@/utils";
import type { HighlightRole } from "../../../utils/roleColors";
import NoteLabel from "@/components/NoteLabel/NoteLabel";

interface PianoKeyProps {
  areAnimationsOn: boolean;
  isActive: boolean;
  isWhitePianoKey: boolean;
  pianoKeyShape: S.KeyShape | undefined;
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

const PianoKey = memo(
  ({
    areAnimationsOn,
    isActive,
    isWhitePianoKey,
    pianoKeyShape,
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
  }: PianoKeyProps) => {
    return (
      <S.Key
        $areAnimationsOn={areAnimationsOn}
        $isActive={isActive}
        $isWhitePianoKey={isWhitePianoKey}
        $pianoKeyShape={pianoKeyShape}
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
          variant="piano"
        />
      </S.Key>
    );
  },
);

export default PianoKey;
