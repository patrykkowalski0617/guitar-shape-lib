import { type JSX } from "react";
import * as S from "./parts";
import { getNotes, type NoteFlat, type NoteSharp } from "@/utils";

interface NoteLabelProps {
  index: number;
  firstNote: NoteSharp | NoteFlat;
  isFlatKey: boolean;
  isHighlighted: boolean;
}

export default function NoteLabel({
  index,
  firstNote,
  isFlatKey,
  isHighlighted,
}: NoteLabelProps): JSX.Element {
  const noteObj = getNotes({ firstNote, length: index + 1 })[index];

  const { sharpNoteName, flatNoteName, isEnharmonic } = noteObj;

  return (
    <S.Wrapper
      $isFlatKey={isFlatKey}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
    >
      <div className="mainLabel">{isFlatKey ? flatNoteName : sharpNoteName}</div>

      {isEnharmonic && (
        <div className="optionalLabel">{isFlatKey ? sharpNoteName : flatNoteName}</div>
      )}
    </S.Wrapper>
  );
}
