import { type JSX } from "react";
import { getEnharmonicEquivalent, getNotes, type Note } from "@/utils";
import * as S from "./parts";

interface NoteLabelProps {
  index: number;
  firstNote: Note;
  isFlatKey: boolean;
}

export default function NoteLabel({ index, firstNote, isFlatKey }: NoteLabelProps): JSX.Element {
  const sharpNote = getNotes({ firstNote, length: index + 1, isFlatKey: false })[index];
  const flatNote = getNotes({
    firstNote: getEnharmonicEquivalent(firstNote),
    length: index + 1,
    isFlatKey: true,
  })[index];

  const isEnharmonicNote = sharpNote !== flatNote;

  return (
    <S.Wrapper $isFlatKey={isFlatKey} $isEnharmonicNote={isEnharmonicNote}>
      <div className="mainLabel">{sharpNote}</div>
      {isEnharmonicNote && <div className="optionalLabel">{flatNote}</div>}
    </S.Wrapper>
  );
}
