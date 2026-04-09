import { type JSX } from "react";
import * as S from "./parts";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isHighlighted?: boolean;
  variant: Variant;
  noteLabel: string;
}

export default function NoteLabel({
  isHighlighted = false,
  variant,
  noteLabel,
}: NoteLabelProps): JSX.Element {
  return (
    <S.NoteWrapper $isHighlighted={isHighlighted} $variant={variant}>
      <S.Note>{noteLabel}</S.Note>
    </S.NoteWrapper>
  );
}
