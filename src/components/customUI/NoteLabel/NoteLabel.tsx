import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/utils";

interface NoteLabelProps {
  index?: number;
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatKey: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
  orientation?: S.LabelOrientation;
}

export default function NoteLabel({
  isFlatKey,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
  orientation = "vertical",
}: NoteLabelProps): JSX.Element {
  return (
    <S.Wrapper
      $isFlatKey={isFlatKey}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
      $orientation={orientation}
    >
      <div className="mainLabel">{sharpNoteName}</div>
      {isEnharmonic && <div className="optionalLabel">{flatNoteName}</div>}
    </S.Wrapper>
  );
}
