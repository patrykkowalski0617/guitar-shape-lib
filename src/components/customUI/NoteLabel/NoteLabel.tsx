import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/utils";

interface NoteLabelProps {
  index: number;
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatKey: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
}

export default function NoteLabel({
  isFlatKey,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
}: NoteLabelProps): JSX.Element {
  return (
    <S.Wrapper
      $isFlatKey={isFlatKey}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
    >
      <div className="mainLabel">{sharpNoteName}</div>

      {isEnharmonic && <div className="optionalLabel">{flatNoteName}</div>}
    </S.Wrapper>
  );
}
