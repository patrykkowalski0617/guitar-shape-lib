import { type JSX } from "react";
import * as S from "./parts";

interface NoteLabelProps {
  note: string;
  flatNote: string;
  isFlatKey: boolean;
}

export default function NoteLabel({ note, flatNote, isFlatKey }: NoteLabelProps): JSX.Element {
  const isEnharmonicNote = note !== flatNote;

  return (
    <S.Wrapper $isFlatKey={isFlatKey} $isEnharmonicNote={isEnharmonicNote}>
      <div className="mainLabel">{note}</div>
      {isEnharmonicNote && <div className="optionalLabel">{flatNote}</div>}
    </S.Wrapper>
  );
}
